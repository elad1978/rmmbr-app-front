import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme styles
import "./index.css"; // Import your custom styles
//import { sliderUpdates } from "../../assets/DB";

const VisualUpdatesSlider = ({ sliderUpdates }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000, // Slide transition speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000,
    pauseOnHover: true,
    pauseOnDotsHover: true,
    arrows: true,
  };

  return (
    <div className="auto-slide-slick-container">
      <Slider {...settings}>
        {sliderUpdates.map((slide) => (
          <div className="slide" key={slide.id}>
            <img src={slide.imagePath} alt={"Slide" + slide.id} />
            <div className="slide-text-overlay">{slide.text}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VisualUpdatesSlider;
