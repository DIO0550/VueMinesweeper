import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Component from '@/component/Game.vue';
import Vue from 'vue';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Component', () => {
  let store
  let panelInfoStoreMock

  beforeEach(() => {
    const getters = {
        column: () => 1,
        row: () => 2,
        bombCount: () => 3,
    }
    const actions = {
        setColumn: jest.fn(),
        column: jest.fn(),
        setRow: jest.fn(),
        row: jest.fn(),
        setBombCount: jest.fn(),
        bombCount: jest.fn()
    }
    //Vuexストアのモックを作成する
    panelInfoStoreMock = {
      namespaced: true,
      actions,
      getters
    }

    store = new Vuex.Store({
      modules: {
        panel_info_store: panelInfoStoreMock
      }
    })
    
  })
  
  describe('create', () => {
        it('test store column', () => {
            const wrapper = shallowMount(Component, { store, localVue })
            expect(wrapper.vm.column).toBe(store.getters['panel_info_store/column'])
        })

        it('test store row',  () => {
            const wrapper = shallowMount(Component, { store, localVue })
            expect(wrapper.vm.row).toBe(store.getters['panel_info_store/row'])
        })

        it('test store bombCount', () => {
            const wrapper = shallowMount(Component, { store, localVue })
            expect(wrapper.vm.bombCount).toBe(store.getters['panel_info_store/bombCount'])
        })

        it('test call create bomb', () => {
            const createBomds = jest.fn()
            const wrapper = shallowMount(Component, { store, localVue, methods: { createBombs: createBomds }})
            wrapper.setMethods({ createBomds });
            expect(wrapper.vm.createBomds).toHaveBeenCalled()
        })
    })
})