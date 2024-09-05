'use client';

import React, { ChangeEvent, ClipboardEvent } from 'react';

import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';

import { verifyEmailToken } from '@actions/account/verifyEmailToken';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from '@/i18n/routing';

type VerifyTokenFormData = {
  token: [string, string, string, string, string, string, string, string];
};

const defaultValues: VerifyTokenFormData = {
  token: ['', '', '', '', '', '', '', ''],
};

const EmailVerificationForm = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    defaultValues,
  });

  const onSubmit = async (data: VerifyTokenFormData) => {
    try {
      const email = searchParams.get('email');

      if (!email) {
        throw new Error('Brak adresu email');
      }

      const token = data.token.join('');

      const successs = await verifyEmailToken(token, email);
      if (!successs) {
        console.error('Nieprawidłowy token');
        return;
      }

      push('/login');
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    form.setValue(`token.${index}` as 'token.1', value);

    if (value.length === 0 && index >= 1) {
      const prevInput = event.target
        .previousElementSibling as HTMLInputElement | null;
      prevInput?.focus();
      return;
    }

    if (index >= 7 || value.length > 1) return;

    const nextInput = event.target
      .nextElementSibling as HTMLInputElement | null;
    nextInput?.focus();
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').slice(0, 8);
    if (pastedData.length === 0) return;

    const newToken = [...form.getValues().token];

    for (let i = 0; i < pastedData.length; i++) {
      newToken[i] = pastedData[i];
      form.setValue(`token.${i}` as 'token.1', pastedData[i]);
    }

    // Focus on the last filled input or the next empty one
    const lastFilledIndex = newToken.findIndex((char) => char === '') - 1;
    const indexToFocus =
      lastFilledIndex >= 0 ? lastFilledIndex : newToken.length - 1;
    const inputToFocus = document.getElementById(
      `token-${indexToFocus}`
    ) as HTMLInputElement | null;
    inputToFocus?.focus();
  };

  return (
    <Card className="mx-auto mt-8 w-max px-4 py-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="token"
            render={() => (
              <FormItem>
                <FormLabel>Kod weryfikacyjny</FormLabel>
                <FormControl>
                  <div className="flex space-x-2">
                    {Array(8)
                      .fill(null)
                      .map((_, index) => (
                        <Input
                          key={index}
                          id={`token-${index}`}
                          {...form.register(`token.${index}` as 'token.1')}
                          maxLength={1}
                          className="w-10 text-center"
                          onChange={(e) => handleInputChange(index, e)}
                          onPaste={handlePaste}
                        />
                      ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Zweryfikuj</Button>
        </form>
      </Form>
    </Card>
  );
};

export default EmailVerificationForm;
