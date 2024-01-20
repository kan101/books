import { it, expect, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Books from '../views/Books.vue'
import ContentLoader from '../views/loaders/GridLoader.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useGutendexData } from '../hooks/useGutendexData'
import { ref } from 'vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/books', component: Books }],
})

router.push('/books')
await router.isReady()


interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
  formats: { [key: string]: string };
}

interface Data {
  results: Book[];
  count: number;
}

const mockData = {
  loading: ref<boolean>(true),
  error: ref<null | string>(null),
  data: ref<Data | null>({
    results: [
      {
        id: 1,
        title: 'Book Title 1',
        authors: [{ name: 'Author 1' }],
        formats: { 'image/jpeg': 'link-to-cover-1.jpg' },
      },
      // ... more books if necessary
    ],
    count: 2,
  }),
};

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
          id: 1,
          title: 'Book Title 1',
          authors: [{ name: 'Author 1' }],
          formats: { 'image/jpeg': 'link-to-cover-1.jpg' },
        },
      ],
      count: 2,
    }

    const wrapper = shallowMount(Books, {
      global: {
        plugins: [router],
      },
    })

     const h1 = wrapper.find('h1');
     expect(h1.exists()).toBe(true);
     expect(h1.text()).toContain('Books');
  })

  it('Renders the correct number of books', async () => {
    const bookItems = wrapper.findAll('article')
    expect(bookItems.length).toBe(mockData.data.value?.results.length);
  });
})
