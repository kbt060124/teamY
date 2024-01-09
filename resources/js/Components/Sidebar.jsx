import { Link } from "@inertiajs/react";
import React from "react";
import { SidebarData } from "../Data/SidebarData";

const Sidebar = (props) => {
    SidebarData[0]["title"] = props.name;
    SidebarData[0]["link"] = "/owntimeline/" + props.id;
    const storagePath = "../storage/img/icons/";
    return (
        <div className="sidebar h-full w-1/6 bg-white border-r border-gray-900">
            <img className="p-4 object-contain" src={storagePath + props.icon} alt="" />
            <ul className="border-t border-gray-900 sidebar_list h-auto w-full p-0">
                {SidebarData.map((value, key) => {
                    return (
                        <Link href={value.link} key={key}>
                            <li
                                className={
                                    "row border-b border-gray-900 flex justify-center items-center w-full h-16" +
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
