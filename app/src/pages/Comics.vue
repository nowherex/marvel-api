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
          @clickcard="getMoreInfo(item)"
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
        color="primary"
        :min="current"
        :max="Math.ceil(total/Number(totalPages))"
        :max-pages="6"
        :boundary-numbers="false"
      />
    </div><q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ moreinfo.title }}
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>

        <img :src="moreinfo.src">

        <q-card-section />

        <q-card-section class="q-pt-none">
          {{ moreinfo.descri }}
        </q-card-section>
        <q-card-actions>
          <a
            :href="moreinfo.link"
            target="_blank"
            class="text-grey q-mb-xs"
            style="text-decoration: none;"
          >
            <q-btn flat>
              Marvel Detail
            </q-btn></a>
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      moreinfo: {
        title: '',
        src: '',
        link: '',
        descri: ''
      },
      modal: false,
      logged: false,
      load: true,
      favoritos: [],
      user: null,
      isLiked: false,
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
  computed: {
    api_url () {
      return process.env.API_URL
    },
    api_marvel_url_comic () {
      return process.env.API_MARVEL_URL_COMIC
    },
    api_marvel_url_hero () {
      return process.env.API_MARVEL_URL_HERO
    },
    api_marvel_key () {
      return process.env.API_MARVEL_KEY
    }
  },
  mounted () {
    this.isLoged()
    if (JSON.parse(localStorage.getItem('user'))) {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.getFavoritosComics()
    this.getComics()
  },
  methods: {
    async getMoreInfo (item) {
      const url = `${this.api_marvel_url_comic}/${item.id}?${this.api_marvel_key}`
      const { data } = await this.$axios.get(url)
      const { description, urls } = data.data.results[0]
      this.moreinfo.title = item.title
      this.moreinfo.src = `${item.thumbnail.path}.${item.thumbnail.extension}`
      this.moreinfo.link = urls[0]?.url
      this.moreinfo.descri = description
      this.modal = true
      console.log(data)
    },
    isLoged () {
      const loggedIn = JSON.parse(localStorage.getItem('user'))
      if (loggedIn) {
        this.logged = true
        return true
      }
      return false
    },
    async getFavoritosComics () {
      if (this.logged) {
        const urlFavoritos = `${this.api_url}/${this.user?.user_id}/comics`
        const token = this.user?.token
        const { data } = await this.$axios.get(urlFavoritos, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        // eslint-disable-next-line camelcase
        data.forEach(({ comic_id, title, extension, path }) => this.favoritos.push({ id: Number(comic_id), title, thumbnail: { extension, path } }))
        localStorage.setItem('comicsFavoritos', JSON.stringify(this.favoritos))
      }
    },
    async setFavoritosComics (item) {
      if (this.logged) {
        const urlFavoritos = `${this.api_url}/${this.user?.user_id}/comics`
        const token = this.user.token
        const { id, title, thumbnail } = item
        const newItem = {
          comic_id: id,
          title,
          path: thumbnail.path,
          extension: thumbnail.extension
        }
        await this.$axios({
          method: 'post', // you can set what request you want to be
          url: urlFavoritos,
          data: newItem,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        this.favoritos.push(item)
      }
    },
    async removeFavoritosComics (item) {
      if (this.logged) {
        const urlFavoritos = `${this.api_url}/${this.user?.user_id}/comics/${item.id}`
        const token = this.user.token
        await this.$axios({
          method: 'delete', // you can set what request you want to be
          url: urlFavoritos,
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
      }
    },
    getItem (item) {
      if (this.favoritos.some(comic => comic.id === item.id)) {
        return true
      }
      return false
    },
    likeItem (item) {
      if (!this.logged) {
        this.$q.notify({
          type: 'negative',
          message: 'User disconnected, going to login'
        })
        this.timer = setTimeout(() => {
          this.$router.push('/login')
          this.timer = 0
        }, 1000)
      }
      if (this.favoritos.some(comic => comic.id === item.id)) {
        this.favoritos.splice(this.favoritos.findIndex(x => x.id === item.id), 1)
        this.removeFavoritosComics(item)
        localStorage.setItem('heroisFavoritos', JSON.stringify(this.favoritos))
        // remove o item e atualiza a lista de favoritos
        return false
      }
      // add o item e atualiza a lista de favoritos
      this.favoritos.push(item)
      this.setFavoritosComics(item)
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
        // (this.totalPages * this.page) - this.totalPages
      }

      this.nextPage = this.page + 1
      return this.data.slice((this.page - 1) * this.totalPages, (this.page - 1) * this.totalPages + this.totalPages)
    },
    async getComics () {
      const url = `${this.api_marvel_url_comic}?limit=${this.items}&offset=${this.offset}&${this.api_marvel_key}`
      const { data } = await this.$axios.get(url)
      this.data.push(...data.data.results)
      this.total = data.data.total
      this.load = false
    }
  }
}
</script>
