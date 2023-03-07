import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useDisplay } from "../containers/hooks/useDisplay";



const VideoRoom = () => {
    const navigate = useNavigate();
    const { me } = useDisplay()
    const { roomID } = useParams();
    const meeting = async (element) => {
        // const appID = 946219318;
        const appID = 388399556
        // const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
        const serverSecret = "3b643de3b114ebfd7e9352442b9ce479"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            me
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });
    };

    return (
        <div ref={meeting} style={{ width: "100vw", height: "100vh" }}>
        </div>
    )
};

export default VideoRoom
