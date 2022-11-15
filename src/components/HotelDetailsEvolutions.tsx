import React from "react";
import { useSelector } from "react-redux";
import { hotelsSelector } from "../features/hotelsSlice";

import HotelEvolution from "./HotelEvolution";

type Props = {
  selectedIds: number[];
  selectedBackgroundColor: { light: string; medium: string };
};

const HotelDetailsEvolutions = ({
  selectedBackgroundColor,
  selectedIds,
}: Props) => {
  const hotels = useSelector(hotelsSelector);

  return (
    <div className="mt-12 text-center ">
      <div className="lg:grid lg:grid-cols-2 lg:gap-y-10">
        {/* {selectedIds.map((id) => {
          const hotel = hotels.data.find((p) => p !== null && id === p.id);

          return (
            <>
              {hotel && (
                <HotelEvolution
                  hotel={hotel}
                  selectedBackgroundColor={selectedBackgroundColor}
                />
              )}
            </>
          );
        })} */}
      </div>
    </div>
  );
};

export default HotelDetailsEvolutions;
