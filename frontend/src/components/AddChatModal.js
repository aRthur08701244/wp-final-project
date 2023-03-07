import { Modal, Form, Input, Radio } from "antd"

const AddChatModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return(
        <Modal
            open={open}
            title="Create a new chat room"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((e) => { window.alert(e); })
            }}>
            <Form form={form} layout="vertical" name="form_in_modal" >
                <Form.Item name="name_semester" label="Semester" rules={[{required: true, message: "Error, please enter the name of the semester to chat!"}, ]} >
                    <Input />
                </Form.Item>
                <Form.Item name="name_topic" label="Topic" rules={[{required: true, message: "Error, please enter the name of the topic to chat!"}, ]} >
                    <Input />
                </Form.Item>
                <Form.Item name="id_room" label="Video (Only needed if you want to join a specific video chatroom)" >
                    <Input />
                </Form.Item>
                <Form.Item name="name_ftn" label="Function" rules={[{required: true, message: "Error, please enter the name of the function to chat!"}, ]}>
                    <Radio.Group>
                        <Radio value="message"> Message Chat </Radio>
                        <Radio value="video"> Video Chat </Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddChatModal;