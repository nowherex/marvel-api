<template>
  <div>
    <q-layout>
      <q-header
        elevated
        class="bg-red"
        style="height: 150px"
      >
        <q-toolbar
          class="q-pa-md"
          style="height: 120px"
        >
          <q-toolbar-title>
            <router-link
              to="/"
              class="text-white text-bold"
              style="text-decoration: none;"
            >
              <q-img
                src="https://i.ibb.co/T1S7RJJ/marvel.png"
                style="max-width: 150px"
              /> API
            </router-link>
            <p class="text-white q-mb-xs">
              <a
                href="https://github.com/nowherex"
                target="_blank"
                class="text-white q-mb-xs"
                style="text-decoration: none;"
              > By Leonardo Guedes </a>
            </p>
          </q-toolbar-title>

          <q-btn
            flat
            round
            dense
            icon="menu"
          >
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center q-pa-sm">
                  <q-btn
                    to="/Favoritos"
                    flat
                    color="secondary"
                    label="Meus Favoritos"
                  />
                  <div class="text-grey text-bold q-mt-md q-mb-xs">
                    {{ name }}
                  </div>

                  <q-btn
                    v-close-popup
                    color="primary"
                    :label="logged ? 'LOGOUT' : 'Login'"
                    push
                    size="sm"
                    @click="loginOrLogout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      logged: false,
      name: ''
    }
  },
  mounted () {
    this.isLoged()
  },
  methods: {
    loginOrLogout () {
      if (this.logged) {
        localStorage.removeItem('user')
        this.$router.go(this.$router.currentRoute)
        return ''
      }
      this.$router.push('/login')
    },
    isLoged () {
      const loggedIn = JSON.parse(localStorage.getItem('user'))
      if (loggedIn) {
        this.name = loggedIn.user
        this.logged = true
      }
    }
  }
}
</script>
