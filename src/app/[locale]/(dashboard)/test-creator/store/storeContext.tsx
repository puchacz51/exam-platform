'use client';

import React, { createContext, memo, useContext, useMemo } from 'react';

import { useStore } from 'zustand';

import createTestStore, { TestProps, TestState, TestStore } from './store';

const TestContext = createContext<TestStore | null>(null);

interface TestContextProviderProps<
  T extends Partial<TestProps> = Partial<TestProps>,
> {
  initProps?: T;
  children: React.ReactNode;
}

export const TestContextProvider = memo(
  <T extends Partial<TestProps> = Partial<TestProps>>({
    children,
    initProps,
  }: TestContextProviderProps<T>) => {
    const store = useMemo(() => createTestStore(initProps), []);

    return (
      <TestContext.Provider value={store}>{children}</TestContext.Provider>
    );
  }
);

TestContextProvider.displayName = 'TestContextProvider';

export const useTestContext = <T,>(selector: (state: TestState) => T): T => {
  const store = useContext(TestContext);
  if (!store) throw new Error('Missing TestContext.Provider in the tree');
  return useStore(store, selector);
};

export const useTestStore = (): TestStore => {
  const store = useContext(TestContext);
  if (!store) throw new Error('Missing TestContext.Provider in the tree');
  return store;
};

export default TestContextProvider;
