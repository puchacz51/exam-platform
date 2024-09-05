import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

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
  activationLink,
  translations,
}: WelcomeTemplateProps) => {
  const t = translations.confirmation;

  return (
    <Html lang={locale}>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Text style={headerStyle}>{t.greeting.replace('{name}', name)}</Text>
          <Text>{t.thankYou}</Text>
          <Text>{t.activationInstructions}</Text>
          <Section style={buttonContainer}>
            <Button
              style={buttonStyle}
              href={activationLink}
            >
              {t.activateButton}
            </Button>
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
};

const containerStyle = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
};

const headerStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '20px',
  marginBottom: '20px',
};

const buttonStyle = {
  backgroundColor: '#5469d4',
  borderRadius: '5px',
  color: '#ffffff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '10px 20px',
};

const hrStyle = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footerStyle = {
  fontSize: '12px',
  color: '#8898aa',
};

export default EmailTemplate;
