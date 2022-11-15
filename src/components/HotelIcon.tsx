import React from "react";

type Props = {
  alt: string;
  src: string;
};

const HotelIcon = ({ src, alt }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        height: 30,
        width: 30,
      }}
    />
  );
};

export default HotelIcon;
