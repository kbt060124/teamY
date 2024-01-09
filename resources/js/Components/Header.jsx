import React from "react";
import SearchBar from "./SearchBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsIcon from "@mui/icons-material/Sms";
import { Link } from "@inertiajs/react";

const Header = () => {
    const storagePath = "../storage/img/";

    return (
        <div className="py-3 w-full border-b border-gray-900 flex items-center">
            <Link className="w-1/6 px-6" href="/home">
                <img
                    className="object-contain w-full"
                    src={storagePath + "welcome/TRUST_black.png"}
                />
            </Link>
            <div className="w-2/3 m-auto">
                <SearchBar />
            </div>
            <div className="m-auto">
                <NotificationsIcon className="mr-3" sx={{ fontSize: "30px" }} />
                <SmsIcon sx={{ fontSize: "30px" }} />
            </div>
            <Link className="m-auto" href={route('logout')} method="post" as="button">Log out</Link>
        </div>
    );
};

export default Header;