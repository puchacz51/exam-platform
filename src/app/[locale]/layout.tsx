import { ToastCustomProvider } from '@/components/ui/toaster';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ToastCustomProvider>{children}</ToastCustomProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
