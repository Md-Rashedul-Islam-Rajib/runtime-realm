import { model, Query, Schema } from 'mongoose';
import { TBlogs, TBlogsDoc } from './blogs.types';

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
      ref: 'user',
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogSchema.pre(/^find/, function (next) {
  const query = this as Query<TBlogsDoc, TBlogsDoc>;

  query
    .find({ isDeleted: { $eq: false } })
    .select('-createdAt -updatedAt')
    .populate('author', 'name email');
  next();
});

export const BlogModel = model<TBlogs>('Blog', blogSchema);
