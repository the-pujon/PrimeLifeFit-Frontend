import React from 'react'
import { images } from "@/assets/gallery/index"

const Gallery: React.FC = () => {
    return (
        <div className='wrapper'>
            <div className="">
                <div className="">
                    <h2 className="text-3xl font-bold mb-2">Elevate Your Workout</h2>
                    <p className="text-xl text-gray-600 mb-8">See Our Equipment Powering Real Transformations</p>
                </div>
                <div className="columns-1 gap-2 sm:columns-2 sm:gap-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-2">
                    {
                        images.map((image,index) => (
                            <img src={image} key={index} className='hover:scale-105 scale-100 transition-all duration-200' />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Gallery