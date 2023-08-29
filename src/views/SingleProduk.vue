<template>
  <div class="container my-24 mx-auto md:px-6 xl:px-32">
    <section class="mb-32">
      <div
        class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
        v-if="products" style="background-color: gray;">
        <div class="flex flex-wrap items-center">
          <div class="block w-full shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
            <img
              src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="Trendy Pants and Shoes" class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" />
          </div>
          <div class="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12" style="background-color: silver;">
            <div class="px-6 py-12 md:px-12">
              <h2 class="mb-6 pb-2 text-4xl font-bold">{{ products.name }}</h2>
              <p class="mb-6 pb-2 text-neutral-500 dark:text-neutral-300">Deskripsi : Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. A
                soluta corporis voluptate ab error quam dolores doloremque,
                quae consectetur.</p>
              <p>Stok : {{ products.stock }}</p>
              <button @click="decrementQty" class="border rounded-md py-2 px-4 mr-2">-</button>
              <input type="number" class="text-center w-20 border rounded-md py-2 px-2 " v-model="qty">
              <!-- <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1"> -->
              <button @click="incrementQty" class="border rounded-md py-2 px-4 ml-2">+</button>
              <p>Harga : Rp.{{ products.base_price * qty }}</p>
              <div class="flex items-center mt-5">

              </div>


              <div class="absolute top-0 right-1 flex sm:bottom-0 sm:top-auto">
                <button type="button"
                  class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                  <svg class="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"
                      class="">
                    </path>
                  </svg>
                </button>
              </div>
              <div v-if="token">
                <button type="button" @click="addKeranjang(products.variations[0].id)"
                  class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Keranjang
                </button>
              </div>

              <div v-else>
                <router-link to="/login">
                  <button type="button"
                    class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    + keranjang
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->
  </div>
  <!-- Container for demo purpose -->
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      token: null,
      qty: 1
    }
  },
  computed: {
    ...mapGetters("product", ["getProdukSlug"]),
    products() {
      return this.getProdukSlug(this.$route.params.slug);
    },
  },
  methods: {
    ...mapActions("product", ["fetchSingleProduk"]),
    ...mapActions("product", ["fetchProduk"]),
    ...mapActions("keranjang", ["fetchKeranjang"]),

    decrementQty() {
      if (this.qty > 1) {
        this.qty--;
      }
    },

    incrementQty() {
      this.qty++
    },
    ...mapActions("product", ["addKeranjang"]),
  },
  beforeMount() {
    this.fetchProduk()
    this.fetchKeranjang()

  },
  mounted() {
    const Slug = this.$route.params.slug;
    this.fetchSingleProduk(Slug)

    //cek token
    const cektoken = localStorage.getItem('token');
    this.token = cektoken
  }
};
</script>