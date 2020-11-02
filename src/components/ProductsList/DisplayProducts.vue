<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <ul class="list-item">
                    <li v-for="(product, index) in productList" :key="index" :class="generateClassListItem(product.slug)" @click="triggerCheckboxChange(product.slug, $event)">
                        <input :id="product.slug" v-model="selectedProducts" type="checkbox" :value="product.slug" />
                        <label :for="product.slug">{{ product.name }}</label>
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

    selectedProducts: any[] = []

    productList: any[] = productList

    isChecked(name: string): boolean {
        return this.selectedProducts.includes(name)
    }

    deleteProduct(slug: string) {
        this.productList = this.productList.filter(o => o.slug !== slug)
    }

    generateClassListItem(slug: string): any[] {
        const result: any[] = [
            'item',
            'd-flex',
            'align-items-center',
            'position-relative'
        ]

        if (this.isChecked(slug)) {
            result.push('active')
        }

        return result
    }

    triggerCheckboxChange(slug: string, e: Event) {
        const element = e.target as HTMLElement
        const array = Utils.ToggleValueFromArray(slug, this.selectedProducts)

        if (element.tagName === 'LI') {
            const checkbox = element.querySelector('[type="checkbox"]') as HTMLInputElement
            checkbox.checked = !checkbox.checked
        }

        this.selectedProducts = array
    }

    @Watch('value')
    submit(value: string) {
        const slug = Utils.ConvertNameToSlug(value)

        if (!this.productList.some(e => e.slug === slug)) {
            const product: Product = {
                id: this.productList.length,
                name: value,
                slug
            }
            this.productList.push(product)
        }
    }
}
</script>

<style scoped>
@import "../../assets/css/components/DisplayProducts.css";
</style>
