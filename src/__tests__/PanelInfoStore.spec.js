import Vuex from 'vuex'
import PanelInfoStore from '@/javascript/Store/PanelInfoStore'
import { createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('avascript/Store/PanelInfoStore.js', () => {
  let store
  beforeEach(() => {
    store = new Vuex.Store(PanelInfoStore)
  })
  describe('getters', () => {
    it('get column', () => {
      store.replaceState({
        column: 5
      })
      expect(store.getters['column']).toBe(5)
    })

    it('get row', () => {
        store.replaceState({
            row: 4
        })
        expect(store.getters['row']).toBe(4)
    })
    
    it('get bomb_count', () => {
        store.replaceState({
            bomb_count: 3
        })
        expect(store.getters['bombCount']).toBe(3)
    })
  })
  describe('actions', () => {
    let commit
    let state
    beforeEach(() => {
      commit = store.commit
      state = store.state
    })

    it('setColumn', async done => {
      await store.commit('setColumn', 5)
      expect(store.getters['column']).toBe(5)
      done()
    })
  })
})