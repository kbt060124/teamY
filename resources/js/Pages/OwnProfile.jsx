import React, { useEffect, useState } from "react";
import { Button, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@inertiajs/react";

const OwnProfile = (props) => {
    const imgName = props.profile.icon;
    const imgPath = "../storage/img/icons/" + imgName;
    const [editMode, setEditMode] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: props.profile.id,
        name: props.profile.name,
        title: props.profile.title,
        text: props.profile.text,
        icon: props.profile.icon,
    });
    const [file, setFile] = useState(imgPath);

    const handleEdit = () => {
        setEditMode((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("edit"));
    };

    const handleChangeImg = (e) => {
        setData("icon", e.target.files[0]);

        const reader = new FileReader();
        // ファイルを読み込む
        // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
        reader.readAsDataURL(e.target.files[0]);
        // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
        reader.onload = () => {
            //base64形式の画像データをfileInfoに格納
            setFile(reader.result);
        };
    };

    return (
        <div className="flex items-center w-screen h-screen">
            {editMode === true ? (
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative"
                >
                    <div className="w-1/3 h-1/2 p-12">
                        <img src={file} alt="" />

                        <Button variant="contained" component="label">
                            画像を選択
                            <input
                                type="file"
                                hidden
                                name="icon"
                                onChange={handleChangeImg}
                                accept="image/*"
                            />
                        </Button>
                    </div>
                    <div className="w-2/3 px-8 py-12">
                        <div className="name mb-4">
                            <TextField
                                name="name"
                                defaultValue={props.profile.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div className="title mb-4">
                            <TextField
                                name="title"
                                defaultValue={props.profile.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                            />
                        </div>

                        <div className="text text-xl h-2/5">
                            <TextareaAutosize
                                name="text"
                                defaultValue={props.profile.text}
                                onChange={(e) =>
                                    setData("text", e.target.value)
                                }
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
                    </div>
                </form>
            ) : (
                <div className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative">
                    <div className="w-1/3 h-1/2 p-12">
                        <img src={imgPath} alt="" />
                    </div>
                    <div className="w-2/3 px-8 py-12">
                        <div className="name mb-8 text-4xl font-bold">
                            {props.profile.name}
                        </div>
                        <div className="title mb-8 text-xl font-bold">
                            {props.profile.title}
                        </div>
                        <div className="text text-xl h-2/5">
                            <p>{props.profile.text}</p>
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
                </div>
            )}
        </div>
    );
};

export default OwnProfile;
