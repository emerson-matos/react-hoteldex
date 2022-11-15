import React from "react";
import ProgressiveImage from "react-progressive-image-loading";
import { Hotel } from "../features/hotelsSlice";
import { HotelTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";

import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const MaskSize = 200;
const ImageSize = 150;

const MaskStyling = {
  width: MaskSize,
  height: MaskSize,
  bottom: 0,
};
const ImageContainerStyling = {
  width: ImageSize,
  height: ImageSize,
  display: "block",
  left: 0,
  right: 0,
  bottom: 25,
  margin: "auto",
};

type Props = {
  hotel: Hotel;
  selectedBackgroundColor: { light: string; medium: string };
};

const HotelEvolution = ({
  hotel,
  selectedBackgroundColor,
}: Props) => {
  const history = useHistory();
  const imagePlaceholder = hotel.icon;
  const minLevel = undefined;

  return (
    <div className="mb-5 lg:mb-0 lg:flex lg:flex-row w-full">
      <div className="text-center mx-auto flex-1">
        <div className="relative mx-auto h-48 w-full">
          <div
            style={{
              ...MaskStyling,
              backgroundColor: selectedBackgroundColor.light,
            }}
            className="rounded-full absolute inset-x-auto mx-auto z-0 inline-block left-0 right-0"
          />
          <div
            onClick={() => history.push(`/hotels/${hotel.placeId}`)}
            className="cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            style={{
              ...ImageContainerStyling,
              position: "absolute",
            }}
          >
            <ProgressiveImage
              preview={imagePlaceholder[0]}
              src={hotel.icon}
              render={(src, style) => (
                <img src={src} style={style} alt={hotel.name} />
              )}
            />
          </div>
        </div>
        <p className="mt-1 text-sm text-black font-semibold">
          #{hotel.placeId}
        </p>
        <h1 className="capitalize font-semibold text-xl">{hotel.name}</h1>
        <p className="text-black text-sm font-semibold text-opacity-75">
          {minLevel && `Level ${minLevel}`}
        </p>
      </div>
      <p className="flex items-center mx-auto mt-2 mb-4 lg:mb-0 lg:mt-0">
        {undefined !== 0 && (
          <>
            <AiOutlineCaretDown
              className="block mx-auto lg:hidden opacity-75"
              size={24}
            />
            <AiOutlineCaretRight
              className="hidden mx-auto lg:block opacity-75"
              size={24}
            />
          </>
        )}
      </p>
    </div>
  );
};

export default HotelEvolution;
