import { Button, Modal, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CloseIcon from "@mui/icons-material/Close";
import LeaderLine from "leader-line-new";

export default function RecommendationList(props) {
    const [open, setOpen] = useState(false);

    const storagePath = "../storage/img/icons/";
    const imgPath = storagePath + props.profile.icon;

    const userIcon = storagePath + usePage().props.auth.user.icon;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
    };

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

    // レコメンド詳細処理
    // const recommendedUserId = props.recommends.recommended_user_id;
    const [recommendOpen, setRecommendOpen] = useState(false);
    const [orderMode, setOrderMode] = useState(false);

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

        setRecommendOpen(true);
    };

    const handleRecommendClose = () => {
        setRecommendOpen(false);
        handleOrderCancel();
    };

    const handleOrderMode = () => {
        setOrderMode(true);
    };

    const handleOrderCancel = () => {
        setOrderMode(false);
    };

    useEffect(() => {
        let line1;
        let line2;
        let line3;

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
            if (props.recommends.length == 1) {
                line1.remove();
            }
            if (props.recommends.length == 2) {
                line1.remove();
                line2.remove();
            }
            if (props.recommends.length == 3) {
                line1.remove();
                line2.remove();
                line3.remove();
            }
        };
    }, []);

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
                    </div>
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    className="overflow-y-scroll"
                >
                    <div className="flex items-center">
                        <div className="bg-white mx-auto my-auto pb-8 border border-solid border-black w-2/3 h-4/5 relative">
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
                                {" "}
                                <div className="w-1/3 h-1/2 px-12">
                                    <img src={imgPath} alt="" />
                                </div>
                                <div className="w-2/3 px-8 ">
                                    <div className="name mb-8 text-4xl font-bold">
                                        {props.profile.name}
                                    </div>
                                    <div className="title mb-8 text-xl font-bold">
                                        {props.profile.title}
                                    </div>
                                    <div className="text text-xl h-2/5 whitespace-pre-wrap">
                                        <p>{props.profile.text}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* レコメンド用のモーダル */}
                <Modal open={recommendOpen} onClose={handleRecommendClose}>
                    <div className="flex items-center">
                        {orderMode === true ? (
                            <div className="mx-auto pt-6 border border-solid border-black w-2/3 relative bg-white">
                                <div className="h-1/3 flex justify-center items-end">
                                    <div className="w-1/6  flex items-end">
                                        <img src={userIcon} alt="" />
                                    </div>
                                    <div className="w-1/12 h-full mb-8 flex justify-center items-end">
                                        <div>
                                            <SyncAltIcon
                                                sx={{ fontSize: "40px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/6  flex items-end">
                                        <img src={imgPath} alt="" />
                                    </div>
                                    <div className="w-1/12 h-full mb-8 flex justify-center">
                                        <div>
                                            <SyncAltIcon
                                                sx={{ fontSize: "40px" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-1/6  flex items-end">
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
                                                    storagePath + data.guestIcon
                                                }
                                                alt=""
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="text-center my-6 text-2xl font-bold">
                                    繋げてもらうことは可能ですか？
                                </div>

                                <div className="text-xl w-2/3 mx-auto">
                                    <div>
                                        <div>メッセージ</div>
                                        <TextareaAutosize
                                            name="text"
                                            minRows={4}
                                            onChange={(e) =>
                                                setData("text", e.target.value)
                                            }
                                            className="w-full h-2/3"
                                        />
                                    </div>
                                </div>

                                <div className="w-2/3 flex justify-end mx-auto my-4">
                                    <div className="mr-6">
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => handleOrderCancel()}
                                        >
                                            戻る
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained"
                                            size="large"
                                        >
                                            送信
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto my-auto border border-solid border-black w-2/3 relative bg-white">
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
                                    <div className="w-2/5  px-12 flex items-end">
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
                                <div className="text text-xl h-2/3 px-20 pt-10">
                                    <p className="whitespace-pre-wrap">
                                        {data.recommendText}
                                    </p>
                                </div>
                                <div className="mx-12 mb-4 text-right">
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => handleOrderMode()}
                                    >
                                        紹介を依頼する
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
