<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Plataforma de comentários
        </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          MENU
        </q-item-label>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link"/>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

defineOptions({
  name: 'MainLayout'
})

const linksList = [
  {
    title: 'Pagina inicial',
    icon: 'mdi-home-variant-outline',
    routeName: 'me'
  },
  {
    title: 'Comentar',
    icon: 'mdi-comment-text-outline',
    routeName: 'comentar'
  },
  {
    title: 'Vizualizar comentarios',
    icon: 'mdi-comment-eye-outline',
    routeName: 'ver'
  }
]

const leftDrawerOpen = ref(false)

const $q = useQuasar()

const router = useRouter()

const { logout } = useAuthUser()

const handleLogout = () => {
  $q.dialog({
    title: 'Sair',
    message: 'Realmente deseja sair?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
    router.replace({ name: 'login' })
  })
}

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

</script>
