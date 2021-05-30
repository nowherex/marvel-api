<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        to="/"
        label="Home"
      />
      <q-breadcrumbs-el label="Comics" />
    </q-breadcrumbs>
    <div class="text-h6 q-ma-md">
      Comics
    </div>
    <q-card class="no-border no-shadow bg-transparent">
      <q-card-section class="q-pa-sm">
        <q-input
          v-model="search"
          rounded
          outlined
          placeholder="Procurar Comic"
        >
          <template #append>
            <q-icon
              v-if="search === ''"
              name="search"
            />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </q-input>
      </q-card-section>
    </q-card>
    <q-separator />
    <div />
    <div
      class="q-pa-md"
      style="max-width: 300px"
    >
      <div class="q-mt-sm q-gutter-sm">
        <q-select
          v-model="totalPages"
          filled
          :options="options"
          label="Items por pagina"
          emit-value
          map-options
        />
      </div>
    </div>
    <skeleton-card
      v-if="load"
      :number-cards="totalPages"
    />
    <div
      v-else
      class="q-pa-md q-gutter-md flex flex-center"
    >
      <div
        v-for="(item, index) in getData()"
        :key="index"
      >
        <card
          :data="item"
          :is-liked="getItem(item)"
          @togglefav="likeItem(item)"
        />
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <div
        class="q-pa-sm"
        style="width: 170px"
      >
        <q-select
          v-model="totalPages"
          filled
          :options="options"
          label="Items por pagina"
          emit-value
          map-options
        />
      </div>
      <q-pagination
        v-model="page"
        :min="current"
        :max="Math.ceil(total/Number(totalPages))"
        direction-links
        boundary-links
        :max-pages="6"
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Cards',
  components: {
    Card: () => import('components/Card'),
    SkeletonCard: () => import('components/skeletons/SkeletonCard')
  },
  data () {
    return {
      load: true,
      favoritos: [],
      drawerR: true,
      search: '',
      id: 0,
      data: [],
      current: 1,
      items: 100,
      offset: 0,
      totalPages: 20,
      page: 1,
      nextCall: 100,
      total: 0,
      options: [
        {
          label: '20 items',
          value: 20
        },
        {
          label: '30 items',
          value: 30
        },
        {
          label: '40 items',
          value: 40
        },
        {
          label: '50 items',
          value: 50
        }
      ]
    }
  },
  mounted () {
    this.getComics()
    if (JSON.parse(localStorage.getItem('comicsFavoritos'))) {
      this.favoritos = JSON.parse(localStorage.getItem('comicsFavoritos'))
    }
  },
  methods: {
    getItem (item) {
      const localStorageFavorites = JSON.parse(localStorage.getItem('comicsFavoritos'))
      this.favorites = localStorage
        .getItem('comicsFavoritos') !== null
        ? localStorageFavorites
        : []
      if (this.favoritos.some(heroi => heroi.id === item.id)) {
        return true
      }
      return false
    },
    likeItem (item) {
      if (this.favoritos.some(heroi => heroi.id === item.id)) {
        this.favoritos.splice(this.favoritos.findIndex(x => x.id === item.id), 1)
        // remove o item e atualiza a lista de favoritos
        localStorage.setItem('comicsFavoritos', JSON.stringify(this.favoritos))
        return false
      }
      // add o item e atualiza a lista de favoritos
      const { id, title, thumbnail } = item
      const newItem = { id, title, thumbnail }
      this.favoritos.push(newItem)
      localStorage.setItem('comicsFavoritos', JSON.stringify(this.favoritos))
      return true
    },
    getData () {
      const itemsDivisionPerPages = Math.ceil(this.nextCall / this.totalPages)
      if (this.page > itemsDivisionPerPages) {
        this.load = true
        this.offset = this.nextCall
        this.nextCall = this.offset + this.items
        this.getComics()
      }
      this.nextPage = this.page + 1
      return this.data.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    },
    async getComics () {
      const url = `https://gateway.marvel.com:443/v1/public/comics?limit=${this.items}&offset=${this.offset}&ts=1&apikey=ccb91ea93ed84198d84ff123b905b3e0&hash=abfb123ade3b1b0ad442eaee7820a4d6`
      const { data } = await this.$axios.get(url)
      this.data.push(...data.data.results)
      this.total = data.data.total
      this.load = false
    }
  }
}
</script>
