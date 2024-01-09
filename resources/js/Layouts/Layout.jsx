import Header from "@/Components/Header";
import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";

const Layout = ({ children }) => {
    const userId = usePage().props.auth.user.id;
    const userName = usePage().props.auth.user.name;
    const userIcon = usePage().props.auth.user.icon;

    return (
        <div>
            <Header />
            <div className="flex w-full h-screen">
                <Sidebar
                    id={userId}
                    name={userName}
                    icon={userIcon}
                    className="w-1/6"
                />
                <main className="w-5/6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
