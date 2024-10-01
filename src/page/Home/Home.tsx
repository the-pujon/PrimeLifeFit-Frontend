import FeaturedProduct from '@/components/home/FeaturedProduct'
import Features from '@/components/home/Features'
import Hero from '@/components/home/Hero'
import ProductBenefits from '@/components/home/ProductBenifits'
import ShopByCategory from '@/components/home/ShopByCategory'
import React from 'react'

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Features />
            <ShopByCategory />
            <FeaturedProduct />
            <ProductBenefits />
        </div>
    )
}

export default Home