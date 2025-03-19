import ApiService from './ApiService'

class ArtistService extends ApiService {
  constructor() {
    super('artists')
  }

  async exportCsv() {
    const url = `/${this.resource}/export`
    const res = await this.apiClient.get(url)
    const blob = new Blob([res.data], { type: res.headers['content-type'] })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    console.log(res.headers)
    link.download = 'artists_' + new Date().toISOString() + '.csv'
    link.click()
  }
}

export default ArtistService
