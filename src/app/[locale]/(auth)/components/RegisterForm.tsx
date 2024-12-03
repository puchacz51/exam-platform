'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { registerUser } from '@actions/account/createAccount';
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
import { useRouter } from '@/i18n/routing';
import AlternativeSignUpMethods from '@/app/[locale]/(auth)/components/AlternativeSignUpMethods';

const RegistrationForm: FC = () => {
  const t = useTranslations('auth');

  const registrationSchema = z.object({
    firstName: z.string().min(2, t('validation.minLength', { length: 2 })),
    lastName: z.string().min(2, t('validation.minLength', { length: 2 })),
    email: z.string().email(t('validation.email')),
    password: z.string().min(8, t('validation.minLength', { length: 8 })),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: t('validation.passwordMatch'),
    path: ['confirmPassword'],
  });

  type RegistrationForm = z.infer<typeof registrationSchema>;

  const defaultValues: RegistrationForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });
  const { push } = useRouter();

  const onSubmit = async (data: RegistrationForm) => {
    const formdata = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formdata.append(key, value);
    });
    const result = await registerUser(formdata);

    if ('error' in result) {
      form.setError('email', {
        type: 'manual',
        message: result.error,
      });
      return;
    }

    if (result.success) {
      push({ pathname: '/verify-email', query: { email: data.email } });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t('register.title')}
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
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.firstName')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jan"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.lastName')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kowalski"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.email')}</FormLabel>
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
                  <FormLabel>{t('register.password')}</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.confirmPassword')}</FormLabel>
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
            >
              {t('register.submit')}
            </Button>
          </form>
        </Form>
        <AlternativeSignUpMethods />
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
