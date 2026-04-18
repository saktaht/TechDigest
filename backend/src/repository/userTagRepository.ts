import prisma from '../utils/db';

export const findUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
};

export const findTagsByIds = async (tagIds: string[]) => {
  return await prisma.tag.findMany({
    where: {
      id: {
        in: tagIds,
      },
    },
    select: {
      id: true,
    },
  });
};

export const addUserTags = async (userId: string, tagIds: string[]) => {
  return await prisma.userTag.createMany({
    data: tagIds.map((tagId) => ({ userId, tagId })),
    skipDuplicates: true,
  });
};
