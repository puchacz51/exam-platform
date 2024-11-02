import { QuestionType } from "@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema";



const MatchingQuestion: React.FC<{ question: QuestionType }> = ({ question }) => {
    return (
      <div className="grid gap-4">
        {question.matchingPairs?.map((pair) => (
          <Card key={pair.id} className="bg-gray-50">
            <CardContent className="flex items-center justify-between p-4">
              <div className="font-medium">{pair.key}</div>
              <ArrowRight className="text-gray-400" />
              <div className="min-w-[150px] rounded-md bg-white p-2 shadow-sm">
                {pair.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

export default MatchingQuestion;