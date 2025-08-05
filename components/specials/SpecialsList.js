import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import FadeInWhenVisible from "@/components/common/FadeInWhenVisible"

const builder = imageUrlBuilder(client)
const urlFor = (src) => builder.image(src)

export const revalidate = 60

export default async function SpecialsList() {
  const specials = await client.fetch(
    `*[_type == "specialMenu" && available == true]{
      _id,
      name,
      price,
      image
    } | order(order asc)`
  )

  if (!specials.length) return null

  return (
    <section className="relative w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-chocolate mb-8 text-center">
          Seasonal Specials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {specials.map((item, i) => (
            <FadeInWhenVisible key={item._id} delay={i * 0.15}>
              <div className="bg-milk rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative w-full h-48 overflow-hidden">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).width(500).height(300).url()}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-chocolate">{item.name}</h3>
                  <p className="text-caramel mt-1">
                    ₦{item.price.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                  </p>
                  <Link
                    href={`/order?product=${encodeURIComponent(item.name)}&price=${item.price}`}
                    className="inline-block mt-3 px-4 py-2 bg-caramel text-chocolate rounded-lg hover:bg-chocolate transition text-sm shadow-md"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}