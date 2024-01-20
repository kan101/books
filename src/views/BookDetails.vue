<template>
  <section class="container mx-auto p-4">
    <button class="btn mb-2" @click="goBack">Back</button>
    <div v-if="!loading" class="card card-side bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title">{{ bookDetails.title }}</h1>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <tbody>
              <tr>
                <td>Authors</td>
                <td>
                  {{
                    bookDetails.authors.map((author) => author.name).join(', ')
                  }}
                </td>
              </tr>
              <tr v-if="bookDetails.translators.length">
                <td>Translator(s):</td>
                <td>
                  {{
                    bookDetails.translators
                      .map((translator) => translator.name)
                      .join(', ')
                  }}
                </td>
              </tr>
              <tr>
                <td>Subjects</td>
                <td>
                  {{ bookDetails.subjects.join(', ') }}
                </td>
              </tr>
              <tr v-if="bookDetails.bookshelves.length">
                <td>Bookshelves</td>
                <td>
                  {{ bookDetails.bookshelves.join(', ') }}
                </td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>
                  {{ bookDetails.languages.join(', ') }}
                </td>
              </tr>
              <tr>
                <td>Media Type</td>
                <td>
                  {{ bookDetails.media_type }}
                </td>
              </tr>
              <tr>
                <td>Copyright</td>
                <td>
                  {{ bookDetails.copyright ? 'Yes' : 'No' }}
                </td>
              </tr>
              <tr>
                <td>Downloads</td>
                <td>
                  {{ bookDetails.download_count }}
                </td>
              </tr>
              <tr>
                <td>Cover</td>
                <td>
                  <img
                    class="max-w-xs rounded-sm mx-auto"
                    :src="bookDetails.formats['image/jpeg'] || NoCoverArt"
                    :alt="`${bookDetails.title} cover art`"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>Downloads</h3>
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr>
                <th>Format</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(url, format) in bookDetails.formats" :key="format">
                <td>{{ format }}</td>
                <td>
                  <a :href="url" target="_blank" rel="noopener">Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="loading">
      <ContentLoader />
    </div>
    <div v-if="error">
      <p>Error: error</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import { useBookDetailsData } from '../hooks/useBookDetailsData'
import { useRouter } from 'vue-router'
import NoCoverArt from '../assets/no-image.jpg'
import ContentLoader from './loaders/DetailsLoader.vue'

const props = defineProps({
  id: {
    type: String as PropType<string>,
    required: true
  },
});

const router = useRouter()
const { data, loading, error } = useBookDetailsData(props.id)
const bookDetails = ref(data)

function goBack() {
  router.back()
}
</script>
