import QueryBuilder from '../../builder/queryBuilder';
import { StatusFullError } from '../../class/statusFullError';
import { UserModel } from '../user/user.model';
import { BlogModel } from './blogs.model';
import { TBlogs } from './blogs.types';

export class BlogServices {
    static async createBlog(payload: TBlogs, email?: string) {
        if (!email) {
            throw new StatusFullError('AuthenticationError', 'User not found', true, 401);
        }
        const author = await UserModel.findOne({ email });
        

        const data = await BlogModel.create(payload);
        const {_id,title,content } = data;
        
        const result = {_id,title,content,author};
        return result;
    }

    static async getAllblogs(query: Record<string, unknown>) {
        const blogQuery = new QueryBuilder(
            BlogModel.find(),query
        )
            .filter()
            .sort()
            .paginate()
            .fields();
        
        const result = blogQuery.getQuery;
        return result;
    };

    static async updateBlog(id: string, payload: Partial<TBlogs>, email?: string) {
        if (!email) {
            throw new StatusFullError('AuthenticationError', 'author not found', true, 401);
        }
        const Blog = await BlogModel.findOne({ _id: id, author: email });
        if (!Blog) {
            throw new StatusFullError('AuthorizationError', 'You are not the owner of this blog', true, 403);
        }
        const isBlogExists = await BlogModel.findById(id);
        if (!isBlogExists) {
            throw new StatusFullError('NotFoundError', 'Blog not found', true, 404);
        }
        const result = await BlogModel.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return result;
    }
    
    static async deleteBlog(id: string,payload:Pick<TBlogs,"isDeleted"> ,email?:string) {
        if (!email) {
            throw new StatusFullError('AuthenticationError', 'author not found', true, 401);
        }
        const Blog = await BlogModel.findOne({ _id: id, author: email });
        if (!Blog) {
            throw new StatusFullError('AuthorizationError', 'You are not the owner of this blog', true, 403);
        }
        const isBlogExists = await BlogModel.findById(id);
        if (!isBlogExists) {
            throw new StatusFullError('NotFoundError', 'Blog not found', true, 404);
        };
            const result = await BlogModel.findByIdAndUpdate(id,payload,{new:true,runValidators:true});
            return result;
    }
}
