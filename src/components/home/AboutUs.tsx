
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card,CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight,Dumbbell,Users,Award,Truck } from "lucide-react"

const AboutUs = () => {
    const features = [
        { icon: Dumbbell,text: "Premium Quality Equipment" },
        { icon: Users,text: "Expert Fitness Consultation" },
        { icon: Award,text: "Industry-Leading Warranties" },
        { icon: Truck,text: "Free Shipping on All Orders" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full wrapper my-16 overflow-hidden bg-background border-none">
                <div className="flex flex-col lg:flex-row">
                    <motion.div
                        className="lg:w-1/2 relative"
                        initial={{ x: -50,opacity: 0 }}
                        animate={{ x: 0,opacity: 1 }}
                        transition={{ duration: 0.5,delay: 0.2 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80"
                            alt="Fitness Equipment"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <h2 className="text-4xl font-bold text-white text-center px-4">Elevate Your Fitness Journey</h2>
                        </div>
                    </motion.div>
                    <CardContent className="lg:w-1/2 p-8 flex flex-col justify-center space-y-6 about-us-content">
                        <motion.h2
                            className="text-3xl font-bold text-primary"
                            initial={{ y: -20,opacity: 0 }}
                            animate={{ y: 0,opacity: 1 }}
                            transition={{ duration: 0.5,delay: 0.4 }}
                        >
                            About PrimaLiftFit
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-700 dark:text-gray-300"
                            initial={{ y: -20,opacity: 0 }}
                            animate={{ y: 0,opacity: 1 }}
                            transition={{ duration: 0.5,delay: 0.6 }}
                        >
                            At PrimaLiftFit, we're passionate about empowering your fitness journey with top-tier equipment.
                            Our curated selection of premium fitness gear is designed to transform your workouts and help you
                            achieve your health goals, whether you're a beginner or a seasoned athlete.
                        </motion.p>
                        <motion.ul
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5,delay: 0.8 }}
                        >
                            {features.map((feature,index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                                    initial={{ scale: 0.9,opacity: 0 }}
                                    animate={{ scale: 1,opacity: 1 }}
                                    transition={{ duration: 0.3,delay: 0.8 + index * 0.1 }}
                                >
                                    <feature.icon className="h-6 w-6 text-primary" />
                                    <span className="text-gray-800 dark:text-gray-200">{feature.text}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                        <motion.div
                            initial={{ y: 20,opacity: 0 }}
                            animate={{ y: 0,opacity: 1 }}
                            transition={{ duration: 0.5,delay: 1.2 }}
                        >
                            <Button asChild className="w-fit group transition-colors duration-300">
                                <Link to="/about-us" className="flex items-center">
                                    Discover Our Story
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>
                    </CardContent>
                </div>
            </Card>
        </motion.div>
    )
}

export default AboutUs