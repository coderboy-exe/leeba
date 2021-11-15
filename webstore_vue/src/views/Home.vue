<template>
  <div class="home">
    <section class="container grid place-items-center lg:h-80 bg-red-500 bg-cover mx-auto rounded-xl drop-shadow-lg">
      <div class="text-center text-white">
        <h2 class="font-medium text-3xl py-2">
          Welcome to Leeba Pharmacy
        </h2>
        <p class="font-thin text-xl">
          Your one-stop for medical supplies
        </p>
      </div>
    </section>

    <div class="block">
      <div class="text-center align-items-center font-medium opacity-60 text-3xl py-10">
        <h2 class="text-center">Latest Products</h2>
      </div>
    
      <div class="grid place-items-center grid-cols-3 gap-5">
        <ProductList
          v-for="product in latestProducts"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
import ProductList from '@/components/ProductList'

export default {
  name: 'Home',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    ProductList
  },
  mounted() {
    this.getLatestProducts()

    document.title = 'Home | Leeba Pharmacy'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('api/v1/latest-products')
        .then(response => {
          this.latestProducts = response.data
        })
        .catch(error => {
          console.log(error)
        })

        this.$store.commit('setIsLoading', false)

    },
  }
}
</script>
