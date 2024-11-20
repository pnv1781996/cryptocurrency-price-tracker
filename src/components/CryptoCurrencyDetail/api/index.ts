import { message } from 'antd'
import http from '../../../services/Services'

export const fetchCryptoDetails = async (id: string) => {
  try {
    const response = await http.get(`/assets/${id}`)
    return response
  } catch (err: any) {
    void message.error(err?.response?.data?.message ?? 'Data Not Found')
  }
}

export const fetchCryptoDetailsForChart = async (id: string) => {
  try {
    const response = await http.get(`/assets/${id}/history?interval=d1`)
    return response
  } catch (err: any) {
    void message.error(err?.response?.data?.message ?? 'Data Not Found')
  }
}
