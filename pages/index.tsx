import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { motion, animate } from "framer-motion";
import { Accordion, AccordionItem, Link } from "@nextui-org/react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FocusCards } from "@/components/ui/focus-cards";
import React, { use, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useSession, signIn, signOut } from "next-auth/react";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Autocomplete,
  AutocompleteSection,
  AutocompleteItem,
} from "@nextui-org/autocomplete";
import { useRouter } from "next/router";
const fs = require("fs");
const path = require("path");
import { getAllPosts, getPostBySlug } from "./api/api";
import { Post } from "@/interfaces/post";
import { GetServerSideProps } from "next";
import { PostPreview } from "@/components/post-preview";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
{
  /* 
  TODO:
    Add a secret game on this website along with a cyber security (CTF) challenge
    Maybe do the Student projects also in Markdown to make it simple and easier to manange and write less code that way
*/
}

type Props = {
  posts: Post;
};

export default function Home({ posts }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  const [news, setNews] = useState({ articles: [] });
  useEffect(() => {
    // News API from https://newsdata.io/ if needed in the future depending on site traffic create multiple API keys (200 requests/day)
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=technology&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNews({
          ...data,
          articles: data.articles.slice(0, 10).map((article: any) => ({
            quote: article.description,
            name: article.source.name || "Unknown",
            title: article.title || "No title available",
          })),
        });
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);
  const NEWS = news.articles || [];

  const navItems = [
    {
      title: "Home",
      href: "#",
      //Replace with CS Club Logo
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      title: "Resources",
      href: "#Resources",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
      ),
    },
    {
      title: "Contact",
      href: "mailto:hillsboroughcsclub@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      ),
    },
  ];

  const words = [
    {
      text: "HHS",
      className: "text-[--platinum]",
    },
    {
      text: "Computer",
      className: "text-[--platinum]",
    },
    {
      text: "Science",
      className: "text-[--platinum]",
    },
    {
      text: "Club.",
      className: "text-[--periwinkle]",
    },
  ];

  const nouns = [
    "Ideas",
    "Innovations",
    "Creativity",
    "Inspiration",
    "Ambitions",
    "Designs",
    "Passion",
    "Possibilities",
  ];

  const images = [
    "https://picsum.photos/1920/1080?random", // Competitve Programming
    "https://picsum.photos/1920/1080?random", // App Dev
    "https://picsum.photos/1920/1080?random", // Cyber security
    "https://picsum.photos/1920/1080?random", // Game Dev
    "https://picsum.photos/1920/1080?random", // Web Dev
    "https://picsum.photos/1920/1080?random", // A.I.
  ];

  const about = [
    {
      title: "Mission",
      text: "At the HHS Computer Science Club, our mission is to empower students with the skills, knowledge, and passion needed to excel in the world of technology. We believe in learning by doing, and we provide a collaborative environment where students can come together to explore various fields in computer science, share ideas, and create impactful projects.",
    },
    {
      title: "Who We Are",
      text: "We are a diverse and driven group of students from varying backgrounds and levels of experience, united by a shared passion for computer science. Whether you're a veteran coder or just starting your journey, our club provides a space for everyone to grow, learn, and contribute. We ensure that everyone has a voice and can play an active role within the club.",
    },
    {
      title: "What We Do",
      text: "Our club is organized into six subteams, each focusing on a distinct area of computer science. Members can join any of the subteams that interest them. Each subteam organizes its own workshops, projects, and special events, offering something for everyone.",
    },
    {
      title: "Get Involved",
      text: "Our club is always open to new members! Whether you're looking to explore a specific field of computer science, we encourage you to get in touch with us, attend our meetings, and see where your interests align.",
    },
  ];

  const GameDevSubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Many people love playing video games because it's fun, but have
              you ever wondered about making your career in game development?
            </span>{" "}
            A game developer has several roles, including developing the concept
            for the game or working to create different aspects of the game. You
            will work directly with code in order to program the game. In
            addition to creating game content and test the game mechanics.
          </p>
        </div>
      </>
    );
  };

  const CybersecuritySubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              In today's digital world, cybersecurity is more important than
              ever. Have you ever wondered how hackers break into systems—or how
              to stop them?
            </span>{" "}
            The cybersecurity subteam will explore topics such as ethical
            hacking, cryptography, and network security. You’ll learn how to
            protect systems from cyber threats, analyze vulnerabilities, and
            participate in hands-on challenges like PicoCTF, a cybersecurity
            competition designed to test and improve your hacking skills.
          </p>
        </div>
      </>
    );
  };

  const AppDevSubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Almost every service today has an app—but have you ever thought
              about building one yourself?
            </span>{" "}
            The app development subteam will focus on designing and coding
            mobile applications. You’ll learn Java for Android development,
            explore UI/UX design principles, and create functional apps that
            solve real-world problems. By the end, you'll have hands-on
            experience building and deploying apps on Android devices.
          </p>
        </div>
      </>
    );
  };

  const CompetitiveProgrammingSubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Do you enjoy solving puzzles and thinking outside the box?
              Competitive programming challenges you to think algorithmically
              and optimize your solutions under time constraints!
            </span>{" "}
            This subteam will train for competitions like USACO (USA Computing
            Olympiad) and ACSL (American Computer Science League). You’ll learn
            problem-solving techniques, advanced algorithms, and efficient
            coding strategies that will prepare you for coding competitions and
            technical interviews.
          </p>
        </div>
      </>
    );
  };

  const WebDevSubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              Every website you visit started with just a few lines of code—what
              if you could build the next great website?
            </span>{" "}
            The web development subteam will cover both front-end and back-end
            development. You’ll learn HTML, CSS, and JavaScript to create
            visually appealing websites, and dive into frameworks and databases
            to build dynamic, interactive web applications. Whether you want to
            craft personal blogs or full-fledged platforms, this subteam will
            give you the tools to bring your ideas to life.
          </p>
        </div>
      </>
    );
  };

  const AiSubteamInfo = () => {
    return (
      <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              From self-driving cars to chatbots, AI is shaping the future. Want
              to learn how machines can think and learn like humans?
            </span>{" "}
            The AI subteam will introduce key concepts like machine learning,
            neural networks, and deep learning. You’ll work with Python
            libraries such as TensorFlow and PyTorch to train AI models, analyze
            data, and build intelligent applications. Whether you’re interested
            in image recognition, natural language processing, or AI-powered
            game bots, this subteam will guide you through the world of
            artificial intelligence.
          </p>
        </div>
      </>
    );
  };

  const subteamInfo = [
    {
      category: "Cybersecurity",
      title: "Protect from scammers and cyber criminals.",
      src: "https://i0.wp.com/www.esearchadvisors.com/blog/wp-content/uploads/2020/02/giphy-5.cyber-security.gif?fit=480%2C360&ssl=1",
      content: <CybersecuritySubteamInfo />,
    },
    {
      category: "Game Development",
      title: "Create the kind of games you enjoy playing.",
      src: "https://forum-files-playcanvas-com.s3.dualstack.eu-west-1.amazonaws.com/original/2X/5/5967714a5c33ce756eddf38220fccb937064e59c.gif",
      content: <GameDevSubteamInfo />,
    },
    {
      category: "App Development",
      title: "Build apps that fit in your pocket.",
      src: "https://hiddenlogics.com/wp-content/uploads/2020/03/iphone-development.gif",
      content: <AppDevSubteamInfo />,
    },

    {
      category: "Competitive Programming",
      title: "Learn to be efficient and write effective code.",
      src: "https://media.licdn.com/dms/image/C4E12AQGqXjmnyuB71g/article-cover_image-shrink_600_2000/0/1624433257039?e=2147483647&v=beta&t=Xm3dRN6delJi5D3Hl8l8ZYJYvUuSvuPzntU5W3KV6dg",
      content: <CompetitiveProgrammingSubteamInfo />,
    },
    {
      category: "Website Development",
      title: "Create websites that connect the world.",
      src: "https://www.binarycode.co.nz/wp-content/uploads/2022/10/web-development.gif",
      content: <WebDevSubteamInfo />,
    },
    {
      category: "Artificial Intelligence",
      title: "Automate repetitive and tedious tasks.",
      src: "https://miro.medium.com/v2/resize:fit:1320/0*fdExI6MR2LFns1uw.gif",
      content: <AiSubteamInfo />,
    },
  ];

  const subteamCards = subteamInfo.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  if (session) {
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 bg-[--delftblue] ${poppins.className}`}
      >
        <div className="relative items-center ">
          <FloatingDock
            desktopClassName="fixed bottom-0 left-1/2 mb-5 transform -translate-x-1/2 p-3 max-w-fit z-50 bg-[--periwinkle]"
            items={navItems}
          />
          <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <TypewriterEffectSmooth words={words} />
            <p className="text-[--pompnpower] dark:text-neutral-200 mb-5 text-xl   ">
              Where
              <FlipWords words={nouns} />
              Turn Into Code.
            </p>

            {/* About Button */}
            <div className="flex flex-col md:flex-row">
              <Modal>
                <ModalTrigger className="w-40 h-10 rounded-xl bg-[--pompnpower] text-[--gunmetal] border border-[--gunmetal] mr-4  text-sm">
                  <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                    About
                  </span>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent className="bg-[--delftblue]">
                    <h4 className="text-lg md:text-2xl font-bold text-center mb-8">
                      {" "}
                      <span className="px-1 py-0.5 rounded-md bg-[--pompnpower] dark:bg-neutral-800 dark:border-[--gunmetal] border border-[--gunmetal]">
                        About
                      </span>{" "}
                      HHS Computer Science Club! 💻
                    </h4>
                    <div className="flex justify-center items-center">
                      {images.map((image, idx) => (
                        <motion.div
                          key={"images" + idx}
                          style={{
                            rotate: Math.random() * 20 - 10,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                          }}
                          whileTap={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                          }}
                          className="rounded-xl -mr-4 mt-4 p-1 bg-[--periwinkle] dark:bg-neutral-800 dark:border-neutral-700 border border-[--pompnpower] flex-shrink-0 overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt="bali images"
                            width="300"
                            height="300"
                            className="rounded-lg h-20 w-20 md:h-32 md:w-32 object-cover flex-shrink-0"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-xl mx-auto text-[--platinum]">
                      <Accordion
                        variant="bordered"
                        className="text-[--platinum]"
                      >
                        {about.map((content, idx) => (
                          <AccordionItem
                            className="text-[--platinum] "
                            key={idx} // Use idx for a unique key
                            aria-label={`${content.title}`} // Dynamic aria-label
                            title={`${content.title}`} // Dynamic title
                            subtitle={
                              <div className="text-[--platinum]">
                                <span className="px-1 py-0.5 rounded-md bg-[--pompnpower] dark:bg-neutral-800 dark:border-[--gunmetal] border border-[--gunmetal]">
                                  {content.title}
                                </span>
                              </div>
                            }
                          ></AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </ModalContent>
                </ModalBody>
              </Modal>
              <button
                className="w-40 h-10 rounded-xl bg-[--periwinkle] text-[--gunmetal] border border-[--gunmetal]  text-sm"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Get to know your Subteam.
          </h2>
          <Carousel items={subteamCards} />
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Latest News
          </h2>
          <InfiniteMovingCards
            items={NEWS}
            className="max-w-9xl"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl mb-10 text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Student Projects.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {posts
              .filter((post: Post) => post.category === "Student Project")
              .map((post: Post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
          </div>
        </div>
        <div className="w-full h-full">
          <h2
            id="Resources"
            className="max-w-7xl mt-10 mb-10 text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans"
          >
            Resources.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {posts
              .filter((post: Post) => post.category === "Resource")
              .map((post: Post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
          </div>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-24 bg-[--delftblue] ${poppins.className}`}
      >
        <div className="relative items-center ">
          <FloatingDock
            desktopClassName="fixed bottom-0 left-1/2 mb-5 transform -translate-x-1/2 p-3 max-w-fit z-50 bg-[--periwinkle]"
            items={navItems}
          />
          <div className="flex flex-col items-center justify-center h-[40rem]  ">
            <TypewriterEffectSmooth words={words} />
            <div className="flex flex-row">
              <p className="text-[--pompnpower] dark:text-neutral-200 mb-5 text-xl   ">
                Where
              </p>
              <FlipWords className="text-xl" words={nouns} />
              <p className="text-[--pompnpower] dark:text-neutral-200 mb-5 text-xl   ">
                Turn Into Code.
              </p>
            </div>

            {/* About Button */}
            <div className="flex flex-col md:flex-row">
              <Modal>
                <ModalTrigger className="w-40 h-10 rounded-xl bg-[--pompnpower] text-[--gunmetal] border border-[--gunmetal] mr-4  text-sm">
                  <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                    About
                  </span>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent className="bg-[--delftblue]">
                    <h4 className="text-lg md:text-2xl text-[--platinum] dark:text-neutral-100 font-bold text-center mb-8">
                      {" "}
                      <span className="px-1 py-0.5 rounded-md bg-[--pompnpower] dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                        About
                      </span>{" "}
                      HHS Computer Science Club! 💻
                    </h4>
                    <div className="flex justify-center items-center">
                      {images.map((image, idx) => (
                        <motion.div
                          key={"images" + idx}
                          style={{
                            rotate: Math.random() * 20 - 10,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                          }}
                          whileTap={{
                            scale: 1.1,
                            rotate: 0,
                            zIndex: 100,
                          }}
                          className="rounded-xl -mr-4 mt-4 p-1 bg-[--periwinkle] dark:bg-neutral-800 dark:border-neutral-700 border border-[--pompnpower] flex-shrink-0 overflow-hidden"
                        >
                          <Image
                            src={image}
                            alt="club images"
                            width="300"
                            height="300"
                            className="rounded-lg h-20 w-20 md:h-32 md:w-32 object-cover flex-shrink-0"
                          />
                        </motion.div>
                      ))}
                    </div>
                    <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-xl mx-auto text-[--platinum]">
                      <Accordion
                        variant="bordered"
                        className="text-[--platinum]"
                      >
                        {about.map((content, idx) => (
                          <AccordionItem
                            className="text-[--platinum]"
                            key={idx} // Use idx for a unique key
                            aria-label={`${content.title}`} // Dynamic aria-label
                            subtitle={
                              <div className="text-[--platinum] font-bold text-large w-screen m-2">
                                {content.title}
                              </div>
                            }
                          >
                            {content.text}
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </ModalContent>
                </ModalBody>
              </Modal>
              <button
                className="w-40 h-10 rounded-xl bg-[--periwinkle] text-[--gunmetal] border border-[--gunmetal]  text-sm"
                onClick={() => signIn()}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Get to know your Subteam.
          </h2>
          <Carousel items={subteamCards} />
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Latest News
          </h2>
          <InfiniteMovingCards
            items={NEWS}
            className="max-w-9xl"
            speed="slow"
            pauseOnHover={true}
          />
        </div>
        <div className="w-full h-full">
          <h2 className="max-w-7xl mb-10 text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans">
            Student Projects.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {posts
              .filter((post: Post) => post.category === "Student Project")
              .map((post: Post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
          </div>
        </div>
        <div className="w-full h-full">
          <h2
            id="Resources"
            className="max-w-7xl mt-10 mb-10 text-xl md:text-5xl font-bold text-[--periwinkle] dark:text-neutral-200 font-sans "
          >
            Resources.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
            {posts
              .filter((post: Post) => post.category === "Resource")
              .map((post: Post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export const getServerSideProps: GetServerSideProps = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
