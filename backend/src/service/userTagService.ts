import * as userTagRepository from '../repository/userTagRepository';

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
  const existingTagIds = new Set(existingTags.map((tag) => tag.id));
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
