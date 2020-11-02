<template>
    <div>
        <AddProduct @update-list="updateList" />
        <DisplayProducts :value="value"></DisplayProducts>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import AddProduct from './AddProduct.vue'
import DisplayProducts from './DisplayProducts.vue'

@Component({
    components: {
        AddProduct,
        DisplayProducts
    }
})

export default class ProductsList extends Vue {
    value: string = ''

    updateList(value) {
        this.value = value
    }
}
</script>
