import * as tagRepository from "../repository/tagRepository";

export const postTag = async (names: string[]) => {
  await tagRepository.postTag(names);
};

export const getTags = async () => {
  return await tagRepository.getTags();
};
