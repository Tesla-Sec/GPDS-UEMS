<template>
  <q-page class="bg-primary flex flex-center">
    <q-form class="column items-center q-pa-md" @submit.prevent="handleRegister">
      <h2 class="text-h4 text-white text-center">Faça seu Registro</h2>
      <div class="q-mt-md q-gutter-y-md" style="width: 300px;">
        <q-input
          v-model="form.name"
          placeholder="Nome"
          filled
          class="rounded q-mb-sm"
          color="white"
          dense
          style="background-color: #f0f0f0; border-radius: 10px;"
          :rules="[val => (val && val.length > 0) || 'Nome é obrigatório!']"
        />
        <q-input
          v-model="form.email"
          placeholder="E-mail"
          filled
          class="rounded q-mb-sm"
          color="white"
          dense
          type="email"
          style="background-color: #f0f0f0; border-radius: 10px;"
          :rules="[val => (val && val.length > 0) || 'E-mail é obrigatório!']"
        />
        <q-input
          v-model="form.password"
          placeholder="Senha"
          filled
          class="rounded q-mb-sm"
          color="white"
          dense
          type="password"
          style="background-color: #f0f0f0; border-radius: 10px;"
          :rules="[val => (val && val.length >= 6) || 'Senha deve ter pelo menos 6 caracteres!']"
        />
        <!--<q-input
          v-model="form.phone"
          placeholder="Telefone"
          filled
          class="rounded q-mb-sm"
          color="white"
          dense
          type="tel"
          style="background-color: #f0f0f0; border-radius: 10px;"
          :rules="[val => (val && val.length > 0) || 'Telefone é obrigatório!']"
        />-->
        <q-btn
          label="REGISTRAR"
          color="primary"
          class="full-width q-mt-md"
          style="background-color: #0050b3; border-radius: 10px; color: white;"
          rounded
          type="submit"
        />
        <q-btn
          label="VOLTAR"
          color="white"
          class="full-width q-mt-sm"
          flat
          rounded
          :to="{ name: 'login' }"
        />
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

<style>
.bg-primary {
  background-color: #0077c2; /* Cor de fundo azul */
}
</style>
