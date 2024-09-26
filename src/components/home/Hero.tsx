import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import Hero1 from '@/assets/hero1.jpg'

const Hero = () => {
    return (
        <div>
            <section className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={Hero1}
                        alt="Background"
                        //layout="fill"
                        //objectFit="cover"
                        className="opacity-30 bg-cover"
                    />
                </div>
                <div className="relative flex items-center justify-center h-[90vh] wrapper px-4 py-24 sm:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold ">
                                Elevate Your <span className=" text-transparent select-none"
                                    style={{
                                        WebkitTextStroke: '0.2px white',
                                    }}
                                    aria-hidden="true">Fitness Journey</span>
                            </h1>
                            <p className="text-base sm:text-xl text-gray-300 max-w-lg">
                                Discover premium fitness equipment to help you achieve your goals and transform your life.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-foreground hover:bg-white hover:text-black transition duration-300">
                                    Shop Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src={Hero1}
                                alt="Fitness Equipment"
                                //width={600}
                                //height={600}
                                className="rounded-lg shadow-2xl"
                            />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero