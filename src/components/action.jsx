import React, { useContext } from 'react'
import { Button, Form, Input, Space, Row, Col } from 'antd'
import { PlusOutlined, SearchOutlined, ClearOutlined } from '@ant-design/icons'
import { Context, initPageSize } from '../store'
import { setModal, getList, setSearchQuery } from '../store/actions'

const Action = () => {
  const [searchForm] = Form.useForm()
  const { state, dispatch } = useContext(Context);
  const handleCreate = () => {
    dispatch(setModal({ visible: true }))
  }

  const onSearch = (query) => {
    const searchQuery = {
      ...query,
      ...initPageSize
    }
    dispatch(setSearchQuery(searchQuery))
    dispatch(getList(searchQuery))
  }

  const onReset = _ => {
    searchForm.resetFields()
    searchForm.submit()
  }

  return <div className='curd-action'>
    <Row wrap={false}>
      <Col flex="auto">
        <Form layout='inline' form={searchForm} name="search" onFinish={onSearch} requiredMark={false}>
          <Form.Item label="" name="name">
            <Input placeholder='输入姓名搜索'/>
          </Form.Item>
          <Form.Item label="" name="age">
            <Input placeholder='输入年龄搜索'/>
          </Form.Item>            

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>搜索</Button>
              <Button type="dashed" htmlType="button" icon={<ClearOutlined />} onClick={onReset}>重置</Button>
            </Space>
          </Form.Item>
        </Form>
      </Col>
      <Col flex="none">
        <Button type='primary' icon={<PlusOutlined />} onClick={handleCreate}>添加</Button>
      </Col>
    </Row>
  </div>
}

export default Action