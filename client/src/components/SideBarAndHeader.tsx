"use client";
import Image from "next/image";
import React from "react";
import Dayvid from "../assets/dayvid 1.png";
import Logo from "../assets/gestmedLogo branca.png";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DateRangeIcon from "@mui/icons-material/DateRange";
import HomeIcon from "@mui/icons-material/Home";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
// import { useAppSelector } from '../utils/useSelectorHook';
import { logoutUser } from "@/features/authSlice";
import { closeSideBar, openSideBar } from "@/features/sideBarSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
const manrope = Manrope({ subsets: ["latin"] });




const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  overflow: "auto",
  zIndex: 5,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
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
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SideBarAndHeader({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const open = useAppSelector((state) => state.sideBar.open);

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {

    dispatch(logoutUser());
    router.push("/");
  };



  const sideBarItems = {
    pages: user?.role === "Médico"
      ? [{ name: "Plantões", icon: <HomeIcon />, path: "/home" }, { name: "Solicitações de plantão", icon: <ManageAccountsSharpIcon />, path: "/userAccount" }]
      : [
        { name: "Plantões", icon: <HomeIcon />, path: "/home" },
        { name: "Escala Modelo", icon: <DateRangeIcon />, path: "/scale" },
        { name: "Médicos", icon: <PeopleIcon />, path: "/users" },
        { name: "Relatórios", icon: <SearchIcon />, path: "" },
        { name: "Solicitações de plantão", icon: <ManageAccountsSharpIcon />, path: "/userAccount" }
      ],
    configuration: user?.role === "Médico"
      ? [{ name: "Editar Conta", icon: <ManageAccountsSharpIcon />, path: "/userAccount" }]
      : [{ name: "Editar Conta", icon: <ManageAccountsSharpIcon />, path: "/userAccount" },],
  };

  return (
    <div className={manrope.className} >
      <Box sx={{ display: "flex", maxHeight: "100vh", overflowX: "auto" }}>
        <CssBaseline />
        <AppBar sx={{
          backgroundColor: "#FFFFFF", zIndex: "30",
          overflow: "hidden", height: "80px", justifyContent: "center"
        }} position="fixed" open={open}>
          <Toolbar sx={{ zIndex: 300 }} >
            <IconButton
              aria-label="open drawer"
              onClick={() => { dispatch(openSideBar()); }}
              edge="start"
              sx={{ zIndex: 300, mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <div title="Editar conta" className='flex flex-row items-center w-full  justify-end' >
              <Image className="h-14 w-14	mr-2 cursor-pointer	 " src={Dayvid} alt="Foto de perfil" />

              {/* <MdAccountCircle className="ml-auto  text-black w-7 h-7 " /> */}

              <div className='flex flex-col cursor-pointer ' >

                <p className=' text-black font-extrabold text-xl		'>
                  {/* Dr. Dayvid Santos */}
                  {user?.name}
                  {/* aqui vai ser DR caso doutor, e DRA. caso doutora, e nome normal caso seja adm/master */}
                </p>


                {user?.role === "Médico" ?
                  <span className='text-slate-500	' > {user.specialization}</span>
                  :
                  <span className='text-slate-500	'>{user?.role}</span>
                }
              </div>


            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            zIndex: 0,
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <div className='bg-[#025959] min-h-screen z-auto ' >

            <DrawerHeader  >
              <div className="flex justify-center mt-3 mb-6" >
                <div className='w-36 mr-4'>
                  <Link href='/home'>
                    <Image className="mr-10 " src={Logo} alt="Logo" />
                  </Link>
                </div>
                <div className=' mt-10 max-w-14  '>
                  <IconButton sx={{ color: "#fff" }} onClick={() => { dispatch(closeSideBar()); }}
                  >

                    <ChevronLeftIcon sx={{ width: "30px", height: "30px" }} />
                  </IconButton>
                </div>
              </div>
            </DrawerHeader>
            <Divider />
            <List className="mt-10" >
              {sideBarItems.pages.map((page, index) => (
                <Link onClick={() => { dispatch(closeSideBar()); }} key={page.name} href={page.path} passHref>
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
                <Link onClick={() => { dispatch(closeSideBar()); }} key={page.name} href={page.path} passHref>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: "#fff" }} >{page.icon}</ListItemIcon>
                    <h1 className='font-bold text-white text-xl ' >{page.name}</h1>

                  </ListItemButton>
                </Link>
              ))}
            </List>
            <button onClick={handleLogout} className="w-40 px-4 py-2 mt-20 ml-5 font-bold text-black bg-white rounded hover:bg-slate-200 ">
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

