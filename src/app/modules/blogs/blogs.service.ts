import QueryBuilder from '../../builder/queryBuilder';
import { StatusFullError } from '../../class/statusFullError';
import { UserModel } from '../user/user.model';
import { BlogModel } from './blogs.model';
import { TBlogs } from './blogs.types';

export class BlogServices {
  static async createBlog(payload: TBlogs, email?: string) {
    const author = await UserModel.findOne({ email });
    if (!author) {
      throw new StatusFullError(
        'AuthenticationError',
        'User not found',
        true,
        401,
      );
    }
    payload.author = author._id;

    const data = await BlogModel.create(payload);

    const result = {
      _id: data._id,
      title: data.title,
      content: data.content,
      author: {
        _id: author._id,
        name: author.name,
        email: author.email,
      },
    };
    return result;
  }

  static async getAllblogs(query: Record<string, unknown>) {
      const blogQuery = new QueryBuilder(
        BlogModel.find({ isDeleted: { $ne: true } }, { isDeleted: 0 }),
        query,
      )
        .filter()
        .authorFilter()
        .search(['title', 'content'])
        .sort();
    //   .paginate()
    //   .fields();

    const result = blogQuery.getQuery().exec();
    return result;
  }

  static async updateBlog(
    id: string,
    payload: Partial<TBlogs>,
    email?: string,
  ) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new StatusFullError('NotFoundError', 'User not found', true, 404);
    }
    const blog = await BlogModel.findOne({ _id: id, author: user._id });
    console.log(blog);
    console.log(`userId: ${user._id} and authorId ${blog?.author._id}`);
    if (!blog) {
      throw new StatusFullError(
        'AuthorizationError',
        'You are not the owner of this blog',
        true,
        403,
      );
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

  static async deleteBlog(
    id: string,
    payload: Pick<TBlogs, 'isDeleted'>,
    email?: string,
  ) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new StatusFullError('NotFoundError', 'User not found', true, 404);
    }
    const Blog = await BlogModel.findOne({ _id: id, author: user._id });
    if (!Blog) {
      throw new StatusFullError(
        'AuthorizationError',
        'You are not the owner of this blog',
        true,
        403,
      );
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
}
