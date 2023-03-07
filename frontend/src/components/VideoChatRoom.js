import { Button } from "antd";
import VideoRoom from "./VideoRoom";
import { NavLink, useNavigate } from "react-router-dom";

const VideoChatRoom = () => {
    const navigate = useNavigate()
    return(
        <>
            <NavLink to='/'>
                <Button size='large' style={{left: '45%', position: 'relative', top: '20%'}}>
                    Go Back to Dashboard
                </Button>
            </NavLink>
            <VideoRoom />
        </>
    )
};

export default VideoChatRoom