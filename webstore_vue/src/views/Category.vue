<template>
    <div class="container block">
        <div class="header grid place-items-center text-3xl">
            {{ category.name }}
        </div>

        <div class="grid place-items-center grid-cols-3 gap-5">
            <ProductList
            v-for="product in category.products"
            v-bind:key="product.id"
            v-bind:product="product"
            />
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import ProductList from '@/components/ProductList'

export default {
    name: 'Category',
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    components: {
        ProductList
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug

            this.$store.commit('setIsLoading', true)

            await axios
                .get(`api/v1/products/${categorySlug}/`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | Leeba'
                })
                .catch(error => {
                    console.log(error)

                     createToast('Oops! Something went wrong.', {
                        type: 'danger',
                        position: 'bottom-right'
                    })
                })


            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>