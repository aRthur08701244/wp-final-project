import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { useState } from 'react';
import GoogleSignIn from '../components/GoogleSignIn';
import CourseRoom from './CourseRoom';
import SplitPane from "react-split-pane";
import ButtonMUI from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import "../App.css";
import UserCourses from './UserCourses';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }), ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const theme = createTheme({
    palette: {
        primary: {
          main: '#939EB0',
        },
        secondary: {
          light: '#0066ff',
          main: '#0044ff',
          contrastText: '#ffcc00',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});


function DashboardContent() {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [messageApi, contextHolder] = message.useMessage();

    // const [modalOpen, setModalOpen] = useState(false);

    let w = window.innerWidth;
    let h = window.innerHeight;

    const handleClick = (val) => {
        console.log(val);
    }

    const columns = [
        {
            field: 'Enter',
            renderCell: (cellValues) => {
                return (
                    <NavLink to="chatRoom">
                    <ButtonMUI variant="contained" color="primary" onClick={(e) => {handleClick(e, cellValues)}}>
                        Link
                    </ButtonMUI>
                    </NavLink>
                )
            },
            width: '120',
            align: "center"
        },
        // { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'profName',
            headerName: 'Professor',
            width: 150,
            align: "center"
        },
        {
            field: 'courseName',
            headerName: 'Course',
            width: 315,
            align: "center",
        },
    ];
    
    const rows = [
        { id: 1, profName: 'Jon', courseName: 'Web Programming' },
        { id: 2, profName: 'Cersei', courseName: 42 },
        { id: 3, profName: 'Jaime', courseName: 45 },
        { id: 4, profName: 'Arya', courseName: 16 },
        { id: 5, profName: 'Daenerys', courseName: null },
        { id: 6, profName: "Ric", courseName: 150 },
        { id: 7, profName: 'Ferrara', courseName: 44 },
        { id: 8, profName: 'Rossini', courseName: 36 },
        { id: 9, profName: 'Harvey', courseName: 65 },
    ];
    

    return (
        <ThemeProvider theme={theme}>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                {contextHolder}
                <AppBar open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                            style={{display: "flex", justifyContent: "space-between"}}
                        >   
                            {/* title button and google sign in button */}
                            <IconButton color="inherit" onClick={() => (navigate('/'))}>Novel Together Universe</IconButton>
                            <GoogleSignIn messageApi={messageApi}/>
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                <SplitPane
                    split="vertical"
                    minSize={3/5*w} 
                    maxSize={w-250} 
                    defaultSize={3/5*w}
                    style={{display: "flex", height: "87%", position: "absolute", outline: "none", 
                            overflow: "hidden scroll",
                            flexDirection: "row",
                            top: "10%"}}
                >         
                       
                    <CourseRoom />

                    <UserCourses />

                </SplitPane>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}