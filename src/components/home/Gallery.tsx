import React,{ useRef } from 'react'
import { motion,useInView } from 'framer-motion'
import { images } from "@/assets/gallery/index"

const Gallery: React.FC = () => {
    const ref = useRef(null)
    const isInView = useInView(ref,{ once: true,amount: 0.2 })

    return (
        <motion.div
            className='wrapper'
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="">
                <motion.div
                    className=""
                    initial={{ y: 20,opacity: 0 }}
                    animate={isInView ? { y: 0,opacity: 1 } : { y: 20,opacity: 0 }}
                    transition={{ duration: 0.5,delay: 0.2 }}
                >
                    <h2 className="text-3xl font-bold mb-2">Elevate Your Workout</h2>
                    <p className="text-xl text-gray-600 mb-8">See Our Equipment Powering Real Transformations</p>
                </motion.div>
                <div className="columns-1 gap-2 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-2">
                    {
                        images.map((image,index) => (
                            <motion.img
                                src={image}
                                key={index}
                                className='hover:scale-105 scale-100 transition-all duration-200'
                                initial={{ opacity: 0,y: 50 }}
                                animate={isInView ? { opacity: 1,y: 0 } : { opacity: 0,y: 50 }}
                                transition={{ duration: 0.5,delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            />
                        ))
                    }
                </div>
            </div>
        </motion.div>
    )
}

export default Gallery