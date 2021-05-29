<template>
  <q-page class="q-pa-sm">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        to="/"
        label="Home"
      />
      <q-breadcrumbs-el label="Herois" />
    </q-breadcrumbs>
    <div
      class="text-h6 q-ma-md"
      @mousemove="teste()"
    >
      Herois
    </div>
    <q-card class="no-border no-shadow bg-transparent">
      <q-card-section class="q-pa-sm">
        <q-input
          v-model="search"
          rounded
          outlined
          placeholder="Procurar Heroi"
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
        <span class="text-subtitle2">
          Items por pagina: {{ model }}
        </span>
        <q-select
          v-model="model"
          filled
          :options="options"
          label="Standard"
          emit-value
          map-options
        />
      </div>
    </div>
    <div class="q-pa-md q-gutter-md flex flex-center">
      <div
        v-for="(item, index) in data"
        :key="index"
      >
        <card
          :data="item"
          @click-on-card="teste(item.id)"
        />
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <div
        class="q-pa-sm"
        style="width: 170px"
      >
        <q-select
          v-model="model"
          filled
          :options="options"
          label="Items por pagina"
          emit-value
          map-options
        />
      </div>
      <q-pagination
        v-model="current"
        :max="5"
        direction-links
        boundary-links
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
  components: { Card: () => import('components/Card') },
  data () {
    return {
      drawerR: true,
      search: '',
      id: 0,
      slide: 0,
      data: [],
      current: 3,
      model: '20',
      options: [
        {
          label: '20 items',
          value: '20'
        },
        {
          label: '30 items',
          value: '30'
        },
        {
          label: '40 items',
          value: '40'
        },
        {
          label: '50 items',
          value: '50'
        }
      ]
    }
  },
  mounted () {
    // this.getObras()
    // console.log()
    this.getTeste()
  },
  methods: {
    teste (i) {
      if (i) {
        console.log('Testando', i)
      }
    },
    getTeste () {
      this.$axios
        .get('https://gateway.marvel.com:443/v1/public/characters?limit=20&ts=1&apikey=ccb91ea93ed84198d84ff123b905b3e0&hash=abfb123ade3b1b0ad442eaee7820a4d6')
        .then(({ data }) => {
          this.data = data.data.results
          console.log(this.data)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
