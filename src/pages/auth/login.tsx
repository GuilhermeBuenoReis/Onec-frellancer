import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  type AuthenticateUserBody,
  useAuthenticateUser,
} from '@/http/generated/api';

interface LoginFormInputs {
  email: string;
  password: string;
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { mutateAsync: authenticate } = useAuthenticateUser();

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async ({ email, password }: AuthenticateUserBody) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      console.log('Sending request to authenticate with data:', {
        email,
        password,
      });
      const response = await authenticate({ data: { email, password } });
      const token = response.token;
      cookies.set('app-token', token, {
        path: '/',
        maxAge: 60 * 24 * 60 * 60,
      });

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
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
              {...register('email', { required: 'Email é obrigatório' })}
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
              {...register('password', { required: 'Senha é obrigatória' })}
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
