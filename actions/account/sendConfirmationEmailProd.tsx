import { Resend } from 'resend';

import EmailTemplate from '@emial-templates/ConfirmationEmailTemplate';
import { generateEmailVerificationToken } from '@actions/account/generateEmailVerificationToken';
import { SelectUser } from '@schema/users';
import { getEmailMessages } from '@/lib/email/getEmailMessages';
import { Tx } from '@actions/attempt/submitAnswer';

interface SendConfirmationEmailProps extends SelectUser {
  locale: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendConfirmationEmailProd = async ({
  email,
  locale,
  firstname,
  lastname,
  tx,
}: SendConfirmationEmailProps & { tx?: Tx }) => {
  try {
    const token = await generateEmailVerificationToken(email, tx);
    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    const emailMessages = await getEmailMessages(locale);
    console.log('emailMessages', email);
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your email address',
      react: (
        <EmailTemplate
          activationLink={confirmUrl}
          locale={locale}
          name={`${firstname} ${lastname}`}
          translations={emailMessages}
          verificationCode={token}
        />
      ),
    });
    console.log('error', error);
    if (error) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: 'Confirmation email sent successfully' };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};
