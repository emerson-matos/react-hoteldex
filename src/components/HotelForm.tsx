import React, { useEffect, useRef, useState } from "react";
import { GoLock, GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  searchHotelsByNameReducer,
  apiKeyReducer,
} from "../features/cachedHotelsSlice";
import { hotelsSelector, resetHotelsReducer } from "../features/hotelsSlice";
import { SliceStatus } from "../globals";

type Props = {
  mutatePage: React.Dispatch<React.SetStateAction<number>>;
  placeholder?: string;
  initialValue?: string;
  apikeyDefault?: string;
  changeHandler?: () => void;
};

const HotelForm = ({
  placeholder,
  initialValue = "",
  apikeyDefault = "",
  changeHandler,
  mutatePage,
}: Props) => {
  const dispatch = useDispatch();
  const hotels = useSelector(hotelsSelector);
  const [searchString, setSearchString] = useState<string>(initialValue);
  const [apiKey, setApikey] = useState<string>(apikeyDefault);
  const inputRef = useRef(0);

  const isLoading = hotels.status.state === SliceStatus.LOADING;

  useEffect(() => {
    if (changeHandler) {
      clearTimeout(inputRef.current);
      inputRef.current = window.setTimeout(() => {
        changeHandler();
      }, 100);
    }
  }, [searchString, changeHandler]);

  const submitFormHandler = () => {
    if (!isLoading) {
      dispatch(resetHotelsReducer({}));
      dispatch(searchHotelsByNameReducer({ hotelName: searchString }));
      mutatePage(0);
    }
  };

  const submitApiKeyHandler = () => {
    dispatch(apiKeyReducer({ apikey: apiKey }));
  };

  return (
    <div>
      <div className="grid grid-cols-12 flex items-center justify-center md:justify-start flex-wrap">
        <div className="col-span-10 relative flex m-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <div className="absolute flex items-center justify-center pointer-events-none">
              <GoLock color="#8A8A8A" />
            </div>
          </span>
          <input
            className="grow py-2 pl-10 md:pr-24 lg:pr-48 w-full text-sm rounded-lg bg-primaryGray text-tertiaryGray placeholder-tertiaryGray appearance-none focus:outline-none focus:font-medium focus:border-secondaryGray"
            placeholder={"Put your api key here"}
            value={apiKey}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setApikey(e.currentTarget.value)
            }
          />
        </div>

        <button
          className={
            "col-span-2 m-2 md:ml-5 md:mt-3 bg-primary py-1 px-4 rounded-md text-white font-semibold focus:outline-none transition duration-200 ease-in-out" +
            (isLoading
              ? " opacity-25 cursor-default"
              : " hover:bg-white hover:text-primary transform hover:-translate-y-1 cursor-pointer")
          }
          onClick={submitApiKeyHandler}
        >
          Confirm
        </button>
      </div>
      <div className="grid grid-cols-12 flex items-center justify-center md:justify-start flex-wrap">
        <div className="col-span-10 relative flex m-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <div className="absolute flex items-center justify-center pointer-events-none">
              <GoSearch color="#8A8A8A" />
            </div>
          </span>

          <input
            className="py-2 pl-10 md:pr-24 lg:pr-48  w-full text-sm rounded-lg bg-primaryGray text-tertiaryGray placeholder-tertiaryGray appearance-none focus:outline-none focus:font-medium focus:border-secondaryGray"
            placeholder={placeholder || "Search an item..."}
            value={searchString}
            onKeyPress={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") {
                submitFormHandler();
              }
            }}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setSearchString(e.currentTarget.value)
            }
          />
        </div>

        <button
          className={
            "col-span-2 m-2 md:ml-5 md:mt-3 bg-primary py-1 px-4 rounded-md text-white font-semibold focus:outline-none transition duration-200 ease-in-out" +
            (isLoading
              ? " opacity-25 cursor-default"
              : " hover:bg-white hover:text-primary transform hover:-translate-y-1 cursor-pointer")
          }
          onClick={submitFormHandler}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default HotelForm;
