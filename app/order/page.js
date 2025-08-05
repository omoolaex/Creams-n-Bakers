import PageHero from "@/components/common/PageHero"
import OrderForm from "@/components/Order/OrderForm"

export default function OrderPage() {
  return (
    <>
      <PageHero
        title="Place Your Order"
        subtitle="Freshly baked happiness is just a few clicks away."
        image="/order/order-hero.jpg"
      />
      <OrderForm />
    </>
  )
}
