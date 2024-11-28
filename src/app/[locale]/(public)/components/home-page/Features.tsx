import { useTranslations } from 'next-intl';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const Features = () => {
  const t = useTranslations('home.features');

  const features = [
    {
      title: t('aiSupport.title'),
      description: t('aiSupport.description'),
    },
    {
      title: t('msIntegration.title'),
      description: t('msIntegration.description'),
    },
    {
      title: t('academic.title'),
      description: t('academic.description'),
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">{t('title')}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
