import { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye, PlusCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import {
  useGetNegotiation,
  useCreateDataNegotiation,
  getGetNegotiationQueryKey,
} from '@/http/generated/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import * as XLSX from 'xlsx';

const negotiationSchema = z.object({
  title: z.string().nullable(),
  client: z.string().nullable(),
  user: z.string().nullable(),
  tags: z.string().nullable(),
  step: z.string().nullable(),
  status: z.string().nullable(),
  value: z.number().nullable(),
  partnerId: z.string().nullable(),
  startsDate: z.string().nullable(),
  observation: z.string().nullable(),
  averageGuide: z.number().nullable(),
});

type NegotiationFormData = z.infer<typeof negotiationSchema>;

export function Negotiation() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: negotiations = [] } = useGetNegotiation();
  const { mutateAsync: createNegotiation } = useCreateDataNegotiation();
  const queryClient = new QueryClient();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const maxPageButtons = 10;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NegotiationFormData>({
    resolver: zodResolver(negotiationSchema),
    defaultValues: {
      title: null,
      client: null,
      user: null,
      tags: null,
      step: null,
      status: null,
      value: null,
      partnerId: null,
      startsDate: null,
      observation: null,
      averageGuide: null,
    },
  });

  const onSubmit = async ({
    averageGuide,
    client,
    observation,
    partnerId,
    startsDate,
    status,
    step,
    tags,
    title,
    user,
    value,
  }: NegotiationFormData) => {
    await createNegotiation(
      {
        data: {
          averageGuide,
          client,
          observation,
          partnerId,
          startsDate,
          status,
          step,
          tags,
          title,
          user,
          value,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getGetNegotiationQueryKey(),
          });
          toast.success('Criado com sucesso!');
        },
        onError: () => {
          toast.error('Não foi possível criar uma nova negociação!');
        },
      }
    );
    reset();
    setOpen(false);
  };

  const [open, setOpen] = useState(false);

  // 1) Filtrar por status exato e por campo de busca (cliente ou status)
  const filtered = useMemo(() => {
    return negotiations.filter(n => {
      const statusMatch =
        !filterStatus ||
        n.status?.toLowerCase() === filterStatus.trim().toLowerCase();
      const searchMatch =
        !search ||
        n.client?.toLowerCase().includes(search.trim().toLowerCase()) ||
        n.status?.toLowerCase().includes(search.trim().toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [negotiations, filterStatus, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const current = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  // Cálculos de resumo
  const totalProjects = filtered.length;
  const totalValue = filtered.reduce((sum, n) => sum + (n.value || 0), 0);
  const averageValue =
    totalProjects > 0 ? (totalValue / totalProjects).toFixed(2) : '0.00';

  // Paginação: cálculo dos botões
  const half = Math.floor(maxPageButtons / 2);
  let startPage = Math.max(1, page - half);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const handleSearch = () => setPage(1);

  function getStatusBadgeClasses(status?: string) {
    const key = status?.trim().toLowerCase();
    switch (key) {
      case 'ganho':
        return 'bg-green-100 text-green-800';
      case 'em andamento':
        return 'bg-yellow-100 text-yellow-800';
      case 'perdido':
        return 'bg-red-100 text-red-800';
      case 'falta assinatura':
        return 'bg-indigo-100 text-indigo-800';
      case 'aguardando cálculo':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  }

  // 2) Converte serial/string de data para DD/MM/YYYY (ou vazio)
  const formatDateString = (value: string | null | undefined) => {
    if (!value) return '';
    // Se for string no formato ISO ou já DD/MM, dayjs consegue formatar
    const parsed = dayjs(value);
    return parsed.isValid() ? parsed.format('DD/MM/YYYY') : value;
  };

  // 3) Função de exportar para Excel todas as negociações filtradas
  const exportToExcel = () => {
    // Monta array de objetos com as colunas que aparecerão no Excel.
    const exportData = filtered.map(n => ({
      'Data Início': formatDateString(n.startsDate),
      Cliente: n.client ?? '',
      Status: n.status ?? '',
      Valor: n.value != null ? n.value : 0,
      'Parceiro (Partner ID)': n.partnerId ?? '',
      Observação: n.observation ?? '',
      GuiaMédia: n.averageGuide != null ? n.averageGuide : '',
      Título: n.title ?? '',
      Usuário: n.user ?? '',
      Etapa: n.step ?? '',
      Tags: n.tags ?? '',
    }));

    // Converte para worksheet e em seguida para workbook
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Negociações');
    XLSX.writeFile(workbook, 'negociacoes_filtradas.xlsx');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Helmet>
        <title>Finanças</title>
      </Helmet>
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(v => !v)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(v => !v)} />
        <main className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
            <h1 className="text-3xl font-bold text-gray-800">
              Dashboard Financeiro
            </h1>
            <div className="flex items-center gap-3">
              {/* Campo de Busca */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Input
                  placeholder="Buscar empresa ou status..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="px-3 py-2 border-none focus:ring-0 w-60"
                />
                <Button
                  variant="ghost"
                  className="p-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Botão “Nova Negociação” */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button className="flex items-center gap-2 bg-blue-900">
                    <PlusCircle className="w-5 h-5" />
                    Nova Negociação
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-md">
                  <SheetHeader>
                    <SheetTitle>Criar Negociação</SheetTitle>
                    <SheetDescription>
                      Preencha os campos para adicionar uma nova negociação
                    </SheetDescription>
                  </SheetHeader>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 p-4"
                  >
                    <div className="space-y-1">
                      <Label htmlFor="title">Título</Label>
                      <Input id="title" {...register('title')} />
                      {errors.title && (
                        <p className="text-red-600 text-sm">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="client">Cliente</Label>
                      <Input id="client" {...register('client')} />
                      {errors.client && (
                        <p className="text-red-600 text-sm">
                          {errors.client.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="user">Usuário</Label>
                      <Input id="user" {...register('user')} />
                      {errors.user && (
                        <p className="text-red-600 text-sm">
                          {errors.user.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="tags">Tags</Label>
                      <Input id="tags" {...register('tags')} />
                      {errors.tags && (
                        <p className="text-red-600 text-sm">
                          {errors.tags.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="step">Etapa</Label>
                      <Input id="step" {...register('step')} />
                      {errors.step && (
                        <p className="text-red-600 text-sm">
                          {errors.step.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="status">Status</Label>
                      <Input id="status" {...register('status')} />
                      {errors.status && (
                        <p className="text-red-600 text-sm">
                          {errors.status.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="value">Valor</Label>
                      <Input
                        type="number"
                        step="0.01"
                        id="value"
                        {...register('value', { valueAsNumber: true })}
                      />
                      {errors.value && (
                        <p className="text-red-600 text-sm">
                          {errors.value.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="partnerId">Partner</Label>
                      <Input id="partnerId" {...register('partnerId')} />
                      {errors.partnerId && (
                        <p className="text-red-600 text-sm">
                          {errors.partnerId.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="startsDate">Data Início</Label>
                      <Input
                        type="date"
                        id="startsDate"
                        {...register('startsDate')}
                      />
                      {errors.startsDate && (
                        <p className="text-red-600 text-sm">
                          {errors.startsDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="observation">Observação</Label>
                      <Textarea id="observation" {...register('observation')} />
                      {errors.observation && (
                        <p className="text-red-600 text-sm">
                          {errors.observation.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="averageGuide">Guia Média</Label>
                      <Input
                        type="number"
                        step="0.01"
                        id="averageGuide"
                        {...register('averageGuide', { valueAsNumber: true })}
                      />
                      {errors.averageGuide && (
                        <p className="text-red-600 text-sm">
                          {errors.averageGuide.message}
                        </p>
                      )}
                    </div>
                    <SheetFooter className="pt-2">
                      <Button type="submit" className="w-full">
                        Criar
                      </Button>
                    </SheetFooter>
                  </form>
                </SheetContent>
              </Sheet>

              {/* Botão de Exportar para Excel */}
              <Button onClick={exportToExcel} variant="outline">
                Exportar para Excel
              </Button>
            </div>
          </div>

          {/* ===== Resumo Financeiro ===== */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 text-center">
                <h2 className="text-lg">Projetos</h2>
                <p className="text-2xl font-semibold">{totalProjects}</p>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg">Valor Total</h2>
                <p className="text-2xl font-semibold">
                  R$ {totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg">Valor Médio</h2>
                <p className="text-2xl font-semibold">R$ {averageValue}</p>
              </div>
            </CardContent>
          </Card>

          {/* ===== Tabela de Negociações ===== */}
          <Card className="p-8">
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Tabela</TabsTrigger>
              </TabsList>
              <TabsContent value="table">
                <div className="overflow-x-auto">
                  <Table className="min-w-full text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data Início</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {current.map(n => (
                        <TableRow key={n.id} className="hover:bg-gray-50">
                          <TableCell>
                            {n.startsDate
                              ? dayjs(n.startsDate).format('DD/MM/YYYY')
                              : '-'}
                          </TableCell>
                          <TableCell>{n.client}</TableCell>
                          <TableCell>
                            <span
                              className={`
                                inline-block
                                px-2 py-1
                                rounded-full
                                text-xs font-medium
                                ${getStatusBadgeClasses(n.status)}
                              `}
                            >
                              {n.status || 'Não Informado'}
                            </span>
                          </TableCell>
                          <TableCell>R$ {n.value?.toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/negotiation/${n.id}`)}
                            >
                              <Eye className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* ===== Paginação ===== */}
                  <footer className="mt-4 flex justify-center">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    >
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                        </PaginationItem>
                        {pageNumbers.map(num => (
                          <PaginationItem key={num}>
                            <PaginationLink
                              isActive={num === page}
                              onClick={() => setPage(num)}
                            >
                              {num}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        {totalPages > endPage && (
                          <PaginationItem>
                            <PaginationEllipsis>...</PaginationEllipsis>
                          </PaginationItem>
                        )}
                        <PaginationItem>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                          >
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </footer>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </main>
      </div>
    </div>
  );
}
