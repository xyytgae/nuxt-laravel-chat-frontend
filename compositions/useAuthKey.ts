import { InjectionKey } from '@nuxtjs/composition-api'
import { AuthStore } from './useAuth'

const AuthKey: InjectionKey<AuthStore> = Symbol('AuthStore')
export default AuthKey
