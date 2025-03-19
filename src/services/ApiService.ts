import axios, { type AxiosInstance } from 'axios'

class ApiService {
  protected apiClient: AxiosInstance
  protected resource: string

  constructor(resource: string) {
    this.apiClient = axios
    this.resource = resource
  }

  async getAll(page: number | null = null, limit: number | null = 10) {
    try {
      let url: string = `/${this.resource}`
      const params: string[] = []

      if (page !== null) {
        params.push(`page=${page}`)
      }
      if (limit !== null) {
        params.push(`limit=${limit}`)
      }

      if (params.length > 0) {
        url += '/?' + params.join('&')
      }

      const response = await this.apiClient.get(url)
      localStorage.setItem('x-total-count', response.headers['x-total-count'])
      localStorage.setItem('x-page-items', response.headers['x-page-items'])
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  async getById(id: number) {
    try {
      const response = await this.apiClient.get(`/${this.resource}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  async create(payload: unknown) {
    try {
      const response = await this.apiClient.post(`/${this.resource}`, payload)
      return response.data
    } catch (error) {
      console.error('Error creating data:', error)
      throw error
    }
  }

  async update(id: number, payload: unknown) {
    try {
      const response = await this.apiClient.put(`/${this.resource}/${id}`, payload)
      return response.data
    } catch (error) {
      console.error('Error updating data:', error)
      throw error
    }
  }

  async delete(id: number) {
    try {
      const response = await this.apiClient.delete(`/${this.resource}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting data:', error)
      throw error
    }
  }
}

export default ApiService
