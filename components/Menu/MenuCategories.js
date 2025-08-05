import { client } from "@/sanity/client";
import MenuCategoriesClient from "./MenuCategoriesClient";

export default async function MenuCategories() {
  // Fetch featured menu categories
  const query = `*[_type == "menuCategory" && featured == true && defined(slug.current)] 
    | order(order asc) {
      name,
      "slug": slug.current
    }`;

  const data = await client.fetch(query);

  // Convert slug to menu anchor link
  const categories = data.map((cat) => ({
    name: cat.name,
    link: `/menu#${cat.slug}`,
  }));

  return <MenuCategoriesClient categories={categories} />;
}