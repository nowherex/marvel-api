<template>
  <q-layout>
    <q-page class="bg window-height window-width row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-img
            src="https://i.ibb.co/Sscd9Rn/groot.png"
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
              <q-form
                class="q-gutter-md"
                @submit="logar()"
              >
                <q-input
                  v-model="email"
                  square
                  filled
                  clearable
                  type="email"
                  label="email"
                  hint="Enter valid email"
                  :rules="[
                    val => val !== null && val !== '' || 'Please type your email',
                    val => !!val || 'Email is missing', isValidEmail]"
                />
                <q-input
                  v-model="password"
                  square
                  filled
                  clearable
                  type="password"
                  label="password"
                  :rules="[val => val !== null && val !== '' || 'Please type your password']"
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
                @click="logar"
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
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      model: ''
    }
  },
  mounted () {
    this.isLoged()
  },
  methods: {
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      this.model = emailPattern.test(val) || 'Invalid email'
      return this.model
    },
    isLoged () {
      const loggedIn = localStorage.getItem('user')
      if (loggedIn) {
        this.$router.push('/')
      }
    },
    async logar () {
      if (this.email && this.password && this.model === true) {
        await this.$axios.post('http://localhost:3000/users/login', {
          email: this.email,
          password: this.password
        })
          .then((response) => {
            const token = response.data
            console.log(response.data.data, token)
            console.log('user', token)
            localStorage.setItem('user', JSON.stringify(token))
          // this.$router.push('/')
          }, (error) => {
            this.erroLogar()
            console.log(error)
          })
      }
    },
    vereficaLogado () {
      const user = JSON.parse(localStorage.getItem('user'))
      // console.log(user)

      if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken }
      } else {
        return {}
      }
    },
    erroLogar () {
      this.$q.notify({
        type: 'negative',
        message: 'Erro ao iniciar sessão! tente novamente.'
      })
    }
  }
}
</script>

<style>
.bg {
  background: linear-gradient(135deg, #b41018 0%, #671b1b 100%);
}
</style>
