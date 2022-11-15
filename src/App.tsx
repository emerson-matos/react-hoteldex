import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import {
  cachedHotelsSelector,
  getCachedHotels,
} from "./features/cachedHotelsSlice";

import { SliceStatus } from "./globals";
import Router from "./Routes";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const cachedHotels = useSelector(cachedHotelsSelector);
  useEffect(() => {
    dispatch(getCachedHotels(cachedHotels.apikey));
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {cachedHotels.status.state === SliceStatus.LOADING ? (
        <SplashScreen />
      ) : (
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
