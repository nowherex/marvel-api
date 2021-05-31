<template>
  <q-layout>
    <q-page-container q-app>
      <q-page class="flex bg-image flex-center">
        <q-card>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Create your account
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form
              class="q-gutter-md"
              @submit="cadastrar"
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
                v-model="name"
                filled
                label="Name"
                lazy-rules
                :rules="[
                  val => val !== null && val !== '' || 'Please type your name']"
              />

              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                filled
                label="Password"
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
                  label="Continue"
                  type="submit"
                  color="primary"
                />
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
      password: null,
      isPwd: true,

      email: null,
      name: null,
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
    cadastrar () {
      this.showLoading()
      this.$axios.post(`${this.api_url}`, {
        email: this.email,
        password: this.password,
        name: this.name
      })
        .then((response) => {
          if (response.status === 201) {
            this.$q.notify({
              type: 'positive',
              message: 'Registered successfully'
            })
            this.$router.push('/login')
          }
        }, (error) => {
          if (error.message.includes(409)) {
            this.$q.notify({
              type: 'negative',
              message: 'User already registered'
            })
          }
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
