import { useEffect, useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MenuBook from '@mui/icons-material/MenuBook';
import ChatSharp from '@mui/icons-material/ChatSharp';
import VideoChatSharp from '@mui/icons-material/VideoChatSharp';
import styled from 'styled-components'

const StyledSemesterSide = styled.div`
    display: flex;
    flex-direction: column
`

const SemesterCollapseList = ({semester, discussionList, videoList}) => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    return(
        <StyledSemesterSide>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <MenuBook  />
                </ListItemIcon>
                <ListItemText primary={semester} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {discussionList.map((item, i) => (
                        <ListItemButton sx={{ pl: 4 }} key={i}>
                            <ListItemIcon>
                                <ChatSharp />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    ))}
                    {videoList.map((item, i) => (
                        <ListItemButton sx={{ pl: 4 }} key={i}>
                            <ListItemIcon>
                                <ChatSharp />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    ))}
                </List>
            </Collapse>
        </StyledSemesterSide>
    )
}

export default SemesterCollapseList