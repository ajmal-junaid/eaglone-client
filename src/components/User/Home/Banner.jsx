import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { baseUrl } from "../../../utils/constants";

function Banner() {
  const [banners, setBanners] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "slick-dots",
  };
  useEffect(() => {
    getBanner();
  }, []);
  const getBanner = () => {
    axios({
      method: "get",
      url: `${baseUrl}banners`,
      headers: {
        "Content-Type": "application/json",
        apikey:
          "bearer $2b$14$Spul3qDosNUGfGA.AnYWl.W1DH4W4AnQsFrNVEKJi6.CsbgncfCUi",
      },
    })
      .then((res) => {
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.data.message);
      });
  };
  return (
    <Slider {...settings}>
      {banners ? (
        banners.map((banner, index) => (
          <div key={index}>
            <img
              className="min-w-full object-contain max-h-56 w-screen border shadow-zinc-800 "
              src={banner.image}
              alt="banner"
            />
          </div>
        ))
      ) : (
        <img
          className="min-w-full object-full max-h-56 w-full"
          src=""
          alt="banner"
        />
      )}
      {/* <div>
        <img
          className="min-w-full object-full max-h-56 w-full"
          src="https://eaglone.s3.amazonaws.com/image-1680148728581-752871466.jpeg"
          alt="banner"
        />
      </div>
      <div>
        <img
          className="min-w-full object-cover max-h-56"
          src="https://eaglone.s3.amazonaws.com/image-1680148636280-191776482.png"
          alt="banner"
        />
      </div> */}
    </Slider>
  );
}

export default Banner;
