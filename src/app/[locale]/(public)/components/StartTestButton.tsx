'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

interface StartTestButtonProps {
  testId: string;
}

export const StartTestButton = ({ testId }: StartTestButtonProps) => {
  const router = useRouter();

  const handleStartTest = () => {
    router.push(`/test/${testId}`);
  };

  return (
    <Button
      size="lg"
      onClick={handleStartTest}
      className="w-full md:w-auto"
    >
      Start Test
    </Button>
  );
};
