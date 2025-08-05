// app/specials/page.jsx
import PageHero from "@/components/common/PageHero"
import SpecialsHighlight from "@/components/specials/SpecialsHighlight"
import SpecialsList from "@/components/specials/SpecialsList"
import SpecialsCTA from "@/components/specials/SpecialsCTA"

export const revalidate = 60 // revalidate every 60 seconds

export default async function SpecialsPage() {
  return (
    <>
      <PageHero
        title="Our Specials"
        subtitle="Limited-time offers and seasonal favorites you can’t miss."
        image="/specials/specials-hero.jpg"
      />
      <SpecialsHighlight />
      <SpecialsList />
      <SpecialsCTA />
    </>
  )
}