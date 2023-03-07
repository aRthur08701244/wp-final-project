import styled from "styled-components";
import Message from "./Message";
import { Tabs } from "antd";

const ChatBoxWrapper = styled.div`
  width: 93%;
  height: 350px;
  background: #eeeeeeee;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
  left: 100px;
`;

// const LittleChatBoxesWrapper = styled(Tabs)`
//   width: 100%;
//   height: 70%;
//   backgroubd: eeeeee52;
//   border-radius: 10px;
//   margin: 20px;
//   padding: 20px;
//   overflow: auto;
// `;



const FootRef = styled.div`
    height: 20px;
`;

const ExtractChatbox = ({ chatBoxes, newMsgData, me, msgFooter, boxIndex, boxName }) => {
    // console.log(chatBoxes, newMsgData, me, msgFooter, boxIndex, boxName)
    return (
        chatBoxes.length == 0
        ?
        [{ label: boxName, children: newMsgData.length === 0
        	?
        	<ChatBoxWrapper>
            	<p style={{ color: '#ccc' }}> No messages... </p>
            	<FootRef ref={msgFooter} />
          	</ChatBoxWrapper>
    		:
          	<ChatBoxWrapper>
            	{newMsgData.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
            	<FootRef ref={msgFooter} />
          	</ChatBoxWrapper>
          	, key: boxName }]
        : 
        (boxIndex == -1)
            ?
            [...chatBoxes, { label: boxName, children: newMsgData.length === 0
                ?
                <ChatBoxWrapper>
                    <p style={{ color: '#ccc' }}> No messages... </p>
                    <FootRef ref={msgFooter} />
                </ChatBoxWrapper>
                :
                <ChatBoxWrapper>
                    {newMsgData.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
                    <FootRef ref={msgFooter} />
                </ChatBoxWrapper>
            , key: boxName }]
            :
            chatBoxes.map(({ label, children, key }) => {
                return {
                    label,
                    children: boxName === label 
                    ? (newMsgData.length === 0
                        ?
                        <ChatBoxWrapper>
                            <p style={{ color: '#ccc' }}> No messages... </p>
                            <FootRef ref={msgFooter} />
                        </ChatBoxWrapper>
                        :
                        <ChatBoxWrapper>
                            {newMsgData.map(({ sender, body }, i) => (<Message name={sender} isMe={sender===me} message={body} key={i} />))}
                            <FootRef ref={msgFooter} />
                        </ChatBoxWrapper>) 
                    : children,
                    key,
              };
            })

      )
}

export default ExtractChatbox;