import { TestWithCategory } from '@/types/test/testWithCategory';
import { formatDate } from '@/lib/utils';
import { Link } from '@/i18n/routing';

interface TestItemProps {
  test: TestWithCategory;
}

export const TestItem = ({ test }: TestItemProps) => {
  return (
    <Link
      href={{ pathname: '/test/[id]', params: { id: test.id } }}
      className="block"
    >
      <div className="rounded-lg border p-4 transition-colors hover:bg-muted/50">
        <div className="flex justify-between">
          <h3 className="font-medium">{test.title}</h3>
          <span className="text-sm text-muted-foreground">
            {formatDate(test.createdAt)}
          </span>
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {test.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {test.questionCount} questions
          </span>
          •
          <span className="text-sm text-muted-foreground">
            {test.categories.join(', ')}
          </span>
        </div>
      </div>
    </Link>
  );
};
