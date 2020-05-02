import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Loader } from "./components/utils/Loader";
import { Auth } from "./components/Auth";
import { App } from "./components/App";
import { CHECKING_AUTH_STATUS } from "./constants/constants";

function Main() {
    const { user } = useContext(AuthContext);
    let toRender = null;
    if (user === CHECKING_AUTH_STATUS) {
        toRender = <Loader fullPage />;
    } else if (!user) {
        toRender = <Auth />;
    } else {
        console.log("Rendering appp...");
        toRender = <App />;
    }
    return toRender;
}

export default Main;
