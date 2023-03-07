import { useState, useEffect, createContext, useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client"
import { CAMPUS_QUERY, COURSE_QUERY
    , CREATE_CAMPUS_MUTATION, CREATE_COURSE_MUTATION, CREATE_SEMESTER_MUTATION, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION
    , COURSE_SUBSCRIPTION, SEMESTER_SUBSCRIPTION, CHATBOX_SUBSCRIPTION, MESSAGE_SUBSCRIPTION } from "../../graphql"
import { message } from 'antd'

const LOCALSTORAGE_ME = "save-me";
const saveMe = localStorage.getItem(LOCALSTORAGE_ME);

const LOCALSTORAGE_COURSENAME = "save-courseName"
const saveCourseName = localStorage.getItem(LOCALSTORAGE_COURSENAME);

const LOCALSTORAGE_PROFNAME = "save-profName"
const savePROFName = localStorage.getItem(LOCALSTORAGE_PROFNAME);

const DisplayContext = createContext({
    status: {},

    me: "",
    setMe: () => {},

    campus: "",
    setCampus: () => {},

    userObj: {},
    setUserObj: () => {},

    allCourse: [],
    setAllCourse: () => {},
    
    professor: "",
    setProfessor: () => {},

    signedIn: false,
    setSignedIn: () => {},

    messages: [],
    setMessages: () => {},

    semester: "",
    setSemester: () => {},

    topic: "",
    setTopic: () => {},

    chatBoxes: [],
    setChatBoxes: () => {},

    display: "",
    setDisplay: () => {},

    courseName: "",
    setCourseName: () => {},

    hasChosenCourse: false,
    setHasChosenCourse: () => {},

    displayStatus: () => {},
})

const DisplayProvider = (props) => {
    const [display, setDisplay] = useState('CourseDescrip') // 決定右側介面要顯示討論串，或者視訊功能．．．．
    const [status, setStatus] = useState({});

    const [allCourse, setAllCourse] = useState([]);

    const [me, setMe] = useState(saveMe || ''); // useState(saveMe || 'Jane');

    const [userObj, setUserObj] = useState({});
    const [professor, setProfessor] = useState(savePROFName || "")
    const [signedIn, setSignedIn] = useState(false);

    const [campus, setCampus] = useState("NTU")
    const [messages, setMessages] = useState([]);
    const [courseName, setCourseName] = useState(saveCourseName || '')

    const [semester, setSemester] = useState('')
    const [topic, setTopic] = useState('')

    const [chatBoxes, setChatBoxes] = useState([])

    const [hasChosenCourse, setHasChosenCourse] = useState(false);

    // const [getCampus, { data: campusData, loading: campusLoading, subscribeToMore: campusSubs}] = useLazyQuery(CAMPUS_QUERY, {fetchPolicy: 'cache-and-network'});
    // const [getCourse, { data: courseData, loading: courseLoading, subscribeToMore: courseSubs}] = useLazyQuery(COURSE_QUERY, {fetchPolicy: 'cache-and-network'});

    // const [createCampus] = useMutation(CREATE_CAMPUS_MUTATION)
    // const [createCourse] = useMutation(CREATE_COURSE_MUTATION)
    // const [createSemester] = useMutation(CREATE_SEMESTER_MUTATION)
    // const [createChatBox] = useMutation(CREATE_CHATBOX_MUTATION)
    // const [createMessage] = useMutation(CREATE_MESSAGE_MUTATION)

    const displayStatus = (payload) => {
        if (payload.msg) {
            const {type, msg} = payload;
            const content = { content: msg, duration: 0.5}
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                // default:
                    message.error(content);
                    break;
                default:
                    break;
            }
        }
      }

    // useEffect(() => {
    //     if (signedIn) {
    //         localStorage.setItem(LOCALSTORAGE_ME, me);
    //     }
    // }, [signedIn]);
    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_ME, me);
        setChatBoxes([])
        // setCourseName('')
        // setProfessor('')
    }, [me])

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_COURSENAME, courseName);
        // console.log()
    }, [courseName])

    useEffect(() => {
        localStorage.setItem(LOCALSTORAGE_PROFNAME, professor)
    }, [professor])

    return(
        <DisplayContext.Provider
            value={{
                status,

                me,
                setMe,

                userObj,
                setUserObj,

                allCourse,
                setAllCourse,

                campus,
                setCampus,

                professor,
                setProfessor,

                signedIn,
                setSignedIn,

                messages,
                setMessages,

                semester,
                setSemester,

                topic,
                setTopic,

                chatBoxes,
                setChatBoxes,

                display,
                setDisplay,

                courseName,
                setCourseName,

                hasChosenCourse,
                setHasChosenCourse,

                displayStatus

            }}
            {...props}
        />
    )
}

const useDisplay = () => useContext(DisplayContext)

export {DisplayProvider, useDisplay};