<template>
      <!-- !Sepet Sidebar  -->
      <!-- <a data-bs-toggle="offcanvas" href="#sepetsidebar">
            <i class="bi bi-cart-fill fs-2 " style="color: red;"></i>
      </a> -->

      <!-- <a data-bs-toggle="offcanvas" href="#sepetsidebar"
            style="position: fixed; right: 150px; top: 50px; z-index: 1030;">
            <i class="bi bi-cart-fill fs-2" style="color: black;"></i>
      </a> -->

      <div class="offcanvas offcanvas-end" tabindex="-1" id="sepetsidebar">
            <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasExampleLabel">SEPET</h5>
                  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                  <div class="row mb-3">
                        <div class="col-8"><b>Ürün Adı</b></div>
                        <div class="col-4"><b>Fiyat</b></div>
                  </div>

                  <div class="row" v-for="value, index in sepet">

                        <div class="col-8">
                              {{ value.p_name }} &nbsp;&nbsp; × &nbsp;&nbsp; {{ value.quantity }}
                        </div>

                        <div class="col-2">
                              {{ value.p_price }}₺
                        </div>

                        <div class="col-2">
                              <i style="cursor: pointer;" @click="deleteItem(index)" class="bi bi-x-lg">
                              </i>
                        </div>

                  </div>


                  <div class="row mt-3">
                        <div class="col-8"><b>Toplam:</b></div>

                        <div class="col-4">{{ toplamTutar }}₺ </div>
                        <div class="row mt-3 mb-3">
                              <button class="btn btn-success w-100" @click="Checkout()">Ödeme Sayfasına Geç
                              </button>
                        </div>

                  </div>


            </div>
      </div>

</template>

<script>

export default {
      inject: ['sepet'],
      data() {
            return {
                  toplam: 0
            };
      },
      mounted() {

      },

      watch: {
      },

      computed: {
            toplamTutar() {
                  this.toplam = this.sepet.reduce((toplam, item) => toplam + Number(item.p_price) * Number(item.quantity), 0);
                  return Math.round(this.toplam * 100) / 100

            }
      },

      methods: {
            Checkout() {
                  // this.$router.push('/checkout')
                  document.getElementById("sepetsidebar").classList.remove("show");

                  const backdrop = document.querySelector(".offcanvas-backdrop");
                  if (backdrop) {
                        backdrop.remove();
                  }
                  document.body.style.overflow = "auto";

                  this.$router.push('/checkout');
            },
            deleteItem(index) {
                  this.sepet.splice(index, 1);

            },
      }
};
</script>
<style scoped>

/* Sepetin genel görünümü */
.offcanvas {
    width: 430px;
    background: #f5f6f8;
    border-left: none;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
}

/* Üst başlık */
.offcanvas-header {
    padding: 24px;
    background: #ffffff;
    border-bottom: none;
}

/* Sepet başlığı */
.offcanvas-title {
    font-size: 25px;
    font-weight: 800;
    color: #171717;
}

/* İçerik alanı */
.offcanvas-body {
    padding: 20px;
}

/* Ürün adı ve fiyat başlığı */
.offcanvas-body > .row:first-child {
    padding: 10px 14px;
    margin-bottom: 12px !important;
    background: transparent;
    color: #777;
}

/* Fiyat başlığını sağa hizalar */
.offcanvas-body > .row:first-child .col-4 {
    text-align: right;
    padding-right: 38px;
}

/* Her ürün için kart görünümü */
.offcanvas-body > .row:not(:first-child) {
    margin-bottom: 10px;
    padding: 17px 12px;
    background: #ffffff;
    border: none;
    border-radius: 12px;
    align-items: center;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

/* Ürün adı */
.offcanvas-body > .row:not(:first-child) .col-8 {
    font-weight: 600;
    color: #222;
}

/* Fiyat */
.offcanvas-body > .row:not(:first-child) .col-2 {
    text-align: right;
    font-weight: 700;
    color: #222;
}

/* Silme ikonu */
.offcanvas-body .bi-x-lg {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    color: #999;
    transition: 0.2s;
}

/* Silme ikonuna gelince */
.offcanvas-body .bi-x-lg:hover {
    background: #ffe5e5;
    color: #dc3545;
}

/* Toplam bölümü */
.offcanvas-body > .row.mt-3 {
    margin-top: 25px !important;
    padding: 20px 15px;
    background: #ffffff;
    border: none;
    border-radius: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.06);
}

/* Toplam yazısı */
.offcanvas-body > .row.mt-3 .col-8 {
    font-size: 17px;
    font-weight: 600;
}

/* Toplam fiyat */
.offcanvas-body > .row.mt-3 .col-4 {
    font-size: 20px;
    font-weight: 800;
    color: #198754;
    text-align: right;
}

/* Ödeme butonu */
.offcanvas-body .btn-success {
    padding: 14px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 700;
    box-shadow: 0 5px 15px rgba(25, 135, 84, 0.2);
    transition: 0.25s;
}

/* Ödeme butonu hover */
.offcanvas-body .btn-success:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(25, 135, 84, 0.3);
}











</style>