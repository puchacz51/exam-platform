import { NextPage } from 'next';

import { getTestConfiguration } from '@actions/test/getTestConfiguration';
import TestContextProvider from '@/app/[locale]/(dashboard)/test-creator/store/storeContext';
import TestCreator from '@/app/[locale]/(dashboard)/test-creator/components/TestCreator';


const TestCreatorPage: NextPage = async () => {
  const testConfigurationData = await getTestConfiguration();

  return (
    <div>
      <TestContextProvider
        initProps={{
          testConfiguration: testConfigurationData,
        }}
      >
        <TestCreator />
      </TestContextProvider>
    </div>
  );
};

export default TestCreatorPage;
