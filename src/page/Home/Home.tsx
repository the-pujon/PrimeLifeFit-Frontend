import Features from '@/components/home/Features'
import Hero from '@/components/home/Hero'
import ShopByCategory from '@/components/home/ShopByCategory'
import React from 'react'

const Home: React.FC = () => {
    return (
        <div>
            <Hero />
            <Features />
            <ShopByCategory />
        </div>
    )
}

export default Home