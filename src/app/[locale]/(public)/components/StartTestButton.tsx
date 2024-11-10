
'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface StartTestButtonProps {
  testId: string;
}

export function StartTestButton({ testId }: StartTestButtonProps) {
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
}