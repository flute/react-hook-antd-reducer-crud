/* eslint-disable */
import { getMockDecoratorByEnv } from 'axios-service'

const mockDecorator = getMockDecoratorByEnv(process.env.NODE_ENV === 'development')

const delayTime = 500

const datas = new Array(10).fill(1).map((_, i) => ({
  id: i,
  name: `长江${i}号`,
  age: i * 10,
  address: '北京市朝阳区绿地中心A座C区'
}))

export const mockGetDataList = mockDecorator((...args) => {
  console.log('mockGetList', args[0])
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          dm_error: 0,
          error_msg: 'success',
          data: {
            list: [...datas],
            total: datas.length * 2
          }
        })
      }, delayTime)
    })
    // return Promise.reject('dd')
  }
})

export const mockCreate = mockDecorator((...args) => {
  console.log('mockCreate', args[0])
  if (process.env.NODE_ENV === 'development') {
    if (args?.[0]) datas.push({ ...args[0], id: datas.length })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          dm_error: 0,
          error_msg: 'success',
          data: {}
        })
      }, delayTime)
    })
  }
})

export const mockUpdate = mockDecorator((...args) => {
  console.log('mockUpdate', args[0])
  if (process.env.NODE_ENV === 'development') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          dm_error: 0,
          error_msg: 'success',
          data: {}
        })
      }, delayTime)
    })
  }
})

export const mockRemove = mockDecorator((...args) => {
  console.log('mockRemove', args[0])
  if (process.env.NODE_ENV === 'development') {
    const params = args?.[0]
    if (params) {
      const delIndex = datas.findIndex(item => item.id === params.id)
      if (delIndex !== -1) datas.splice(delIndex, 1)
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          dm_error: 0,
          error_msg: 'success',
          data: {}
        })
      }, delayTime)
    })
  }
})