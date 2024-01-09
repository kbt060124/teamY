import {
    Card,
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
import Layout from "@/Layouts/Layout";
import AddRecommendation from "@/Components/AddRecommendation";

export default function OwnRecommendationList(props) {
    const recommendCnt = 3;
    const [open, setOpen] = useState(false);

    const storagePath = "../storage/img/icons/";
    const imgPath = storagePath + props.profile.icon;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
    };

    const [editMode, setEditMode] = useState(false);
    const { data, setData, post } = useForm({
        id: props.profile.id,
        name: props.profile.name,
        title: props.profile.title,
        text: props.profile.text,
        icon: props.profile.icon,
        recommendId: "",
        recommendedUserId: "",
        recommendName: "",
        recommendTitle: "",
        recommendText: "",
        recommendIcon: "",
        guestName: "",
        guestIcon: "",
    });
    const [file, setFile] = useState(imgPath);
    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("edit"));
        setEditMode(false);
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

    const addArea = () => {
        let addCnt = 0;
        if (props.recommends.length < recommendCnt) {
            addCnt = recommendCnt - props.recommends.length;
            return (
                <AddRecommendation props={{ userId: data.id }} key="addArea" />
            );
        }
    };

    // レコメンド詳細処理
    // const recommendedUserId = props.recommends.recommended_user_id;
    const [recommendEditMode, setRecommendEditMode] = useState(false);
    const [recommendOpen, setRecommendOpen] = useState(false);
    const [recommendFile, setRecommendFile] = useState();

    const handleRecommendOpen = (item) => {
        setData((prev) => ({
            ...prev,
            recommendId: item.post_recommend_id,
            recommendedUserId: item.recommended_user_id,
            recommendName: item.name,
            recommendTitle: item.title,
            recommendText: item.text,
            recommendIcon: item.icon,
            guestName: item.guest_name,
            guestIcon: item.guest_icon,
        }));

        setRecommendFile(storagePath + item.guest_icon);
        setRecommendOpen(true);
    };

    const handleRecommendClose = () => {
        setRecommendOpen(false);
        setRecommendEditMode(false);
    };

    const handleRecommendEdit = () => {
        setRecommendEditMode(true);
    };

    const handleRecommendSubmit = (e) => {
        e.preventDefault();
        post(route("ownrecommendations.edit"));
        setRecommendEditMode(false);
        setRecommendOpen(false);
    };

    const handleChangeRecommendImg = (e) => {
        setData("guestIcon", e.target.files[0]);

        const reader = new FileReader();
        // ファイルを読み込む
        // 読み込まれたファイルはデータURL形式で受け取れる（上記onload参照）
        reader.readAsDataURL(e.target.files[0]);
        // ファイルを読み込み終わったタイミングで実行するイベントハンドラー
        reader.onload = () => {
            //base64形式の画像データをfileInfoに格納
            setRecommendFile(reader.result);
        };
    };

    return (
        <Layout>
            <div className="h-screen">
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
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {props.profile.text}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-1/4"></div>
                    <div className="h-4/5 w-2/4 flex justify-end items-center">
                        <div>
                            {props.recommends.map((item) => (
                                <div
                                    className="my-5 flex items-center"
                                    key={item.post_recommend_id}
                                    onClick={() => handleRecommendOpen(item)}
                                >
                                    {item.icon ? (
                                        <img
                                            style={{
                                                maxWidth: 200,
                                                height: 140,
                                            }}
                                            src={storagePath + item.icon}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                maxWidth: 200,
                                                height: 140,
                                            }}
                                            src={storagePath + item.guest_icon}
                                            alt=""
                                        />
                                    )}
                                    <div>
                                        {item.name ? (
                                            <div className="font-bold">
                                                {item.name}
                                            </div>
                                        ) : (
                                            <div className="font-bold">
                                                {item.guest_name}
                                            </div>
                                        )}
                                        <div className="font-bold">
                                            {item.title}
                                        </div>
                                        <div className="whitespace-pre-wrap">
                                            {item.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/*新規追加 */}
                            {addArea()}
                        </div>
                    </div>
                </div>

                {/* 個人のモーダル */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    className="overflow-y-scroll"
                >
                    <div className="flex items-center">
                        {editMode === true ? (
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                className="mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative bg-white"
                            >
                                <div className="flex">
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
                                    <div className="w-2/3 px-8 pt-10 pb-4">
                                        <div className="name mb-4">
                                            <TextField
                                                name="name"
                                                defaultValue={
                                                    props.profile.name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="title mb-4">
                                            <TextField
                                                name="title"
                                                defaultValue={
                                                    props.profile.title
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                            <div className="text text-xl h-2/5">
                                                <TextareaAutosize
                                                    name="text"
                                                    defaultValue={
                                                        props.profile.text
                                                    }
                                                    minRows={6}
                                                    onChange={(e) =>
                                                        setData(
                                                            "text",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full h-2/3 whitespace-pre-wrap"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-8 mb-4 text-right">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                        >
                                            確定
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="bg-white mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative">
                                    <div className="flex ">
                                        <div className="w-1/3 h-1/2 p-12">
                                            <img src={imgPath} alt="" />
                                        </div>
                                        <div className="w-2/3 px-8 pt-12 pb-4">
                                            <div className="name mb-8 text-4xl font-bold">
                                                {props.profile.name}
                                            </div>
                                            <div className="title mb-8 text-xl font-bold">
                                                {props.profile.title}
                                            </div>
                                            <div className="text text-xl h-2/5">
                                                <p className="whitespace-pre-wrap">
                                                    {props.profile.text}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-8 mb-4 text-right">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() => handleEdit()}
                                        >
                                            編集
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>

                    {/* レコメンド用のモーダル */}
                    <Modal open={recommendOpen} onClose={handleRecommendClose}>
                        <div className="flex items-center">
                            {recommendEditMode === true ? (
                                <form
                                    onSubmit={handleRecommendSubmit}
                                    encType="multipart/form-data"
                                    className="mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative bg-white"
                                >
                                    <div className="flex h-1/2">
                                        <div className="w-2/5 p-12">
                                            <div className="flex items-end">
                                                <div className="w-1/3 h-1/2 flex items-end">
                                                    <img src={imgPath} alt="" />
                                                </div>
                                                <div className="w-1/6 h-1/3 border-solid border-b-4 mb-8"></div>
                                                <div className="w-1/2 h-full">
                                                    {data.recommendedUserId ? (
                                                        <img
                                                            src={
                                                                storagePath +
                                                                data.recommendIcon
                                                            }
                                                            alt=""
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div>
                                                            <img
                                                                src={
                                                                    recommendFile
                                                                }
                                                                alt=""
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {data.recommendedUserId ? (
                                                <></>
                                            ) : (
                                                <div className="text-center mt-4">
                                                    <Button
                                                        variant="contained"
                                                        component="label"
                                                    >
                                                        画像を選択
                                                        <input
                                                            type="file"
                                                            hidden
                                                            name="icon"
                                                            onChange={
                                                                handleChangeRecommendImg
                                                            }
                                                            accept="image/*"
                                                        />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-3/5 pl-8 pr-20 py-12">
                                            {data.recommendedUserId ? (
                                                <div className="recommnedName mb-8 text-4xl font-bold">
                                                    {data.recommendName}
                                                </div>
                                            ) : (
                                                <div className="recommnedName mb-8 text-4xl font-bold">
                                                    <TextField
                                                        name="name"
                                                        defaultValue={
                                                            data.guestName
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "guestName",
                                                                e.target.value
                                                            )
                                                        }
                                                        required
                                                    />
                                                </div>
                                            )}
                                            <div className="title mb-4">
                                                <TextField
                                                    name="recommnedTitle"
                                                    defaultValue={
                                                        data.recommendTitle
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "recommendTitle",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text text-xl h-2/3 px-20">
                                        <TextareaAutosize
                                            name="recommendText"
                                            multiline="true"
                                            defaultValue={data.recommendText}
                                            onChange={(e) =>
                                                setData(
                                                    "recommendText",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            className="w-full h-2/3 whitespace-pre-wrap"
                                        />
                                    </div>
                                    <div className="mx-12 mb-4 text-right">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                        >
                                            確定
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="mx-auto my-auto border border-solid border-black w-2/3 h-4/5 relative bg-white">
                                    <div className="flex h-1/2">
                                        <div className="w-2/5  p-12 flex items-end">
                                            <div className="w-1/3  flex items-end">
                                                <img src={imgPath} alt="" />
                                            </div>
                                            <div className="w-1/6 h-1/3 border-solid border-b-4 mb-8"></div>
                                            <div className="w-1/2 h-full">
                                                {data.recommendedUserId ? (
                                                    <img
                                                        src={
                                                            storagePath +
                                                            data.recommendIcon
                                                        }
                                                        alt=""
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <img
                                                        src={
                                                            storagePath +
                                                            data.guestIcon
                                                        }
                                                        alt=""
                                                        className="object-cover w-full h-full"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-3/5 px-8 py-12">
                                            {data.recommendedUserId ? (
                                                <div className="name mb-8 text-4xl font-bold">
                                                    {data.recommendName}
                                                </div>
                                            ) : (
                                                <div className="name mb-8 text-4xl font-bold">
                                                    {data.guestName}
                                                </div>
                                            )}
                                            <div className="title mb-8 text-xl font-bold">
                                                {data.recommendTitle}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text text-xl h-2/3 px-20">
                                        <p className="whitespace-pre-wrap">
                                            {data.recommendText}
                                        </p>
                                    </div>
                                    <div className="mx-12 mb-4 text-right">
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={() =>
                                                handleRecommendEdit()
                                            }
                                        >
                                            編集
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
}
