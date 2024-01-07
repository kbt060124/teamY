import { useForm, usePage } from "@inertiajs/react";
import { Button, Modal, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddPost = (userId) => {
    const imgPath = "../storage/img/icons/" + usePage().props.auth.user.icon;
    const [open, setOpen] = useState(false);
    const { data, setData, post } = useForm({
        userId: userId,
        title: "",
        news: "",
    });

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
                                />
                            </div>

                            <div className="text text-xl w-full mb-4">
                                <TextareaAutosize
                                    name="text"
                                    placeholder="news"
                                    className="w-full"
                                    minRows={3}
                                    onChange={(e) =>
                                        setData("news", e.target.value)
                                    }
                                />
                            </div>
                            <div className="text-right">
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                >
                                    投稿
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default AddPost;
