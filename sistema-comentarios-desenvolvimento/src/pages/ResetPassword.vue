<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center"> Reset Password </p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Password is required wih at least 6 characters!']"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Send New Password"
            color="primary"
            class="full-width"
            outlined
            rounded
            type="submit"
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
import { useRouter, useRoute } from 'vue-router'

defineOptions({
  name: 'ResetPassword'
})

const { resetPassword } = useAuthUser()
const router = useRouter()
const route = useRoute()
const { notifyError, notifySucces } = useNotify()
const token = route.query.token

const password = ref('')

const handlePasswordReset = async () => {
  try {
    await resetPassword(token, password.value)
    notifySucces('New Password Sent!')
    router.push({ name: 'login' })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
