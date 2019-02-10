import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const Getters = {
  COUNTER : 'counter',
  COUNTER_PLUS10 : 'counterPlus10',
};
const Mutations = { // not export. please use action.
  INC_COUNTER : 'incrementCounter',
  SET_COUNTER : 'setCounter',
};
export const Actions = {
  DO_INC_COUNTER : 'doIncrementCounter',
  DO_INC2_COUNTER : 'doIncrementCounter2',
  DO_SET_COUNTER : 'doSetCounter',
  DO_SQE_COUNTER : 'doSquareCounter',
  DO_ADD_COUNTER : 'doAddCounter',
};

interface State {
  conuter: number;
}

export default new Vuex.Store({
  state: {
    conuter: 0,
  } as State,
  getters: {
    [Getters.COUNTER]: ({ conuter }/*state*/, _) => conuter,
    [Getters.COUNTER_PLUS10]: (_, { counter }/*getters*/) => counter + 10,
  },
  mutations: {
    [Mutations.INC_COUNTER](state) {
      state.conuter += 1;
    },
    [Mutations.SET_COUNTER](state, counter) {
      state.conuter = counter;
    },
  },
  actions: {
    [Actions.DO_INC_COUNTER]({ commit }) {
      commit(Mutations.INC_COUNTER);
    },
    [Actions.DO_INC2_COUNTER]({ dispatch }) {
      dispatch(Actions.DO_INC_COUNTER);
      dispatch(Actions.DO_INC_COUNTER);
    },
    [Actions.DO_SQE_COUNTER]({ getters, commit }) {
      commit(Mutations.SET_COUNTER, getters[Getters.COUNTER] * getters[Getters.COUNTER]);
    },
    [Actions.DO_SET_COUNTER]({ commit }, counter) {
      return new Promise((resolve, _/*reject*/) => {
        setTimeout(() => {
          commit(Mutations.SET_COUNTER, counter);
          resolve();
        }, 1000);
      });
    },
    [Actions.DO_ADD_COUNTER]({ state }, counter) {
      state.conuter += counter; // anti-pattrn (move this mutations to action. this action not update state.)
    },
  },
});
