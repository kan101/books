import { ref, onMounted, Ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { Book } from '../types/BookDetailsTypes'
import { results } from '../placeHolders'
import { baseUrl } from '../constants'

export function useBookDetailsData(id: string) {
  const data: Ref<Book> = ref({ ...results })
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const toast = useToast()

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${baseUrl}/books/${id}`)
      data.value = response.data
      toast.success('Book Details Fetched!', {
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
