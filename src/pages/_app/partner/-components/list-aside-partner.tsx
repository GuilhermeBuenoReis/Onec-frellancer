import { useNavigate } from '@tanstack/react-router';
import { Handshake } from 'lucide-react';
import { useGetPartners } from '@/generated';
import { Button } from '../../../../components/ui/button';
import { ScrollArea } from '../../../../components/ui/scroll-area';
import { Separator } from '../../../../components/ui/separator';

export function ListPartnerAside() {
  const navigate = useNavigate({ from: '/partner' });
  const { data: partners } = useGetPartners();

  if (!partners) {
    return;
  }

  const allPartner = partners?.data;

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
        <ScrollArea className="h-[680px] w-[380px]">
          <div className="flex flex-col gap-2 p-3">
            {allPartner.map(item => (
              <Button
                key={item.id}
                variant="link"
                className="justify-start cursor-pointer"
                type="button"
                onClick={() =>
                  navigate({
                    to: '/partner',
                    search: prev => ({
                      ...prev,
                      id: item.id,
                    }),
                  })
                }
              >
                {item.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </nav>
    </aside>
  );
}
