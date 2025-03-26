import { type Author } from "@/interfaces/author";
import Link from "next/link";


type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="relative h-[500px] group overflow-hidden rounded-xl">
      <img
        src={coverImage}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
        <h3 className="text-3xl font-bold mb-4">
          <Link
            href={`/posts/${slug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {title}
          </Link>
        </h3>
        
        <p className="text-lg mb-6 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <Link
            href={`/posts/${slug}`}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors duration-200"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}