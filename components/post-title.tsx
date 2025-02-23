import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono tracking-tighter leading-tight md:leading-none mx-auto max-w-4xl text-primary dark:text-primary">
      {children}
    </h1>
  );
}

export default PostTitle;