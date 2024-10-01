
import { motion } from 'framer-motion'
import { Shield,Truck,Headphones,Zap } from 'lucide-react'
import image from "@/assets/hero1.jpg"

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
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="wrapper px-4">
                <h2 className="text-3xl font-bold mb-12">Why Choose Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefits.map((benefit,index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                            initial={{ opacity: 0,y: 50 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        width={300}
                                        height={200}
                                        className="h-48 w-full object-cover md:h-full md:w-48"
                                    />
                                </div>
                                <div className="p-8">
                                    <div className={`inline-block p-3 rounded-full ${benefit.color} mb-4`}>
                                        <benefit.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}