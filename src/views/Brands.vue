<template>
    <div v-if="getBrands == false">
        <div class="h-screen bg-white">
            <div class="flex justify-center items-center h-full">
                <img class="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="">
            </div>
        </div>
    </div>
    <div v-else>
        <div class="mt-20 text-center">
            <span class="font-bold text-4xl">All Brands</span>
        </div>
        <div class="grid md:grid-cols-4 gap-3  mt-10 pl-5">
            <div v-for="brands in getBrands.data.slice(0, 8)" :key="brands.id">
                <!-- component -->
                <div class="flex flex-col justify-center items-center max-w-sm mx-auto my-8">
                    <div style="background-image: url(https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80)"
                        class="bg-gray-300 h-64 w-full rounded-lg shadow-md bg-cover bg-center"></div>
                    <div class="w-56 md:w-64 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden">
                        <div class="py-2 text-center font-bold uppercase tracking-wide text-gray-800">{{ brands.name }}
                        </div>
                        <div class="flex items-center justify-between py-2 px-3 bg-gray-400">
                            <h1 class="text-gray-800 font-bold ">{{ brands.slug }}</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
      
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters('brands', ['getBrands']),
    },
    methods: {
        ...mapActions('brands', ['fetchBrands'])
    },
    created() {
        this.fetchBrands();
    },
}
</script>