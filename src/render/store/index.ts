// 状态管理

import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import app, { IAppState } from './modules/app'


interface IState {
  app: IAppState
}

export const key: InjectionKey<Store<IState>> = Symbol()
/**
 * 创建store
 */
export const store = createStore<IState>({
  modules: {
    app
  }
})