import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import styled from 'styled-components';
import Button from '@mui/material/Button'
import { useDisplay } from "../containers/hooks/useDisplay";
import { useNavigate } from "react-router-dom";

const LogIn = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const GoogleSignIn = (messageApi) => {
    const [user, setUser] = useState({});
    const [withUser, setWithUser] = useState(false);

    const { setMe, setUserObj, setSignedIn } = useDisplay();

    const handleCallbackResponse = (res) => {
        let userObj = jwt_decode(res.credential);
        // console.log(userObj);
        setUser(userObj);
        document.getElementById("signInDiv").hidden = true;
        // messageApi.messageApi.open({type: "success", content: `Welcome ${userObj.name}`, duration: 8});
        setMe(userObj.email);
        setUserObj(userObj);
        setSignedIn(true);
    };

    // handle signout
    const navigate = useNavigate();
    const handleSignOut = (e) => {
        setUser({});
        document.getElementById("signInDiv").hidden = false;
        // messageApi.messageApi.open({type: "success", content: `Sign Out Success`});
        // setSignedIn(false);
        // setUserObj({});
        navigate('/');
    };

    // google log in
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "172867135954-6afmb9cr16ac2jtgdt4g1ntmemob8rjm.apps.googleusercontent.com",
            callback: handleCallbackResponse,
            auto_select: true
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );

        // google.accounts.id.prompt();
    }, []);

    useEffect(() => {
        if (Object.keys(user).length !== 0) setWithUser(true);
        else setWithUser(false);
    }, [user]);

    return (
        <LogIn>
            <div id="signInDiv"></div>
            
            {
                (withUser === true) &&
                <div style={{display: "flex", alignItems: "center", marginRight: "1rem"}}>
                    <img alt="" src={user.picture} style={{width: "2rem", height: "2rem", borderRadius: "50%", marginRight: "0.5rem"}}></img>
                    <p>{user.name}</p>
                </div>
            }
            {
                Object.keys(user).length !== 0 &&
                <Button color="error" variant="outlined" onClick={(e) => handleSignOut(e)}>Sign Out</Button>
            }
        </LogIn>
    )
};


export default GoogleSignIn;