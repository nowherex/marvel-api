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
          @clickcard="getMoreInfo(item)"
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
          @clickcard="getMoreInfo(item)"
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
    </div><q-dialog v-model="modal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            {{ moreinfo.name || moreinfo.title }}
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
        descri: '',
        id: ''
      },
      modal: false,
      logged: false,
      user: null,
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
        total: 0,
        url: 'heroes',
        localStorage: 'heroisFavoritos'
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
        total: 0,
        url: 'comics',
        localStorage: 'comicsFavoritos'
      }

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
    this.getHerois()
    this.getComics()
    this.getFavoritos(this.opComics)
    this.getFavoritos(this.opHerois)
  },
  methods: {
    async getMoreInfo (item) {
      const urlComicOrHero = item.name ? this.api_marvel_url_hero : this.api_marvel_url_comic
      const url = `${urlComicOrHero}/${item.id}?${this.api_marvel_key}`
      const { data } = await this.$axios.get(url)
      const { description, urls } = data.data.results[0]
      this.moreinfo = {
        name: item.name || item.title,
        src: `${item.thumbnail.path}.${item.thumbnail.extension}`,
        link: urls[0]?.url,
        descri: description,
        id: item.id
      }
      this.modal = true
    },
    remoUserLogin () {
      localStorage.removeItem('user')
      this.$router.go(this.$router.currentRoute)
    },
    isLoged () {
      const loggedIn = JSON.parse(localStorage.getItem('user'))
      if (loggedIn) {
        this.logged = true
        this.user = loggedIn
        return true
      }
      return false
    },
    getItemLocal (item) {
      const nameOfObject = item.name ? this.opHerois : this.opComics
      if (nameOfObject.favoritos.some(localItem => localItem.id === item.id)) {
        return true
      }
      return false
    },
    likeItem (item) {
      const nameOfObject = item.name ? this.opHerois : this.opComics
      if (nameOfObject.favoritos.some(localItem => localItem.id === item.id)) {
        nameOfObject.favoritos.splice(nameOfObject.favoritos.findIndex(x => x.id === item.id), 1)
        // remove o item e atualiza a lista de favoritos
        this.removeFavoritos(nameOfObject, item)
        localStorage.setItem(nameOfObject.localStorage, JSON.stringify(nameOfObject.favoritos))
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
    async getFavoritos (objeto) {
      if (this.isLoged) {
        const urlFavoritos = `${this.api_url}/${this.user?.user_id}/${objeto.url}`
        const token = this.user?.token
        const { data } = await this.$axios.get(urlFavoritos, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        // eslint-disable-next-line camelcase
        // debugger
        const nameOrTitle = objeto.url === 'comics' ? 'title' : 'name'
        // data.forEach(a => objeto.favoritos.push({ id: Number(id), nameOrTitle, thumbnail: { path, ext } }))
        data.forEach(item => objeto.favoritos.push({
          id: Number(item.comic_id || item.hero_id),
          [nameOrTitle]: item.name || item.title,
          thumbnail: { path: item.path, extension: item.extension }
        }))
        localStorage.setItem(objeto.localStorage, JSON.stringify(objeto.favoritos))
      }
    },
    async removeFavoritos (objeto, item) {
      if (this.logged) {
        const urlFavoritos = `${this.api_url}/${this.user?.user_id}/${objeto.url}/${item.id}`
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
    async getHerois () {
      this.opHerois.data = this.opHerois.favoritos
      this.opHerois.total = this.opHerois.favoritos.length
      this.opHerois.load = false
    },
    async getComics () {
      this.opComics.data = this.opComics.favoritos
      this.opComics.total = this.opComics.favoritos.length
      this.opComics.load = false
    }

  }
}
</script>
