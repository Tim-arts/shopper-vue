<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <transition-group name="slide" tag="ul" appear>
                    <li v-for="(product) in productList"
                        :key="product.slug"
                        :class="[
                            'item',
                            'd-flex',
                            'align-items-center',
                            'position-relative',
                            { selected: product.selected }
                        ]"
                        @click="toggleChecked(product.slug)"
                    >
                        <input :id="product.slug" :checked="product.selected" type="checkbox" :value="product.slug" />
                        <label :for="product.slug" @click.prevent>{{ product.name }}</label>
                        <div class="options">
                            <button class="delete-item position-absolute" @click="deleteProduct(product.slug)">
                                <i class="fas fa-times"/>
                            </button>
                        </div>
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Product } from '@/core/types'
import Utils from '@/util/utils'

// Load static data
import productList from '@/static/products.json'

@Component
export default class AddProduct extends Vue {
    @Prop() value!: string

    productList: any[] = productList

    sortArray(product: object) {
        const array: any[] = this.productList
        const index: number = array.findIndex(p => product.id === p.id)

        // Delete item from array at specified index
        array.splice(index, 1)
        // Insert item into array at specified index and delete 0 items
        array.splice(array.length, 0, product)

        this.productList = array
    }

    deleteProduct(slug: string) {
        this.productList = this.productList.filter(o => o.slug !== slug)
    }

    toggleChecked(slug: string) {
        const product: object = this.productList.find(p => p.slug === slug)
        product.selected = !product.selected

        if (product.selected) {
            this.sortArray(product)
        }
    }

    @Watch('value')
    submit(value: string) {
        const slug: string = Utils.ConvertNameToSlug(value)
        const isProductAlreadyExist: boolean = Utils.CheckArrayOfObjectsIncludesSlug(slug, this.productList)

        if (!isProductAlreadyExist) {
            const product: Product = {
                id: this.productList.length,
                name: value,
                slug,
                selected: false
            }

            this.productList.push(product)
        }
    }
}
</script>

<style scoped>
@import "../../assets/css/components/DisplayProducts.css";
</style>
