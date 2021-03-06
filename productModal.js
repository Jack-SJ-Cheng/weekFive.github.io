export default {
    props:['info'],
    data() {
        return {
            modal: '',
            addInfo: { "product_id": "", "qty":1 },
            qty: 1
        }
    },
    methods: {
        openModal(){
            this.modal.show();
        }
    },
    template: `
    <div class="modal" ref=productModal tabindex="-1">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">商品詳細資訊</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <img class="w-100" style="height: 350px;object-fit: cover;" :src="info.imageUrl" alt="">
                        <img class="w-100 mt-2" style="height: 350px;object-fit: cover;" v-for="item in info.imagesUrl"
                            :src="item" alt="" :key="item">
                    </div>
                    <div class="col-8">
                        <h4><span class="badge btn-danger">{{info.category}}</span></h4>
                        <h3>{{info.title}}</h3>
                        <h5>{{info.content}}</h5>
                        <h4>{{info.description}}</h4>
                        <div class="text-end px-5">
                            <label for="">數量:</label>
                            <input type="number" min="1" max="10" v-model.number="qty">
                            <button data-bs-dismiss="modal" @click="$emit('addCart', info.id, qty)" type="button"
                                class="mx-3 btn btn-danger">加入購物車</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>`,
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs.productModal);
    }
}