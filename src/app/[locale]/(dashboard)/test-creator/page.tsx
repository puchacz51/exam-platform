import { NextPage } from 'next';

import { getTestConfiguration } from '@actions/test/getTestConfiguration';

import TestCreatorForm from './components/TestCreatorTestForm';
import TestContextProvider from './store/storeContext';

const TestCreatorPage: NextPage = async () => {
  const testConfigurationData = await getTestConfiguration();

  return (
    <div>
      <TestContextProvider
        initProps={{ testConfiguration: testConfigurationData }}
      >
        <TestCreatorForm />
      </TestContextProvider>
    </div>
  );
};

export default TestCreatorPage;
