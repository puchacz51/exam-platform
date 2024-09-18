'use client';

import React, { createContext, useContext, useRef } from 'react';

import { useStore } from 'zustand';

import createTestStore, { TestProps, TestState, TestStore } from './store';

const TestContext = createContext<TestStore | null>(null);

interface TestContextProviderProps {
  initProps?: Partial<TestProps>;
  children: React.ReactNode;
}

export const TestContextProvider: React.FC<TestContextProviderProps> = ({
  children,
  initProps,
}) => {
  const storeRef = useRef<TestStore>();
  if (!storeRef.current) {
    storeRef.current = createTestStore(initProps);
  }

  return (
    <TestContext.Provider value={storeRef.current}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = <T,>(selector: (state: TestState) => T): T => {
  const store = useContext(TestContext);
  if (!store) throw new Error('Missing TestContext.Provider in the tree');
  return useStore(store, selector);
};

export default TestContextProvider;
