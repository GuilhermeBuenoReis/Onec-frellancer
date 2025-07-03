import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import {
  useGetNegotiation,
  useCreateDataNegotiation,
  getGetNegotiationQueryKey,
} from '@/http/generated/api';
import type { INegotiation } from '@/domain/negotiation/INegotiation';
import {
  dtoToEntity,
  formToCreateDto as formToDto,
} from '@/data/negotiation/negotiationService';
import {
  negotiationSchema,
  type NegotiationFormValues as NegotiationFormData,
} from '@/domain/negotiation/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function useNegotiationsDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data = [], isLoading } = useGetNegotiation();

  const list: INegotiation[] = data.map(dtoToEntity).reverse();

  const { mutateAsync: createNegotiation, status: createStatus } =
    useCreateDataNegotiation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Partial<NegotiationFormData>>({
    resolver: zodResolver(negotiationSchema.partial()),
    defaultValues: {},
  });

  const [sheetOpen, setSheetOpen] = useState(false);
  const onCreate = handleSubmit(async values => {
    try {
      await createNegotiation({
        data: formToDto(values as NegotiationFormData),
      });
      toast.success('Negociação criada com sucesso!');
      await queryClient.invalidateQueries({ queryKey: getGetNegotiationQueryKey() });
      setSheetOpen(false);
      reset();
    } catch (err) {
      toast.error('Erro ao criar negociação!');
    }
  });

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const maxButtons = 10;

  const filtered = useMemo<INegotiation[]>(
    () =>
      list.filter(n => {
        const statusMatch = !filterStatus || n.status?.toLowerCase() === filterStatus.toLowerCase();
        const searchMatch = !search ||
          n.client?.toLowerCase().includes(search.toLowerCase()) ||
          n.status?.toLowerCase().includes(search.toLowerCase());
        return statusMatch && searchMatch;
      }),
    [list, filterStatus, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  const current = useMemo<INegotiation[]>(
    () => filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage),
    [filtered, page]
  );

  const totalProjects = filtered.length;
  const totalValue = filtered.reduce((sum, n) => sum + (n.value || 0), 0);
  const averageValue = totalProjects > 0 ? (totalValue / totalProjects).toFixed(2) : '0.00';

  const half = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, page - half);
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  const handleSearch = () => setPage(1);
  function getStatusClasses(s?: string) {
    switch (s?.toLowerCase()) {
      case 'ganho': return 'bg-green-100 text-green-800';
      case 'em andamento': return 'bg-yellow-100 text-yellow-800';
      case 'perdido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  return {
    isLoading,
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    page,
    setPage,
    totalPages,
    pageNumbers,
    current,
    totalProjects,
    totalValue,
    averageValue,
    sheetOpen,
    setSheetOpen,
    register,
    errors,
    onCreate,
    isSubmitting,
    createStatus,
    handleSearch,
    getStatusClasses,
    navigate,
  };
}