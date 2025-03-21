import { usePaginationStore } from '@/states/paginationStore'
import { useUiStore } from '@/states/uiStore';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios'

class ApiService {
  protected apiClient: AxiosInstance
  protected resource: string
  protected paginationStore = usePaginationStore()
  uiStore = useUiStore()

  constructor(resource: string) {
    this.apiClient = axios
    this.resource = resource
  }


  getAll(page: number | null = null, limit: number | null = 10, extraParams = {}) {
    return new Promise((resolve, reject) => {
      const url: string = `/${this.resource}`
      const params = [
        page !== null ? `page=${page}` : null,
        limit !== null ? `limit=${limit}` : null,
        ...Object.keys(extraParams).map((key) =>
          extraParams[key] ? `${key}=${extraParams[key]}` : null,
        ),
      ].filter(Boolean).join('&')

      this.apiClient
        .get(url + `/?${params}`)
        .then((response) => {
          this.paginationStore.setPageCount(parseInt(response.headers['x-total-count']))
          this.paginationStore.setPageSize(parseInt(response.headers['x-page-items']))
          resolve(response.data)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }

  getById(id: number) {
    return new Promise<object>((resolve, reject) => {
      this.apiClient.get(`/${this.resource}/${id}`).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  create(payload: unknown) {

    return new Promise((resolve, reject) => {
      this.apiClient.post(`/${this.resource}`, payload).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  update(id: number, payload: unknown) {
    return new Promise((resolve, reject) => {
      this.apiClient.put(`/${this.resource}/${id}`, payload).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  delete(id: number) {
    return new Promise((resolve, reject) => {
      this.apiClient.delete(`/${this.resource}/${id}`).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default ApiService
