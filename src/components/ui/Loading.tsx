import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-lg z-50 flex flex-col items-center justify-center">
            <motion.div
                className="relative w-10 h-10 md:w-16 md:h-16"
                animate={{
                    rotate: [0,0,180,180,0],
                    scale: [1,1.2,1.2,1,1],
                }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0,0.2,0.5,0.8,1],
                    repeat: Infinity,
                    repeatDelay: 1
                }}
            >
                <Dumbbell className="w-full h-full text-white" />
            </motion.div>


            {/* Loading text */}
            <motion.div
                className="mt-4 md:mt-8 text-center"
                initial={{ opacity: 0,y: 20 }}
                animate={{ opacity: 1,y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <motion.h2
                    className="text-base md:text-xl font-bold text-white mb-2"
                    animate={{ opacity: [1,0.6,1] }}
                    transition={{ duration: 1.5,repeat: Infinity,ease: "easeInOut" }}
                >
                    Loading PrimeLifeFit
                </motion.h2>
                <motion.div
                    className="w-48 h-1 bg-white/30 rounded-full mx-auto overflow-hidden"
                >
                    <motion.div
                        className="h-full bg-white rounded-full"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 1.5,repeat: Infinity,ease: "easeInOut" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Loading;
