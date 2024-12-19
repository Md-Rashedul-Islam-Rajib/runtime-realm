import { StatusFullError } from '../../class/statusFullError';
import { BlogModel } from './blogs.model';
import { TBlogs } from './blogs.types';

export class BlogServices {
    static async createBlog(paylaod: TBlogs) {
        const result = await BlogModel.create(paylaod);
        return result;
    }

    static async updateBlog(id: string, paylaod: Partial<TBlogs>) {
        const isBlogExists = await BlogModel.findById(id);
        if (!isBlogExists) {
            throw new StatusFullError('NotFoundError', 'Blog not found', true, 404);
        }
        const result = await BlogModel.findByIdAndUpdate(id, paylaod, {
            new: true,
            runValidators: true,
        });
        return result;
    }

    static async deleteBlog(id: string) {
        const isBlogExists = await BlogModel.findById(id);
        if (!isBlogExists) {
            throw new StatusFullError('NotFoundError', 'Blog not found', true, 404);
        };
            const result = await BlogModel.findByIdAndDelete(id,{new:true});
            return result;
    }
}
