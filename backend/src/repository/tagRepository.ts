import prisma from '../utils/db';

export const postTag = async (names: string[]) => {
  const normalizedNames = [...new Set(names.map((name) => name.trim()).filter(Boolean))];

  if (normalizedNames.length === 0) {
    return;
  }

  await prisma.tag.createMany({
    data: normalizedNames.map((name) => ({ name })),
    skipDuplicates: true,
  });
};
