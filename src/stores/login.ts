import type { RestaurantDTOOut, UserDTOOut, RestaurantDTOIn } from '@/@types'
import { LoginApi, RestaurantApi, UserApi } from '@/services'
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
    async SIGN_IN(form: { email: string }) {
      const { error } = await LoginApi.postAuthenticate(form.email)

      if (error) return $notify.error('Credenciais Inválidas!')

      $notify.ok('Enviamos um link de autenticação para seu e-mail.')
    },
    async SIGN_UP(form: RestaurantDTOIn) {
      const { error } = await RestaurantApi.createRestaurant(form)

      if (error) return $notify.error('Credenciais Inválidas!')

      $notify.ok()
    },
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
    async EDIT_PROFILE(restaurant: { name: string; description: string }) {
      const { error } = await UserApi.putRestaurantInfos(restaurant)

      if (error) return $notify.error('Erro ao atualizar informações do restaurante.')

      this.restaurant.name = restaurant.name
      this.restaurant.description = restaurant.description
      $notify.ok()
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
