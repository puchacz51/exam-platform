import { render } from '@react-email/render';

import { mailTransporter } from '@/lib/email/tranasporter';

import EmailTemplate from '../../email-templates/ConfirmationEmailTemplate';
import { getEmailMessages } from '@/lib/email/getEmailMessages';

interface SendConfirmationEmailProps {
  email: string;
  locale: string;
  name: string;
}

export const sendConfirmationEmail = async ({
  email,
  locale,
  name,
}: SendConfirmationEmailProps) => {
  try {
    const token = 'test';
    const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL}/confirm-email?token=${token}`;

    const emailMessages = await getEmailMessages(locale);

    const emailHTML = await render(
      <EmailTemplate
        activationLink={confirmUrl}
        locale={locale}
        name={name}
        translations={emailMessages}
      />,
      {
        pretty: true,
      }
    );

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: 'Confirm your email address',
      html: emailHTML,
    };

    await mailTransporter.sendMail(mailOptions);

    return { success: 'Confirmation email sent successfully' };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { error: 'Failed to send confirmation email' };
  }
};
