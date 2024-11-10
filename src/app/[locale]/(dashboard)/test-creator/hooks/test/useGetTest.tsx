import { useCallback, useEffect, useState } from 'react';

import { getTest } from '@actions/test/getTest';
import { CompleteTest } from '../../../../../../../types/test';

const useGetTest = (initialTestId?: string) => {
  const [test, setTest] = useState<CompleteTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTest = useCallback((testId: string) => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = (await getTest(testId)) as unknown as CompleteTest;
        if (!result) {
          throw new Error('Test not found');
        }

        setTest(result);
        return result;
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to fetch test data');
        return null;
      } finally {
        setLoading(false);
      }
    };

    return load();
  }, []);

  useEffect(() => {
    if (initialTestId) {
      loadTest(initialTestId);
    }
  }, [initialTestId, loadTest]);

  return { test, loading, error, loadTest };
};

export default useGetTest;
