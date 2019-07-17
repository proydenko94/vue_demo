import Vue from "vue";
import Vuex from "vuex";
import { getRandomNumber } from '../helpers'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
  },
  getters: {
    item: state => id => {
      return state.items.filter(v => v.id == id)[0] || null;
    },
    items: state => {
      let items = state.items;
      let minFZ = Math.min.apply(null, items.map(v => v.volume)),
        maxFZ = Math.max.apply(null, items.map(v => v.volume));
      const range = [12, 100];

      items = items.map(v => {
        //range of size is range []
        v.size = range[0] + Math.floor((v.volume - minFZ) / maxFZ * (range[1] - range[0]));
        // random generator for color
        v.color = `rgb(${[0, 0, 0].map(() => getRandomNumber(0, 255)).join(',')})`
        return v;
      });
      items.sort((a, b) => {
        return b.size - a.size;
      })
      return items;
    }
  },
  mutations: {
    set(state, { type, data }) {
      state[type] = data;
    }
  },
  actions: {
    get({ commit }, url) {
      // console.log(Vue.http.get)
      Vue.http.get(url, {})
        .then(response => {
          commit("set", { type: "items", data: response.body });
        },
        errorResponse => {
          commit("set", { type: "items", data: errorResponse.body });
        }
        );
    }
  }
});
