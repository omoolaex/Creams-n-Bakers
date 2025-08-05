import MenuHighlightsClient from "./MenuHighlightsClient"
import { client } from "@/sanity/client"

export default async function MenuHighlights() {
  const query = `*[_type == "product" && featured == true] 
    | order(_createdAt desc)[0..3]{
      _id, name, price, description, "imageUrl": image
    }`
  const featuredItems = await client.fetch(query)

  return <MenuHighlightsClient products={featuredItems} />
}