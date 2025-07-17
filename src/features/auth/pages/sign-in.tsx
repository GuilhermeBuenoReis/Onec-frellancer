import { Label } from '@radix-ui/react-label';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { z } from 'zod/v4';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

type SignInSchemaFormData = z.infer<typeof signInSchema>;

export function SignIn() {
  const { register, handleSubmit } = useForm<SignInSchemaFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSubmitSignInData({
    email,
    password,
  }: SignInSchemaFormData) {
    console.log({ email, password });
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
