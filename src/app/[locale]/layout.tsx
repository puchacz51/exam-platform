import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { ToastCustomProvider } from '@/components/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastCustomProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ToastCustomProvider>
      </body>
    </html>
  );
}
