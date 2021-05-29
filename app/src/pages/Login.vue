<template>
  <q-layout>
    <q-page-container q-app>
      <q-page class="flex bg-image flex-center">
        <q-card
        >
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">Log in</div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input filled v-model="user" label="Usuario" lazy-rules />

              <q-input
                type="password"
                filled
                v-model="password"
                label="Senha"
                lazy-rules
              />

              <div>
                <q-btn label="Login" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      user: null,
      password: null
    }
  }
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #59585c 0%, #2e2d2d 100%);
}
</style>
