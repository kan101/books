import { it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BookDetails from '../views/BookDetails.vue'
import ContentLoader from '../components/loaders/DetailsLoader.vue'
import { useBookDetailsData } from '../hooks/useBookDetailsData'
import { ref } from 'vue'
import { Book } from '../types/BookDetailsTypes'

const mockData = {
  loading: ref<boolean>(true),
  error: ref<null | string>(null),
  data: ref<Book | null>(null),
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
    console.log(wrapper.findAll("tr").length)
    expect(wrapper.findAll("tr").length).toEqual(Object.keys(mockData.data.value).length)
  })
})
