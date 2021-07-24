import Vue from 'vue'
import axios from "axios";
import data from "~/static/storedata.json";

export const state = () => ({
  cartUIStatus: "idle",
  storedata: data,
  cart: [],
  clientSecret: "", // Required to initiate the payment from the client
  categories: [],
  products: [],
  productsByCategory: []
});

export const getters = {
  getCategories: state => state.categories,
  getProducts: state => state.products,
  getProductsByCategory: state => state.productsByCategory,
  featuredProducts: state => state.products.slice(0, 10),
  women: state => state.storedata.filter(el => el.gender === "Female"),
  men: state => state.storedata.filter(el => el.gender === "Male"),
  cartCount: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity, 0);
  },
  cartTotal: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0);
  },
  cartItems: state => {
    if (!state.cart.length) return [];
    return state.cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity
      };
    });
  },
  clientSecret: state => state.clientSecret
};

export const mutations = {
  updateCartUI: (state, payload) => {
    state.cartUIStatus = payload;
  },
  clearCart: state => {
    //this clears the cart
    (state.cart = []), (state.cartUIStatus = "idle");
  },
  addToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id);
    itemfound
      ? (itemfound.quantity += payload.quantity)
      : state.cart.push(payload)
  },
  setClientSecret: (state, payload) => {
    state.clientSecret = payload;
  },
  addOneToCart: (state, payload) => {
    let itemfound = state.cart.find(el => el.id === payload.id)
    itemfound ? itemfound.quantity++ : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex(el => el.id === payload.id)
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1)
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter(el => el.id !== payload.id)
  },
  SET_CATEGORIESLIST: (state, value) => {
    state.categories = value;
  },
  SET_PRODUCTSLIST: (state, value) => {
    state.products = value;
  },
  SET_PRODUCTSLISTBYCATEGORY: (state, value) => {
    state.productsByCategory = value;
  }
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('getCategoriesList')
      await dispatch('getProductsList')
    } catch (e) {
      throw e
    }
  },
  async createPaymentIntent({ getters, commit }) {
    try {
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        "https://ecommerce-netlify.netlify.app/.netlify/functions/create-payment-intent",
        {
          items: getters.cartItems
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit("setClientSecret", result.data.clientSecret);
      }
    } catch (e) {
      console.log("error", e);
    }
  },
  getCategoriesList({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$commerce.categories.list().then(response => {
        if (response) {
          commit("SET_CATEGORIESLIST", response.data);
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProductsList({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.prototype.$commerce.products.list().then(response => {
        if (response) {
          commit("SET_PRODUCTSLIST", response.data);
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getProductsListByCategory({ commit }, id) {
    let pros = [...this.state.products];
    if (id && pros) {
      pros = pros.filter((x) => x.categories.find((y) => y.id == id));
    }
    commit("SET_PRODUCTSLISTBYCATEGORY", pros);
  }
};
