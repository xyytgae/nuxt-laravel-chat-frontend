import { InjectionKey } from '@nuxtjs/composition-api'
import { ChatStore } from './useChat'

const ChatKey: InjectionKey<ChatStore> = Symbol('ChatStore')
export default ChatKey
