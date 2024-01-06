import Sidebar from "@/Components/Sidebar";
import { usePage } from "@inertiajs/react";

const Layout = ({ children }) => {

  const userName = usePage().props.auth.user.name;
  const userIcon = usePage().props.auth.user.icon;

    return (
        <div className="flex w-full h-screen">
            <Sidebar name={userName} icon={userIcon}/>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
