import { ToastCustomProvider } from '@/components/ui/toaster';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body>
        <ToastCustomProvider>{children}</ToastCustomProvider>
      </body>
    </html>
  );
};

export default RootLayout;
