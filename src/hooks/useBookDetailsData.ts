import { ref, onMounted, Ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

interface Book {
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

export function useBookDetailsData(id: string) {
  const data: Ref<Book> = ref({
    id: '1',
    title: '',
    authors: [
      {
        name: '',
      },
    ],
    translators: [
      {
        name: '',
      },
    ],
    subjects: [''],
    bookshelves: [''],
    languages: [''],
    media_type: '',
    copyright: true,
    download_count: 0,
    formats: {
      'image/jpeg': '',
    },
  })
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const toast = useToast()

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`https://gutendex.com/books/${id}`, {
      })
      data.value = response.data
      toast.success('Book Details fetched!', {
        timeout: 2000,
      })
    } catch (err: any) {
      error.value = err.message
      toast.error(err.message, {
        timeout: 2000,
      })
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { data, loading, error }
}
