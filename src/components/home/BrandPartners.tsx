import React from 'react';
import { Card } from "@/components/ui/card";

const brandLogos = [
    { name: 'NordicTrack',src: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/NordicTrack_logo.svg',link: 'https://www.nordictrack.com/' },
    { name: 'Bowflex',src: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Bowflex_logo.svg',link: 'https://www.bowflex.com/' },
    { name: 'Peloton',src: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Peloton_Logo_2021.svg',link: 'https://www.onepeloton.com/' },
    { name: 'Precor',src: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Precor_logo.svg',link: 'https://www.precor.com/' },
    { name: 'Life Fitness',src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Life_Fitness_logo.svg',link: 'https://www.lifefitness.com/' },
    { name: 'Technogym',src: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Technogym_logo.svg',link: 'https://www.technogym.com/' },
];

const BrandPartners: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Our Brand Partners</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {brandLogos.map((brand) => (
                        <Card key={brand.name} className="p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                            <a href={brand.link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
                                <img
                                    src={brand.src}
                                    alt={`${brand.name} logo`}
                                    className="max-w-full max-h-12 object-contain"
                                />
                            </a>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandPartners;