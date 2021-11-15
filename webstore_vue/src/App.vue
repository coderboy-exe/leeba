<template>
  <div id="wrapper">
    <nav class="lg:space-x-10 flex items-center justify-between flex-wrap bg-white shadow-xl p-6">
      <div class="lg:pl-20 lg:pr-10 flex items-center flex-shrink-0 text-red mr-6">
        <router-link to="/" class="font-semibold text-2xl tracking-tight text-red-500"><strong>Tailwind CSS</strong></router-link>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-black hover:border-black" data-target="nav-menu" @click="showMobileMenu = !showMobileMenu">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="nav-menu" v-bind:class="{'sm:hidden': !showMobileMenu}">
        
        <form action="/search" method="get" class="mr-80 inline border-2 border-gray-300 bg-white h-10 pl-5 rounded-lg text-sm focus:outline-none mx-auto text-gray-600 inline-flex">
          <input type="text" name="query" placeholder="Search">
          <button type="submit" class="px-2 pt-1 inline">
            <unicon name="search" fill="black" class="text-sm"></unicon>
          </button>
        </form>
        

        <div class="text-sm lg:flex-grow">
          <router-link to="/wholesale" class="block mt-4 lg:inline-block lg:mt-0 text-red-500 font-semibold hover:text-red-700 mr-4">
            Wholesale
          </router-link>
          <router-link to="/retail" class="block mt-4 lg:inline-block lg:mt-0 text-red-500 font-semibold hover:text-red-700 mr-4">
            Retail
          </router-link>
          <router-link to="/blog" class="block mt-4 lg:inline-block lg:mt-0 text-red-500 font-semibold hover:text-red-700">
            Blog
          </router-link>
        </div>
        <div>
          <router-link to="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-gray-500 bg-gray-300 mt-4 lg:mt-0"><unicon name="shopping-cart" fill="white" class="text-sm inline-block align-items-center"></unicon>Cart ({{ cartTotalLength }})</router-link>
          <router-link to="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-green-500 bg-green-300 mt-4 lg:mt-0"><unicon name="signin" fill="white" class="text-sm inline-block align-items-center"></unicon>Login</router-link>
        </div>
      </div>
  </nav>

  <div class="is-loading-bar flex items-center justify-center space-x-2 animate-bounce" v-bind:class="{'is-loading': $store.state.isLoading}">
    <div class="w-5 h-5 bg-red-300 rounded-full"></div>
    <div class="w-5 h-5 bg-red-500 rounded-full"></div>
    <div class="w-5 h-5 bg-red-700 rounded-full"></div>
  </div>

  <section>
    <router-view/>
  </section>

  <footer class="grid place-items-center py-10">
    <p class="align-items-center">Copyright (c) 2021</p>
  </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
  },

  mounted() {
    this.cart = this.$store.state.cart
  },

  computed: {
    cartTotalLength() {
      let totalLength = 0

      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity
      }

      return totalLength
    }
  }

}
</script>

<style lang="scss">
  @import '../node_modules/tailwindcss';

  .is-loading-bar {
    height: 0;
    overflow: hidden;

    &.is-loading {
      height: 80px;
    }
  }
</style>
