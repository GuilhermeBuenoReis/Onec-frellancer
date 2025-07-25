import { useRouter } from '@tanstack/react-router';
import { Handshake } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { ScrollArea } from '../../../../components/ui/scroll-area';
import { Separator } from '../../../../components/ui/separator';
import { partners } from '../../../../iner/partner-data';

interface SelectPartnerByName {
  name: string;
}

export function ListPartnerAside() {
  const { search, navigate } = useRouter();

  function handleSelectPartnerByUrlState({ name }: SelectPartnerByName) {
    if (!name) {
      console.error('Parceiro não encontrado!');
      return;
    }

    navigate({
      search: (prev: any) => ({
        ...prev,
        name,
      }),
    });
  }

  return (
    <aside className="h-full flex flex-col items-start p-4 gap-4">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-semibold flex items-center gap-3 justify-center">
          <Handshake size={24} />
          Seus Parceiros
        </h1>
        <p className="text-sm text-muted-foreground">
          Veja quem está conectado à Onec.
        </p>
      </div>

      <Separator />

      <nav className="w-full min-h-full">
        <ScrollArea className="h-[680px] w-[280px]">
          <div className="flex flex-col gap-2 p-3">
            {partners.map((item, index) => (
              <Button
                key={index}
                variant="link"
                className="justify-start cursor-pointer"
                onClick={() =>
                  handleSelectPartnerByUrlState({ name: item.nome })
                }
                type="button"
              >
                {item.nome}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </nav>
    </aside>
  );
}
