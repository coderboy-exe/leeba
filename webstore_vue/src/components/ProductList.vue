<template>
    <div class="block space-y-5 transition transform hover:-translate-y-1 hover:scale-110 border-4 duration-500 ease-in-out border-opacity-100 rounded-xl p-4">
        <div class="box-content">
        <figure class="p-2">
            <img v-bind:src="product.get_thumbnail" alt="">
        </figure>

        <h3 class="text-center text-base">{{product.name}}</h3>
        <p class="text-xl text-center text-gray-500">NGN {{product.price}}</p>
        </div>

        <div class="flex">
            <router-link v-bind:to="product.get_absolute_url" class="grid place-items-center ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Read more</router-link>
            <button class="grid place-items-center ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" @click="addToCart">Add to cart</button>
        </div>

    </div>
</template>


<script>
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
    name: 'ProductList',
    props: {
        product: Object
    },
    methods: {
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