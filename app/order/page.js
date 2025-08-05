import PageHero from "@/components/common/PageHero"
import { Suspense } from "react"
import OrderFormWrapper from "@/components/Order/OrderFormWrapper"

export default function OrderPage() {
  return (
    <>
      <PageHero
        title="Place Your Order"
        subtitle="Freshly baked happiness is just a few clicks away."
        image="/order/order-hero.jpg"
      />

      <Suspense fallback={<div className="text-center py-10">Loading Order Form...</div>}>
        <OrderFormWrapper />
      </Suspense>
    </>
  )
}