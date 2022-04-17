import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // mutations 唯一的目的就是修改 state 中状态
  // mutations 中的每个方法尽可能完成的事件比较单一一点
  // 数量 +1
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  // 新添加商品
  [ADD_TO_CART](state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  }
}
