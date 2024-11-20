<template>
  <q-layout>
    <q-page-container>
      <div class="login-container flex-center q-pa-xl">
        <div class="login-box">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
defineOptions({
  name: 'LoginLayout'
})
</script>
