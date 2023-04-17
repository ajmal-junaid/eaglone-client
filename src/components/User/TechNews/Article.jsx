import React from "react";

const Article = ({ article }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition duration-300 article-container" style={{height: "400px", overflowY: "auto"}}>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <h2 className="text-xl font-bold mb-4">{article.title}</h2>
      </a>
      {article.author && (
        <p className="text-gray-700 text-sm mb-2">By {article.author}</p>
      )}
      <p className="text-gray-700 text-sm mb-4">{article.publishedAt}</p>
      <p className="text-gray-700 mb-4">{article.description}</p>
      <div className="article-image-container" style={{position: "relative", height: "150px"}}>
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover rounded-lg"
          style={{position: "absolute", bottom: "0"}}
        />
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-500 font-bold mt-4 hover:text-blue-700 transition duration-300"
      >
        Read More
      </a>
    </div>
  );
};

export default Article;
