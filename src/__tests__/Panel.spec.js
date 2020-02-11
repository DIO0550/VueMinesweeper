import { shallowMount } from '@vue/test-utils';
import Component from '@/component/Panel.vue'
import Vue from 'vue';

const propsBombTrue = {
    row: 2,
    column: 2,
    bomb: true,
    aroundBombNum: 2,
    aroundPanelOpen: () => {},
    didOpenedPanel: () => {},
    didOpenBomb: () => {},
};

const propsBombFalse = {
    row: 2,
    column: 2,
    bomb: true,
    aroundBombNum: 2,
    aroundPanelOpen: () => {},
    didOpenedPanel: () => {},
    didOpenBomb: () => {},
};

describe('Component', () => {

  it('open false test', () => {
    const wrapper = shallowMount(Component, { propsData: { ...propsBombTrue } })
    expect(wrapper.contains(".back_bounds")).toBe(false)
    expect(wrapper.contains(".outer_bounds")).toBe(true)
  
  });

  it('open true test', async () => {
    const wrapper = shallowMount(Component, { propsData: { ...propsBombTrue } })
    wrapper.setData({ open: true });
    await Vue.nextTick()
    expect(wrapper.contains(".back_bounds")).toBe(true)
    expect(wrapper.contains(".outer_bounds")).toBe(false)
  
  });

  it ('right click panel test', async () => {
    const wrapper = shallowMount(Component, { propsData: { ...propsBombFalse } })
    const panelRightClick = jest.fn(); 
    wrapper.setMethods({ panelRightClick: panelRightClick })
    wrapper.find('.outer_bounds').trigger('contextmenu.prevent')
    expect(panelRightClick).toBeCalled()
  });

  it('click panel test', () => {
    const wrapper = shallowMount(Component, { propsData: { ...propsBombFalse } })
    const clickPanel = jest.fn(); 
    wrapper.setMethods({ clickPanel });
    wrapper.find('.outer_bounds').trigger('click');
    expect(clickPanel).toBeCalled()
  });
});