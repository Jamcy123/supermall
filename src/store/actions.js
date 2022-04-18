import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // 有判断逻辑建议放 actions 里面
  addCart(context, payload) {
    return new Promise(resolve => {
      // 1. payload 新添加的商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 2. 判断 oldProduct + 1 或者 新添加
      if(oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve('商品数量 +1');
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit(ADD_TO_CART, payload);
        resolve('添加新的商品');
      }
    })
  }
}
