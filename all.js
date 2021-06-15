Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: true, // 調整為輸入字元立即進行驗證
});

const url = 'https://vue3-course-api.hexschool.io';
const apiPath = 'randomno';

import pagination from './pagination.js';
import productModal from './productModal.js';

const app = Vue.createApp({
    components: {
        pagination,
        productModal
    },
    data() {
        return {
            user: {
                email: '',
                name: '',
                tel: '',
                address: ''
            },
            productInfo: [],
            products: [],
            purchase: [],
            pagination,
            message: ''
        }
    },
    methods: {
        openModal() {
            this.$refs.productModal.openModal();
        },
        getData(page = 1) {
            axios.get(`${url}/api/${apiPath}/products?page=${page}`)
                .then(res => {
                    if (res.data.success) {
                        this.products = res.data.products;
                        this.pagination = res.data.pagination;
                    }
                })
                .catch(err => console.log(err))
        },
        getInfo(id) {
            axios.get(`${url}/api/${apiPath}/product/${id}`)
                .then(res => {
                    this.productInfo = res.data.product;
                    this.openModal();
                })
                .catch(err => console.log(err))
        },
        addCart(id, qty) {
            axios.post(`${url}/api/${apiPath}/cart`, { "data": { "product_id": id, "qty": qty } })
                .then(res => {
                    this.updateCart();
                })
                .catch(err => console.log(err))
        },
        updateCart() {
            axios.get(`${url}/api/${apiPath}/cart`)
                .then(res => {
                    this.purchase = res.data.data.carts;
                    console.log(res.data.data.carts);
                })
                .catch(err => { console.log(err) })
        },
        sendOrder() {
            const data = {
                "data": {
                    "user": this.user,
                    "message": this.message
                }
            }
            axios.post(`${url}/api/${apiPath}/order`, data)
                .then(res => {
                    console.log(res);
                    this.updateCart();
                    this.user = {
                        email: '',
                        name: '',
                        tel: '',
                        address: ''
                    };
                    this.message = "";
                })
                .catch(err => console.log(err))
        }
    },
    mounted() {
        this.getData();
        this.updateCart();
    }
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');