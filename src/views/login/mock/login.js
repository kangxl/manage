import result from '@/utils/result'

export default {
  userLogin: config => {
    return result.success({
      token: 123456
    })
  },
  logout: () => result.success(true)
}
