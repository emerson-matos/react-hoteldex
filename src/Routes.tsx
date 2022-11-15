import React from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import SplashScreen from "./components/SplashScreen";
import HotelDetailsPage from "./pages/HotelDetailsPage";
const HotelsPage = React.lazy(() => import("./pages/HotelsPage"));

const Routes: React.FC = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    config: {
      duration: 250,
    },
    from: {
      opacity: 0.25,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0.25,
    },
  });

  return (
    <React.Suspense fallback={<SplashScreen />}>
      {transitions.map(({ item: location, props, key }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            width: "100%",
            position: "absolute",
          }}
        >
          <Switch location={location}>
            <Route path="/hotels/:id" component={HotelDetailsPage} />
            <Route exact path="/" component={HotelsPage} />
          </Switch>
        </animated.div>
      ))}
    </React.Suspense>
  );
};
export default Routes;
