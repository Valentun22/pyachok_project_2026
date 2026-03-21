import {Outlet} from "react-router-dom";
import css from "./css/page.module.css";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";
import AboutUs from "../components/AboutUsComponent/AboutUs";

const AboutUsPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <AboutUs/>
                <Outlet/>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {AboutUsPage};