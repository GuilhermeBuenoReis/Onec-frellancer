import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

import { toast } from 'sonner';
import type { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuthenticateUser } from '@/generated';
import { authenticateUserMutationRequestSchema } from '@/generated/zod/AuthenticationSchemas/authenticateUserSchema';

type authenticateUserMutationRequestSchemaType = z.infer<
  typeof authenticateUserMutationRequestSchema
>;

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
  head: () => ({
    meta: [
      {
        title: 'Sign-in | onec.gestão',
      },
    ],
  }),
});

export function SignIn() {
  const { mutateAsync: authenticate } = useAuthenticateUser();
  const navigate = useNavigate();

  const { register, handleSubmit } =
    useForm<authenticateUserMutationRequestSchemaType>({
      resolver: zodResolver(authenticateUserMutationRequestSchema),
    });

  async function handleSubmitSignInData(
    values: authenticateUserMutationRequestSchemaType
  ) {
    try {
      await authenticate(
        { data: values },
        {
          onSuccess: () => {
            toast.success('Login realizado com sucesso!');
            navigate({ to: '/business-dashboard' });
          },
          onError: err => {
            toast.error('Error ao fazer login!');
            console.log(err);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Faça login na sua conta!</CardTitle>
        <CardDescription>Insira seu e-mail para fazer login!</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(handleSubmitSignInData)}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="admin@example.com"
                {...register('email')}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input type="password" required {...register('password')} />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
