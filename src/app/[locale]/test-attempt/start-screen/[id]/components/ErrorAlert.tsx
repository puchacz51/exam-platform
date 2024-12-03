
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
  title: string;
  description: string;
}

export const ErrorAlert = ({ title, description }: ErrorAlertProps) => (
  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
    <div className="w-full max-w-2xl">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  </div>
);