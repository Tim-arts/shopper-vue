<template>
    <div id="app">
        <Header/>
        <ProductsList/>
    </div>
</template>

<script lang="ts">
import Header from '@/components/template/Header.vue'
import ProductsList from '@/components/ProductsList/index.vue'

export default {
    name: 'App',
    components: {
        Header,
        ProductsList
    }
}
</script>

<style>
@import "./assets/css/App.css";
</style>
