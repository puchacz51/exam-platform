'use client';

import { FC, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, updateProfile } from '@actions/account/updateProfile';
import { useToast } from '@/hooks/useToast';

const profileSchema = z.object({
  firstname: z.string().min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastname: z.string().min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  schoolIndex: z
    .number()
    .int()
    .min(0, 'Numer indeksu musi być liczbą nieujemną'),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface ProfileData {
  firstname: string | null;
  lastname: string | null;
  email: string;
  schoolIndex: number | null;
}

const ProfileEditForm: FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const t = useTranslations('dashboard.profile');
  const { toast } = useToast();

  const form = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      schoolIndex: 0,
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      const result = await getUserProfile();

      if (result.error) {
        toast({
          title: t('errorMessage'),
          description: result.error,
          variant: 'destructive',
        });
      } else if (result.data) {
        setProfileData(result.data);
        form.reset({
          firstname: result.data.firstname || '',
          lastname: result.data.lastname || '',
          schoolIndex: result.data.schoolIndex || 0,
        });
      }

      setIsLoading(false);
    };

    loadProfile();
  }, [form, toast, t]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      const result = await updateProfile(data);

      if (result.error) {
        toast({
          title: t('errorMessage'),
          description: result.error,
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('successMessage'),
        });
        setIsEditing(false);

        // Update local state
        if (profileData) {
          setProfileData({
            ...profileData,
            firstname: data.firstname,
            lastname: data.lastname,
            schoolIndex: data.schoolIndex,
          });
        }
      }
    } catch (error) {
      toast({
        title: t('errorMessage'),
        description: 'Wystąpił nieoczekiwany błąd',
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    if (profileData) {
      form.reset({
        firstname: profileData.firstname || '',
        lastname: profileData.lastname || '',
        schoolIndex: profileData.schoolIndex || 0,
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profileData) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{t('title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">
            Nie udało się załadować danych profilu
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('title')}</CardTitle>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
          >
            {t('edit')}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
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
                        {...field}
                        placeholder="Jan"
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
                        {...field}
                        placeholder="Kowalski"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolIndex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('schoolIndex')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        placeholder="123456"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-4">
                <Button type="submit">{t('save')}</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t('firstName')}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.firstname || 'Nie podano'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t('lastName')}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.lastname || 'Nie podano'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t('email')}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {t('schoolIndex')}
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {profileData.schoolIndex || 'Nie podano'}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
