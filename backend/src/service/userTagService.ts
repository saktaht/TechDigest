import * as userTagRepository from '../repository/userTagRepository';

type ExistingTag = Awaited<ReturnType<typeof userTagRepository.findTagsByIds>>[number];
type UserTagWithTag = Awaited<ReturnType<typeof userTagRepository.findUserTags>>[number];
type UserTag = UserTagWithTag['tag'];

export class UserTagValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserTagValidationError';
  }
}

export class UserTagNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserTagNotFoundError';
  }
}

export const addUserTags = async (userId: string, tagIds: string[]) => {
  const normalizedTagIds = [...new Set(tagIds.map((tagId) => tagId.trim()).filter(Boolean))];

  if (normalizedTagIds.length === 0) {
    throw new UserTagValidationError('tagIdsは1件以上必要です');
  }

  const user = await userTagRepository.findUserById(userId);
  if (!user) {
    throw new UserTagNotFoundError('userが見つかりません');
  }

  const existingTags = await userTagRepository.findTagsByIds(normalizedTagIds);
  const existingTagIds = new Set(existingTags.map((tag: ExistingTag) => tag.id));
  const missingTagIds = normalizedTagIds.filter((tagId) => !existingTagIds.has(tagId));

  if (missingTagIds.length > 0) {
    throw new UserTagValidationError('存在しないtagIdが含まれています');
  }

  const result = await userTagRepository.addUserTags(userId, normalizedTagIds);

  return {
    addedCount: result.count,
    tagIds: normalizedTagIds,
  };
};

export const getUserTags = async (userId: string): Promise<UserTag[]> => {
  const normalizedUserId = userId.trim();

  if (!normalizedUserId) {
    throw new UserTagValidationError('userIdが必要です');
  }

  const user = await userTagRepository.findUserById(normalizedUserId);
  if (!user) {
    throw new UserTagNotFoundError('userが見つかりません');
  }

  const userTags = await userTagRepository.findUserTags(normalizedUserId);

  return userTags.map(({ tag }: UserTagWithTag) => tag);
};
