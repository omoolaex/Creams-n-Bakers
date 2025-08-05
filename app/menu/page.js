import PageHero from "@/components/common/PageHero"
import FeaturedMenu from "@/components/Menu/FeaturedMenu"
import MenuCategories from "@/components/Menu/MenuCategories"
import MenuItemsByCategory from "@/components/Menu/MenuItemsByCategory"

export default function MenuPage() {
  return (
    <>
      <PageHero
        title="Our Menu"
        subtitle="Delicious treats, freshly baked for you"
        image="/decorations/9295429.png"
      />
      <FeaturedMenu />
      <MenuCategories />
      <MenuItemsByCategory />
      {/* Menu content will follow */}
    </>
  )
}
