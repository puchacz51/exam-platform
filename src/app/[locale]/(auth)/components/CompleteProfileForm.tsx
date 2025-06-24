'use client';

import { FC } from 'react';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { completeProfile } from '@actions/account/completeProfile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompleteProfileForm: FC = () => {
  const t = useTranslations('auth.completeProfile');
  const { data: session, update } = useSession();

  const getReturnUrl = (): string => {
    if (typeof window === 'undefined') return '/dashboard';

    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get('returnUrl');

    if (
      returnUrl &&
      (returnUrl.startsWith('/') ||
        returnUrl.startsWith(window.location.origin))
    ) {
      return returnUrl;
    }

    return '/dashboard';
  };

  const profileSchema = z.object({
    firstname: z.string().min(2, t('validation.firstNameLength')),
    lastname: z.string().min(2, t('validation.lastNameLength')),
  });

  type ProfileForm = z.infer<typeof profileSchema>;

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: session?.user?.lastname ?? '',
      lastname: session?.user?.firstname ?? '',
    },
  });
  const onSubmit = async (data: ProfileForm) => {
    try {
      await completeProfile(data);
      await update({ trigger: 'update' });

      // Redirect to returnUrl or dashboard
      const returnUrl = getReturnUrl();
      window.location.href = returnUrl;
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {t('title')}
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
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('firstName')}</FormLabel>
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('lastName')}</FormLabel>
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
            <Button type="submit">{t('submit')}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CompleteProfileForm;
