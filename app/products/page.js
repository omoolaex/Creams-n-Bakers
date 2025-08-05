import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image"

export const revalidate = 0; // always fetch fresh data

export default async function ProductsPage() {
  const products = await client.fetch(`*[_type == "product"]`);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Creams 'n' Bakers Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg shadow hover:shadow-lg transition">
            {p.image && (
              <img
                src={urlFor(p.image).width(400).height(300).url()}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-600">₦{p.price}</p>
              <p className="text-sm text-gray-500 mt-2">{p.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}