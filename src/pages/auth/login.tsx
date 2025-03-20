import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuthenticateUser } from '@/http/generated/api';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['app-token']);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const { mutateAsync } = useAuthenticateUser();

  const onSubmit = async ({ email, password }: LoginFormInputs) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await mutateAsync({ data: { email, password } });

      setCookie('app-token', response.token, {
        path: '/',
        maxAge: 60 * 24 * 60 * 60,
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Erro no login:', error);
      setLoginError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Seu email"
              {...register('email')}
              className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              {...register('password')}
              className="mt-1 w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Entrar'
            )}
          </Button>
          {loginError && (
            <p className="text-red-500 text-center mt-4">{loginError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
