import ApiService from './ApiService'

class MusicService extends ApiService {
  constructor() {
    super('musics')
  }

  async getAll(
    page: number | null = null,
    limit: number | null = 10,
    extraParams: { artist_id?: number }[] = [],
  ) {
    try {
      let url: string = `/${this.resource}`
      const params: string[] = []

      if (page !== null) {
        params.push(`page=${page}`)
      }
      if (limit !== null) {
        params.push(`limit=${limit}`)
      }

      if (extraParams.length) {
        extraParams.forEach((extraParam) => {
          Object.keys(extraParam).forEach((paramKey) => {
            params.push(`${paramKey}=${extraParam[paramKey]}`)
          })
        })
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
}

export default MusicService
