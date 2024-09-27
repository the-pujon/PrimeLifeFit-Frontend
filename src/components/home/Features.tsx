import React from 'react'
import { Truck,Store,ShieldCheck,CreditCard } from 'lucide-react'

const FeatureItem = ({ Icon,text }: { Icon: React.ElementType; text: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-primary rounded-full">
            <Icon className="w-8 h-8 text-primary-foreground" />
        </div>
        <p className="font-semibold uppercase tracking-wide text-sm">{text}</p>
    </div>
)

export default function Features() {
    return (
        <section className="py-8 bg-background border-y border-border">
            <div className="wrapper px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <FeatureItem Icon={Truck} text="Fast Shipping" />
                    <FeatureItem Icon={Store} text="In-Store Pickup" />
                    <FeatureItem Icon={ShieldCheck} text="Quality Guarantee" />
                    <FeatureItem Icon={CreditCard} text="Flexible Payment" />
                </div>
            </div>
        </section>
    )
}