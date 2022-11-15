import React from "react";
import HotelForm from "../components/HotelForm";

import Layout from "../components/Layout";
import InfiniteScroll from "../components/InfiniteScroll";
import HotelCard from "../components/HotelCard";
import { useSelector } from "react-redux";
import { hotelsSelector, getHotels } from "../features/hotelsSlice";
import { SliceStatus } from "../globals";
import { cachedHotelsSelector } from "../features/cachedHotelsSlice";
import HotelSkeleton from "../components/HotelSkeleton";
import { AiFillGithub } from "react-icons/ai";

const HotelsPage = () => {
  const hotels = useSelector(hotelsSelector);
  const cachedHotels = useSelector(cachedHotelsSelector);

  return (
    <Layout title="Home">
      <div className="flex items-center justify-center lg:justify-start">
        <h1 className="text-3xl lg:text-5xl font-semibold sm:text-left inline-block">
          React Hoteldex
        </h1>
        <a
          href="https://github.com/emerson-matos/react-hoteldex"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block ml-4 transform hover:opacity-50 hover:-translate-y-1 transition-all duration-150"
        >
          <AiFillGithub size={32} />
        </a>
      </div>
      {cachedHotels.status.state === SliceStatus.ERROR && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Error
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Something not ideal might be happening</p>
          </div>
        </div>
      )}
      <InfiniteScroll
        data={hotels.data}
        paginationHandler={(page: number) =>
          getHotels({
            page,
            cachedHotels: cachedHotels.data,
            hotels: hotels.data,
          })
        }
        isLoading={hotels.status.state === SliceStatus.LOADING}
      >
        {({ mutatePage }) => (
          <>
            <div className="my-4 md:my-6 lg:my-8 w-full">
              <HotelForm
                placeholder="Search for a hotel name..."
                mutatePage={mutatePage}
              />
            </div>
            <div className="mx-auto w-full text-center">
              {!(
                cachedHotels.status.state === SliceStatus.LOADING ||
                cachedHotels.status.state === SliceStatus.IDLE
              ) && (
                <>
                  <InfiniteScroll.Container>
                    {hotels.data.map((hotel, index) =>
                      hotel === null ? (
                        <HotelSkeleton key={`loading-${index}`} />
                      ) : (
                        <HotelCard key={hotel.placeId} {...hotel} />
                      )
                    )}
                  </InfiniteScroll.Container>
                  <InfiniteScroll.Waypoint />
                </>
              )}
            </div>
          </>
        )}
      </InfiniteScroll>
    </Layout>
  );
};
export default HotelsPage;
