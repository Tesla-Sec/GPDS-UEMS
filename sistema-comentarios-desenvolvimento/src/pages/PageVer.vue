<template>
  <q-page class="flex flex-center bg-secondary text-primary">
    <div class="text-center q-pa-md" style="max-width: 800px;">
      <h1 class="text-h4">Visualize ou responda os feedbacks</h1>

      <p class="text-subtitle1 q-mt-sm">
        Visualize os feedbacks enviados por alunos sobre o que gostaram e o
        que pode ser melhorado no curso. Os comentários devem ajudar a
        aprimorar a qualidade do ensino.
      </p>

      <!-- Grid de cards dos cursos -->
      <div class="row q-col-gutter-md q-mt-md justify-center">
        <template v-if="!selectedCourse">
          <div v-for="course in courses"
               :key="course.id"
               class="col-12 col-sm-6"
               @click="selectCourse(course.name)"
          >
            <q-card class="cursor-pointer course-card">
              <q-img
                :src="course.image"
                :ratio="16/9"
                spinner-color="primary"
              >
                <div class="absolute-bottom text-subtitle1 text-center bg-black bg-opacity-50">
                  {{ course.name }}
                </div>
              </q-img>
            </q-card>
          </div>
        </template>

        <!-- Card selecionado e feedbacks -->
        <template v-else>
          <div class="col-12 col-sm-8">
            <q-btn
              icon="arrow_back"
              label="Voltar para lista de cursos"
              color="primary"
              flat
              class="q-mb-md"
              @click="unselectCourse"
            />

            <q-card class="selected-card">
              <q-img
                :src="getSelectedCourseImage"
                :ratio="16/9"
                spinner-color="primary"
              >
                <div class="absolute-bottom text-subtitle1 text-center bg-black bg-opacity-50">
                  {{ selectedCourse }}
                </div>
              </q-img>
            </q-card>

            <!-- Lista de feedbacks -->
            <q-card class="q-mt-md">
              <q-card-section>
                <div class="text-h6 q-mb-md">Feedbacks dos alunos</div>

                <!-- Área para responder feedback -->
                <q-input
                  v-model="feedback"
                  label="Responda ao feedback"
                  type="textarea"
                  filled
                  autogrow
                  class="q-mb-md"
                />

                <q-btn
                  label="Enviar resposta"
                  color="blue-7"
                  class="full-width"
                  rounded
                  @click="submitFeedback"
                />
              </q-card-section>
            </q-card>
          </div>
        </template>
      </div>

      <q-btn
        label="VOLTAR"
        color="primary"
        class="full-width q-mt-lg"
        flat
        rounded
        :to="{ name: 'me' }"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import jsImage from '../images/javascript.jpg'
import pythonImage from '../images/python.jpg'
import reactImage from '../images/react.jpg'
import devopsImage from '../images/devops.jpg'
import flutterImage from '../images/flutter.jpg'

const courses = [
  {
    id: 1,
    name: 'JavaScript Full Stack Development',
    image: jsImage
  },
  {
    id: 2,
    name: 'Python para Data Science',
    image: pythonImage
  },
  {
    id: 3,
    name: 'React Native Mobile Development',
    image: reactImage
  },
  {
    id: 4,
    name: 'DevOps & Cloud Computing',
    image: devopsImage
  },
  {
    id: 5,
    name: 'Flutter Development',
    image: flutterImage
  }
]

const selectedCourse = ref('')
const feedback = ref('')

const getSelectedCourseImage = computed(() => {
  const course = courses.find(c => c.name === selectedCourse.value)
  return course ? course.image : ''
})

const selectCourse = (courseName) => {
  selectedCourse.value = courseName
}

const unselectCourse = () => {
  selectedCourse.value = ''
  feedback.value = ''
}

const submitFeedback = () => {
  console.log('Resposta enviada:', {
    curso: selectedCourse.value,
    resposta: feedback.value
  })
  feedback.value = ''
}
</script>

<style scoped>
.bg-primary {
  background-color: #0077c2;
}

.text-white {
  color: #ffffff;
}

.course-card {
  transition: all 0.3s ease;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.selected-card {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Animações de transição */
.row {
  transition: all 0.3s ease;
}
</style>
