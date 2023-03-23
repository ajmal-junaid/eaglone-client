import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function CourseSection() {
  //   const list = {
  //     name: "Ajju daaaaaaaaaaaaa",
  //     image: "https://placehold.co/100x100",
  //     description:
  //       "hello guyss welcome back to the channetl all invcintijdlkjkljd",
  //   };
  const listData = [
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
    {
      name: "test",
      image: "https://placehold.co/400x400",
      description:
        "hello guyss welcome back to the channetl all invcintijdlkjkljd",
    },
  ];
  return (
    <>
      <AnimatePresence>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-x-auto px-3 flex flex-col h-screen  pt-16 pb-10  w-3/4"
        >
          {listData.map((data) => (
            <li key={data.name} className="flex flex-row m-2">
              <img src={data.image} />
              <span>{data.name}</span>
              <span>{data.description}</span>
            </li>
          ))}
          {listData.map((data) => (
            <li key={data.name} className="flex flex-row m-2">
              <img src={data.image} />
              <span>{data.name}</span>
              <span>{data.description}</span>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </>
  );
}

export default CourseSection;
