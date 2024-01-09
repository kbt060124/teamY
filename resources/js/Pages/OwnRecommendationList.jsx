import { Button, Modal, TextField, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import AddRecommendation from "@/Components/AddRecommendation";
import CloseIcon from "@mui/icons-material/Close";
import LeaderLine from "leader-line-new";

export default function OwnRecommendationList(props) {
    const recommendCnt = 3;
    const [open, setOpen] = useState(false);
    const storagePath = "../storage/img/icons/";
    const imgPath = storagePath + props.profile.icon;
    const [file, setFile] = useState(imgPath);
    const [editMode, setEditMode] = useState(false);
    const [recommendEditMode, setRecommendEditMode] = useState(false);
    const [recommendOpen, setRecommendOpen] = useState(false);
    const [recommendFile, setRecommendFile] = useState();
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

    useEffect(() => {
        let line1;
        let line2;
        let line3;
        let addLine;

        if (props.recommends.length == 0) {
            addLine = new LeaderLine(
                document.getElementById("start"),
                document.getElementById("add"),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );
        }

        if (props.recommends.length == 1) {
            line1 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(1),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );

            addLine = new LeaderLine(
                document.getElementById("start"),
                document.getElementById("add"),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );
        }

        if (props.recommends.length == 2) {
            line1 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(1),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );

            line2 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(2),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );

            addLine = new LeaderLine(
                document.getElementById("start"),
                document.getElementById("add"),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );
        }

        if (props.recommends.length == 3) {
            line1 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(1),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );

            line2 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(2),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );

            line3 = new LeaderLine(
                document.getElementById("start"),
                document.getElementById(3),
                {
                    color: "black",
                    size: 1,
                    startPlug: "behind", // スタートの矢印などの表示
                    endPlug: "behind",
                }
            );
        }

        window.dispatchEvent(new Event("resize"));
        return () => {
            if (props.recommends.length == 0) {
                addLine.remove();
            }
            if (props.recommends.length == 1) {
                line1.remove();
                addLine.remove();
            }
            if (props.recommends.length == 2) {
                line1.remove();
                line2.remove();
                addLine.remove();
            }
            if (props.recommends.length == 3) {
                line1.remove();
                line2.remove();
                line3.remove();
                addLine.remove();
            }
        };
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
    };

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
            <div className="h-full w-full flex justify-around">
                <div className="w-2/12 h-full flex">
                    <div className="flex items-center" onClick={handleOpen}>
                        <div
                            id="start"
                            className="shadow-md border border-gray-900"
                        >
                            <img
                                className="object-contain w-full"
                                src={imgPath}
                            />
                            <div className="my-2 font-bold text-center">
                                {props.profile.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-full w-5/12 flex justify-end items-center">
                    <div>
                        {props.recommends.map((item, index) => (
                            <div
                                id={index + 1}
                                className="my-5 flex items-center shadow-md border border-gray-900"
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
                                <div className="mx-5">
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
                                    <div className="whitespace-pre-wrap line-clamp-3">
                                        {item.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/*新規追加 */}
                        <div id="add">{addArea()}</div>
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
                                                    required
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
                                                    required
                                                />
                                            </div>

                                        <div className="text text-xl h-2/5">
                                            <TextareaAutosize
                                                name="text"
                                                defaultValue={
                                                    props.profile.text
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "text",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full h-2/3 whitespace-pre-wrap"
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
                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleClose}
                                        style={{
                                            color: "gray",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </div>
                                <div className="flex">
                                    <div className="w-1/3 h-1/2 px-12">
                                        <img src={imgPath} alt="" />
                                    </div>
                                    <div className="w-2/3 px-8 pb-4">
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
                    <div className="h-full flex items-center">
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
                                                            src={recommendFile}
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
                                                className="w-full"
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
                                <div className="flex justify-end">
                                    <Button
                                        onClick={handleRecommendClose}
                                        style={{
                                            color: "gray",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <CloseIcon />
                                    </Button>
                                </div>
                                <div className="flex h-1/2">
                                    <div className="w-2/5 px-12 flex items-end">
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
                                    <div className="w-3/5 px-8">
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
                                <div className="text text-xl h-2/3 pt-10 px-20">
                                    <p className="whitespace-pre-wrap">
                                        {data.recommendText}
                                    </p>
                                </div>
                                <div className="mx-12 mb-4 text-right">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => handleRecommendEdit()}
                                    >
                                        編集
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Modal>
            </div>
        </Layout>
    );
}
