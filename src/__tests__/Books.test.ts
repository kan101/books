import { it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Books from '../views/Books.vue'
import ContentLoader from '../components/loaders/GridLoader.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useGutendexData } from '../hooks/useGutendexData'
import { ref } from 'vue'
import { Data } from '../types/BookTypes'
import { results } from '../placeHolders'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/books', component: Books }],
})

router.push('/books')
await router.isReady()

const mockData = {
  loading: ref<boolean>(true),
  error: ref<null | string>(null),
  data: ref<Data | null>({
    results: [
      {
        ...results
      },
    ],
    count: 2,
  }),
}

vi.mock('../hooks/useGutendexData', () => ({
  useGutendexData: () => mockData,
}))

describe('Books', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  const wrapper = shallowMount(Books, {
    global: {
      plugins: [router],
      stubs: {
        'vue-awesome-paginate': true
      }
    },
  })

  it('Loads the initial page based on route query', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  it('Displays the loader when loading is true', () => {
    const loader = wrapper.findComponent(ContentLoader)
    expect(loader.exists()).toBe(true)
  })

  it('Displays the error when error is true', () => {
    mockData.error.value = 'error'
    mockData.data.value = null

    const wrapper = shallowMount(Books, {
      global: {
        plugins: [router],
        stubs: {
          'vue-awesome-paginate': true
        }
      },
    })

    expect(wrapper.text()).toContain('Error: error')
  })

  it("Displays the data when there's data", async () => {
    mockData.loading.value = false
    mockData.error.value = null
    mockData.data.value = {
      results: [
        {
          ...results
        },
      ],
      count: 2,
    }

    const wrapper = shallowMount(Books, {
      global: {
        plugins: [router],
        stubs: {
          'vue-awesome-paginate': true
        }
      },
    })

    const h1 = wrapper.find('h1')
    expect(h1.exists()).toBe(true)
    expect(h1.text()).toContain('Books')
  })

  it('Renders the correct number of books', async () => {
    const bookItems = wrapper.findAll('article')
    expect(bookItems.length).toBe(mockData.data.value?.results.length)
  })
})
