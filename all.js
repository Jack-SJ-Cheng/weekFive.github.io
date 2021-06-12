import pagination from './pagination.js';

const app = Vue.createApp({
    components: {
        pagination
    },
    data(){
        return{
            url: 'https://vue3-course-api.hexschool.io',
            apiPath: 'randomno',
            products: [],
            purchase: []
        }
    },
    methods:{
        loading(){
            const loader = this.$loading.show();
            setTimeout(()=>{
                loader.hide();
            },1500)
        },
        getData(page = 1){
            axios.get(`${this.url}/api/${this.apiPath}/products?page=${page}`)
            .then(res=>{
                if(res.data.success){
                    const {products} = res.data;
                    console.log(products);
                    products.forEach(item=>{
                        this.products.push(item)
                    })
                    console.log(this.products);
                }
            })
            .catch(err=>console.log(err))
        }
    },
    mounted(){
    }
})

app.use(VueLoading);
app.mount('#app');