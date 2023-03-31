import React from 'react'
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import { RiArrowRightSLine } from 'react-icons/ri';

function PremiumFeatures() {


    return (
        <div className='pt-16 pb-4'>
            <div className="bg-gradient-to-b from-indigo-900 to-indigo-800 min-h-screen flex justify-center items-center relative">
                {/* Background animations */}
                <motion.div
                    className="absolute w-16 h-16 rounded-full bg-white opacity-25"
                    style={{ top: '70%', right: '-10%' }}
                    animate={{
                        x: [-100, 0],
                        y: [100, -100],
                        rotate: [180, 360],
                        transition: { duration: 20, repeat: Infinity, ease: 'linear' },
                    }}
                ></motion.div>
                <motion.div
                    className="absolute w-32 h-32 rounded-full bg-white opacity-25"
                    style={{ top: '25%', right: '10%' }}
                    animate={{
                        x: [0, -50, 0, 50, 0],
                        y: [0, 50, 0, -50, 0],
                        rotate: [0, 180, 360],
                        transition: { duration: 30, repeat: Infinity, ease: 'linear' },
                    }}
                ></motion.div>
                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                    <h1 className="text-4xl font-bold mb-8">Upgrade to Premium</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div
                            className="flex items-center"
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                        >
                            <FaCheckCircle className="text-green-500 mr-4 w-6 h-6" />
                            <p className="text-xl font-medium">Unlimited access to all features</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center"
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                        >
                            <FaCheckCircle className="text-green-500 mr-4 w-6 h-6" />
                            <p className="text-xl font-medium">Exclusive premium content</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center"
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                        >
                            <FaCheckCircle className="text-green-500 mr-4 w-6 h-6" />
                            <p className="text-xl font-medium">Priority customer support</p>
                        </motion.div>
                    </div>
                    <motion.button
                        className="bg-white text-indigo-900 rounded-full px-8 py-2 mt-12 font-medium flex items-center"
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                    >
                        <span>Upgrade now</span>
                        <RiArrowRightSLine className="ml-2 w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </div >
    )
}

export default PremiumFeatures