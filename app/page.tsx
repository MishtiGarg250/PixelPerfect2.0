import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { db } from "@/lib/db"
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Footer from "@/components/landingpage/blog-footer";
import HeroSection from "@/components/landingpage/hero-section";
import Skills from "@/components/landingpage/skills";
import StudyPlan from "@/components/landingpage/study-plan";
import Navbar from "@/components/landingpage/navbar"

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
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Navbar/>
       <main>
      <HeroSection />
      <Skills/>
      <StudyPlan/>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#b5b5f6]">Latest Articles</h2>
            <p className="text-xl  text-white">Stay updated with the latest in web development</p>
          </div>

          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedArticles />
          </Suspense>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="button-primary">
              <Link href="/articles">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>

    
      
    </div>
  )
}
