import Layout from "@/Layouts/Layout";
import { Link } from "@inertiajs/react";
import React from "react";

const Search = (props) => {
    const storagePath = "../storage/img/icons/";
    console.log(props);
    return (
        <div>
            <Layout>
                <div>User</div>
                {props.searchUser.map((item, key) => (
                    <Link key={key} href={"/recommendationlist/"+item.userId}>
                        <div className="flex w-full bg-gray-100 p-4 mt-4">
                            <div className="img w-1/6">
                                <img src={storagePath + item.icon} alt="" />
                            </div>
                            <div className="w-5/6">
                                <p>{item.name}</p>
                                <p>{item.title}</p>
                                <p>{item.text}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                <div>Recommend</div>
                {props.searchRecommend.map((item, key) => (
                    <Link key={key} href={"/recommendationlist/"+item.user_id}>                    
                    <div className="flex w-full bg-gray-100 p-4 mt-4">
                        <div className="img w-1/6">
                            <img src={storagePath + item.user_icon} alt="" />
                        </div>
                        <div className="w-5/6">
                            <div className="ml-2 mb-2">
                                <p className="name">
                                    <span className="font-bold">
                                        {item.user_name}
                                    </span>
                                </p>
                            </div>
                            <div className="bg-white ml-4 p-4 flex">
                                <div className="w-1/4">
                                    <img
                                        src={
                                            storagePath + item.recommended_icon
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="ml-2">
                                    <p className="r_name font-bold">
                                        {item.recommended_name}
                                    </p>
                                    <p className="r_title font-bold">
                                        {item.recommend_title}
                                    </p>
                                    <p className="text">
                                        {item.recommend_text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </Link>                    
                ))}
            </Layout>
        </div>
    );
};

export default Search;
