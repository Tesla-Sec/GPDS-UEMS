import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

const user = ref(null)
export default function useApi () {
  const { supabase } = useSupabase()

  const isLoggedIn = () => {
    return !!user.value
  }

  const logout = () => {
    user.value = null
  }

  const getUserByCredentials = async (table, form) => {
    const { usuario, senha } = form

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('usuario', usuario)
      .eq('senha', senha)

    if (error) {
      throw new Error('Erro ao buscar usuário')
    }

    const foundUser = data.length > 0 ? data[0] : null

    user.value = foundUser

    return foundUser
  }

  const getByEmailAndColumn = async (table, email, column) => {
    const { data, error } = await supabase
      .from(table)
      .select(column)
      .eq('email', email)

    if (error) throw error

    return data.length > 0 ? data[0][column] : null
  }

  const list = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    if (error) throw error
    return data
  }

  const getById = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form
        }
      ])
    if (error) throw error
    return data
  }

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        [
          ...form
        ]
      ])
      .match({ id: form.id })
    if (error) throw error
    return data
  }
  const remove = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  return {
    user,
    isLoggedIn,
    logout,
    getUserByCredentials,
    getByEmailAndColumn,
    list,
    getById,
    post,
    update,
    remove
  }
}
