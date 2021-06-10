const app = Vue.createApp({
    data(){
        return{
            test: 555
        }
    },
    methods:{
        loading(){
            const loader = this.$loading.show();
            setTimeout(()=>{
                loader.hide();
            },1500)
        }
    },
    mounted(){
    }
})

app.use(VueLoading);
app.mount('#app');