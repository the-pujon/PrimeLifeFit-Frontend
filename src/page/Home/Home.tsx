import AboutUs from '@/components/home/AboutUs'
//import BrandPartners from '@/components/home/BrandPartners'
import FeaturedProduct from '@/components/home/FeaturedProduct'
import Features from '@/components/home/Features'
import Gallery from '@/components/home/Gallery'
import Hero from '@/components/home/Hero'
import Newsletter from '@/components/home/Newsletter'
import ProductBenefits from '@/components/home/ProductBenifits'
import ShopByCategory from '@/components/home/ShopByCategory'
import React from 'react'

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Features />
            <AboutUs />
            <ShopByCategory />
            <FeaturedProduct />
            <ProductBenefits />
            <Gallery />
            {/*<BrandPartners />*/}
            <Newsletter />
        </div>
    )
}

export default Home