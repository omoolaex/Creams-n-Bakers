import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { ShoppingCart } from "lucide-react";

export default async function FeaturedMenu() {
  const query =
    '*[_type == "product" && featured == true] | order(_createdAt desc)[0..3]{_id,name,price,"imageUrl": image}';
  const featuredItems = await client.fetch(query);

  return (
    <section className="relative w-full bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-chocolate">
            Featured Menu
          </h2>
          <p className="text-cocoa mt-2 max-w-md mx-auto">
            Our customer favorites, baked fresh and crafted with love.
          </p>
        </div>

        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-4">
            {featuredItems.map((item) => (
              <div
                key={item._id}
                className="bg-milk rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group"
              >
                <div className="relative w-full h-40 bg-milk flex items-center justify-center">
                  {item.imageUrl ? (
                    <Image
                      src={urlFor(item.imageUrl).width(400).height(300).url()}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-500"
                    />
                  ) : (
                    <span className="text-cocoa/60 text-sm">No image</span>
                  )}
                </div>

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-chocolate mb-1">
                    {item.name}
                  </h3>
                  <p className="text-caramel mb-3">
                    ₦{Number(item.price).toLocaleString()}
                  </p>
                  <Link
                    href={`/order?product=${encodeURIComponent(item.name)}&price=${encodeURIComponent(item.price)}`}
                    className="inline-block mt-2 px-4 py-2 bg-caramel text-chocolate rounded-lg hover:bg-chocolate transition text-sm shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-cocoa py-6">
            No featured items at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
