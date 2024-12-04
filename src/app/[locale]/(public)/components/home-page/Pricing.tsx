import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const Pricing = () => {
  const tiers = [
    {
      name: 'Basic',
      price: 'Free',
      features: ['Up to 50 tests', 'Basic AI generation', 'Teams integration'],
    },
    {
      name: 'Pro',
      price: '$15/mo',
      features: [
        'Unlimited tests',
        'Advanced AI features',
        'Priority support',
        'Custom branding',
      ],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Custom solutions',
        'API access',
        'Dedicated support',
        'Advanced analytics',
      ],
    },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Simple, Transparent Pricing
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex flex-col rounded-lg border p-8"
            >
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-4 text-3xl font-bold">{tier.price}</p>
              <ul className="mt-8 flex-1 space-y-4">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-8"
                variant={tier.name === 'Pro' ? 'default' : 'outline'}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
