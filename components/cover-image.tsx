import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full h-auto object-cover", {
        "hover:shadow-xl transition-shadow duration-200": slug,
      })}
      width={1920}
      height={1080}
      priority
    />
  );

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-lg">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;