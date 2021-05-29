<template>
  <q-layout>
    <q-page-container q-app>
      <q-page
        class="bg window-height window-width row justify-center items-center"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width:300px;height:485px;"
            >
              <q-card-section class="bg-secondary">
                <h4 class="text-h5 text-white q-my-md">
                  Registration
                </h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pb-lg">
                  <q-input
                    v-model="email"
                    square
                    clearable
                    type="email"
                    label="Email"
                  >
                    <template #prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="name"
                    square
                    clearable
                    type="name"
                    label="Name"
                  >
                    <template #prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    v-model="password"
                    square
                    clearable
                    type="password"
                    label="Password"
                  >
                    <template #prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  class="full-width text-white"
                  label="Get Started"
                />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <router-link
                  to="/Login"
                  class="text-grey text-bold"
                  style="text-decoration: none;"
                >
                  Return to login
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
      name: '',
      password: ''
    }
  }
}
</script>

<style>
.bg {
  background: linear-gradient(135deg, #9b0b13 0%, #671b1b 100%);
}
</style>
