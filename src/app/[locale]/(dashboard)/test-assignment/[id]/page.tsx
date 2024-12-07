import { NextPage } from 'next';

interface TestAccessAttemptsPageProps {
  params: {
    id: string;
  };
}

const TestAccessAttemptsPage: NextPage<TestAccessAttemptsPageProps> = ({
  params,
}) => {
  return <div>TestAccessAttemptsPage</div>;
};
