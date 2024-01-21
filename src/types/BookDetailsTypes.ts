export interface Book {
    id: string
    title: string
    authors: Array<{ name: string }>
    translators: Array<{ name: string }>
    subjects: string[]
    bookshelves: string[]
    languages: string[]
    media_type: string
    copyright: boolean
    download_count: number
    formats: { 'image/jpeg': string }
  }