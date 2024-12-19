import { model, Schema } from 'mongoose';
import { TBlogs } from './blogs.types';
import { UserModel } from '../user/user.model';

const blogSchema = new Schema<TBlogs>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);



export const BlogModel = model<TBlogs>('Blog', blogSchema);
