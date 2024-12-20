import { model, Schema } from 'mongoose';
import { TBlogs } from './blogs.types';


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
    },
    isDeleted:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);



export const BlogModel = model<TBlogs>('Blog', blogSchema);
