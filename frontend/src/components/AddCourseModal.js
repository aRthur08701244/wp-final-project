import { Modal, Form, Input } from 'antd'

const AddCourseModal = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return(
        <Modal
            open={open}
            title="Create a new course"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        // console.log(values)
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((e) => { window.alert("You Need to Enter a Course Name and a Professor's Name"); })
            }}
        >
            <Form form={form} layout="horizontal" name="form_in_modal" >
                <Form.Item name="course" label="Course" rules={[{required: true, message: "Error, please enter the course!"}, ]} >
                    <Input />
                </Form.Item>
                <Form.Item name="professor" label="Professor" rules={[{required: true, message: "Error, please enter the professor!"}, ]} >
                    <Input />
                </Form.Item>
                {/* <Form.Item name="func" label="Function" rules={[]} >
                    <Input />
                </Form.Item> */}
            </Form>
        </Modal>
    )
}

export default AddCourseModal;