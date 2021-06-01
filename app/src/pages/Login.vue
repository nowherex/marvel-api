<template>
  <q-layout>
    <q-page-container q-app>
      <q-page class="flex bg-image flex-center">
        <q-card>
          <q-card-section>
            <q-avatar
              size="103px"
              class="absolute-center shadow-10"
            >
              <q-img
                src="https://i.ibb.co/Sscd9Rn/groot.png"
                style="width: 200px; height: 100px"
                contain
              />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="logar"
            >
              <q-input
                v-model="email"
                filled
                label="Email"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your email',
                  val => !!val || 'Email is missing', isValidEmail]"
              />

              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                filled
                label="Senha"
                lazy-rules
              >
                <template #append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Login"
                  type="submit"
                  color="primary"
                />
              </div>
              <q-card-section class="text-center q-pa-none">
                <router-link
                  to="/Registration"
                  class="text-grey-6"
                  style="text-decoration: none;"
                >
                  Not a menber? Sign Up
                </router-link>
              </q-card-section>
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
      password: null,
      isPwd: true,

      email: null,
      model: null
    }
  },
  computed: {
    api_url () {
      return process.env.API_URL
    }
  },
  mounted () {
    this.isLoged()
  },

  beforeDestroy () {
    if (this.timer !== 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },
  methods: {
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      this.model = emailPattern.test(val) || 'Invalid email'
      return this.model
    },
    logar () {
      this.showLoading()
      this.$axios.post(`${this.api_url}/login`, {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          // eslint-disable-next-line camelcase
          const { user, user_id, token, teste } = response.data
          // console.log(response.data.data, token)
          // console.log('user', token)
          localStorage.setItem('user', JSON.stringify({ user, user_id, token, teste }))
          // console.log(this.user)
          this.$q.notify({
            type: 'positive',
            message: 'Successfully connected'
          })
          this.$router.push('/')
        }, (error) => {
          this.erroLogar()
          console.log(error)
        })
    },
    erroLogar () {
      this.$q.notify({
        type: 'negative',
        message: 'Erro ao iniciar sessão! tente novamente.'
      })
    },
    isLoged () {
      const loggedIn = localStorage.getItem('user')
      if (loggedIn) {
        this.$router.push('/')
      }
    },
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = 0
      }, 1000)
    }
  }
}
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #59585c 0%, #2e2d2d 100%);
}
</style>
