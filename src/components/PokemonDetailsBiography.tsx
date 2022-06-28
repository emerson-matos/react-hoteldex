import React from "react";
import { Hotel } from "../features/pokemonSlice";
import { importImages } from "../globals";
import { leftPad } from "../utils/leftPad";
import PokemonInformation from "./PokemonInformation";

type Props = {
  hotel: Hotel;
};

const PokemonDetailsBiography = ({ hotel }: Props) => {
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
          <PokemonInformation
            title="Species"
            content= "MALE"
          />
          <PokemonInformation
            title="Height"
            content={`${feet}'${leftPad(Number(inches) % 12, 2)}" (${
              2 / 10
            }m)`}
          />
          <PokemonInformation
            title="Weight"
            content={`${(2 / 10).toFixed(1)} kg`}
          />
          <PokemonInformation
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
          <PokemonInformation
            title="Base Exp"
            content={0}
          />
          <PokemonInformation
            title="Base Happiness"
            content={0}
          />
          <PokemonInformation
            title="Catch Rate"
            content={`${1}%`}
          />
          <PokemonInformation
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

export default PokemonDetailsBiography;
