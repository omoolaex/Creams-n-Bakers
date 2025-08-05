import { client } from "@/sanity/client";
import MenuItemsByCategoryClient from "./MenuItemsByCategoryClient";

export default async function MenuItemsByCategory() {
  const query = `
    *[_type == "menuCategory"] | order(order asc) {
      _id,
      name,
      "id": slug.current,
      "products": *[_type == "product" && references(^._id)]{
        _id,
        name,
        price,
        image
      }
    }
  `;

  const menuData = await client.fetch(query);

  return <MenuItemsByCategoryClient menuData={menuData} />;
}