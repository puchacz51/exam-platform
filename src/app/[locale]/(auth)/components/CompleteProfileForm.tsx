'use client';

import { FC } from 'react';

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
import { useRouter } from '@/i18n/routing';

const profileSchema = z.object({
  firstname: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastname: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
});

type ProfileForm = z.infer<typeof profileSchema>;

const CompleteProfileForm: FC = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
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
      router.replace('/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
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
              <FormLabel>Imię</FormLabel>
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
              <FormLabel>Nazwisko</FormLabel>
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
        <Button type="submit">Zaktualizuj profil</Button>
      </form>
    </Form>
  );
};

export default CompleteProfileForm;
