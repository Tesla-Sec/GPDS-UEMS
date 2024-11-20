<template>
  <div class="row full-height full-width">
    <!-- Left side - Welcome section -->
    <div class="col-6 flex flex-center column">
      <div class="text-h3 text-primary q-mb-md">Bem vindo!</div>
      <q-btn
        label="Criar conta"
        color="primary"
        text-color="white"
        class="q-px-xl q-py-sm"
        rounded
        to="/register"
      />
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Right side - Login form -->
    <div class="col-6 flex flex-center">
      <q-form class="q-gutter-y-md" style="width: 80%" @submit.prevent="handleLogin">
        <div class="text-h3 text-primary q-mb-xl">Faça seu Login</div>

        <q-input
          v-model="form.usuario"
          label="Nome de Usuario"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Nome de Usuário é obrigatório!']"
        />

        <q-input
          v-model="form.senha"
          label="Senha"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Senha é obrigatória!']"
          type="senha"
        />

        <q-btn
          label="LOGIN"
          color="primary"
          text-color="white"
          class="full-width q-py-sm q-mt-lg"
          rounded
          type="submit"
        />
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'PageLogin'
})

const router = useRouter()
const { getUserByCredentials } = useApi()
const { notifyError, notifySucces } = useNotify()
const tabelaLogin = 'login'
const { isLoggedIn } = useApi()

onMounted(() => {
  if (isLoggedIn) {
    router.push({ name: 'me' })
  }
})

const form = ref({
  usuario: '',
  senha: ''
})

const handleLogin = async () => {
  try {
    const user = await getUserByCredentials(tabelaLogin, form.value)

    if (user) {
      notifySucces('Login realizado com Sucesso!')
      router.push({ name: 'me' })
    } else {
      throw new Error('Credenciais Inválidas')
    }
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
