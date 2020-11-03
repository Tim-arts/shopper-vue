<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <ul class="list-item">
                    <li v-for="(product, index) in sortProductsByNotSelected" :key="index" :class="['item', 'd-flex', 'align-items-center', 'position-relative', { selected: product.selected }]" @click="toggleSelectedClass(product.id)">
                        <input :id="product.slug" :checked="product.selected" type="checkbox" :value="product.slug" />
                        <label :for="product.slug" @click.prevent>{{ product.name }}</label>
                        <div class="options">
                            <button class="delete-item position-absolute" @click="deleteProduct(product.slug)">
                                <i class="fas fa-times"/>
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Product } from '@/core/types'
import Utils from '@/util/utils'

/* Load data */
import productList from '@/static/products.json'

@Component
export default class AddProduct extends Vue {
    @Prop() value!: string

    productList: any[] = productList

    get sortProductsByNotSelected(): any[] {
        return this.productList.sort(p => (p.selected ? 0 : -1))
    }

    deleteProduct(slug: string) {
        this.productList = this.productList.filter(o => o.slug !== slug)
    }

    toggleSelectedClass(id: number) {
        const product = this.productList.find(p => p.id === id)
        product.selected = !product.selected
    }

    @Watch('value')
    submit(value: string) {
        const slug = Utils.ConvertNameToSlug(value)
        const isProductAlreadyExist = Utils.CheckArrayOfObjectsIncludesSlug(slug, this.productList)

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
