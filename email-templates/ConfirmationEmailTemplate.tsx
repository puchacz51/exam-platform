import React from 'react';

import {
  Body,
  // Button,z bibl
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';

interface WelcomeTemplateProps {
  name: string;
  locale: string;
  activationLink: string;
  verificationCode: string;
  translations: IntlMessages['email'];
}

const EmailTemplate = ({
  name,
  locale,
  verificationCode,
  translations,
}: WelcomeTemplateProps) => {
  const t = translations.confirmation;

  return (
    <Html lang={locale}>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Text style={headerStyle}>{t.greeting.replace('{name}', name)}</Text>
          <Text style={paragraphStyle}>{t.thankYou}</Text>
          <Text style={paragraphStyle}>{t.activationInstructions}</Text>

          <Section style={codeContainer}>
            <Text style={codeStyle}>{verificationCode}</Text>
          </Section>

          <Hr style={hrStyle} />
          <Text style={footerStyle}>{t.activationWarning}</Text>
        </Container>
      </Body>
    </Html>
  );
};

const bodyStyle = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: '40px 0',
};

const containerStyle = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '24px',
  color: '#1a1a1a',
  textAlign: 'center' as const,
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#4a4a4a',
  marginBottom: '16px',
};

const codeContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const codeStyle = {
  fontFamily: 'monospace',
  fontSize: '32px',
  fontWeight: 'bold',
  backgroundColor: '#f3f4f6',
  padding: '16px 32px',
  borderRadius: '8px',
  color: '#374151',
  letterSpacing: '4px',
};

// const buttonContainer = {
//   textAlign: 'center' as const,
//   margin: '32px 0',
// };

// const buttonStyle = {
//   backgroundColor: '#4f46e5',
//   borderRadius: '6px',
//   color: '#ffffff',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   textDecoration: 'none',
//   textAlign: 'center' as const,
//   display: 'inline-block',
//   padding: '12px 32px',
//   border: 'none',
//   boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   transition: 'background-color 0.2s ease',
// };

const hrStyle = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footerStyle = {
  fontSize: '14px',
  color: '#6b7280',
  textAlign: 'center' as const,
  lineHeight: '20px',
};

export default EmailTemplate;
