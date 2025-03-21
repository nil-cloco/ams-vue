import ApiService from './ApiService'

class DashboardService extends ApiService {
  constructor() {
    super('dashboard')
  }

  getData(days) {
    return new Promise<{ count: { users: number, artists: number, musics: number }, daily_count: { date: string, users: number, artists: number, musics: number }[] }>((resolve, reject) => {
      const url = `/${this.resource}?days=${days || 30}`
      this.apiClient.get(url).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}


export default DashboardService
