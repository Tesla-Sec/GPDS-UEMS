<template>
  <q-page class="flex flex-center bg-secondary">
    <div class="text-center q-pa-md">
      <!-- Título -->
      <h1 class="text-h4 text-primary">Plataforma de feedbacks de cursos</h1>

      <!-- Descrição -->
      <p class="text-subtitle1 text-primary q-mt-sm">
        Deixe seu feedback e nos ajude a melhorar a experiência de aprendizado
      </p>

      <!-- Botões -->
      <div class="q-mt-lg row justify-center">
        <q-btn
          label="Deixe seu feedback"
          color="primary"
          class="q-mx-md"
          rounded
          to="/comentar"
        />
        <q-btn
          label="Visualizar feedbacks"
          color="blue-7"
          class="q-mx-md"
          rounded
          to="/ver"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: 'PageMe'
})

</script>
