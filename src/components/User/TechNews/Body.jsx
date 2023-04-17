import axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "./Article";

const Body = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=9dbb9aa751a749228ac3d62468cef814"
      )
      .then((res) => {
        console.log(res.data);
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-4xl sm:text-5xl font-bold border-b-2 pb-2 text-center text-gray-800">
        Latest Articles
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Body;
