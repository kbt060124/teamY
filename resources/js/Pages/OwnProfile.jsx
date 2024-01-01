import EditButton from "@/Components/EditButton";
import React from "react";

const OwnProfile = (props) => {
    const imgName = props.profile.icon;
    const imgPath = "../img/icons/" + imgName;
    return (
        <div className="flex items-center w-screen h-screen">
            <div className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative">
                <div className="w-1/3 h-1/2 p-12">
                    <img src={imgPath} alt="" />
                </div>
                <div className="px-8 py-12">
                    <div className="name mb-8 text-4xl font-bold">
                        {props.profile.name}
                    </div>
                    <div className="text text-xl h-2/5">
                      <p>
                        {props.profile.text}
                      </p>
                    </div>
                    <div className="mx-12 my-12 text-right absolute bottom-0 right-0">
                      <EditButton>編集</EditButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnProfile;
