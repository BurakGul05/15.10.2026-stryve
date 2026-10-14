<template>
      <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

      <div class="siparis-baslik">
            <h3 style="color: white; text-align: center;">SİPARİŞLER</h3>
      </div>

      <table class="table table-striped">
            <thead>
                  <tr>
                        <th scope="col">#</th>
                        <th scope="col">SİPARİŞ NO:</th>
                        <th scope="col">SİPARİŞ VEREN:</th>
                        <th scope="col">TOPLAM TUTAR:</th>
                        <th scope="col">SİPARİŞ TARİHİ:</th>
                        <th scope="col">DURUM:</th>
                        <th scope="col">İŞLEM:</th>


                  </tr>

            </thead>
            <tbody>

                  <tr v-for="order, index in orders">
                        <td> {{ index + 1 }}</td>
                        <td>{{ order.o_no }} </td>
                        <td>{{ order.o_person }} </td>
                        <td>{{ order.o_amount }} </td>
                        <td>
                              {{ new Date(order.o_created_at).toLocaleString("tr-TR", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                              }) }}
                        </td>

                        <td>
                              <select class="form-select" v-model="order.o_status">
                                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                                    <option value="Kargoya Verildi">Kargoya Verildi</option>
                                    <option value="Teslim Edildi">Teslim Edildi</option>
                                    <option value="İptal Edildi">İptal Edildi</option>
                              </select>
                        </td>
                        <td>
                              <div class="text-nowrap">
                                    <button @click="updateOrder(order.o_id, order.o_status)"
                                          class="btn-sm btn btn-outline-primary">Düzenle</button>

                                    <!-- <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger "
                                          @click="deleteOrder(order.id)">Sil</button> -->

                                    <button style="margin-left: 10px;" @click="detailID = index" type="button"
                                          class="btn-sm btn btn-outline-secondary" data-bs-toggle="modal"
                                          data-bs-target="#details"> Detaylar
                                    </button>
                              </div>
                        </td>
                  </tr>
            </tbody>
      </table>

      <!--!  Order Details modal'ı -->
      <div v-if="orders.length > 0" class="modal fade" id="details" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel"> Sipariş Detayları</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                              <div class="row">

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Sipariş No:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_no }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold ">Ürünler:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_products }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Sipariş Veren:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label ">{{ orders[detailID].o_person }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Sipariş Adresi:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_address }}</label>
                                    </div>

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Toplam Tutar:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_amount }}₺</label>
                                    </div>

                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold">Sipariş Tarihi:</label>

                                    </div>

                                    <div class="col-md-8 mb-2">
                                          <label class="form-label"> {{ new
                                                Date(orders[detailID].o_created_at).toLocaleString("tr-TR", {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                      year: "numeric",
                                                      hour: "2-digit",
                                                      minute: "2-digit"
                                                }) }}</label>
                                    </div>


                                    <div class="col-md-4 mb-2 ">
                                          <label class="form-label fw-bold"> Durumu:</label>

                                    </div>

                                    <div class="col-md-8 mb-2 ">
                                          <label class="form-label">{{ orders[detailID].o_status }}</label>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      </div>
</template>

<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
import Toast from '@/components/toast.vue'
export default {

      components: {
            Toast
      },

      data() {
            return {
                  detailID: 0,
                  orders: [],
                  error: null,

                  toastShow: false,
                  toastMessage: "",
                  toastType: "success",

                  baseUrl: "http://localhost:3001"
            };
      },
      mounted() {
            this.getOrders()
      },

      watch: {
      },

      computed: {
      },

      methods: {

            //ALERT YAPISI ICIN EKLENEN TOAST
            showToast(message, type) {
                  this.toastMessage = message;
                  this.toastType = type;
                  this.toastShow = true;

                  setTimeout(() => {
                        this.toastShow = false;
                  }, 3000);
            },

            deleteItem(value, index) {
                  if (value == 'order') {
                        this.orders.splice(index, 1)
                        this.detailID = 0
                  }
            },
            async getOrders() {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/orders`);
                        if (!res.ok) throw new Error("Orders endpoint hatası");
                        this.orders = await res.json();
                  } catch (e) {
                        console.log(e.message);
                  }
            },


            // PUT- Siparis Guncelleme
            async updateOrder(id, status) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
                              method: "PUT",
                              headers: {

                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({//body = asil gonderilen veri demek

                                    status: status,

                              })
                        });
                        if (!res.ok) throw new Error("updateOrder endpoint hatası");

                        const data = await res.json();

                        if (data) {
                              this.showToast("Sipariş güncellendi.", "edit");
                        }
                        this.getOrders();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },

            //DELETE SIPARIS SIL
            // async deleteOrder(id) {
            //       try {
            //             const res = await fetch(`${this.baseUrl}/api/orders/${id}`, {
            //                   method: "DELETE",
            //                   headers: { 

            //                         "Content-Type": "application/json" 
            //                   },
            //             });
            //             if (!res.ok) throw new Error("deleteOrder endpoint hatası");

            //             const data = await res.json(); 

            //             if (data) {
            //                   alert("Urun Silindi")
            //             }
            //             this.getOrders();
            //       }
            //       catch (e) {
            //             console.log(e.message);
            //       }
            // },
      }
};
</script>
<style scoped>
table {
      margin-top: -15px;
}

.siparis-baslik {
      position: relative;
      top: -50px;
}

h3 {
      margin-top: -165px;
}

/* TABLOYU İKİ TARAFTAN DENGELİ BOŞLUKLA YERLEŞTİRİR */
table {
      margin-top: -15px;
      margin-left: 20px;
      width: calc(100% - 40px);
}

/* TABLO BAŞLIKLARINI ORTALAR */
table thead th {
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
}

/* TABLO İÇERİĞİNİ ORTALAR */
table tbody td {
      text-align: center;
      vertical-align: middle;
}

/* # / ID KOLONU */
table th:first-child,
table td:first-child {
      width: 55px;
      text-align: center;
}

/* SİPARİŞ NO */
table th:nth-child(2),
table td:nth-child(2) {
      min-width: 130px;
      text-align: center;
      white-space: nowrap;
}

/* SİPARİŞ VEREN */
table th:nth-child(3),
table td:nth-child(3) {
      min-width: 150px;
      text-align: center;
}

/* TOPLAM TUTAR */
table th:nth-child(4),
table td:nth-child(4) {
      min-width: 120px;
      text-align: center;
      white-space: nowrap;
}

/* SİPARİŞ TARİHİ */
table th:nth-child(5),
table td:nth-child(5) {
      min-width: 150px;
      text-align: center;
      white-space: nowrap;
}

/* DURUM SELECT */
table td:nth-child(6) select {
      width: 165px;
      margin: auto;
}

/* İŞLEM ALANI */
table th:nth-child(7),
table td:nth-child(7) {
      min-width: 130px;
      text-align: center;
      white-space: nowrap;
}

/* GÜNCELLE BUTONU */
table td:nth-child(7) .btn {
      padding: 5px 12px;
      border-radius: 6px;
}

/* SİPARİŞ BAŞLIĞI */
.siparis-baslik {
      position: relative;
      top: -50px;
}

/* SAYFA BAŞLIĞI */
h3 {
      margin-top: -165px;
}
</style>