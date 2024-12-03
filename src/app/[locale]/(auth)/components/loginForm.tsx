'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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

const LoginForm: FC = () => {
  const t = useTranslations('auth');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    credentials: false,
    microsoft: false,
    usos: false,
  });

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

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading((prev) => ({ ...prev, credentials: true }));
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        console.error(result.error);
        return;
      }

      const returnUrl =
        new URLSearchParams(window.location.search).get('returnUrl') ||
        '/dashboard';
      router.replace(returnUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading((prev) => ({ ...prev, credentials: false }));
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, microsoft: true }));
      const returnUrl =
        new URLSearchParams(window.location.search).get('returnUrl') ||
        '/dashboard';
      await signIn('azure-ad', { redirect: true, callbackUrl: returnUrl });

      router.replace(returnUrl);
    } finally {
      setIsLoading((prev) => ({ ...prev, microsoft: false }));
    }
  };

  const handleUSOSSignIn = async () => {
    try {
      setIsLoading((prev) => ({ ...prev, usos: true }));
      await signIn('USOS');
      const returnUrl =
        new URLSearchParams(window.location.search).get('returnUrl') ||
        '/dashboard';
      router.replace(returnUrl);
    } finally {
      setIsLoading((prev) => ({ ...prev, usos: false }));
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
            onClick={handleMicrosoftSignIn}
            disabled={isLoading.microsoft}
          >
            {isLoading.microsoft ? t('login.loading') : t('login.microsoft')}
          </Button>
          <Button
            variant="outline"
            onClick={handleUSOSSignIn}
            disabled={isLoading.usos}
          >
            {isLoading.usos ? t('login.loading') : t('login.usos')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
