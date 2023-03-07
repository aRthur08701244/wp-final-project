import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Title from "../components/Title";
// import Message from "../components/Message";
import { useDisplay } from "./hooks/useDisplay"
import { Tabs, Input } from "antd";
import ChatModal from "../components/AddChatModal";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import {CAMPUS_QUERY, COURSE_QUERY
        , CREATE_CAMPUS_MUTATION, CREATE_COURSE_MUTATION, CREATE_SEMESTER_MUTATION, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION
        , COURSE_SUBSCRIPTION, SEMESTER_SUBSCRIPTION, CHATBOX_SUBSCRIPTION, MESSAGE_SUBSCRIPTION} from "../graphql"
import ExtractChatbox from "../components/ExtractChatbox";
import { useNavigate, useParams } from "react-router-dom";
import GoogleSignIn from "../components/GoogleSignIn";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";

// const makeName = (name, to) => { return String([name, to].sort().join('_')); };

const ChatRoomWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
	justify-content: center;
`

const ChatBoxesWrapper = styled(Tabs)`
  display: flex;
  justify-content: center;
	// width: 95%;
	height: 70%;
	backgroubd: eeeeee52;
	border-radius: 10px;
	margin: 5%;
	padding: 20px;
	overflow: auto;
`;

// const drawerWidth = 240;
// const theme = createTheme({
//   palette: {
//       primary: {
//         main: '#939EB0',
//       },
//       secondary: {
//         light: '#0066ff',
//         main: '#0044ff',
//         contrastText: '#ffcc00',
//       },
//       contrastThreshold: 3,
//       tonalOffset: 0.2,
//   },
// });
// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }), ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const ChatRoom = () => {
    const { id } = useParams();

    const navigate = useNavigate()

    const { status
      , me
      , messages, setMessages
      , semester, setSemester
      , topic, setTopic
      , campus
      , courseName, setCourseName
      , professor, setProfessor
      , chatBoxes, setChatBoxes
      , displayStatus } = useDisplay()

    // const [chatBoxes, setChatBoxes] = useState([]) // [...{label, children, key}]
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false) // ?
    const [modalOpen, setModalOpen] = useState(false)
    const [lastCourseData, setLastCourseData] = useState()
    const [complete, setComplete] = useState(false)

    const msgRef = useRef(null) // ?
    const msgFooter = useRef(null) // ?

    // const [getCourse, { data: courseData, loading: courseLoading, subscribeToMore: courseSubs}] = useLazyQuery(COURSE_QUERY, {fetchPolicy: 'cache-and-network'});
    const { data: courseData, loading: courseLoading, subscribeToMore } = useQuery(COURSE_QUERY, {variables: {campusName: campus, courseName, profName: professor}});
    const [sendSemester] = useMutation(CREATE_SEMESTER_MUTATION)
    const [sendChatBox] = useMutation(CREATE_CHATBOX_MUTATION)
    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION)

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: "start" });
    } // google查詢\?.

    const createChatBox = async (semester, topic) => {
        if (chatBoxes.some(({key}) => key === semester)) {
            // console.log(chatBoxes.some(({key}) => key === semester))
            throw new Error(semester + "'s chat box has already opened.");
        }

        //   sendSemester({
        //     variables: {
        //       courseName,
        //       semesterName: semester,
        //       profName: professor
        //     }
        //   })

        sendChatBox({
            variables: {
            courseName,
            semesterName: semester,
            chatboxName: topic,
            profName: professor
            }
        })

        setMsgSent(true);
        return semester
    };
    

    const removeChatBox = (targetKey, semester) => {
        const index = chatBoxes.findIndex(({key}) => key === semester);
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        
        setChatBoxes(newChatBoxes);
        return(
            semester ? 
            (semester === targetKey ?
                (index === 0 ?
                '' : chatBoxes[index - 1].key)
            : semester)
            : ''
        )
    };

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false)
    }, [msgSent])

    useEffect(() => {
        displayStatus(status)
    }, [status])

    useEffect( () => {
        console.log(courseData)
        if (courseData) {
            if (courseData == lastCourseData) { console.log('Block') }
            else {
                setLastCourseData(courseData)
                let semesterList = courseData.course.semesters
                if (semesterList.length == 0) {
                    setChatBoxes((chatBoxes) => ExtractChatbox({ chatBoxes, newMsgData: [], me, msgFooter, boxIndex:-1}))
                    // setSemester("InitialPage")
                }
                else {
                    let chatboxList = []
                    for (let i = 0; i < semesterList.length; i++) {
                        // console.log(courseData.course.semesters[i].chatboxes)
                        // if (!courseData.course.semesters[i].chatboxes) continue
                        // if (courseData.course.semesters[i].chatboxes.length == 0) continue
                        for (let j = 0; j < semesterList[i].chatboxes.length; j++) {
                            // console.log(i, j, semesterList[i].chatboxes[j])
                            // console.log(semesterList[i].chatboxes[j])
                            let boxName = semesterList[i].chatboxes[j].name
                            boxName = boxName.split('_').slice(2, 4).join('_')
                            const boxIndex = chatBoxes.findIndex(({key}) => key === boxName)
                            let newMsgData = semesterList[i].chatboxes[j].messages
                            if (!newMsgData) newMsgData = []
                            // if (chatBoxes.map(item => item.label).indexOf())
                            setChatBoxes((chatBoxes) => ExtractChatbox({ chatBoxes, newMsgData, me, msgFooter, boxIndex, boxName }))
                            setSemester(boxName)
                        }
                    }
                }
            }
        }
        // console.log(chatBoxes)
        setComplete(true)
    }, [courseData] )

    useEffect(() => {
        // console.log(chatBoxes.map(item => item.label))
        // console.log(chatBoxes)
        if (complete) {

            let reverseChatBox = chatBoxes.reverse()
            reverseChatBox = reverseChatBox.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.label === value.label
                ))
            )
            setChatBoxes(
                reverseChatBox.reverse()
            )
        }
        // console.log(chatBoxes)
    }, [complete])

	useEffect(() => {
        subscribeToMore({
            document: SEMESTER_SUBSCRIPTION,
            variables: {courseName},
            updateQuery: (prev, { subscriptionData }) => {
				// console.log('prev', prev)
				// console.log('data', subscriptionData.data)
                if (!subscriptionData.data) return prev;
                const newSemester = subscriptionData.data.semester;
                return {
					course: {
						__typename: 'Course'
						, name: prev.course.name
                        , prof: prev.course.prof
						, semesters: [...prev.course.semesters, newSemester] }
				}
            },
        });
    }, [subscribeToMore]);
  
    return (
        <div>
        <AppBar open={true} style={{background: '#939EB0'}}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
            <Typography
                component="h1"
                variant="h6"
                color="black"
                noWrap
                sx={{ flexGrow: 1 }}
                style={{display: "flex", justifyContent: "space-between", color: "black"}}
            >   
                <IconButton color="black" style={{color: "black"}} onClick={() => {
                    navigate('/')
                    setCourseName('')
                    setProfessor('')
                    setChatBoxes([])
                }}>
                    Novel Together Universe
                </IconButton>
                {/* <GoogleSignIn /> */}
            </Typography>
            </Toolbar>
        </AppBar>

        <ChatRoomWrapper style={{display: 'flex', flexDirection: 'column', marginTop: "8%"}}>

            <Title name={courseName} />
            <ChatBoxesWrapper
                tabPosition={'left'}
                tabBarStyle={{width: "110px"}}
                type="editable-card"
                activeKey={semester}
                items={chatBoxes}
                // items={[{label: 'Steven', children:[<Message name={'fds'} isMe={'fds'===me} message={'Hi'} key={0} />]}]}
                onChange={ key => setSemester(key) }
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') setSemester(removeChatBox(targetKey, semester));
                }}
            >

            </ChatBoxesWrapper>


            <ChatModal
                open={modalOpen}
                onCreate={({ name_semester, name_topic, name_ftn, id_room }) => {
                    setSemester(name_semester)
                    setTopic(name_topic)
                    if (name_ftn === 'message') {
                    createChatBox(name_semester, name_topic)
                    }
                    else {
                    let RoomCode = 0
                    if (!id_room) {
                        RoomCode = parseInt(String(name_semester.replace(/\s/g, '').charCodeAt(0)) + String(name_topic.replace(/\s/g, '').charCodeAt(0)))
                    }
                    else {
                        RoomCode = parseInt(String(name_semester.replace(/\s/g, '').charCodeAt(0)) + String(name_topic.replace(/\s/g, '').charCodeAt(0)) + String(id_room.replace(/\s/g, '').charCodeAt(0)))
                    }
                        // console.log(RoomCode)
                    navigate(`/chatroom/${id}/${RoomCode}`);
                    }
                    setModalOpen(false)
                }}
                onCancel={() => {
                    setModalOpen(false)
                }}
            />
    
            <Input.Search
                ref={msgRef}
                value={msg} // 這行
                onChange={(e) => setMsg(e.target.value)} // 跟這行“或許”可以省略
                enterButton="Send" // button 樣式
                placeholder="Type a message here..."
                onSearch={async (msg) => {
                    if (!msg || !courseName) {
                    displayStatus({
                        type: 'error',
                        msg: 'Please enter a message body.'
                    })
                    return
                    }
                    // alterMessage()

                    sendMessage({
                    variables: {
                        courseName,
                        semesterName: semester.split('_')[0],
                        chatboxName: semester.split('_')[1],
                        profName: professor,
                        sender: me,
                        body: msg
                    }
                    })
                    // console.log(courseName, semester.split('_')[0], semester.split('_')[1], professor, me, msg)
                    setMsg('')
                    setMsgSent(true)
                }}
                style={{position: "relative", left: "6%", width: "90%"}}
            ></Input.Search>
        </ChatRoomWrapper>
        </div>
    )
}

export default ChatRoom;