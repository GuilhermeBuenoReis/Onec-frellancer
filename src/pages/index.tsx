import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { LoaderSpinner } from '@/components/shared/loader';
import { RedirectMessage } from '@/components/shared/redirect-message';
import { useGetMe } from '@/generated';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: informationCookie, isPending } = useGetMe();

  useEffect(() => {
    if (!isPending) {
      if (informationCookie) {
        navigate({ to: '/business-dashboard' });
      } else {
        navigate({ to: '/sign-in' });
      }
    }
  }, [informationCookie, isPending, navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {isPending ? <LoaderSpinner /> : <RedirectMessage />}
    </div>
  );
}
