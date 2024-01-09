import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, TextareaAutosize } from "@mui/material";
import { useForm } from "@inertiajs/react";
import Select from "react-select";

const AddRecommendation = (props) => {
    const storagePath = "../storage/img/icons/";
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [disable, setDisable] = useState(false);
    const { data, setData, post } = useForm({
        userId: props.userId,
        recommendedUserId: "",
        recommendName: "",
        recommendTitle: "",
        recommendText: "",
        recommendIcon: "",
        thingsFlg: 0,
    });

    const [allUsers, setAllUsers] = useState([]);

    const formatOptionLabel = ({ userId, name, title, icon }) => (
        <div className="flex" key={userId}>
            <div className="w-1/6 max-h-20">
                <img
                    src={storagePath + icon}
                    alt=""
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="pl-4 flex items-center">
                <div>
                    <div>{name}</div>
                    <div style={{ marginLeft: "10px", color: "#999" }}>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );

    const disableStyle = {
        readOnly: true,
    };

    useEffect(() => {
        axios.get(route("get.user")).then((res) => {
            setAllUsers(res.data.allUser);
        });
    }, []);

    const cancelSlect = () => {
        setDisable(false);
        setData((prev) => ({
            ...prev,
            recommendedUserId: "",
            recommendName: "",
            recommendIcon: "",
        }));
        setFile("");
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        cancelSlect();
    };

    const handleChangeImg = (e) => {
        setData("recommendIcon", e.target.files[0]);

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

    const handleSelectUser = (selectVal) => {
        if (selectVal) {
            setDisable(true);
            setData((prev) => ({
                ...prev,
                recommendedUserId: selectVal.userId,
                recommendName: selectVal.name,
                recommendIcon: selectVal.icon,
            }));
            setFile(storagePath + selectVal.icon);
        } else {
            cancelSlect();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        setFile();
        post(route("ownrecommendations.store"));
    };

    return (
        <>
            <div
                className="my-5 flex items-center"
                onClick={() => handleOpen()}
            >
                <div className="bg-gray-200">
                    <div className="text-5xl pt-8 text-center">+</div>
                    <div className="pb-8 px-2">Click to Add</div>
                </div>
                <div>
                    <div className="name font-bold">Up NEXT</div>
                    <div className="title font-bold">
                        Your Future Recommendation
                    </div>
                    <div className="text">
                        心からの「いいよ」で動き始める未来
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={handleClose}>
                <div className="flex items-center">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative bg-white"
                    >
                        <div className="w-1/3 h-1/2 p-12">
                            <img src={file} alt="" />

                            <Button
                                variant="contained"
                                component="label"
                                disabled={disable}
                            >
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
                            <Select
                                onChange={handleSelectUser}
                                options={allUsers}
                                getOptionValue={(option) => option["userId"]}
                                formatOptionLabel={formatOptionLabel}
                                getOptionLabel={(option) => option["name"]}
                                placeholder="Select user"
                                isClearable={true}
                                isSearchable={true}
                                noOptionsMessage={() => "No User"}
                                className="mb-4"
                            />

                            <div className="name mb-4">
                                {disable ? (
                                    <TextField
                                        name="name"
                                        placeholder="Up Next"
                                        InputProps={disableStyle}
                                        value={data.recommendName}
                                        className="w-full"
                                        variant="filled"
                                    />
                                ) : (
                                    <TextField
                                        name="name"
                                        placeholder="Up Next"
                                        className="w-full"
                                        onChange={(e) =>
                                            setData(
                                                "recommendName",
                                                e.target.value
                                            )
                                        }
                                    />
                                )}
                            </div>
                            <div className="title mb-4">
                                <TextField
                                    name="title"
                                    placeholder="Your Future Recommendation"
                                    className="w-full"
                                    onChange={(e) =>
                                        setData(
                                            "recommendTitle",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="text text-xl w-full mb-4">
                                <TextareaAutosize
                                    name="text"
                                    placeholder="Tell your story here…"
                                    className="w-full"
                                    minRows={4}
                                    onChange={(e) =>
                                        setData("recommendText", e.target.value)
                                    }
                                />
                            </div>
                            <div className="text-right">
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
                </div>
            </Modal>
        </>
    );
};

export default AddRecommendation;
