import { ref, onMounted, Ref, watch } from 'vue'
import axios from 'axios'
import { useToast } from "vue-toastification"
import { Book } from '../types/BookDetailsTypes'
import { baseUrl } from '../constants'

interface GutendexData {
  count: number;
  results: Book[];
}

export function useGutendexData(page: Ref<number>) {
  const data: Ref<GutendexData> = ref({
    count: 0,
    results: []
  })
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const toast = useToast()

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${baseUrl}/books`, {
        params: {
          page: page.value,
        },
      })
      data.value = response.data
      toast.success("Books fetched!", {
        timeout: 2000
      });
    } catch (err: any) {
      error.value = err.message
      toast.error(err.message, {
        timeout: 2000
      });
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)
  watch(page, fetchData) 

  return { data, loading, error }
}
