import { useForm, usePage } from "@inertiajs/react";
import { Button, Modal, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const AddPost = (userId) => {
    const storagePath = "../storage/img/icons/";
    const imgPath = storagePath + usePage().props.auth.user.icon;
    const [open, setOpen] = useState(false);
    const [cardOpen, setCardOpen] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const { data, setData, post } = useForm({
        userId: userId,
        title: "",
        news: "",
        thanksUserId: "",
        message: "",
    });

    // 近状アップデートのモーダル処理
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpen(false);
        post(route("ownnews.store"));
    };

    const handleSelectUser = (selectVal) => {
        if (selectVal) {
            setData((prev) => ({
                ...prev,
                thanksUserId: selectVal.userId,
            }));
        } else {
            cancelSelect();
        }
    };

    // Thank youカードのモーダル処理
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

    useEffect(() => {
        axios.get(route("get.user")).then((res) => {
            setAllUsers(res.data.allUser);
        });
    }, []);

    const cancelSelect = () => {
        setData((prev) => ({
            ...prev,
            thanksUserId: "",
        }));
    };

    const handleCardOpen = () => {
        setCardOpen(true);
    };

    const handleCardClose = () => {
        setCardOpen(false);
        setData({
            thanksUserId: "",
            message: "",
        });
    };

    const handleCardSubmit = (e) => {
        e.preventDefault();
        setCardOpen(false);
        post(route("thanks.store"));
    };

    return (
        <>
            <div className="bg-gray-100 text-center p-4 mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontWeight: "bold", margin: "10px 20px" }}
                    onClick={() => handleOpen()}
                >
                    近状アップデートを書く
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    sx={{ fontWeight: "bold", margin: "10px 20px" }}
                    onClick={() => handleCardOpen()}
                >
                    サンキュー・カードを書く
                </Button>
            </div>
            <Modal open={open} onClose={handleClose}>
                <div className="flex items-center">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative bg-white"
                    >
                        <div className="w-2/3 px-8 py-12 mx-auto">
                            <div className="w-1/4 mb-4 mx-auto">
                                <img src={imgPath} alt="" />
                            </div>

                            <div className="title mb-4">
                                <TextField
                                    name="title"
                                    placeholder="Title"
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="text text-xl w-full mb-4">
                                <TextareaAutosize
                                    name="text"
                                    placeholder="news"
                                    className="w-full"
                                    minRows={4}
                                    onChange={(e) =>
                                        setData("news", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full flex justify-end">
                                <div className="mr-6">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => handleClose()}
                                    >
                                        戻る
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        投稿
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* サンキューカード */}
            <Modal open={cardOpen} onClose={handleCardClose}>
                <div className="flex items-center">
                    <form
                        onSubmit={handleCardSubmit}
                        encType="multipart/form-data"
                        className="mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative bg-white"
                    >
                        <div className="w-2/3 px-8 py-12 mx-auto">
                            <div className="w-full text-center text-5xl font-bold mb-4 mx-auto">
                                THANK YOU
                            </div>

                            <div className="w-full mb-4">
                                <div>送り先</div>
                                <Select
                                    onChange={handleSelectUser}
                                    options={allUsers}
                                    getOptionValue={(option) =>
                                        option["userId"]
                                    }
                                    formatOptionLabel={formatOptionLabel}
                                    getOptionLabel={(option) => option["name"]}
                                    placeholder="Select user"
                                    isClearable={true}
                                    isSearchable={true}
                                    noOptionsMessage={() => "No User"}
                                    className="w-full mb-4"
                                    required
                                />
                            </div>

                            <div className="text w-full mb-4">
                                <div>メッセージ</div>
                                <TextareaAutosize
                                    name="text"
                                    placeholder=""
                                    className="w-full"
                                    minRows={4}
                                    onChange={(e) =>
                                        setData("message", e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="w-full flex justify-end">
                                <div className="mr-6">
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => handleCardClose()}
                                    >
                                        戻る
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                    >
                                        投稿
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AddPost;
