import { getMessages } from 'next-intl/server';

export const getEmailMessages = async (locale: string) => {
  const messages = await getMessages({ locale });
  return messages.email as IntlMessages['email'];
};
