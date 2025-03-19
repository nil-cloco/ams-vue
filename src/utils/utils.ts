const genders = [
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
  { label: 'Others', value: 'o' },
]

const roles = [
  { label: 'Super Admin', value: 'super_admin', chipSeverity: 'success' },
  { label: 'Artist Manager', value: 'artist_manager', chipSeverity: 'info' },
  { label: 'Artist', value: 'artist', chipSeverity: 'secondary' },
]
// ['rnb', 'country', 'classic', 'rock', 'jazz']
const genres = [
  { label: 'R&B', value: 'rnb' },
  { label: 'Country', value: 'country' },
  { label: 'Classic', value: 'classic' },
  { label: 'Rock', value: 'rock' },
  { label: 'Jazz', value: 'jazz' },
]

export function getGenderLabel(val: string): string {
  return genders.find((g) => g.value == val.toLowerCase())?.label || ''
}

export function getDateInFormat(val: string): string {
  const date = new Date(val)
  return `${date.toLocaleDateString()}`
}

export function getGenderOptions() {
  return genders
}

export function getRoleOptions() {
  return roles.map(({ label, value }) => ({ label, value }))
}

export function getGenreOptions() {
  return genres
}

export function getGenreLabel(genre: string) {
  return genres.find((g) => g.value == genre.toLocaleLowerCase())?.label || ''
}

export function getRoleSeverity(role: string): string {
  return roles.find((r) => r.value == role.toLocaleLowerCase())?.chipSeverity || 'secondary'
}

export function getDateByYear(year?: number) {
  if (!year) return ''
  const date = new Date().setUTCFullYear(year, 0, 1)
  return new Date(date)
}

const today: Date = new Date()
today.setHours(0, 0, 0, 0)

export { today }
