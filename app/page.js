import Hero from "@/components/Homepage/Hero"
import MenuHighlights from "@/components/Homepage/MenuHighlights"
import WhyChooseUs from "@/components/Homepage/WhyChooseUs"
import AboutPreview from "@/components/Homepage/AboutPreview"
import ContactQuickForm from "@/components/Homepage/ContactQuickForm"

export default function Home() {
  return (
    <main className="bg-milk min-h-screen font-sans">
      <Hero />
      <MenuHighlights />
      <WhyChooseUs />
      <AboutPreview />
      <ContactQuickForm />
    </main>
  )
}