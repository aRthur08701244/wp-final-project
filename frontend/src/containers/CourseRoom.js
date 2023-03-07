import CourseDescrip from "../components/CourseDescrip";
import { useState, useEffect } from "react"
import { useDisplay } from "./hooks/useDisplay"
import ChatRoom from "./ChatRoom";
import styled from "styled-components";
import BrowseCourse from "./BrowseCourse";

// const Wrapper = styled.div `
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     width: 1000px;
//     margin: auto;
//     flex-wrap: wrap;
// `;
const Wrapper = styled.div `
    
`;


const CourseRoom = ({modalOpen, setModalOpen}) => {
    const {display, setDisplay, hasChosenCourse} = useDisplay();

    return(
        <>
            {/* <CourseDescrip/> */}
            <Wrapper>
                { hasChosenCourse ? <ChatRoom /> : <BrowseCourse modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
            </Wrapper>
        </>
        
    )
}

export default CourseRoom