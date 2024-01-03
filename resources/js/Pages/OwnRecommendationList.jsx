import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Modal,
    TextField,
    TextareaAutosize,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import SearchBar from "@/Components/SearchBar";

export default function OwnRecommendationList(props) {
    const [open, setOpen] = useState(false);

    console.log(props.recommends);
    const imgPath = "../storage/img/icons/" + props.profile.icon;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const imgName = props.profile.icon;
    const [editMode, setEditMode] = useState(false);
    const { data, setData, post } = useForm({
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
        setEditMode((prev) => !prev);
        setOpen(false);
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
        <div className="h-screen">
            <SearchBar/>
            <div className="flex">
                <div
                    className="ml-24 h-4/5 w-1/4 flex items-center"
                    onClick={handleOpen}
                >
                    <Card sx={{ maxWidth: 200 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={imgPath}
                            title="user icon"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {props.profile.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.profile.text}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div className="h-4/5 w-2/4 flex justify-end items-center">
                    <div>
                        {props.recommends.map((item) => (
                            <div
                                className="my-5 flex items-center"
                                key={item.id}
                            >
                                {item.icon ? (
                                    <img
                                        style={{ maxWidth: 200, height: 140 }}
                                        src={`../img/icons/${item.icon}`}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        style={{ maxWidth: 200, height: 140 }}
                                        src={`../img/icons/${item.guest_icon}`}
                                        alt=""
                                    />
                                )}
                                <div>
                                    {item.name ? (
                                        <div>{item.name}</div>
                                    ) : (
                                        <div>{item.guest_name}</div>
                                    )}
                                    <div>{item.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div></div>
                <Modal open={open} onClose={handleClose}>
                    <div className="flex items-center">
                        {editMode === true ? (
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
                            <div className="bg-white mx-auto my-auto flex border border-solid border-black w-2/3 h-4/5 relative">
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
                </Modal>
            </div>
        </div>
    );
}
