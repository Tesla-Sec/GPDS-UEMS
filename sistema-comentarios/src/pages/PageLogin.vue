<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center"> Login </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Email is required!']"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Password is required!']"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outlined
            rounded
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            flat
            type="submit"
            to="/register"
            size="sm"
          />
          <q-btn
            label="Forgot Password?"
            color="primary"
            class="full-width"
            flat
            type="submit"
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'PageLogin'
})

const router = useRouter()

const { login, isLoggedIn } = useAuthUser()

const { notifyError, notifySucces } = useNotify()

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' })
  }
})

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    await login(form.value)
    notifySucces('Login Succesfully!')
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
