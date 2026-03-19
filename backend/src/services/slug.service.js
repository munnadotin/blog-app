import slug from "slugify";
import { postModel } from '../models/post.model.js';

export const generateUniqueSlug = async (title) => {
    let slugGenerated = slug(title, { lower: true, strict: true });
    let uniqueSlug = slugGenerated;
    let counter = 1;

    while (await postModel.findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slugGenerated}-${counter}`;
        counter++;
    }

    return uniqueSlug;
};