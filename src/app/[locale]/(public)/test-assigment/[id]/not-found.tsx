import { Home } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Test Not Found</h2>
          <p className="text-muted-foreground">
            The test you re looking for doesnt exist or has been removed.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-8">
          <Button
            asChild
            size="lg"
          >
            <a
              href="/"
              className="flex items-center gap-3"
            >
              <Home className="h-5 w-5" />
              Go to Homepage
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFound;
