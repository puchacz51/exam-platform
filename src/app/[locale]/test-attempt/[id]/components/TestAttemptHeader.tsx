import { FC, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { UserAttemptFlowResponse } from '@actions/attempt/getUsetAttemptFlow';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import { setAttemptPoints } from '@actions/attempt/helpers/setAttemptPoints';
import { cn } from '@/lib/utils';

interface TestAttemptHeaderProps {
  attemptData: NonNullable<UserAttemptFlowResponse['data']>;
}

const TestAttemptHeader: FC<TestAttemptHeaderProps> = ({ attemptData }) => {
  const t = useTranslations();
  const { startAt, duration } = attemptData;
  const [timeLeft, setTimeLeft] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const i18nRouter = useRouter();

  const endTest = async () => {
    const { data } = await setAttemptPoints(attemptData.attemptId);

    if (data) {
      i18nRouter.replace({
        params: { id: attemptData.attemptId },
        pathname: '/test-attempt/[id]/score',
      });
    }
  };

  useEffect(() => {
    const endTime = new Date(startAt).getTime() + duration * 60 * 1000;

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const timeRemaining = Math.max(
        Math.floor((endTime - currentTime) / 1000),
        0
      );
      setTimeLeft(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [startAt, duration]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  const timeColor = timeLeft < 120 ? 'text-red-500' : 'text-zinc-800';

  return (
    <>
      <div className={cn('h-0', isScrolled && 'h-[210px] sm:h-[100px]')} />
      <header
        className={cn(
          'top-0 z-50 transition-all duration-200',
          isScrolled
            ? 'fixed h-14 bg-white/95 shadow-sm left-1/2 -translate-x-1/2'
            : 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-6xl transition-all duration-200',
            isScrolled
              ? 'h-14 flex-row items-center justify-between px-4'
              : 'flex-col p-5 md:flex-row md:items-center md:justify-between'
          )}
        >
          <div
            className={cn(
              'transition-all duration-200',
              isScrolled ? 'flex items-center gap-4' : 'mb-4 md:mb-0'
            )}
          >
            <h1
              className={cn(
                'font-bold tracking-tight text-zinc-900 transition-all',
                isScrolled ? 'text-lg' : 'text-2xl'
              )}
            >
              {t('testAttempt.title')}
            </h1>
            <p
              className={cn(
                'text-zinc-500 transition-all',
                isScrolled ? 'hidden' : 'mt-1.5 text-sm'
              )}
            >
              {t('testAttempt.startAt', {
                date: new Date(startAt).toLocaleString(),
              })}
            </p>
          </div>

          <div
            className={cn(
              'flex items-center gap-3 transition-all',
              isScrolled
                ? 'text-sm'
                : 'flex-col md:flex-row md:items-center md:gap-4'
            )}
          >
            <div
              className={cn(
                'rounded-lg font-medium',
                timeColor,
                isScrolled
                  ? 'flex items-center px-2 py-1'
                  : 'bg-gray-50 px-4 py-2 text-lg'
              )}
            >
              {t('testAttempt.timeLeft')}: {formatTime(timeLeft)}
            </div>
            <Button
              onClick={endTest}
              className={cn(
                'transition-all hover:scale-105',
                isScrolled ? 'h-8 px-3 text-sm' : 'w-full md:w-auto'
              )}
              variant="destructive"
            >
              {t('testAttempt.finishTest')}
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default TestAttemptHeader;
