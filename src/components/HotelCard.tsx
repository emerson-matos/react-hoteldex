import React from "react";
import { Hotel } from "../features/hotelsSlice";
import { HotelTypeColors, HotelTypePlaceholders } from "../globals";
import { leftPad } from "../utils/leftPad";
import Trail from "./Trail";
import ProgressiveImage from "react-progressive-image-loading";
import { useHistory } from "react-router-dom";

const MaskStyling = {
  width: 130,
  height: 130,
  zIndex: -10,
  bottom: 8,
  left: 16,
};
const ImageContainerStyling = {
  width: 175,
  height: 175,
};

type Props = Hotel;

const HotelCard = ({ placeId, name, icon, adrAddress }: Props) => {
  const history = useHistory();

  const backgroundColors = "grey";
  const imagePlaceholder = icon;
  const types = [{type: 5}, {type: 2}, {type: 3}];

  return (
    <Trail open={true}>
      <div
        className="w-full rounded-lg overflow-hidden shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-200 ease-in-out transform hover:-translate-y-2"
        style={{
          backgroundColor: backgroundColors,
        }}
        onClick={() => history.push(`/hotels/${placeId}`)}
      >
        <div
          className="py-32 mx-auto w-full flex items-center justify-center relative"
          style={{
            backgroundColor: backgroundColors,
          }}
        >
          <p className="text-6xl font-semibold text-black text-opacity-25 absolute tracking-xl top-1/8 pointer-events-none">
            {placeId}
          </p>

          <div
            className="inset-x-auto bottom-0 absolute z-20"
            style={ImageContainerStyling}
          >
            <div
              className="rounded-full absolute z-0 inset-x-auto mx-auto"
              style={{
                ...MaskStyling,
                backgroundColor: backgroundColors,
              }}
            />
            <ProgressiveImage
              preview={imagePlaceholder[0]}
              src={icon}
              render={(src, style) => (
                <img src={src} style={style} alt={name} />
              )}
            />
          </div>
        </div>

        <div className="bg-white w-full pt-5 pb-8 text-center">
          <h1 className="capitalize font-semibold text-3xl mb-2">{name}</h1>
          {
            <div className="flex flex-wrap mx-auto justify-center">
              {types.map(({ type }, index) => {
                return (
                  <p
                    key={`${placeId}-${type}`}
                    className={
                      "font-bold uppercase text-sm" +
                      (index !== types.length - 1 ? " mr-6" : "")
                    }
                    style={{ color: backgroundColors }}
                  >
                    {type}
                  </p>
                );
              })}
            </div>
          }
        </div>
      </div>
    </Trail>
  );
};

export default HotelCard;
