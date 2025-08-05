import PageHero from "@/components/common/PageHero"
import AboutStory from "@/components/About/AboutStory"
import AboutValues from "@/components/About/AboutValues"
import AboutCTA from "@/components/About/AboutCTA"

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Baking happiness, one delightful treat at a time."
        image="/about/about-hero.jpg"
      />
      <AboutStory />
      <AboutValues />
      <AboutCTA />
    </>
  )
}