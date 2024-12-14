import { ToastCustomProvider } from '@/components/ui/toaster';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ToastCustomProvider>{children}</ToastCustomProvider>
      </body>
    </html>
  );
};

export default RootLayout;
