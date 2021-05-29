<template>
  <q-page class="q-pa-sm">
    <div class="text-h6 q-ma-md">
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
    <div class="q-pa-md q-gutter-md flex flex-center">
      <div
        v-for="(item, index) in data"
        :key="index"
      >
        <q-btn
          flat
          class="my-btn"
        >
          <card :data="item" />
        </q-btn>
      </div>
    </div>
    <div class="row" />
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
      data: []
    }
  },
  mounted () {
    // this.getObras()
    // console.log()
    this.getTeste()
  },
  methods: {
    getTeste () {
      this.$axios
        .get('https://gateway.marvel.com:443/v1/public/characters?limit=100&ts=1&apikey=ccb91ea93ed84198d84ff123b905b3e0&hash=abfb123ade3b1b0ad442eaee7820a4d6')
        .then(({ data }) => {
          this.data = data.data.results
          console.log(this.data)
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
