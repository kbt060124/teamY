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
import { useForm, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import SyncAltIcon from '@mui/icons-material/SyncAlt';

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
                                        <div>{item.text}</div>
                                    </div>
                                </div>
                            ))}
                            {/*新規追加 */}
                        </div>
                    </div>
                    <Modal open={open} onClose={handleClose} className="overflow-y-scroll">
                        <div className="flex items-center">
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
                                    <div className="text text-xl h-2/5 whitespace-pre-wrap">
                                        <p>{props.profile.text}</p>
                                    </div>
                                    <div className="mx-12 my-12 text-right absolute bottom-0 right-0"></div>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    {/* レコメンド用のモーダル */}
                    <Modal open={recommendOpen} onClose={handleRecommendClose}>
                        <div className="flex items-center">
                            {orderMode === true ? (
                                <div className="mx-auto pt-6 border border-solid border-black w-2/3 h-4/5 relative bg-white">
                                    <div className="h-1/3 flex justify-center items-end">
                                        <div className="w-1/6  flex items-end">
                                            <img src={userIcon} alt="" />
                                        </div>
                                        <div className="w-1/12 h-full mb-8 flex justify-center items-end">
                                            <div>
                                            <SyncAltIcon sx={{ fontSize: "40px" }} />
                                            </div>
                                        </div>
                                        <div className="w-1/6  flex items-end">
                                            <img src={imgPath} alt="" />
                                        </div>
                                        <div className="w-1/12 h-full mb-8 flex justify-center">
                                        <div>
                                            <SyncAltIcon sx={{ fontSize: "40px" }} />
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
                                                        storagePath +
                                                        data.guestIcon
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

                                    <div className="text-xl w-2/3 h-2/5 mx-auto">
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
            </div>
        </Layout>
    );
}
