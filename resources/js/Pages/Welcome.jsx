import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div>
            <Head title="Welcome" />
            <div className="w-screen h-screen bg-cover bg-[url('img/welcome/background.jpg')] px-32 py-72 flex">
                <div className="w-2/3">
                    <div className='flex text-white text-8xl'>
                        <img src="img/welcome/TRUST_white.png" />
                        <p className='pl-1'>is Everything</p>
                    </div>
                </div>
                {
                    auth.user ? (
                        <Link
                            href={route('ownrecommendationlist')}
                        >
                            OwnRecommendationList
                        </Link>
                    ) : (
                        <div className='w-1/3 h-full'>
                            <div className='bg-white w-2/3 h-full flex justify-center items-center text-4xl text-center'>
                                <div>
                                    <div className='italic font-bold'>
                                        <Link
                                            href={route('login')}
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                    <p className='my-6 font-bold'>or</p>
                                    <div className='italic font-bold'>
                                        <Link
                                            href={route('register')}
                                        >
                                            Sign up
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                }
            </div >

        </div>

    )
}