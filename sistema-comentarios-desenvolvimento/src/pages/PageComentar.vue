<template>
  <q-page class="flex flex-center bg-secondary text-primary">
    <div class="text-center q-pa-md" style="max-width: 800px;">
      <h1 class="text-h4">Compartilhe sua experiência</h1>

      <p class="text-subtitle1 q-mt-sm">
        Avalie e descreva o curso. Seus comentários nos ajudarão a aprimorar a qualidade do ensino.
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

        <!-- Card selecionado -->
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

            <!-- Rating -->
            <q-card class="q-mt-md">
              <q-card-section>
                <div class="text-subtitle1 q-mb-sm">Avalie o curso:</div>
                <q-rating
                  v-model="rating"
                  :max="5"
                  size="2.5em"
                  color="yellow-7"
                  icon="star_border"
                  icon-selected="star"
                />
              </q-card-section>
            </q-card>

            <!-- Área de texto para feedback -->
            <q-card class="q-mt-md">
              <q-card-section>
                <q-input
                  filled
                  v-model="feedback"
                  placeholder="Digite seu comentário aqui..."
                  type="textarea"
                  autogrow
                  color="primary"
                />
              </q-card-section>
            </q-card>

            <!-- Botão de enviar -->
            <q-btn
              label="Enviar feedback"
              color="blue-7"
              class="full-width q-mt-lg"
              rounded
              :disable="!rating || !feedback"
              @click="submitFeedback"
            />
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
import { useQuasar } from 'quasar'
import jsImage from '../images/javascript.jpg'
import pythonImage from '../images/python.jpg'
import reactImage from '../images/react.jpg'
import devopsImage from '../images/devops.jpg'
import flutterImage from '../images/flutter.jpg'

const { list, post, getByEmailAndColumn } = useApi()
const $q = useQuasar()
const { getUserEmail } = useAuthUser()

const courses = ref([])
const selectedCourse = ref(null)
const feedback = ref('')
const rating = ref(0)

const courseImages = {
  1: jsImage,
  2: pythonImage,
  3: reactImage,
  4: devopsImage,
  5: flutterImage
}

const selectCourse = (course) => {
  selectedCourse.value = {
    ...course,
    image: courseImages[course.codigo] || ''
  }
}

const unselectCourse = () => {
  selectedCourse.value = null
  feedback.value = ''
  rating.value = 0
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

const submitFeedback = async () => {
  if (!selectedCourse.value || !rating.value || !feedback.value) {
    $q.notify({
      type: 'warning',
      message: 'Por favor, preencha todos os campos'
    })
    return
  }

  try {
    const userCpf = await getByEmailAndColumn('pessoa', await getUserEmail(), 'cpf')

    const formData = {
      nota: rating.value,
      comentario: feedback.value,
      curso_codigo: selectedCourse.value.codigo,
      usuario_cpf: userCpf,
      nivel: 1
    }

    await post('feedback', formData)

    $q.notify({
      type: 'positive',
      message: 'Feedback enviado com sucesso!'
    })

    // Reseta o formulário
    feedback.value = ''
    rating.value = 0
    selectedCourse.value = null
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erro ao enviar feedback',
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
</style>
