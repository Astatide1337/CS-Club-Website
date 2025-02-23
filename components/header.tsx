import Link from "next/link";

const Header = () => {
  return (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8 flex items-center">
      <Link href="/" className="text-primary hover:text-secondary transition-colors duration-200">
        Home
      </Link>
      <span className="mx-2 text-gray-400">•</span>
      <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light">
        Resources
      </span>
    </h2>
  );
};

export default Header;