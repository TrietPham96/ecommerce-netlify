import axios from "axios";

let dynamicRoutes = () => {
  let productsList = new Promise((resolve, reject) => {
    axios
      .get("https://api.chec.io/v1/products", {
        headers: {
          "X-Authorization":
            "your_key",
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        resolve(res.data.data.map((el) => `product/${el.id}`));
      }), error => {
        reject(error);
      }
  });

  let categoriesList = new Promise((resolve, reject) => {
    axios
      .get("https://api.chec.io/v1/categories", {
        headers: {
          "X-Authorization":
            "your_key",
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        resolve(res.data.data.map((el) => `category/${el.id}`));
      }), error => {
        reject(error);
      }
  });
  let promises = [categoriesList, productsList];
  return Promise.all(promises).then(values => {
    return (values.join().split(',')).concat(['/'])
  });
}

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    script: [{ src: 'https://js.stripe.com/v3/' }],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Montserrat:300,600|PT+Serif&display=swap'
      }
    ]
  },
  generate: {
    routes: dynamicRoutes
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['normalize.css', { src: '~/assets/main.scss', lang: 'sass' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/currency-filter.js" },
    { src: "~/plugins/commerce.js" }],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
