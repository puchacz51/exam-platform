'use server';

import { GenerationConfig, GoogleGenerativeAI } from '@google/generative-ai';
import { customAlphabet } from 'nanoid';
import dotenv from 'dotenv';

import { getQuestionSchemas } from '@actions/test/ai/exampleQuestionJson';
import { questionTypeSchema } from '@/app/[locale]/(dashboard)/test-creator/schemas/questionTypeSchema';
import { AiGeneratorFormData } from '@/app/[locale]/(dashboard)/test-creator/components/ai-generator/schema';
import { Question } from '@/types/test-creator/question';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || '');

const generation_config: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash-8b',
  generationConfig: generation_config,
});

export async function generateQuestions(options: AiGeneratorFormData) {
  try {
    const {
      detail = '',
      selectedTypes,
      topic = '',
      category = { name: '', id: '' },
      language = 'en',
    } = options;

    const totalCount =
      selectedTypes.reduce((sum, config) => sum + config.count, 0) || 5;

    const uniqueTypes = [
      ...Array.from(new Set(selectedTypes.map((config) => config.type))),
    ];
    const questionSchemas = getQuestionSchemas(uniqueTypes);
    const schemasExample = Object.entries(questionSchemas)
      .map(([type, schema]) => `Example for ${type}:\n${schema}`)
      .join('\n\n');

    const typeRequirements =
      selectedTypes.length > 0
        ? `Generate questions with the following distribution:\n${selectedTypes
            .map(
              (config) => `- ${config.count} questions of type ${config.type}`
            )
            .join('\n')}`
        : '';

    const prompt = `
      Generate ${totalCount} questions on the topic of "${topic}" ${detail ? `focusing on: ${detail}` : ''}.
      Generate the content in ${language === 'pl' ? 'Polish' : 'English'} language.
      ${typeRequirements}
      
      Use these example schemas as reference for each question type:
      ${schemasExample}
      
      Return the questions in PLAIN JSON format matching the structure of the examples above.
      I want only JSON, no other formats.
    `;

    const result = await model.generateContent(prompt);
    const questions: Question[] = JSON.parse(result.response.text());

    const nanoid = customAlphabet('1234567890abcdef', 24);

    const questionsWithIds = questions.map((question) => ({
      ...question,
      id: nanoid(),
      categoryId: category.id,
    }));

    const validateQuestions = questionsWithIds.filter((question, index) => {
      const parsedQuestion = questionTypeSchema.safeParse(question);
      if (!parsedQuestion.success) {
        console.error(
          `Error in question ${index + 1}:`,
          parsedQuestion.error.errors
        );
        return false;
      }
      return true;
    });

    if (!validateQuestions.length)
      throw new Error('No valid questions generated');

    return { data: validateQuestions as Question[] };
  } catch (error) {
    console.error('Error generating questions:', error);
    return { error: 'Failed to generate questions. Please try again.' };
  }
}
