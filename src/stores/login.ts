import type { RestaurantDTOOut, UserDTOOut } from '@/@types'
import { LoginApi, UserApi } from '@/services'
import { useNotify } from '@/plugins/toast-notify'
import { defineStore } from 'pinia'

const $notify = useNotify()

export const useLoginStore = defineStore('login', {
  state: () => ({
    isLogged: false,
    user: {} as UserDTOOut,
    restaurant: {} as RestaurantDTOOut
  }),
  actions: {
    async SET_LOGGED_USER() {
      await Promise.all([this.GET_USER(), this.GET_RESTAURANT()])
      this.isLogged = true
    },
    async GET_USER() {
      const { data, error } = await UserApi.getLoggedUser()

      if (error) return $notify.error('Erro ao consultar usuário.')
      this.user = data
    },
    async GET_RESTAURANT() {
      const { data, error } = await UserApi.getLoggedRestaurant()

      if (error) return $notify.error('Erro ao consultar restaurante.')
      this.restaurant = data
    },
    async LOG_OUT() {
      const { error } = await LoginApi.postLogOut()

      if (error) return $notify.error('Erro ao sair da sessão.')

      this.user = {} as UserDTOOut
      this.restaurant = {} as RestaurantDTOOut
      this.isLogged = false
    }
  }
})
