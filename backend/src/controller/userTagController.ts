import { RequestHandler } from 'express';
import {
  addUserTags,
  getUserTags,
  UserTagNotFoundError,
  UserTagValidationError,
} from '../service/userTagService';

interface UserTagParams {
  userId: string;
}

interface AddUserTagsBody {
  tagIds: string[];
}

export const createUserTags: RequestHandler<
UserTagParams,
unknown,
AddUserTagsBody
> = async (req, res) => {
  const userId = req.params.userId;
  const { tagIds } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'userIdが必要です' });
  }

  if (!Array.isArray(tagIds)) {
    return res.status(400).json({ message: 'tagIdsは配列にしてください' });
  }

  if (!tagIds.every((tagId) => typeof tagId === 'string')) {
    return res.status(400).json({ message: 'tagIdsは文字列にしてください' });
  }

  try {
    const result = await addUserTags(userId, tagIds);
    res.status(201).json({
      success: true,
      addedCount: result.addedCount,
      tagIds: result.tagIds,
    });
  } catch (err) {
    console.error(err);

    if (err instanceof UserTagValidationError) {
      return res.status(400).json({ message: err.message });
    }

    if (err instanceof UserTagNotFoundError) {
      return res.status(404).json({ message: err.message });
    }

    res.status(500).json({ message: 'エラーが発生しました。' });
  }
};

export const getUserTagsByUserId: RequestHandler<UserTagParams> = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userIdが必要です' });
  }

  try {
    const tags = await getUserTags(userId);
    res.json(tags);
  } catch (err) {
    console.error(err);

    if (err instanceof UserTagValidationError) {
      return res.status(400).json({ message: err.message });
    }

    if (err instanceof UserTagNotFoundError) {
      return res.status(404).json({ message: err.message });
    }

    res.status(500).json({ message: 'エラーが発生しました。' });
  }
};
