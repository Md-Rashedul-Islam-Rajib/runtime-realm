import { BlogModel } from "./blogs.model";
import { TBlogs } from "./blogs.types";

export class BlogServices {
    static async createBlog(paylaod: TBlogs) {
        const result = await BlogModel.create(paylaod);
        return result;
    };
}