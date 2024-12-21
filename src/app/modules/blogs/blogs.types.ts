import { Document, Model, Types } from 'mongoose';

export interface TBlogs {
  title: string;
  content: string;
  author: Types.ObjectId;
  isDeleted: boolean;
}

export interface TBlogsDoc extends TBlogs, Document {
  _id: Types.ObjectId;
}

export interface TPopulateBlogs {
  _id: Types.ObjectId;
  title: string;
  content: string;
  author: {
    _id: Types.ObjectId;
    name: string;
    email: string;
  };
}

export interface BlogStatics extends Model<TBlogsDoc> {
  findBlog: (id: Types.ObjectId) => Promise<TPopulateBlogs>;
}
