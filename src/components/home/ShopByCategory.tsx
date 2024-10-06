import { useState,useEffect,useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft,ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { categories } from '@/utils/Categories'



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
        <div className="relative wrapper px-4 py-12">
            <h2 className="text-3xl font-bold mb-2">Shop by Equipment Category</h2>
            <p className="text-lg text-gray-600 mb-8 font-serif">Explore our wide range of fitness gear to find exactly what you need</p>
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-2">
                    {categories.map((item,index) => (
                        <div
                            key={index}
                            className="flex-[0_0_20%] min-w-0 border cursor-pointer"
                            onClick={() => handleCategoryClick(item.title)}
                        >
                            <div className="bg-none rounded-none overflow-hidden">
                                <div className="overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        width={400}
                                        height={300}
                                        className="w-full h-64 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className="absolute left-0 top-[55%] transform -translate-y-1/2 bg-white bg-opacity-100 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 ease-in-out"
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
            >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
                className="absolute right-0 top-[55%] transform -translate-y-1/2 bg-white bg-opacity-100 hover:bg-opacity-75 rounded-full p-2 transition-all duration-200 ease-in-out"
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
            >
                <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
        </div>
    )
}