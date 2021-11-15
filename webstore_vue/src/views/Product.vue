<template>
    <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" v-bind:src="product.get_image">
                <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 class="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                    <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{{product.name}}</h1>
                    <p class="leading-relaxed">{{product.description}}</p>
                    <div class="flex ml-6 items-center py-4">
                        <span class="mr-3">Quantity</span>
                        <div class="relative">
                            <input type="number" class="input w-20 rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500 text-base px-2" min="1" v-model="quantity">
                        </div>
                    </div>
                    <div class="flex place-items-center">
                        <span class="title-font font-medium text-2xl text-gray-900">NGN {{product.price}}</span>
                        <button class="flex ml-auto text-green-600 hover:text-white bg-transparent border-2 border-green-500 py-2 px-6 focus:outline-none hover:bg-green-500 rounded" @click="addToCart">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1,
        }
    },
    mounted() {
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true)

            const category_slug=this.$route.params.category_slug
            const product_slug=this.$route.params.product_slug

            await axios 
                .get(`api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data

                    document.title = this.product.name + ' | Leeba'
                })
                .catch(error => {
                    console.log(error)
                })

            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }

            const item = {
                product: this.product,
                quantity: this.quantity
            }

            this.$store.commit('addToCart', item)

            createToast('Item added successfully!', {
                type: 'success',
                position: 'bottom-right'
            })
        }

    }
}
</script>