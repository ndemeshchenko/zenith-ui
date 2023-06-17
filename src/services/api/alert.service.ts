import api from './index'
import axios from 'axios'

let queryInProgress: any

export default {
  getAlerts(query: object) {
    if (query && queryInProgress) {
      queryInProgress.cancel('Too many search requests. Cancelling current query.')
    }
    queryInProgress = axios.CancelToken.source()
    const config = {
      params: query,
      cancelToken: queryInProgress.token
    }
    return api.get('/api/alerts', config)
  },
  getAlert(id: string) {
    return api.get(`/api/alert/${id}`)
  },
  actionAlert(action: string, id: string) {
    if (action === 'delete') {
      return api.delete(`/api/alert/${id}`)
    }
    return api.patch(`/api/alert/${id}?action=${action}`)
  }
}
