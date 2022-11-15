import React from "react";
import { Hotel } from "../features/hotelsSlice";
import { importImages } from "../globals";
import { leftPad } from "../utils/leftPad";
import HotelInformation from "./HotelInformation";

type Props = {
  hotel: Hotel;
};

const HotelDetailsBiography = ({ hotel }: Props) => {
  const inches = (2 * 3.93701).toFixed(0);
  const feet = Math.floor(Number(inches) / 12);
  const genderPercentage =  -1;

  return (
    <>
      <div>
        <h2 className="font-semibold text-lg">Pokémon Data</h2>
        <p className="mt-4 text-darkerGray">
            "alo"
        </p>
        <ul className="mt-5">
          <HotelInformation
            title="Species"
            content= "MALE"
          />
          <HotelInformation
            title="Height"
            content={`${feet}'${leftPad(Number(inches) % 12, 2)}" (${
              2 / 10
            }m)`}
          />
          <HotelInformation
            title="Weight"
            content={`${(2 / 10).toFixed(1)} kg`}
          />
          <HotelInformation
            title="Gender"
            content={
              <span className="flex items-end justify-start">
                {genderPercentage === -1 ? (
                  <span>Genderless</span>
                ) : (
                  <>
                    <div className="flex items-center mr-3">
                      <img
                        className="w-4 h-4"
                        src={importImages("male")}
                        alt="male"
                      />
                      <span className="ml-2">{100 - genderPercentage}%</span>
                    </div>
                    <div className="flex items-center">
                      <img
                        className="w-4 h-4"
                        src={importImages("female")}
                        alt="female"
                      />
                      <span className="ml-2">{genderPercentage}%</span>
                    </div>
                  </>
                )}
              </span>
            }
          />
        </ul>
      </div>
      <div className="my-8">
        <h2 className="font-semibold text-lg">Training</h2>
        <ul className="mt-5">
          <HotelInformation
            title="Base Exp"
            content={0}
          />
          <HotelInformation
            title="Base Happiness"
            content={0}
          />
          <HotelInformation
            title="Catch Rate"
            content={`${1}%`}
          />
          <HotelInformation
            title="Growth Rate"
            content={
              <span className="capitalize">{"NAME"}</span>
            }
          />
        </ul>
      </div>
    </>
  );
};

export default HotelDetailsBiography;
