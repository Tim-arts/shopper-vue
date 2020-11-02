<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <input v-model="value" type="text" placeholder="Add a product" @keyup.enter="submit" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AddProduct extends Vue {
    value: string = ''

    submit() {
        this.$emit('update-list', this.value)
        this.value = ''
    }
}
</script>

<style scoped>
@import "../../assets/css/components/AddProduct.css";
</style>
