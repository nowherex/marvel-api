<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        to="/"
        label="Home"
      />
      <q-breadcrumbs-el label="Favoritos" />
    </q-breadcrumbs>
    <div class="text-h5 q-ma-md">
      Meus favoritos
    </div>
    <q-separator />
    <div />
    <div class="text-h6 q-ma-md">
      Herois
    </div>
    <skeleton-card
      v-if="opHerois.load"
      :number-cards="opHerois.totalPages"
    />
    <div
      v-else
      class="q-pa-md q-gutter-md flex flex-center"
    >
      <div
        v-for="(item, index) in getDataHeroi()"
        :key="index"
      >
        <card
          :data="item"
          :is-liked="getItemLocal(item)"
          @togglefav="likeItem(item)"
        />
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="opHerois.page"
        :min="opHerois.current"
        :max="Math.ceil(opHerois.total/Number(opHerois.totalPages))"
        direction-links
        boundary-links
        :max-pages="6"
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
    <q-separator />
    <div class="text-h6 q-ma-md">
      Comics
    </div>
    <skeleton-card
      v-if="opComics.load"
      :number-cards="opComics.totalPages"
    />
    <div
      v-else
      class="q-pa-md q-gutter-md flex flex-center"
    >
      <div
        v-for="(item, index) in getDataComic()"
        :key="index"
      >
        <card
          :data="item"
          :is-liked="getItemLocal(item)"
          @togglefav="likeItem(item)"
        />
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="opComics.page"
        :min="opComics.current"
        :max="Math.ceil(opComics.total/Number(opComics.totalPages))"
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
      search: '',
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
      ],
      opHerois: {
        load: true,
        favoritos: [],
        data: [],
        current: 1,
        items: 100,
        offset: 0,
        totalPages: 20,
        page: 1,
        nextCall: 100,
        total: 0
      },
      opComics: {
        load: true,
        favoritos: [],
        data: [],
        current: 1,
        items: 100,
        offset: 0,
        totalPages: 20,
        page: 1,
        nextCall: 100,
        total: 0
      }

    }
  },
  mounted () {
    if (JSON.parse(localStorage.getItem('heroisFavoritos'))) {
      this.opHerois.favoritos = JSON.parse(localStorage.getItem('heroisFavoritos'))
    }
    if (JSON.parse(localStorage.getItem('comicsFavoritos'))) {
      this.opComics.favoritos = JSON.parse(localStorage.getItem('comicsFavoritos'))
    }
    this.getHerois()
    this.getComics()
  },
  methods: {
    getTypeNameItem (item) {
      return item.name ? this.opHerois : this.opComics
    },
    getItemLocal (item) {
      if (this.getTypeNameItem(item).favoritos.some(localItem => localItem.id === item.id)) {
        return true
      }
      return false
    },
    likeItem (item) {
      if (this.getTypeNameItem(item).favoritos.some(localItem => localItem.id === item.id)) {
        this.getTypeNameItem(item).favoritos.splice(this.getTypeNameItem(item).favoritos.findIndex(x => x.id === item.id), 1)
        // remove o item e atualiza a lista de favoritos
        const nameLocalStorage = item.name ? 'heroisFavoritos' : 'comicsFavoritos'
        localStorage.setItem(nameLocalStorage, JSON.stringify(this.getTypeNameItem(item).favoritos))
        nameLocalStorage === 'heroisFavoritos' ? this.getHerois() : this.getComics()
        // (this.page - 1) * this.totalPages - 1, (this.page - 1) * this.totalPages + this.totalPages
        return false
      }
    },
    getDataHeroi () {
      this.opHerois.nextPage = this.opHerois.page + 1
      return this.opHerois.data
        .slice((this.opHerois.page - 1) * this.opHerois.totalPages, (this.opHerois.page - 1) * this.opHerois.totalPages + this.opHerois.totalPages)
    },
    getDataComic () {
      this.opComics.nextPage = this.opComics.page + 1
      return this.opComics.data
        .slice((this.opComics.page - 1) * this.opComics.totalPages, (this.opComics.page - 1) * this.opComics.totalPages + this.opComics.totalPages)
    },
    async getHerois () {
      this.opHerois.data = this.opHerois.favoritos
      console.log('data', this.opHerois.data)
      this.opHerois.total = this.opHerois.favoritos.length
      this.opHerois.load = false
    },
    async getComics () {
      this.opComics.data = this.opComics.favoritos
      console.log('data', this.opComics.data)
      this.opComics.total = this.opComics.favoritos.length
      this.opComics.load = false
    }

  }
}
</script>
