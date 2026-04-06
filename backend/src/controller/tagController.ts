import { RequestHandler } from 'express';
import * as tagService from "../service/tagService"

interface CreateTagsRequestBody {
  names: string[]
}

export const createNewTag: RequestHandler = async (req, res) => {
  const body = req.body as CreateTagsRequestBody;
  const { names } = body

  if (!Array.isArray(names)) {
    return res.status(400).json({ message: 'tagを選んでください' });
  }
  if (!names.every(name => typeof name === "string")){
    return res.status(400).json({ message: 'tagは文字列にしてください' });
  }

  try {
    await tagService.postTag(names);
    res.status(201).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "エラーが発生しました。" });
  }
}

export const getTags: RequestHandler = async (req, res) => {
  try {
    const tags = await tagService.getTags();
    res.json(tags);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "エラーが発生しました。" });
  }
}