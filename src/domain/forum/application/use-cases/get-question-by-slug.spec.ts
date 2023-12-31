import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionBySlugUseCase } from './get-question-by-slug-use-case';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
// system under test
let sut: GetQuestionBySlugUseCase;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });
  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion();
    console.log(newQuestion);
    await inMemoryQuestionsRepository.create(newQuestion);
    // Prefered way
    const { question } = await sut.execute({ slug: newQuestion.slug.value });
    // Alternative way
    // const { question } = await sut.execute({ slug: 'example-question' });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionsRepository.items.get(question.id)?.id).toEqual(question.id);
    expect(question.title).toEqual(newQuestion.title);
    expect(question.slug).toEqual(newQuestion.slug);
  });
});
