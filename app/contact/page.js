import PageHero from "@/components/common/PageHero"
import ContactInfo from "@/components/Contact/ContactInfo"
import ContactForm from "@/components/Contact/ContactForm"
import ContactMap from "@/components/Contact/ContactMap"

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We’d love to hear from you. Get in touch today!"
        image="/contact/contact-hero.jpg"
      />
      <ContactInfo />
      <ContactForm />
      <ContactMap />
    </>
  )
}
