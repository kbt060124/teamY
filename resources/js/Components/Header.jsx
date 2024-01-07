import React from "react";
import SearchBar from "./SearchBar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SmsIcon from "@mui/icons-material/Sms";
import { Link } from "@inertiajs/react";

const Header = () => {
    const storagePath = "../storage/img/icons/";

    return (
        <div className="w-full border-b-2 border-gray-200 flex items-center">
            <Link href="/home">
                <img
                    className="object-contain"
                    src="img/welcome/TRUST_black.png"
                />
            </Link>
            <SearchBar />
            <div className="m-auto">
                <NotificationsIcon sx={{ fontSize: "40px" }} />
                <SmsIcon sx={{ fontSize: "40px" }} />
            </div>
            <Link className="mr-10" href={route('logout')} method="post" as="button">Log Out</Link>
        </div>
    );
};

export default Header;
