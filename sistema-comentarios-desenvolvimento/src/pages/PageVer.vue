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
               @click="selectCourse(course)"
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
                :src="selectedCourse.image"
                :ratio="16/9"
                spinner-color="primary"
              >
                <div class="absolute-bottom text-subtitle1 text-center bg-black bg-opacity-50">
                  {{ selectedCourse.name }}
                </div>
              </q-img>
            </q-card>

            <!-- Lista de feedbacks -->
            <div v-if="courseFeedbacks.length > 0">
              <q-card v-for="feedback in courseFeedbacks"
                     :key="feedback.id"
                     class="q-mt-md">
                <q-card-section>
                  <div class="row items-center q-mb-sm">
                    <q-rating
                      v-model="feedback.nota"
                      :max="5"
                      size="1.5em"
                      color="yellow-7"
                      icon="star_border"
                      icon-selected="star"
                      readonly
                    />
                    <q-space />
                    <span class="text-caption">{{ formatDate(feedback.created_at) }}</span>
                  </div>

                  <p class="text-body1">{{ feedback.comentario }}</p>

                  <!-- Resposta existente -->
                  <template v-if="feedback.resposta">
                    <q-separator class="q-my-md" />
                    <div class="text-subtitle2 text-primary">Resposta:</div>
                    <p class="text-body2">{{ feedback.resposta }}</p>
                  </template>

                  <!-- Formulário de resposta -->
                  <template v-else>
                    <q-separator class="q-my-md" />
                    <q-input
                      v-model="feedback.newResponse"
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
                      :disable="!feedback.newResponse"
                      @click="submitResponse(feedback)"
                    />
                  </template>
                </q-card-section>
              </q-card>
            </div>

            <div v-else class="text-center q-mt-md">
              <q-card>
                <q-card-section>
                  <p class="text-subtitle1">Nenhum feedback encontrado para este curso.</p>
                </q-card-section>
              </q-card>
            </div>
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
import { ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
import { useQuasar, date } from 'quasar'
import jsImage from '../images/javascript.jpg'
import pythonImage from '../images/python.jpg'
import reactImage from '../images/react.jpg'
import devopsImage from '../images/devops.jpg'
import flutterImage from '../images/flutter.jpg'

const { list, post, update } = useApi()
const $q = useQuasar()

const courses = ref([])
const selectedCourse = ref(null)
const courseFeedbacks = ref([])

const courseImages = {
  1: jsImage,
  2: pythonImage,
  3: reactImage,
  4: devopsImage,
  5: flutterImage
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return date.formatDate(dateString, 'DD/MM/YYYY HH:mm')
}

const selectCourse = async (course) => {
  selectedCourse.value = {
    ...course,
    image: courseImages[course.codigo] || ''
  }
  await loadCourseFeedbacks(course.codigo)
}

const unselectCourse = () => {
  selectedCourse.value = null
  courseFeedbacks.value = []
}

const handleListCourses = async () => {
  try {
    const fetchedCourses = await list('curso')
    courses.value = fetchedCourses.map(course => ({
      ...course,
      name: course.nome,
      image: courseImages[course.codigo] || ''
    }))
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao buscar cursos',
      caption: error.message
    })
  }
}

const loadCourseFeedbacks = async (courseId) => {
  try {
    const feedbacks = await list('feedback')
    courseFeedbacks.value = feedbacks
      .filter(f => f.curso_codigo === courseId)
      .map(f => ({
        ...f,
        newResponse: ''
      }))
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao carregar feedbacks',
      caption: error.message
    })
  }
}

const submitResponse = async (feedback) => {
  if (!feedback.newResponse) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, digite uma resposta'
    })
    return
  }

  try {
    await update('feedback', feedback.id, {
      resposta: feedback.newResponse
    })

    feedback.resposta = feedback.newResponse
    feedback.newResponse = ''

    $q.notify({
      type: 'positive',
      message: 'Resposta enviada com sucesso!'
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao enviar resposta',
      caption: error.message
    })
  }
}

// Fetch courses when component is mounted
onMounted(handleListCourses)
</script>

<style scoped>
.course-card {
  transition: transform 0.3s ease;
}
.course-card:hover {
  transform: scale(1.05);
}
.selected-card {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
