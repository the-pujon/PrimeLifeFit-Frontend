import { motion,useScroll,useTransform } from 'framer-motion'
import { Shield,Truck,Headphones,Zap } from 'lucide-react'
import image from "@/assets/hero1.jpg"
import { useRef } from 'react'
import BenefitCard from './BenefitCard'

const benefits = [
    {
        icon: Shield,
        title: 'Premium Quality',
        description: 'Our equipment is built to last, ensuring you get the most out of your workouts.',
        image: image,
        color: 'bg-blue-100 text-blue-600',
    },
    {
        icon: Truck,
        title: 'Free Shipping',
        description: 'Enjoy free shipping on all orders over $500, right to your doorstep.',
        image: image,
        color: 'bg-green-100 text-green-600',
    },
    {
        icon: Headphones,
        title: 'Expert Support',
        description: 'Our team of fitness experts is always ready to assist you in choosing the right equipment.',
        image: image,
        color: 'bg-purple-100 text-purple-600',
    },
    {
        icon: Zap,
        title: 'Fast Setup',
        description: 'Get started quickly with our easy-to-assemble equipment and instructional guides.',
        image: image,
        color: 'bg-yellow-100 text-yellow-600',
    },
]



export default function ProductBenefits() {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end","end start"]
    })

    const opacity = useTransform(scrollYProgress,[0,0.2,0.8,1],[0,1,1,0])
    const scale = useTransform(scrollYProgress,[0,0.2,0.8,1],[0.8,1,1,0.8])

    const titleOpacity = useTransform(scrollYProgress,[0,0.1,0.9,1],[0,1,1,0])
    const titleY = useTransform(scrollYProgress,[0,0.1,0.9,1],[20,0,0,-20])

    return (
        <motion.section
            ref={sectionRef}
            className="py-16 bg-gradient-to-b from-gray-50 to-white wrapper"
            style={{ opacity,scale }}
        >
            <div className="wrapper px-4"></div>
            <motion.h2
                className="text-3xl font-bold mb-12"
                style={{
                    opacity: titleOpacity,
                    y: titleY
                }}
            >
                Why Choose Our Products
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit,index) => (
                    <BenefitCard
                        key={index}
                        benefit={benefit}
                        index={index}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>
        </motion.section >
    )
}