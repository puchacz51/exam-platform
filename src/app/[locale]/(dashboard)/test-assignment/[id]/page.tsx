import { NextPage } from 'next';

interface TestAccessAttemptsPageProps {
  params: {
    id: string;
  };
}

const TestAccessAttemptsPage: NextPage<TestAccessAttemptsPageProps> = ({
  params,
}) => {
  console.log(params);
  return <div>TestAccessAttemptsPage</div>;
};

export default TestAccessAttemptsPage;
