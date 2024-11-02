import { getTest } from '@actions/test/getTest';
import { useCallback, useEffect, useState } from 'react';

const useGetTest = (initialTestId?: string) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTest = useCallback((testId: string) => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getTest(testId);
        setTest(result);
        return result;
      } catch (err) {
        setError(err.message);
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