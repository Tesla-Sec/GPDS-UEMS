<template>
  <q-page class="flex flex-center bg-primary text-white" style="background-color: secundary;">
    <div class="text-center q-pa-md" style="max-width: 600px;">

      <!-- Título -->
      <h1 class="text-h4">Compartilhe sua experiência</h1>

      <!-- Descrição -->
      <p class="text-subtitle1 q-mt-sm">
        Descreva o que aprendeu, o que gostou e o que pode ser melhorado no curso.
        Seus comentários nos ajudarão a aprimorar a qualidade do ensino.
      </p>

      <!-- Seletor de curso -->
      <div class="q-mt-md">
        <q-btn
          class="full-width bg-primary text-white q-py-md rounded q-mb-sm"
          label="Selecione o curso"
          @click="toggleDropdown"
          icon-right="expand_more"
        />
        <q-menu v-model="isDropdownOpen" cover>
          <q-list>
            <q-item
              v-for="course in courses"
              :key="course.id"
              clickable
              v-ripple
              @click="selectCourse(course.name)"
            >
              <q-item-section avatar>
                <q-img :src="course.image" :alt="course.name" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ course.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>

      <!-- Área de texto para feedback -->
      <q-card class="q-mt-md" v-if="selectedCourse">
        <q-card-section>
          <q-input
            filled
            v-model="feedback"
            placeholder="Digite seu feedback aqui..."
            type="textarea"
            autogrow
            color="primary"
          />
        </q-card-section>
      </q-card>

      <!-- Botão para enviar feedback -->
      <q-btn
        v-if="selectedCourse"
        label="Enviar feedback"
        color="blue-7"
        class="full-width q-mt-lg"
        rounded
        @click="submitFeedback"
      />
      <q-btn
          label="VOLTAR"
          color="white"
          class="full-width q-mt-sm"
          flat
          rounded
          :to="{ name: 'me' }"
        />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { QPage, QBtn, QMenu, QItem, QList, QItemSection, QItemLabel, QImg, QInput, QCard, QCardSection } from 'quasar'

const courses = [
  { id: 1, name: 'JavaScript Full Stack Development', image: '/api/placeholder/400/200' },
  { id: 2, name: 'Python para Data Science', image: '/api/placeholder/400/200' },
  { id: 3, name: 'React Native Mobile Development', image: '/api/placeholder/400/200' },
  { id: 4, name: 'DevOps & Cloud Computing', image: '/api/placeholder/400/200' },
  { id: 5, name: 'Flutter Development', image: '/api/placeholder/400/200' }
]

const isDropdownOpen = ref(false)
const selectedCourse = ref('')
const feedback = ref('')

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectCourse = (courseName) => {
  selectedCourse.value = courseName
  isDropdownOpen.value = false
}

const submitFeedback = () => {
  console.log('Feedback enviado:', feedback.value)
  // Lógica para enviar o feedback
  feedback.value = ''
  selectedCourse.value = ''
}
</script>

<style>
.bg-primary {
  background-color: #0077c2; /* Azul de fundo da página */
}

.text-white {
  color: #ffffff;
}
</style>
