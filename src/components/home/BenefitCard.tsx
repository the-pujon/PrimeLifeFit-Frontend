import { motion,useTransform } from 'framer-motion'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BenefitCard({ benefit,index,scrollYProgress }: { benefit: any,index: number,scrollYProgress: any }) {
    const opacity = useTransform(
        scrollYProgress,
        [0.1 + index * 0.05,0.2 + index * 0.05,0.8 + index * 0.05,0.9 + index * 0.05],
        [0,1,1,0]
    )
    const y = useTransform(
        scrollYProgress,
        [0.1 + index * 0.05,0.2 + index * 0.05,0.8 + index * 0.05,0.9 + index * 0.05],
        [50,0,0,50]
    )

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ opacity,y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <motion.img
                        src={benefit.image}
                        alt={benefit.title}
                        width={300}
                        height={200}
                        className="h-48 w-full object-cover md:h-full md:w-48"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="p-8">
                    <motion.div
                        className={`inline-block p-3 rounded-full ${benefit.color} mb-4`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                    >
                        <benefit.icon className="w-6 h-6" />
                    </motion.div>
                    <motion.h3
                        className="text-xl font-semibold mb-2"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1,transition: { delay: 0.3,duration: 0.5 } }
                        }}
                    >
                        {benefit.title}
                    </motion.h3>
                    <motion.p
                        className="text-gray-600"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1,transition: { delay: 0.4,duration: 0.5 } }
                        }}
                    >
                        {benefit.description}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    )
}