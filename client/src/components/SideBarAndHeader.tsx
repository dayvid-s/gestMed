'use client'
import React from 'react';
import Logo from '../assets/gestmedLogo branca.png'
import Dayvid from '../assets/dayvid 1.png'
import Image from 'next/image';

import Link from 'next/link';
import { FaFile } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import { MdAccountCircle } from "react-icons/md";
import { Manrope } from 'next/font/google';
// import { useAppSelector } from '../utils/useSelectorHook';
const manrope = Manrope({ subsets: ['latin'] })


const sideBarItems = {
    pages: [
        { name: 'Horários', icon: <HomeIcon />, path: '/home' },
        { name: 'Médicos', icon: <PeopleIcon />, path: '/users' },
        { name: 'Relatórios', icon: <SearchIcon />, path: '/report' },
    ],
    configuration: [
        { name: 'Editar Conta', icon: <ManageAccountsSharpIcon />, path: '/userAccount' },
    ],
};
const drawerWidth = 240;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    overflow: 'auto',
    zIndex: 5,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function SideBarAndHeader({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);
    // const userName = useAppSelector((state) => state.user.name);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={manrope.className} >
            <Box sx={{ display: 'flex', maxHeight: "100vh", overflowX: "auto" }}>
                <CssBaseline />
                <AppBar sx={{
                    backgroundColor: "#FFFFFF", zIndex: "30",
                    overflow: 'hidden', height: "80px", justifyContent: 'center'
                }} position="fixed" open={open}>
                    <Toolbar sx={{ zIndex: 300 }} >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ zIndex: 300, mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div title="Editar conta" className='flex flex-row items-center w-full  justify-end' >
                            <Image className="h-14 w-14	mr-2 cursor-pointer	 " src={Dayvid} alt="Foto de perfil" />

                            {/* <MdAccountCircle className="ml-auto  text-black w-7 h-7 " /> */}

                            <div className='flex flex-col cursor-pointer ' >

                                <p className=' text-black font-extrabold text-xl		'>
                                    Dr. Dayvid Santos
                                    {/* {userName} */}
                                </p>

                                <span className='text-slate-500	' > Cardiologista</span>
                            </div>


                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        zIndex: 0,
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <div className='bg-[#025959] min-h-screen z-auto ' >

                        <DrawerHeader  >
                            <div className="flex justify-center mt-3" >
                                <div className='w-36'>
                                    <Link href='/home'>
                                        <Image className="mr-5 " src={Logo} alt="Logo" />
                                    </Link>
                                </div>

                                <IconButton sx={{ color: "#fff" }} onClick={handleDrawerClose}>
                                    <ChevronLeftIcon sx={{ marginLeft: "15px", width: "30px", height: "30px" }} />
                                </IconButton>
                            </div>
                        </DrawerHeader>
                        <Divider />
                        <List className="mt-10" >
                            {sideBarItems.pages.map((page, index) => (
                                <Link key={page.name} href={page.path} passHref>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: "#fff" }}  >{page.icon}</ListItemIcon>
                                        {/* <ListItemText  primary={page.name} /> */}
                                        <h1 className='font-bold text-white text-xl ' >{page.name}</h1>
                                    </ListItemButton>
                                </Link>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {sideBarItems.configuration.map((page, index) => (
                                <Link key={page.name} href={page.path} passHref>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: "#fff" }} >{page.icon}</ListItemIcon>
                                        <h1 className='font-bold text-white text-xl ' >{page.name}</h1>

                                    </ListItemButton>
                                </Link>
                            ))}
                        </List>
                        <button className="w-40 px-4 py-2 mt-20 ml-5 font-bold text-black bg-white rounded hover:bg-blue-700 ">
                            Sair da Conta
                        </button>
                    </div>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />

                    {children}


                </Main>
            </Box>
        </div>
    );
}

