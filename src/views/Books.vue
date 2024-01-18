<template>
  <div>
    <div v-if="loading">
      <ContentLoader />
    </div>
    <div v-if="error">Error: {{ error }}</div>
    <div v-if="data">
      <h1 class="text-center text-2xl font-bold my-6">Books</h1>
      <section
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3"
      >
        <article v-for="book in data.results" :key="book.id" class="flex cursor-pointer">
          <div class="card card-side bg-base-100 shadow-xl" @click="toBookDetails(book.id)">
            <figure>
              <img
                :src="book.formats['image/jpeg']"
                :alt="`${book.title} cover art`"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{{ book.title }}</h2>
              <p>{{ book.authors[0]?.name || 'N/A' }}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">
                  <router-link :to="{ name: 'BookDetails', params: { id: book.id } }">Details</router-link>
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
    <vue-awesome-paginate
      :total-items="data?.count || 0"
      :items-per-page="32"
      :max-pages-shown="5"
      v-model="currentPage"
      paginationContainerClass="join my-4 ml-4 flex justify-center"
      paginateButtonsClass="join-item btn"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useGutendexData } from '../hooks/useGutendexData'
import { useRoute, useRouter } from 'vue-router'
import ContentLoader from './ContentLoader.vue'

const router = useRouter()
const route = useRoute()
const initialPage = parseInt(route.query.page as string) || 1
const currentPage = ref(initialPage)
const { data, loading, error } = useGutendexData(currentPage)

watch(currentPage, (newPage: number) => {
  router.push({ name: 'Books', query: { page: newPage.toString() } });
});

const toBookDetails = (id: number) => router.push({ name: 'BookDetails', params: { id: id } })

</script>
<style>
</style>
