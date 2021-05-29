<template>
<div class="q-pa-md">
  <q-layout view="lHh lpr lFf" style="height: 400px" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-red">
      <q-toolbar class="q-pa-md" style="height: 120px">
        <q-toolbar-title>
              <q-img
      src="https://i.ibb.co/T1S7RJJ/marvel.png"
      style="max-width: 150px"
    /> API
        </q-toolbar-title>

        <q-btn flat round dense icon="menu">
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column items-center q-pa-sm">
            <div class="text-subtitle1 q-mt-md q-mb-xs">Favorites</div>
            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              v-close-popup
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
