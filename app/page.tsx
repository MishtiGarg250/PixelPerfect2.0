import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { db } from "@/lib/db";
import { ArrowUpRight } from "lucide-react"
import Footer from "@/components/landingpage/blog-footer";
import HeroSection from "@/components/landingpage/hero-section";
import Skills from "@/components/landingpage/skills";
import StudyPlan from "@/components/landingpage/study-plan";
import Navbar from "@/components/landingpage/navbar";

async function FeaturedArticles() {
  const articles = await db.articles.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return (
    <div className="flex overflow-x-auto gap-4 pb-12 md:gap-8 md:pb-4 no-scrollbar md:px-12 px-6">
      {articles.map((article) => (
        <div key={article.id} className="flex-shrink-0 md:mt-4">
          <ArticleCard article={article} />
        </div>
      ))}
      <div className="text-center h-screen/2 flex items-center justify-center">
        <Button
          asChild
          variant="default"
          size="lg"
          className="button-primary rounded-full"
        >
          <Link href="/articles">More<ArrowUpRight /></Link>
        </Button>
          </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <Skills />
        <StudyPlan />
        <section className="md:py-16 py-2">
          <div className="container mx-auto">
            <div className="md:text-center mb-8 md:mb-12">
              <h1 className="px-6 md:px-0 text-[30px] md:text-5xl font-bold md:text-center text-white">
                Our Tech
                <span className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-transparent bg-clip-text">
                  {" "}
                  Articles
                </span>
                📑
              </h1>
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <FeaturedArticles />
            </Suspense>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
