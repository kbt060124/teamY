import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div>
            <Head title="Welcome" />
            <div className="w-screen h-screen bg-cover bg-[url('img/welcome/background.jpg')] px-16 flex items-center">
                <div className="h-2/3">
                    <div className="flex text-white text-8xl">
                        <img src="img/welcome/TRUST_white.png" />
                        <p className="pl-1">is Everything</p>
                    </div>
                </div>
                {auth.user ? (
                    <Link href={route("ownrecommendationlist")}>
                        OwnRecommendationList
                    </Link>
                ) : (
                    <div className="h-2/3">
                        <div className="bg-white h-full px-10 ml-5 flex justify-center items-center text-4xl text-center">
                            <div>
                                <div className="italic font-bold">
                                    <Link href={route("login")}>Log in</Link>
                                </div>
                                <p className="my-6 font-bold">or</p>
                                <div className="italic font-bold">
                                    <Link href={route("register")}>
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
