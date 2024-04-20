import { ReactElement } from 'react';
import SideBarAndHeader from '../../components/SideBarAndHeader';
// import { GeistSans } from "geist/font/sans";

interface AuthenticatedLayoutProps {
    children: ReactElement;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (<>
        {/* <div className={GeistSans.className} > */}
        <SideBarAndHeader>{children}</SideBarAndHeader>
        {/* </div> */}
    </>

    )
}