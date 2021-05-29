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
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    Favorites
                  </div>
                  <div class="text-subtitle1 q-mt-md q-mb-xs">
                    John Doe
                  </div>

                  <q-btn
                    v-close-popup
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
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
      leftDrawerOpen: false
    }
  }
}
</script>
