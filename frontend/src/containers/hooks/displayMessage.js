import {message} from 'antd';

export default function Message({status, msg}) {
    console.log("message called", status, msg)

    // const [messageApi, contextHolder] = message.useMessage();
    // const success = () => {
    //     messageApi.open({
    //       type: status,
    //       content: msg,
    //     });
    // };

    // return (
    //     <>
    //         {contextHolder}
    //     </>
    // )

    switch(status) {
        case "success":
            console.log("asdasd")
            message.success({content: msg, duration: 5});
            break;
        case "error":
            message.error(msg);
            break;
        case "warning":
            message.warning(msg);
            break;
        default:
            break;
    }
}