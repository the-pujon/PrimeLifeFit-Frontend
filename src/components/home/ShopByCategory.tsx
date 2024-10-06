import { useState,useEffect,useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft,ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { categories } from '@/utils/Categories'
import { motion } from 'framer-motion' // Add this import

export default function ShopByCategory() {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    const [emblaRef,emblaApi] = useEmblaCarousel({ loop: false,align: 'start' })
    const [prevBtnEnabled,setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled,setNextBtnEnabled] = useState(true)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(),[emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(),[emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    },[emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select',onSelect)
    },[emblaApi,onSelect])

    return (
        <motion.div
            initial={{ opacity: 0,y: 20 }}
            animate={{ opacity: 1,y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative wrapper px-4 py-8 sm:py-12"
        >
            <motion.h2
                initial={{ opacity: 0,x: -20 }}
                animate={{ opacity: 1,x: 0 }}
                transition={{ delay: 0.2,duration: 0.5 }}
                className="text-2xl sm:text-3xl font-bold mb-2"
            >
                Shop by Equipment Category
            </motion.h2>
            <motion.p
                initial={{ opacity: 0,x: -20 }}
                animate={{ opacity: 1,x: 0 }}
                transition={{ delay: 0.4,duration: 0.5 }}
                className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 font-serif"
            >
                Explore our wide range of fitness gear to find exactly what you need
            </motion.p>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                    {categories.map((item,index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0,scale: 0.9 }}
                            animate={{ opacity: 1,scale: 1 }}
                            transition={{ delay: 0.1 * index,duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_20%] min-w-0 border cursor-pointer"
                            onClick={() => handleCategoryClick(item.title)}
                        >
                            <div className="bg-none rounded-none overflow-hidden">
                                <div className="overflow-hidden">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        src={item.image}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-48 sm:h-56 md:h-64 object-cover"
                                    />
                                </div>
                                <div className="p-3 sm:p-4">
                                    <h3 className="text-base sm:text-lg font-semibold text-primary">{item.title}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-[60%] sm:top-[55%] transform -translate-y-1/2 bg-white bg-opacity-100 hover:bg-opacity-75 rounded-full p-1 sm:p-2 transition-all duration-200 ease-in-out"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
            >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-[60%] sm:top-[55%] transform -translate-y-1/2 bg-white bg-opacity-100 hover:bg-opacity-75 rounded-full p-1 sm:p-2 transition-all duration-200 ease-in-out"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
            >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
            </motion.button>
        </motion.div>
    )
}