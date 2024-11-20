<template>
  <q-page padding>
    <p class="text-body1">
     Obrigado por registrar-se!
    </p>
    <P class="text-body1">
      Confirme seu email para finalizar o registro: <strong>{{ $route.query.email }}</strong>
    </P>
    <div class="row justify center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
            label="Back to Login"
            color="dark"
            class="full-width"
            rounded
            :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>

defineOptions({
  name: 'EmailConfirmation'
})
</script>
