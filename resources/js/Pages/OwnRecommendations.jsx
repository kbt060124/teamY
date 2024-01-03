import React, { useEffect, useState } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@inertiajs/react";

const OwnRecommendations = (props) => {
    console.log(props);
    const recomendImgPath = "../storage/img/icons/" + props.recommends.icon;
    const guestImgPath = "../storage/img/icons/" + props.recommends.guest_icon;
    const userImgPath = "../storage/img/icons/" + props.profile.icon;
    const recommendedUserId = props.recommends.recommended_user_id;
    const text = props.recommends.text;
    const [editMode, setEditMode] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.profile.id,
        recommendId: props.recommends.post_recommend_id,
        userIcon: props.profile.icon,
        name: props.recommends.name,
        title: props.recommends.title,
        text: props.recommends.text,
        icon: props.recommends.icon,
        guestName: props.recommends.guest_name,
        guestIcon: props.recommends.guest_icon,
    });

    const handleEdit = () => {
        setEditMode((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("ownrecommendations.edit"));
    };

    return (
        <div className="flex items-center w-screen h-screen">
            {editMode === true ? (
                <>
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative"
                    >
                        <div className="flex h-1/2">
                            <div className="w-1/2 p-12 flex items-end">
                                <div className="w-1/3 h-1/2 flex items-end">
                                    <img src={userImgPath} alt="" />
                                </div>
                                <div className="w-2/3">
                                    {recommendedUserId ? (
                                        <img src={recomendImgPath} alt="" />
                                    ) : (
                                        <img src={guestImgPath} alt="" />
                                    )}
                                </div>
                            </div>
                            <div className="w-1/2 pl-8 pr-20 py-12">
                                {recommendedUserId ? (
                                    <div className="name mb-8 text-4xl font-bold">
                                        {data.name}
                                    </div>
                                ) : (
                                    <div className="name mb-8 text-4xl font-bold">
                                        {data.guestName}
                                    </div>
                                )}
                                <div className="title mb-4">
                                    <TextField
                                        name="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text text-xl h-2/3 px-20">
                            <TextareaAutosize
                                name="text"
                                multiline="true"
                                value={data.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
                                className="w-full h-2/3"
                            />
                        </div>
                        <div className="mx-12 my-12 text-right absolute bottom-0 right-0">
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                            >
                                確定
                            </Button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div className="mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative">
                        <div className="flex h-1/2">
                            <div className="w-1/2  p-12 flex items-end">
                                <div className="w-1/3  flex items-end">
                                    <img src={userImgPath} alt="" />
                                </div>
                                <div className="w-2/3">
                                    {recommendedUserId ? (
                                        <img src={recomendImgPath} alt="" />
                                    ) : (
                                        <img src={guestImgPath} alt="" />
                                    )}
                                </div>
                            </div>
                            <div className="w-1/2 px-8 py-12">
                                {recommendedUserId ? (
                                    <div className="name mb-8 text-4xl font-bold">
                                        {data.name}
                                    </div>
                                ) : (
                                    <div className="name mb-8 text-4xl font-bold">
                                        {data.guestName}
                                    </div>
                                )}
                                <div className="title mb-8 text-xl font-bold">
                                    {data.title}
                                </div>
                            </div>
                        </div>
                        <div className="text text-xl h-2/3 px-20">
                            <p className="whitespace-pre-wrap">{data.text}</p>
                        </div>
                        <div className="mx-12 my-12 text-right absolute bottom-0 right-0">
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => handleEdit()}
                            >
                                編集
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default OwnRecommendations;
