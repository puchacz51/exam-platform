'use client';

import { FC, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn, useSession } from 'next-auth/react';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm: FC = () => {
  const returnUrl = (new URLSearchParams(window.location.search).get(
    'returnUrl'
  ) || '/dashboard') as unknown as Location;
  const session = useSession();
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState({
    credentials: false,
    microsoft: false,
    google: false,
  });
  const [error, setError] = useState<string | null>(null);

  const loginSchema = z.object({
    email: z.string().email(t('validation.email')),
    password: z.string().min(1, t('validation.required')),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const defaultValues: LoginForm = {
    email: '',
    password: '',
  };

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });

  useEffect(() => {
    if (session?.data?.user) {
      window.location = returnUrl;
    }
  }, [session]);

  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null);
      setIsLoading((prev) => ({ ...prev, credentials: true }));
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(t('login.invalidCredentials'));
        return;
      }

      const returnUrl =
        typeof window === 'undefined'
          ? ''
          : new URLSearchParams(window.location.search).get('returnUrl') ||
            '/dashboard';

      window.location = returnUrl as unknown as Location;
    } catch (error) {
      console.error(error);
      setError(t('login.error'));
    } finally {
      setIsLoading((prev) => ({ ...prev, credentials: false }));
    }
  };

  const handleSignIn = async (provider: 'azure-ad' | 'Google') => {
    try {
      setIsLoading((prev) => ({
        ...prev,
        [provider]: true,
      }));

      await signIn(provider);
    } finally {
      setIsLoading((prev) => ({
        ...prev,
        [provider === 'azure-ad' ? 'microsoft' : 'Google']: false,
      }));
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t('login.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {error && (
              <Alert
                variant="destructive"
                className="mb-4"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{error}</AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.email')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="twoj@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading.credentials}
            >
              {isLoading.credentials ? t('login.loading') : t('login.submit')}
            </Button>
          </form>
        </Form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              {t('login.alternativeMethods')}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSignIn('azure-ad')}
            disabled={isLoading.microsoft}
          >
            {isLoading.microsoft ? t('login.loading') : t('login.microsoft')}
          </Button>
          <Button
            variant="outline"
            onClick={() => signIn('google')}
            disabled={isLoading.google}
          >
            {isLoading.google ? t('login.loading') : t('login.google')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
