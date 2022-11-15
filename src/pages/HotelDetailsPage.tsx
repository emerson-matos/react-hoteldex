import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import Layout from "../components/Layout";
import HotelDetailsBiography from "../components/HotelDetailsBiography";
import HotelDetailsEvolutions from "../components/HotelDetailsEvolutions";
import HotelDetailsHeader from "../components/HotelDetailsHeader";
import HotelDetailsStats from "../components/HotelDetailsStats";
import Tab from "../components/Tab";
import {
  hotelsSelector,
} from "../features/hotelsSlice";
import { HotelTypeColors, SliceStatus } from "../globals";
import { ScaleLoader } from "react-spinners";
import { useTransition, animated } from "react-spring";
import { capitalize } from "../utils/capitalize";

type HotelTabs = "biography" | "stats" | "evolutions";

interface MatchParams {
  id: string;
}

const HotelDetailsPage = ({ match }: RouteComponentProps<MatchParams>) => {
  const { id } = match.params;
  const history = useHistory();
  const [activeTab, setActiveTab] = useState<HotelTabs>("biography");
  const transitions = useTransition(activeTab, (p) => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 250,
    },
  });

  const hotels = useSelector(hotelsSelector);
  const [selectedEvolutionHotelIds] =
    useState<number[]>([]);

  // const selectedHotel = hotels.data.find(
  //   (hotel) => hotel !== null && hotel.id === Number(id)
  // );

  // const backgroundColors = selectedHotel?.types.map(({ type }) => {
  //   const [[, backgroundColor]] = Object.entries(HotelTypeColors).filter(
  //     ([key, _]) => key === type.name
  //   );

  //   return backgroundColor;
  // });

  // const selectedBackgroundColor = backgroundColors && backgroundColors[0];

  const isPageLoading =
    hotels.status.state === SliceStatus.IDLE ||
    hotels.status.state === SliceStatus.LOADING;

  return (<div></div>
    // <Layout title={capitalize(selectedHotel?.name)}>
    //   {isPageLoading ? (
    //     <div className="text-center mx-auto mt-12">
    //       <ScaleLoader color="#E3350D" radius={16} />
    //     </div>
    //   ) : (
    //     <>
    //       <>
    //         {selectedHotel && selectedBackgroundColor && (
    //           <div className="pb-8">
    //             <button
    //               className="text-primary font-semibold transform hover:-translate-y-1 transition-transform ease-in duration-150 focus:outline-none"
    //               onClick={() => history.push("/")}
    //             >
    //               <span className="text-primary font-semibold">Go Back</span>
    //             </button>
    //             <div
    //               className="flex flex-col lg:flex-row justify-center items-start w-full mx-auto my-4 rounded-lg shadow-lg"
    //               style={{
    //                 backgroundColor:
    //                   selectedBackgroundColor && selectedBackgroundColor.medium,
    //               }}
    //             >
    //               <HotelDetailsHeader
    //                 hotel={selectedHotel}
    //                 selectedBackgroundColor={selectedBackgroundColor}
    //               />
    //               <div className="bg-white lg:mt-0 rounded-t-3xl rounded-b-lg lg:rounded-t-none lg:rounded-b-none lg:rounded-r-lg overflow-hidden w-full pt-16 lg:pt-8 px-6 md:px-12 lg:px-24">
    //                 <div className="flex flex-row justify-between w-full">
    //                   <Tab
    //                     handleSelect={() => setActiveTab("biography")}
    //                     isSelected={activeTab === "biography"}
    //                   >
    //                     Biography
    //                   </Tab>
    //                   <Tab
    //                     handleSelect={() => setActiveTab("stats")}
    //                     isSelected={activeTab === "stats"}
    //                   >
    //                     Stats
    //                   </Tab>
    //                   <Tab
    //                     handleSelect={() => setActiveTab("evolutions")}
    //                     isSelected={activeTab === "evolutions"}
    //                   >
    //                     Evolutions
    //                   </Tab>
    //                 </div>
    //                 <div className="relative mt-8 lg:h-178">
    //                   {transitions.map(({ item, key, props }) => {
    //                     let page: JSX.Element = (
    //                       <HotelDetailsBiography hotel={selectedHotel} />
    //                     );

    //                     switch (item) {
    //                       case "biography":
    //                         page = (
    //                           <HotelDetailsBiography
    //                             hotel={selectedHotel}
    //                           />
    //                         );
    //                         break;
    //                       case "stats":
    //                         page = (
    //                           <HotelDetailsStats hotel={selectedHotel} />
    //                         );
    //                         break;
    //                       case "evolutions":
    //                         page = (
    //                           <HotelDetailsEvolutions
    //                             selectedIds={selectedEvolutionHotelIds}
    //                             selectedBackgroundColor={
    //                               selectedBackgroundColor
    //                             }
    //                           />
    //                         );
    //                         break;
    //                       default:
    //                         break;
    //                     }
    //                     return (
    //                       <animated.div
    //                         key={key}
    //                         style={{
    //                           ...props,
    //                           position: "relative",
    //                           width: "100%",
    //                           height: "100%",
    //                         }}
    //                       >
    //                         {page}
    //                       </animated.div>
    //                     );
    //                   })}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         )}
    //       </>
    //     </>
    //   )}
    // </Layout>
  );
};
export default HotelDetailsPage;
