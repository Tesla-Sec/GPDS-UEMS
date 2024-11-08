<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center"> Reset Password </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          type="email"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send Reset Email"
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

defineOptions({
  name: 'ForgotPassword'
})

const { sendPasswordRestEmail } = useAuthUser()

const { notifyError, notifySucces } = useNotify()

const email = ref('')

const handleForgotPassword = async () => {
  try {
    await sendPasswordRestEmail(email.value)
    notifySucces(`Password reset semail sent to: ${email.value}`)
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
