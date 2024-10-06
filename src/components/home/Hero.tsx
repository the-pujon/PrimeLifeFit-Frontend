import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero1 from '@/assets/hero1.jpg'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <div>
            <section className="relative min-h-screen bg-gradient-to-br from-gray-700 via-primary to-black text-white overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <img
                        src={Hero1}
                        alt="Background"
                        className="w-full h-full object-cover filter blur-sm scale-110"
                    />
                </motion.div>
                <div className="relative flex items-center justify-center min-h-[90vh] wrapper px-4 py-12 sm:py-16 md:py-24">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0,y: 50 }}
                            animate={{ opacity: 1,y: 0 }}
                            transition={{ duration: 0.8,delay: 0.2 }}
                            className="space-y-6 md:space-y-8 text-center md:text-left"
                        >
                            <motion.h1
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ duration: 0.6,delay: 0.4 }}
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold"
                            >
                                Elevate Your <span className="text-transparent select-none"
                                    style={{
                                        WebkitTextStroke: '0.2px white',
                                    }}
                                    aria-hidden="true">Fitness Journey</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ duration: 0.6,delay: 0.6 }}
                                className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-lg mx-auto md:mx-0"
                            >
                                Discover premium fitness equipment to help you achieve your goals and transform your life.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0,y: 20 }}
                                animate={{ opacity: 1,y: 0 }}
                                transition={{ duration: 0.6,delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                            >
                                <Link to="/products" className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-foreground hover:bg-white hover:text-black transition duration-300">
                                    Shop Now
                                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                                </Link>
                                <Link to="/about" className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Learn More
                                </Link>
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0,x: 50 }}
                            animate={{ opacity: 1,x: 0 }}
                            transition={{ duration: 0.8,delay: 1 }}
                            className="relative mt-8 md:mt-0 md:block"
                        >
                            <motion.div
                                initial={{ rotate: 3 }}
                                animate={{ rotate: 0 }}
                                transition={{ duration: 0.6,delay: 1.2 }}
                                className="absolute inset-0 bg-gradient-to-tr from-black via-primary to-gray-900 rounded-3xl"
                            ></motion.div>
                            <motion.img
                                initial={{ rotate: -3 }}
                                animate={{ rotate: 0 }}
                                transition={{ duration: 0.6,delay: 1.2 }}
                                whileHover={{ scale: 1.05 }}
                                src={Hero1}
                                alt="Fitness Equipment"
                                className="rounded-3xl shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero