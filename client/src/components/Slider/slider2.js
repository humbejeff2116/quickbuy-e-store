








import React from "react";
import Flickity from "react-flickity-component";
import "./flickity.css";

export default function Carousel() {
  return (
    <Flickity>
      <img src="https://placeimg.com/640/480/animals" alt="slider" />
      <img src="https://placeimg.com/640/480/nature"  alt="slider" />
      <img src="https://placeimg.com/640/480/architecture"  alt="slider" />
    </Flickity>
  );
}