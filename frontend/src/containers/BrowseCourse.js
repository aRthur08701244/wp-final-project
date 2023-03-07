import styled from "styled-components";
import { useDisplay } from "./hooks/useDisplay";
import { useState, useEffect } from "react";
import { CAMPUS_QUERY, COURSE_SUBSCRIPTION, CREATE_COURSE_MUTATION } from "../graphql";
import { Button } from "antd";
import { ReadOutlined } from '@ant-design/icons';
import AddCourseModal from "../components/AddCourseModal";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import {message} from 'antd';
import { useNavigate } from 'react-router-dom'


const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        margin: 0;
        margin-right: 20px;
        font-size: 2em;
    }
`;

const BrowseCourse = () => {
    /* global google */
    // const [professor, setProfessor] = useState("Professor")
    const { me, campus, setCourseName, professor, setProfessor, setHasChosenCourse, userObj, signedIn, setAllCourse } = useDisplay()

    const [courseItem, setCourseItem] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [sendCourse] = useMutation(CREATE_COURSE_MUTATION)
    // const [getCourse, { data, loading, subscribeToMore }] = useLazyQuery(COURSE_QUERY, {fetchPolicy: 'cache-and-network'});
    const { data, loading, error, subscribeToMore } = useQuery(CAMPUS_QUERY, {variables: {campusName: campus}});
    
    const chooseCourse = (e) => {
        setProfessor(e.prof);
        setCourseName(e.name)
        setHasChosenCourse(true)
    }

    const navigate = useNavigate();
    const ToChatRoom = (e) => {
        if (!me) {
            alert("Please Sign In First");
            return;
        }
        setProfessor(e.prof);
        setCourseName(e.name);
        // setHasChosenCourse(true)
        const id = e.name.replace(' ', '-');
        navigate('/chatroom/$' + id);
    }

    useEffect(() => {
        subscribeToMore({
            document: COURSE_SUBSCRIPTION,
            variables: {campusName: campus},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                
                // console.log(prev, subscriptionData.data)
                const course = subscriptionData.data.course;
                return {
                campus: [...prev.campus, course],
                };
            },
        });
    }, [subscribeToMore]);


    useEffect(() => {
        if (data) {
            setCourseItem(data.campus);
            setAllCourse(data.campus);
        }
    }, [data])

    return(
        <div style={{display: "flex", flexDirection: "column",alignItems: "center", justifyContent: "center", margin: "1%", color: "black"}}>
            <h1>Choose or Create A Course</h1>
            <Button icon={<ReadOutlined />} color="blue" size="large" onClick={() => {
                // if (!signedIn) message.open({type: 'error', content: 'Please Sign In First'})
                if (!me) alert("Please Sign In First")
                else setModalOpen(true);
            }}> 
                + 
            </Button>
        
            {/* <Button icon={<ReadOutlined />} color="blue" size="large" onClick={() => setModalOpen(true)}> + </Button> */}
            {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', flexDirection: 'row'}}> */}
                <div style={{display: "flex", flexDirection: "row", flexWrap: 'wrap'}}>
                {courseItem
                ? courseItem.map((course, i) => {
                    return (
                        <div key={i} style={{display: 'flex', margin: '2%', flexWrap: 'wrap'}}>
                            <ButtonBase onClick={() => ToChatRoom( course )}>
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        p: 2,
                                        margin: 'auto',
                                        width: 210,
                                        height: 210,
                                        maxWidth: 210,
                                        alignItems: "center",
                                        overflow: 'auto',
                                        justifyContent: 'center',
                                        // maxHeight: '200',
                                        flexWrap: 'wrap',
                                        backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                                    }}
                                >
                                    
                                        <Grid container spacing={1} style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '150', alignItems: 'center'}}>
                                            <Grid item container direction="column">
                                                <h1 style={{display: 'flex', justifyContent: 'center'}}>
                                                    {course.name.split('_')[1]}
                                                </h1>
                                            </Grid>

                                            <Grid item xs={3} sm container>
                                                <Grid item xs container direction="column" spacing={2}>
                                                    <Grid item>
                                                        <Typography gutterBottom variant="subtitle1" component="div">
                                                            Prof: {course.prof}
                                                        </Typography>
                                                        {/* <Typography variant="body2" gutterBottom>
                                                            Semester: 111-1
                                                        </Typography> */}
                                                        <Typography variant="body2" color="text.secondary">
                                                            Creator: {course.author}
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                </Paper>
                            </ButtonBase>
                        </div>
                    )
            }) 
            : <></>}
                </div>
            {/* </Container> */}

            <AddCourseModal
                open={modalOpen}
                onCreate={({ course, professor }) => {
                    console.log(campus, course, professor, userObj.name)
                    sendCourse({
                        variables: {
                            campusName: campus,
                            courseName: course,
                            profName: professor,
                            author: me
                        }
                    })

                    setModalOpen(false)
                }}
                onCancel={() => {
                    setModalOpen(false)
                }}
            />
        </div>
    )
}

export default BrowseCourse