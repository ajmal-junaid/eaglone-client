import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

function CategorySection() {
    const listData = [
        {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        }, {
            name: "test",
            image: "https://placehold.co/400x400",
            description: "hello guyss welcome back to the channetl all invcintijdlkjkljd"
        },
    ]
  return (
    <>
            <AnimatePresence>

                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="overflow-y-auto flex flex-col h-screen pt-16 pb-10 w-1/4 px-4"
                >
                    {listData.map((data) => (
                        <li key={data.name} className="flex flex-col m-2">
                            <img src={data.image} />
                            <span>{data.name}</span>
                            <span>{data.description}</span>
                        </li>
                    ))}
                </motion.ul>

            </AnimatePresence>
        </>
  )
}

export default CategorySection