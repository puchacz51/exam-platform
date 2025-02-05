import { render } from '@react-email/render';

import EmailTemplate from '@emial-templates/ConfirmationEmailTemplate';
import { generateEmailVerificationToken } from '@actions/account/generateEmailVerificationToken';
import { SelectUser } from '@schema/users';
import { mailTransporter } from '@/lib/email/tranasporter';
import { getEmailMessages } from '@/lib/email/getEmailMessages';
import { Tx } from '@actions/attempt/submitAnswer';

interface SendConfirmationEmailProps extends SelectUser {
  locale: string;
}

export const sendConfirmationEmail = async ({
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

    const emailHTML = await render(
      <EmailTemplate
        activationLink={confirmUrl}
        locale={locale}
        name={`${firstname} ${lastname}`}
        translations={emailMessages}
        verificationCode={token}
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

    const response = await mailTransporter.sendMail(mailOptions);

    if (response.rejected.length > 0) {
      throw new Error('Failed to send confirmation email');
    }

    return { success: 'Confirmation email sent successfully' };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { error: 'Failed to send confirmation email' };
  }
};
