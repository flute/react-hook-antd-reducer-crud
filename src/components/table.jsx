import React, { useContext, useEffect, useCallback } from 'react'
import { Table, Button, Space, Popconfirm } from 'antd'
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Context } from '../store'
import { setModal, setFormData, remove, getList, setSearchQuery } from '../store/actions'
import { ADD, EDIT, VIEW } from '../constants/modal'

const Tables = () => {
  const { state, dispatch, getState } = useContext(Context);
  const {
    loading,
    datas: {
      data,
      total
    },
    searchQuery
  } = state
  const { page } = searchQuery

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      fixed: 'right',
      width: 100,
      render: (_, data) => (
        <Space>
          <Button icon={<EyeOutlined />} size='small' onClick={_ => onView(data)}>查看</Button>
          <Button type='primary' icon={<EditOutlined />} size='small' onClick={_ => onEdit(data)}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={_ => onRemove(data)}>
            <Button type='primary' icon={<DeleteOutlined />} danger size='small'>删除</Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  // 查看
  const onView = (data) => {
    dispatch(setFormData(data))
    dispatch(setModal({ visible: true, type: VIEW }))
  }

  // 编辑
  const onEdit = (data) => {
    dispatch(setFormData(data))
    dispatch(setModal({ visible: true, type: EDIT }))
  }

  // 删除
  const onRemove = (data) => {
    dispatch(remove({ id: data.id }))
  }

  // 翻页
  const onPaginationChange = (page, pageSize) => {
    const newSearchQuery = {
      ...searchQuery,
      page: page - 1,
      pageSize
    }
    dispatch(setSearchQuery(newSearchQuery))
    dispatch(getList(newSearchQuery))
  }

  return <div>
    <Table
      dataSource={data}
      columns={columns}
      rowKey='id'
      pagination={false}
      loading={loading}
      pagination={{
        onChange: onPaginationChange,
        hideOnSinglePage: true,
        page: page + 1,
        total
      }}
    />
  </div>
}

export default Tables