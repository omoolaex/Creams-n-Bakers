// components/specials/SpecialsHighlight.jsx
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import SpecialsCarousel from "./SpecialsCarousel"

const builder = imageUrlBuilder(client)
const urlFor = (src) => builder.image(src)

export const revalidate = 60

export default async function SpecialsHighlight() {
  const specials = await client.fetch(
    `*[_type == "specialMenu" && highlight == true && available == true]{
      _id,
      name,
      price,
      description,
      "image": image.asset->url
    } | order(order asc)`
  )

  if (!specials.length) return null

  return (
    <section className="relative w-full bg-milk py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SpecialsCarousel specials={specials} />
      </div>
    </section>
  )
}