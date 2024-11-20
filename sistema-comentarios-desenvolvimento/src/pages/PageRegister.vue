<template>
  <div class="row full-height full-width">
    <!-- Left side - Welcome section -->
    <div class="col-6 flex flex-center column">
      <div class="text-h3 text-primary q-mb-md">Seja bem-vindo!</div>
      <q-btn
        label="Voltar para Login"
        color="primary"
        text-color="white"
        class="q-px-xl q-py-sm"
        rounded
        :to="{ name: 'login' }"
      />
    </div>

    <!-- Divider -->
    <div class="divider"></div>

    <!-- Right side - Registration form -->
    <div class="col-6 flex flex-center">
      <q-form
        class="q-gutter-y-sm"
        style="width: 80%"
        @submit.prevent="handleRegister"
      >
        <div class="text-h3 text-primary q-mb-md">Faça seu Registro</div>

        <q-input
          v-model="form1.primeiro_nome"
          label="Nome"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Nome é obrigatório!']"
        />

        <q-input
          v-model="form1.email"
          label="E-mail"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'E-mail é obrigatório!']"
          type="email"
        />

        <q-input
          v-model="form1.cpf"
          label="CPF"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length == 11) || 'CPF deve ter pelo menos 11 caracteres!']"
          type="tel"
        />

        <q-input
          v-model="form2.usuario"
          label="Nome de Usuário"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Nome de Usuário é obrigatório!']"
        />

        <q-input
          v-model="form2.senha"
          label="Senha"
          filled
          bg-color="primary-lighten-5"
          class="rounded-borders"
          lazy-rules
          :rules="[val => (val && val.length >= 6) || 'Senha deve ter pelo menos 6 caracteres!']"
          type="password"
        />

        <!-- New toggle button for user type -->
        <div class="flex justify-center q-mt-sm">
          <q-btn-toggle
            v-model="isStudent"
            class="q-mb-"
            spread
            no-caps
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: 'Sou Aluno', value: true },
              { label: 'Sou Professor', value: false }
            ]"
          />
        </div>

        <q-btn
          label="REGISTRAR"
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
import { ref } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'PageRegister'
})

const router = useRouter()
const { post } = useApi()
const tabelaPessoa = 'pessoa'
const tabelaLogin = 'login'
const tabelaCredencial = 'credencial'

const { notifySucces, notifyError } = useNotify()

const form1 = ref({
  primeiro_nome: '',
  email: '',
  cpf: ''
})

const form2 = ref({
  usuario: '',
  senha: '',
  cpf_pessoa: ''
})

// New ref for user type
const isStudent = ref(true)

const handleRegister = async () => {
  try {
    // You can use isStudent.value to determine user type
    await post(tabelaPessoa, form1.value)

    await post(tabelaCredencial, {
      cpf_pessoa: form1.value.cpf,
      ator_titulo: isStudent.value ? 'aluno' : 'professor'
    })

    await post(tabelaLogin, {
      usuario: form2.value.usuario,
      senha: form2.value.senha,
      cpf_pessoa: form1.value.cpf
    })

    notifySucces('Registro realizado com sucesso!')
    router.push({
      name: 'me'
    })
  } catch (error) {
    notifyError(error.message)
  }
}
</script>
