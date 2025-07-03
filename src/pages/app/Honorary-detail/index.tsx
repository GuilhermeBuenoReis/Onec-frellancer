import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import {
  useGetPortalControllsBySelectById,
  useUpdatePortalControll,
  useDeletePortalControll,
} from '@/http/generated/api'
import { usePartnerDetail } from '@/hooks/usePartnerDetail'

const honorarySchema = z.object({
  monthOfCalculation: z.string().nullable(),
  competenceMonth: z.string().nullable(),
  contract: z.number().nullable(),
  enterprise: z.string().nullable(),
  product: z.string().nullable(),
  percentageHonorary: z.number().nullable(),
  compensation: z.number().nullable(),
  honorary: z.number().nullable(),
  tax: z.number().nullable(),
  tj: z.number().nullable(),
  value: z.number().nullable(),
  situation: z.string().nullable(),
  partnerId: z.string(),
})

type HonoraryFormData = z.infer<typeof honorarySchema>

const LABELS: Record<keyof HonoraryFormData, string> = {
  monthOfCalculation: 'Mês de Cálculo',
  competenceMonth: 'Mês de Competência',
  contract: 'Contrato',
  enterprise: 'Empresa',
  product: 'Produto',
  percentageHonorary: '% Honorário',
  compensation: 'Compensação',
  honorary: 'Honorário',
  tax: 'Imposto',
  tj: 'TJ',
  value: 'Valor',
  situation: 'Situação',
  partnerId: 'Parceiro',
}

export function HonoraryDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const { data, isLoading } = useGetPortalControllsBySelectById(id)
  const updateMutation = useUpdatePortalControll()
  const deleteMutation = useDeletePortalControll()
  const firstItem = data?.[0]
  const partnerId = firstItem?.partnerId ?? ''
  const { partner } = usePartnerDetail(partnerId)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<HonoraryFormData>({
    resolver: zodResolver(honorarySchema),
    defaultValues: firstItem ?? {},
  })

  useEffect(() => {
    if (firstItem) reset(firstItem)
  }, [firstItem, reset])

  const handleUpdate = (formData: HonoraryFormData) => {
    updateMutation.mutateAsync({ id, data: formData }, {
      onSuccess: () => setIsSheetOpen(false),
    })
  }

  const handleDelete = () => {
    deleteMutation.mutateAsync({ id }, {
      onSuccess: () => navigate(-1),
    })
  }

  if (isLoading || !firstItem) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(o => !o)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(o => !o)} />
        <main className="p-6 space-y-6 overflow-y-auto">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Honorário</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(honorarySchema.shape) as Array<keyof HonoraryFormData>).map(field => {
                const rawValue = firstItem[field]
                const displayValue = field === 'partnerId'
                  ? partner?.name ?? 'Parceiro desconhecido'
                  : rawValue ?? 'Não informado'
                return (
                  <div key={field} className="flex items-start gap-2 text-gray-700">
                    <span className="w-40 font-medium">{LABELS[field]}</span>
                    <span className="flex-1">{String(displayValue)}</span>
                  </div>
                )
              })}
              <div className="flex gap-3 pt-4">
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                  <SheetTrigger asChild>
                    <Button>Editar</Button>
                  </SheetTrigger>
                  <SheetContent className="p-6 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Editar Honorário</SheetTitle>
                    </SheetHeader>
                    <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 mt-4">
                      {(Object.keys(honorarySchema.shape) as Array<keyof HonoraryFormData>).map(field => (
                        <div key={field}>
                          <label className="block text-sm font-medium">{LABELS[field]}</label>
                          <Input {...register(field)} className="mt-1 w-full" />
                          {errors[field] && <p className="text-sm text-red-500">{errors[field]?.message}</p>}
                        </div>
                      ))}
                      <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar'}</Button>
                        <Button type="button" variant="outline" onClick={() => setIsSheetOpen(false)}>Cancelar</Button>
                      </div>
                    </form>
                  </SheetContent>
                </Sheet>
                <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
