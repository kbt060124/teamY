import AddPost from "@/Components/AddPost";
import Layout from "@/Layouts/Layout";
import React from "react";

const Home = (props) => {
    const storagePath = "../storage/img/icons/";
    return (
        <Layout>
            <div className="w-full h-screen overflow-y-scroll">
                <div className="timeline flex justify-center">
                    <div className="w-2/3">
                        <AddPost id={props.posts.user_id} />
                        {props.posts.map((item, key) => (
                            <div key={key}>
                                {item.type == 1 && (
                                    <div className="flex w-full bg-gray-100 p-4 mt-4">
                                        <div className="img w-1/6">
                                            <img
                                                src={storagePath + item.icon}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-5/6">
                                            <div className="ml-2 mb-2">
                                                <p className="name">
                                                    <span className="font-bold">
                                                        {item.name}
                                                    </span>
                                                    さんが、近状アップデートを投稿しました。
                                                </p>
                                                <p className="text-gray-500">
                                                    {item.date}
                                                </p>
                                            </div>
                                            <div className="bg-white ml-4 p-4">
                                                <p className="title font-bold">
                                                    {item.n_title}
                                                </p>
                                                <p className="whitespace-pre-wrap">{item.news}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item.type == 2 && (
                                    <div className="flex w-full bg-gray-100 p-4 mt-4">
                                        <div className="img w-1/6">
                                            <img
                                                src={storagePath + item.icon}
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-5/6">
                                            <div className="ml-2 mb-2">
                                                <p className="name">
                                                    <span className="font-bold">
                                                        {item.name}
                                                    </span>
                                                    さんが、新しい「いいよ」を投稿しました。
                                                </p>
                                                <p className="text-gray-500">
                                                    {item.date}
                                                </p>
                                            </div>
                                            <div className="bg-white ml-4 p-4 flex">
                                                <div className="w-1/6">
                                                    <img
                                                        src={
                                                            storagePath +
                                                            item.recommended_icon
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="w-5/6 ml-2">
                                                    <p className="r_name font-bold">
                                                        {item.recommended_name}
                                                    </p>
                                                    <p className="r_title font-bold">
                                                        {item.r_title}
                                                    </p>
                                                    <p className="text whitespace-pre-wrap">
                                                        {item.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {item.type == 3 && (
                                    <div className="flex w-full bg-gray-100 p-4 mt-4">
                                        <div className="img w-1/6">
                                            <img
                                                src={
                                                    storagePath +
                                                    item.thanks_icon
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="w-5/6">
                                            <div className="ml-2 mb-2">
                                                <p className="name">
                                                    <span className="font-bold">
                                                        {item.thanks_name}
                                                    </span>
                                                    さんが、
                                                    <span className="font-bold">
                                                        {item.name}
                                                    </span>
                                                    から「ありがとう」されました。
                                                </p>
                                                <p className="text-gray-500">
                                                    {item.date}
                                                </p>
                                            </div>
                                            <div className="bg-white ml-4 p-4 flex">
                                                <div className="w-1/4">
                                                    <img
                                                        src={
                                                            storagePath +
                                                            item.icon
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="ml-2">
                                                    <p className="thanks font-bold">
                                                        THANK YOU
                                                    </p>
                                                    <p className="text whitespace-pre-wrap">
                                                        {item.thanks_message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
