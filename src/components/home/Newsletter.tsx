import React,{ useState } from 'react';
import { Dumbbell,Send,CheckCircle,ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion,AnimatePresence } from "framer-motion"

const Newsletter: React.FC = () => {
    const [email,setEmail] = useState('');
    const [isSubmitted,setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Subscribed with email:',email);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setEmail('');
        },3000);
    };

    return (
        <>
            <div className="wrapper bg-white rounded-none shadow-2xl overflow-hidden mt-10">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
                            Elevate Your Fitness Journey
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                            Join our community for exclusive deals, expert tips, and cutting-edge fitness equipment insights!
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-12 pr-4 py-4 sm:py-6 rounded-none text-base sm:text-lg border-2 border-primary focus:ring-2 focus:ring-primary"
                                    required
                                />
                                <Send className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={isSubmitted ? 'submitted' : 'not-submitted'}
                                    initial={{ opacity: 0,y: 20 }}
                                    animate={{ opacity: 1,y: 0 }}
                                    exit={{ opacity: 0,y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Button
                                        type="submit"
                                        className="w-full text-base sm:text-lg py-4 sm:py-6 bg-primary text-white hover:bg-primary-dark transition-all duration-300 flex items-center justify-center"
                                        disabled={isSubmitted}
                                    >
                                        {isSubmitted ? (
                                            <span className="flex items-center">
                                                <CheckCircle className="mr-2" /> Subscribed!
                                            </span>
                                        ) : (
                                            <span className="flex items-center">
                                                Get Fit, Stay Informed <ArrowRight className="ml-2" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.div>
                            </AnimatePresence>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/2 bg-primary p-6 sm:p-8 md:p-12 lg:p-20 flex items-center justify-center">
                        <motion.div
                            animate={{
                                rotate: [0,0,270,270,0],
                                scale: [1,1.2,1.2,1,1],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeInOut",
                                times: [0,0.2,0.5,0.8,1],
                                repeat: Infinity,
                                repeatDelay: 1
                            }}
                        >
                            <Dumbbell className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 text-white" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Newsletter;