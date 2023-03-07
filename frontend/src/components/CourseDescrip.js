import SemesterSide from "./SemesterSide"
import { useState, useEffect } from "react"
// import SideB

import styled from 'styled-components'
import ChatBox from "./ChatBox"

const StyledCourseDescrip = styled.div`
    display: flex;
`

const CourseDescrip = () => {
    const [discussionList, setDiscussionList] = useState(['Discussion1', 'Discussion2'])
    const [videoList, setVideoList] = useState(['Video1', 'Video2', 'Video3'])

    return(<StyledCourseDescrip>
            <SemesterSide semester='110-1' discussionList={discussionList} videoList={videoList}/>
            <ChatBox />
            {/* <SemesterSide semester='110-1' discussionList={discussionList} videoList={videoList}/> */}
        </StyledCourseDescrip>
    )
}

export default CourseDescrip