import {Outlet} from "react-router-dom";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";
import css from './css/page.module.css';
import {News} from "../components/NewsComponent/News/News";

const NewsPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <News/>
                <Outlet/>
            </div>
            <FooterComponent/>
        </div>
    );
};

export {NewsPage};