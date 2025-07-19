import { Funnel } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { ErrorAlert } from '../../../../../components/shared/error-alert';
import { Badge } from '../../../../../components/ui/badge';
import { Button } from '../../../../../components/ui/button';
import { ScrollArea } from '../../../../../components/ui/scroll-area';
import { Separator } from '../../../../../components/ui/separator';
import { calls } from '../../../../../constants/call';

interface SelectCallByStatus {
  status: string;
}

interface SelectCallByCategory {
  category: string;
}

export function FilterStatus() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelectCallByUrlState({ status }: SelectCallByStatus) {
    if (!status) {
      <ErrorAlert
        titleError="Parceiro não encontrado!"
        messageError="Tivemos um erro em encontrar o parceiro, por favor tente novamente!"
      />;
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set('status', status);
    setSearchParams(newParams);
  }

  function handleSelectCallByUrlStateByCategory({
    category,
  }: SelectCallByCategory) {
    if (!category) {
      <ErrorAlert
        titleError="Parceiro não encontrado!"
        messageError="Tivemos um erro em encontrar o parceiro, por favor tente novamente!"
      />;
      return;
    }

    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', category);
    setSearchParams(newParams);
  }

  const uniqueStatuses = calls.reduce((acc, item) => {
    if (!acc.includes(item.status)) {
      acc.push(item.status);
    }
    return acc;
  }, [] as string[]);

  const uniqueCategories = calls.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, [] as string[]);

  const statusCount = calls.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const categoryCount = calls.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <aside className="h-full flex flex-col items-start p-4 gap-4">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-3 justify-center">
          <Funnel size={24} />
          Filtrar Chamados
        </h1>
        <p className="text-sm text-muted-foreground">
          Aqui vc pode filtrar todos os seus chamados feitos!
        </p>
      </div>

      <Separator />

      <nav className="w-full min-h-full">
        <div className="h-[680px] w-[280px] flex gap-3 flex-col">
          <div className="flex flex-col gap-2 p-3">
            {uniqueStatuses.map((status, index) => (
              <div className="flex items-center justify-between">
                <Button
                  key={index}
                  variant="link"
                  className="justify-start cursor-pointer"
                  onClick={() => handleSelectCallByUrlState({ status })}
                  type="button"
                >
                  {status}
                </Button>
                <Badge className="rounded-full size-6 font-bold">
                  {statusCount[status]}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 p-3">
            {uniqueCategories.map((category, index) => (
              <div className="flex items-center justify-between">
                <Button
                  key={index}
                  variant="link"
                  className="justify-start cursor-pointer"
                  onClick={() =>
                    handleSelectCallByUrlStateByCategory({ category })
                  }
                  type="button"
                >
                  {category}
                </Button>
                <Badge className="rounded-full size-6 font-bold">
                  {categoryCount[category]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
