import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as XLSX from 'xlsx'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { Sidebar } from '@/components/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useGetPortalControllsBySelectParternRoute } from '@/http/generated/api'
import { usePartnerList } from '@/hooks/usePartnerList'

interface Registro {
  monthOfCalculation: string
  competenceMonth: string
  contract: number
  enterprise: string
  product: string
  percentageHonorary: number
  compensation: number
  honorary: number
  tax: number
  tj: number
  value: number
  situation: string
  partnerId: string
  mes: number
}

export function InformationHonorary() {
  const { partnerId = '' } = useParams<{ partnerId?: string }>()
  const navigate = useNavigate()
  const [mes, setMes] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const {
    data: portal,
    isLoading,
    isError,
  } = useGetPortalControllsBySelectParternRoute({ partnerId })

  const { partners } = usePartnerList()

  const registros = useMemo<Registro[]>(
    () =>
      (portal ?? [])
        .map(item => {
          const mm = item.competenceMonth?.split('/')[0] ?? ''
          return {
            monthOfCalculation: item.monthOfCalculation ?? '',
            competenceMonth: item.competenceMonth ?? '',
            contract: item.contract ?? 0,
            enterprise: item.enterprise ?? '',
            product: item.product ?? '',
            percentageHonorary: item.percentageHonorary ?? 0,
            compensation: item.compensation ?? 0,
            honorary: item.honorary ?? 0,
            tax: item.tax ?? 0,
            tj: item.tj ?? 0,
            value: item.value ?? 0,
            situation: item.situation ?? '',
            partnerId: item.partnerId ?? '',
            mes: Number(mm),
          }
        })
        .reverse(),
    [portal]
  )
  const partnerMap = useMemo<Record<string, string>>(() => {
    return partners.reduce((acc, p) => {
      if (p.id && p.name) {
        acc[p.id] = p.name
      }
      return acc
    }, {} as Record<string, string>)
  }, [partners])

  const exportToExcel = () => {
    const fullData = registros.map(r => ({
      'Mês de Cálculo': r.monthOfCalculation,
      'Mês de Competência': r.competenceMonth,
      'Contrato': r.contract,
      'Empresa': r.enterprise,
      'Produto': r.product,
      '% Honorário': r.percentageHonorary,
      'Compensação': r.compensation,
      'Honorário': r.honorary,
      'Imposto': r.tax,
      'TJ': r.tj,
      'Valor': r.value,
      'Situação': r.situation,
      'ID do Parceiro': r.partnerId,
      'Nome do Parceiro': partnerMap[r.partnerId] ?? 'Desconhecido',
    }))
    const ws = XLSX.utils.json_to_sheet(fullData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Honorários')
    XLSX.writeFile(wb, 'honorarios.xlsx')
  }

  const filtrados = mes ? registros.filter(r => r.mes === mes) : registros
  const paginados = filtrados.slice((page - 1) * itemsPerPage, page * itemsPerPage)
  const totalPages = Math.ceil(filtrados.length / itemsPerPage)

  const totals = useMemo(
    () => ({
      valor: filtrados.reduce((sum, r) => sum + r.value, 0),
      honorario: filtrados.reduce((sum, r) => sum + r.honorary, 0),
      compensacao: filtrados.reduce((sum, r) => sum + r.compensation, 0),
      imposto: filtrados.reduce((sum, r) => sum + r.tax, 0),
      tj: filtrados.reduce((sum, r) => sum + r.tj, 0),
      percHonorario: filtrados.reduce((sum, r) => sum + r.percentageHonorary, 0),
    }),
    [filtrados]
  )

  const chartKeys = useMemo(
    () => [
      { key: 'value', label: 'Valor' },
      { key: 'honorary', label: 'Honorário' },
      { key: 'compensation', label: 'Compensação' },
      { key: 'tax', label: 'Imposto' },
      { key: 'tj', label: 'TJ' },
    ] as const,
    []
  )

  const colorMap: Record<string, string> = {
    value: '#3b82f6',
    honorary: '#10b981',
    compensation: '#f59e0b',
    tax: '#ef4444',
    tj: '#8b5cf6',
  }

  if (isLoading) return <p className="text-center mt-10">Carregando...</p>
  if (isError) return <p className="text-center mt-10">Erro ao carregar dados.</p>

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={false} toggleSidebar={() => {}} />
      <main className="flex-1 flex flex-col bg-gray-100">
        <header className="flex items-center justify-between p-6 bg-white shadow">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Painel de Honorários</h1>
            <Button variant="outline" onClick={exportToExcel}>Exportar Excel</Button>
          </div>
          <Button variant="ghost" onClick={() => navigate(-1)}>Voltar</Button>
        </header>

        <div className="p-6 space-y-6 flex-1 overflow-auto">
          <Tabs defaultValue="dashboard" className="w-full space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="dashboard">Resumo</TabsTrigger>
                <TabsTrigger value="grafico">Gráfico</TabsTrigger>
              </TabsList>
              <Select value={mes?.toString() ?? 'all'} onValueChange={v => setMes(v === 'all' ? null : Number(v))}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar mês" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"].map((name, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>{name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
                {Object.entries({
                  Valor: totals.valor,
                  Honorário: totals.honorario,
                  Compensação: totals.compensacao,
                  Imposto: totals.imposto,
                  TJ: totals.tj,
                  '% Honorário': totals.percHonorario,
                }).map(([label, value]) => (
                  <Card key={label}>
                    <CardHeader>
                      <CardTitle>{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {label === '% Honorário'
                        ? `${value.toFixed(2)}%`
                        : value.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="overflow-x-auto mb-6">
                <CardContent>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2">Competência</th>
                        <th className="p-2">Empresa</th>
                        <th className="p-2">Produto</th>
                        <th className="p-2">Valor</th>
                        <th className="p-2">Honorários</th>
                        <th className="p-2">Compensação</th>
                        <th className="p-2">Imposto</th>
                        <th className="p-2">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginados.map((r, i) => (
                        <tr key={i} className="border-t">
                          <td className="p-2">{r.competenceMonth}</td>
                          <td className="p-2">{r.enterprise}</td>
                          <td className="p-2">{r.product}</td>
                          <td className="p-2">{r.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="p-2">{r.honorary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="p-2">{r.compensation.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="p-2">{r.tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                          <td className="p-2">
                            <Button variant="ghost" size="icon" onClick={() => navigate(`/honorario/${r.partnerId}`)}>
                              Detalhes
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage}>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(n => (
                    <PaginationItem key={n}>
                      <PaginationLink isActive={n === page} onClick={() => setPage(n)}>
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TabsContent>

            <TabsContent value="grafico">
              <Card>
                <CardHeader>
                  <CardTitle>Gráfico de Honorários</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filtrados} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="competenceMonth" />
                      <YAxis />
                      <Tooltip formatter={val => typeof val === 'number' ? val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : val} />
                      <Legend verticalAlign="top" height={36} />
                      {chartKeys.map(({ key, label }) => (
                        <Line key={key} type="monotone" dataKey={key} name={label} stroke={colorMap[key]} strokeWidth={3} dot={false} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
