<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center"> Register </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Name is required!']"
        />
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
          :rules="[val => (val && val.length >= 6) || 'Password is required wih at least 6 characters!']"
        />
        <q-input
          label="Phone"
          v-model="form.phone"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Number is required!']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Register"
            color="primary"
            class="full-width"
            outlined
            rounded
            type="submit"
          />
          <q-btn
            label="Back"
            color="dark"
            class="full-width"
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'PageRegister'
})

const router = useRouter()
const { register } = useAuthUser()

const { notifySucces, notifyError } = useNotify()

const form = ref({
  name: '',
  email: '',
  password: '',
  phone: ''
})

const handleRegister = async () => {
  try {
    await register(form.value)
    notifySucces()
    router.push({
      name: 'email-confirmation',
      query: { email: form.value.email }
    })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
