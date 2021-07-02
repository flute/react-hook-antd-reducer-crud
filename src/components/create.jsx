import React, { useContext, useEffect } from 'react'
import { Modal, Form, Input } from 'antd'
import { Context } from '../store'
import { setModal, create, update } from '../store/actions'
import { EDIT, VIEW } from '../constants/modal'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const Create = () => {
  const [form] = Form.useForm()
  const { state, dispatch } = useContext(Context);
  const {
    loading,
    modal: {
      visible,
      title,
      type
    },
    formData
  } = state
  const isEdit = type === EDIT
  const readonly = type === VIEW

  useEffect(() => {
    if (visible) form.setFieldsValue(formData)
  }, [visible, formData])

  const handleOk = () => {
    if (readonly) return handleCancel()
    form.submit()
  }
  const handleCancel = () => {
    dispatch(setModal({ visible: false }))
  }

  const onFinish = (values) => {
    if (isEdit) {
      dispatch(update(values))
    } else {
      dispatch(create(values))
    }
  }

  return <div>
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
      getContainer={false}
      destroyOnClose={true}
      confirmLoading={loading}
    >
      <Form
        {...layout}
        form={form}
        name="form"
        initialValues={formData}
        preserve={false}
        onFinish={onFinish}
      >
        <fieldset disabled={readonly}>
          {
            isEdit ? <Form.Item label="编辑项的ID" name="id" hidden={true}><Input /></Form.Item> : ''
          }
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder='请输入姓名'/>
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input placeholder='请输入年龄' />
          </Form.Item>

          <Form.Item
            label="通讯地址"
            name="address"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder='请输入通讯地址' />
          </Form.Item>
        </fieldset>
      </Form>
    </Modal>
  </div>
}

export default Create