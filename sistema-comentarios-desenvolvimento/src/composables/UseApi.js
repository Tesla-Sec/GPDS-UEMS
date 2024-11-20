import { ref } from 'vue'
import useSupabase from 'src/boot/supabase'

const user = ref(null)
export default function useApi () {
  const { supabase } = useSupabase()

  const isLoggedIn = () => {
    return !!user.value
  }

  const getUserByCredentials = async (table, form) => {
    const { usuario, senha } = form

    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('usuario', usuario)
      .eq('senha', senha)

    if (error) {
      throw Error
    }

    return data.length > 0 ? data[0] : null
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
    isLoggedIn,
    getUserByCredentials,
    list,
    getById,
    post,
    update,
    remove
  }
}
