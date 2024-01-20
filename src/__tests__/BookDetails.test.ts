import { it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookDetails from '../views/BookDetails.vue'
import ContentLoader from '../views/loaders/DetailsLoader.vue'
import { useBookDetailsData } from '../hooks/useBookDetailsData'
import { ref } from 'vue'

interface Data {
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

const mockData = {
  loading: ref<boolean>(true),
  error: ref<null | string>(null),
  data: ref<Data | null>(null),
}

vi.mock('../hooks/useBookDetailsData', () => ({
  useBookDetailsData: () => mockData,
}))

describe('BookDetails', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  const wrapper = shallowMount(BookDetails, {
    props: {
      id: '1',
    },
  })

  it('Loads the initial page based on route query', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Displays the loader when loading is true', async() => {
    console.log(useBookDetailsData('1'), wrapper.html())
    const loader = wrapper.findComponent(ContentLoader)
    expect(loader.exists()).toBe(true)
  })

  it('Displays the error when error is true', () => {
    mockData.error.value = 'error'
    mockData.data.value = null

    const wrapper = shallowMount(BookDetails, {})

    expect(wrapper.text()).toContain('Error: error')
  })

  it("Displays the data when there's data", async () => {
    mockData.loading.value = false
    mockData.error.value = null
    mockData.data.value = {
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
    }

    const wrapper = shallowMount(BookDetails, {})

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain(mockData.data.value.title)
  })
})
