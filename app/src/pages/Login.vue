<template>
  <q-layout>
    <q-page-container q-app>
      <q-page class="bg window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <q-img
              src="https://i.ibb.co/pQP9KrK/groot.png"
              style="width: 200px; height: 200px; flex: 1"
              contain
            />
          </div>
          <div class="row">
            <q-card
              square
              bordered
              class="q-pa-lg shadow-1"
            >
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    v-model="email"
                    square
                    filled
                    clearable
                    type="email"
                    label="email"
                  />
                  <q-input
                    v-model="password"
                    square
                    filled
                    clearable
                    type="password"
                    label="password"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="secondary"
                  size="lg"
                  class="full-width"
                  label="Login"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-none">
                <router-link
                  to="/Registration"
                  class="text-grey text-bold"
                  style="text-decoration: none;"
                >
                  Not registered? Create an account
                </router-link>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style>
.bg {
  background: linear-gradient(135deg, #b41018 0%, #671b1b 100%);
}
</style>
