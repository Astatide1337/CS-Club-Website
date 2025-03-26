import { type Author } from "./author";

export type Post = {
  [x: string]: any;
  slug: string;
  title: string;
  category: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};