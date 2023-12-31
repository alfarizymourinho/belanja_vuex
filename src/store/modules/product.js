import axios from "axios";

const produk = {
  namespaced: true,
  state: {
    produkData: [],
    keranjang: [],

  },
  getters: {
    getProduk: (state) => state.produkData,
  getProdukSlug: (state) => (Slug) => {
    const produk = state.produkData.find((p) => p.slug == Slug)
    // console.log(produk)
    return produk
  }
},
  actions: {
    async fetchProduk({ commit }) {
      try {
        const data = await axios.get("https://ecommerce.olipiskandar.com/api/v1/product/latest/15 ");
        commit("SET_PRODUK", data.data['data']);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    //
    async fetchSingleProduk({ commit }, Slug){
        try{
            const response = await axios.get(
              `https://ecommerce.olipiskandar.com/api/v1/product/details/${Slug}`
            );
            commit("SET_SINGLE_PRODUK", response.data['products']);
        }catch (error) {
            alert(error);
            console.log(error);
        }
    },
    async addKeranjang({ commit, dispatch }, productId) {
      try {
        const response = await axios.post("https://ecommerce.olipiskandar.com/api/v1/carts/add",
        {
          "variation_id":productId,
          "qty": 1,
          "temp_user_id":null
        },{
          headers:{
            'Authorization':`Bearer ${localStorage.getItem("token")}`
          }
        });

        commit("ADD_KERANJANG",response.data)
        alert('Berhasil Menambahkan Ke Keranjang')
        console.log(response.data);

      } catch (error) {
        console.log(error);
      } finally {
        dispatch('keranjang/fetchKeranjang',null,{root : true})
      }
    },
  },
  mutations: {
    SET_PRODUK(state, produk) {
      state.produkData = produk;
    },
    SET_SINGLE_PRODUK(state, produk) {
        state.singleProduk = produk;
      },
      ADD_KERANJANG(state,keranjang){
        state.keranjang=keranjang
      }
  },
};

export default produk;