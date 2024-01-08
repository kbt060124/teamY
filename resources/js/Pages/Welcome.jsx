import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";

export default function Welcome({ auth, status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        remember: false,
    });
    const [loginFlg, setLoginFlg] = useState(true);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submitLogin = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    const submitSignup = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    const handleLoginFlgOff = () => {
        reset("name", "email", "password", "password_confirmation");
        setData("remember", false);
        setLoginFlg(false);
    };

    const handleLoginFlgOn = () => {
        reset("name", "email", "password", "password_confirmation");
        setData("remember", false);
        setLoginFlg(true);
    };

    if(auth.user){
        //ログイン済みだったらホームへ遷移
        router.visit(route("home"),{method:"get"});
    }

    return (
        <div>
            <Head title="Welcome" />
            <div className="w-screen h-screen bg-cover bg-[url('img/welcome/background.jpg')] px-16 flex items-center">
                <div className="h-2/3">
                    <div className="flex text-white text-7xl">
                        <img src="../img/welcome/TRUST_white.png" />
                        <p className="pl-1">is Everything</p>
                    </div>
                </div>
                    <div className="h-2/3  mx-auto">
                        {/* <div className="bg-white h-full px-10 ml-5 flex justify-center items-center text-4xl text-center">
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
                        </div> */}
                        
                            {loginFlg ? (
                                <div className="bg-white h-3/4 px-16 ml-5 flex justify-center items-center text-4xl text-center shadow-md">
                                <form onSubmit={submitLogin}>
                                    <h2 className="mb-4">Log in</h2>
                                    <div>
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                            className="text-left"
                                        />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                            className="text-left"
                                        />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="block mt-4">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) =>
                                                    setData(
                                                        "remember",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                            <span className="ms-2 text-sm text-gray-600">
                                                Remember me
                                            </span>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-end mt-4">
                                        <div>
                                            <div
                                                onClick={() =>
                                                    handleLoginFlgOff()
                                                }
                                                className="underline cursor-pointer text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Create your account
                                            </div>
                                            {canResetPassword && (
                                                <div>
                                                    <Link
                                                        href={route(
                                                            "password.request"
                                                        )}
                                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        Forgot your password?
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Log in
                                        </PrimaryButton>
                                    </div>
                                </form>
                                </div>
                            ) : (
                                <div className="bg-white h-full px-16 ml-5 flex justify-center items-center text-4xl text-center shadow-md">
                                <form onSubmit={submitSignup}>
                                    <h2 className="mb-4">Sign up</h2>
                                    <div>
                                        <InputLabel
                                            htmlFor="name"
                                            value="Name"
                                            className="text-left"
                                        />

                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="email"
                                            value="Email"
                                            className="text-left"
                                        />

                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password"
                                            value="Password"
                                            className="text-left"
                                        />

                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel
                                            htmlFor="password_confirmation"
                                            value="Confirm Password"
                                            className="text-left"
                                        />

                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center justify-end mt-4">
                                        <div
                                            onClick={() => handleLoginFlgOn()}
                                            className="underline cursor-pointer text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Already registered?
                                        </div>

                                        <PrimaryButton
                                            className="ms-4"
                                            disabled={processing}
                                        >
                                            Register
                                        </PrimaryButton>
                                    </div>
                                </form>
                                </div>
                            )}
                       
                    </div>
            </div>
        </div>
    );
}
