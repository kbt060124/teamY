import { Link } from "@inertiajs/react";
import React from "react";
import { SidebarData } from "../Data/SidebarData";

const Sidebar = (props) => {
    SidebarData[0]["title"] = props.name;
    SidebarData[0]["link"] = "/owntimeline/" + props.id;
    const storagePath = "../storage/img/icons/";
    return (
        <div className="sidebar h-full w-1/6 bg-white border-r-2 border-gray-200">
            <img src={storagePath + props.icon} alt="" />
            <ul className="sidebar_list h-auto w-full p-0">
                {SidebarData.map((value, key) => {
                    return (
                        <Link href={value.link} key={key}>
                            <li
                                className={
                                    "row flex justify-center items-center w-full h-16" +
                                    (window.location.pathname == value.link
                                        ? " bg-gray-200"
                                        : " ") +
                                    " hover:bg-gray-200"
                                }
                            >
                                <div id="title">{value.title}</div>
                            </li>
                        </Link>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
