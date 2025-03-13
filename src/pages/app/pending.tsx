import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from '@/components/ui/table';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const pendenciaSchema = z.object({
  cliente: z.string().nonempty('Cliente é obrigatório'),
  motivo: z.string().nonempty('Motivo do Chamado é obrigatório'),
  status: z.enum(['Aberto', 'Encaminhado', 'Pendente', 'Concluído']),
  prioridade: z.string().nonempty('Prioridade é obrigatória'),
  responsavel: z.string().nonempty('Responsável é obrigatório'),
  categoria: z.enum([
    'SAC',
    'atendimento',
    'financeiro',
    'diretoria',
    'comercial',
    'auditoria',
  ]),
  descricao: z.string().nonempty('Descrição é obrigatória'),
});

type PendenciaFormData = z.infer<typeof pendenciaSchema>;

interface Pendencia extends PendenciaFormData {
  id: number;
  criadoEm: string;
  atualizadoEm: string;
}

export function Pending() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PendenciaFormData>({
    resolver: zodResolver(pendenciaSchema),
    defaultValues: {
      status: 'Aberto',
      categoria: 'SAC',
    },
  });
  const [pendencias, setPendencias] = useState<Pendencia[]>([]);

  useEffect(() => {
    const savedPendencias = localStorage.getItem('pendencias');
    if (savedPendencias) {
      setPendencias(JSON.parse(savedPendencias));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pendencias', JSON.stringify(pendencias));
  }, [pendencias]);

  function formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  const onSubmit = (data: PendenciaFormData) => {
    const currentDate = formatDate(new Date());
    const newPendencia: Pendencia = {
      id: Date.now(),
      cliente: data.cliente,
      motivo: data.motivo,
      status: data.status,
      prioridade: data.prioridade,
      responsavel: data.responsavel,
      categoria: data.categoria,
      descricao: data.descricao,
      criadoEm: currentDate,
      atualizadoEm: currentDate,
    };
    setPendencias([...pendencias, newPendencia]);
    reset();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Helmet title="Painel de Pendências" />
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-6 bg-gray-50 overflow-y-auto space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Painel de Pendências
          </h1>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Adicionar Nova Pendência
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    placeholder="Nome do Cliente"
                    {...register('cliente')}
                  />
                  {errors.cliente && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.cliente.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="motivo">Motivo do Chamado</Label>
                  <Input
                    id="motivo"
                    placeholder="Motivo do Chamado"
                    {...register('motivo')}
                  />
                  {errors.motivo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.motivo.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>{field.value}</SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aberto">Aberto</SelectItem>
                          <SelectItem value="Encaminhado">
                            Encaminhado
                          </SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.status.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="prioridade">Prioridade</Label>
                  <Input
                    id="prioridade"
                    placeholder="Ex: Alta, Média, Baixa"
                    {...register('prioridade')}
                  />
                  {errors.prioridade && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.prioridade.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="responsavel">Responsável</Label>
                  <Input
                    id="responsavel"
                    placeholder="Nome do Responsável"
                    {...register('responsavel')}
                  />
                  {errors.responsavel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.responsavel.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Controller
                    control={control}
                    name="categoria"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>{field.value}</SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAC">SAC</SelectItem>
                          <SelectItem value="atendimento">
                            atendimento
                          </SelectItem>
                          <SelectItem value="financeiro">financeiro</SelectItem>
                          <SelectItem value="diretoria">diretoria</SelectItem>
                          <SelectItem value="comercial">comercial</SelectItem>
                          <SelectItem value="auditoria">auditoria</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.categoria && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.categoria.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Detalhes da pendência"
                  rows={4}
                  {...register('descricao')}
                />
                {errors.descricao && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.descricao.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit">Adicionar Pendência</Button>
              </div>
            </form>
          </div>
          {/* Listagem das pendências */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Lista de Pendências
            </h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Motivo do Chamado</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Atualizado em</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="max-w-xs">Descrição</TableHead>
                    <TableHead>Detalhes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendencias.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.cliente}</TableCell>
                      <TableCell>{item.motivo}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.prioridade}</TableCell>
                      <TableCell>{item.criadoEm}</TableCell>
                      <TableCell>{item.atualizadoEm}</TableCell>
                      <TableCell>{item.responsavel}</TableCell>
                      <TableCell>{item.categoria}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {item.descricao}
                      </TableCell>
                      <TableCell>
                        <Link to={`/pendencias/${item.id}`}>
                          <Eye className="w-5 h-5 text-gray-600 hover:text-gray-800" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
