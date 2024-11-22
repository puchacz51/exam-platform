'use client';

import { FC, ReactNode, useEffect, useState } from 'react';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

interface ToastProps {
  children: ReactNode;
}

export const ToastCustomProvider: FC<ToastProps> = ({ children }) => {
  const { toasts } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ToastProvider>
      {children}
      {isClient &&
        toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast
              key={id}
              {...props}
            >
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          );
        })}
      <ToastViewport />
    </ToastProvider>
  );
};
