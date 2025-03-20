import ApiService from './ApiService'

class ArtistService extends ApiService {
  constructor() {
    super('artists')
  }

  getArtistOptions() {
    return new Promise((resolve, reject) => {
      const url = `/${this.resource}/options`
      this.apiClient.get(url).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  async exportCsv() {

    return new Promise((resolve, reject) => {
      const url = `/${this.resource}/export`
      this.apiClient.get(url).then(res => {
        const blob = new Blob([res.data], { type: res.headers['content-type'] })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'artists_' + new Date().toISOString() + '.csv'
        link.click()
      }).catch(console.error)
    })
  }
}

export default ArtistService
