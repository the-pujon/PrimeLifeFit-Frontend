import React from 'react'
import { Truck,Store,ShieldCheck,CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'

const FeatureItem = ({ Icon,text }: { Icon: React.ElementType; text: string }) => (
    <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0,y: 20 }}
        whileInView={{ opacity: 1,y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="mb-4 p-3 bg-primary rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Icon className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <p className="font-semibold uppercase tracking-wide text-sm">{text}</p>
    </motion.div>
)

export default function Features() {
    return (
        <section className="py-8 bg-background border-y border-border">
            <div className="wrapper px-4">
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <FeatureItem Icon={Truck} text="Fast Shipping" />
                    <FeatureItem Icon={Store} text="In-Store Pickup" />
                    <FeatureItem Icon={ShieldCheck} text="Quality Guarantee" />
                    <FeatureItem Icon={CreditCard} text="Flexible Payment" />
                </motion.div>
            </div>
        </section>
    )
}