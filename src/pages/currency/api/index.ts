import { message } from 'antd'
import http from '../../../services/Services'

export const getCryptoCurrency = async (search: string) => {
  try {
    const response = await http.get(`/assets${search ? `?search=${search}` : ''}`)
    return response
  } catch (err: any) {
    void message.error(err?.response?.data?.message ?? 'Data Not Found')
  }
}
