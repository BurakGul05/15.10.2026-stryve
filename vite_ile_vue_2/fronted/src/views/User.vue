<script setup>
import adminProducts from '@/components/admin-products.vue'
import adminOrders from '@/components/admin-orders.vue'
import router from '@/router';
</script>

<template>
      <div style="width: 200px; position: absolute; top: 145px;   left: 0px; "
            class=" bg-primary offcanvas offcanvas-start show" tabindex="-1" data-bs-backdrop="false">
            <div class="offcanvas-header">
                  <h5 style="color: white;" class="offcanvas-title"> Kullanıcı Yönetim Paneli</h5>
            </div>
            <div class="offcanvas-body">
                  <div class="mb-4">
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'products'"
                              :class="secim == 'products' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Ürünler</button>

                        <button style="color: black; background-color: aliceblue;" @click="secim = 'orders'"
                              :class="secim == 'orders' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Siparişler</button>


                        <button style="color: black; background-color: aliceblue;" @click="secim = 'purchases'"
                              :class="secim == 'purchases' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">
                              Satın Aldıklarım
                        </button>

                        <button style="color: black; background-color: aliceblue;" @click="secim = 'sales'"
                              :class="secim == 'sales' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">
                              Sattıklarım
                        </button>

                  </div>

                  <div style="bottom: 270px; position: absolute;">
                        <div class="mb-2">
                              <h5 class="text-white">{{ Username }}</h5>
                        </div>
                        <div>
                              <button class="btn btn-light btn" @click="setProfile()"><i
                                          class="bi bi-gear-fill"></i></button>
                              <button style="margin-left: 10px;" class="btn btn-light btn" @click="logout()"><i
                                          class="bi bi-box-arrow-right"></i></button>
                        </div>
                  </div>

            </div>
      </div>

      <div class="admin-content">




            <!-- <h1 style="color:antiquewhite">ADMİN SAYFASI</h1> -->
            <!--! Admin-menu  -->
            <!-- <div class="mb-4">
                  <button @click="secim = 'products'"
                        :class="secim == 'products' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Ürünler</button>
                  <button @click="secim = 'users'"
                        :class="secim == 'users' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Kullanıcılar</button>
                  <button @click="secim = 'orders'"
                        :class="secim == 'orders' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Siparişler</button>
                  <button @click="secim = 'messages'"
                        :class="secim == 'messages' ? 'btn btn-primary m-2' : 'btn btn-outline-primary m-2'">Mesajlar</button>
            </div> -->

            <!--! Ürünlerimiz -->
            <div v-if="secim == 'products'">
                  <adminProducts />
            </div>


            <!--! Siparişler -->
            <div v-if="secim == 'orders'">
                  <adminOrders />
            </div>



            <!--! Satın Aldıklarım -->
            <div v-if="secim == 'purchases'" class="siparis-alani">
                  <h3 class="siparis-baslik">SATIN ALDIKLARIM</h3>

                  <table class="table table-striped table-bordered">
                        <thead>
                              <tr>
                                    <th>Sipariş No:</th>
                                    <th>Ürünler:</th>
                                    <th>Alıcı:</th>
                                    <th>Tutar:</th>
                                    <th>Durum:</th>
                                    <th>Tarih:</th>
                              </tr>
                        </thead>

                        <tbody>
                              <tr v-for="siparis in purchases" :key="siparis.o_id">
                                    <td>{{ siparis.o_no }}</td>
                                    <td>{{ siparis.o_products }}</td>
                                    <td>{{ siparis.o_person }}</td>
                                    <td>{{ siparis.o_amount }} TL</td>
                                    <td>{{ siparis.o_status }}</td>
                                    <td>{{ formatTarih(siparis.o_created_at) }}</td>
                              </tr>

                              <tr v-if="purchases.length == 0">
                                    <td colspan="6" class="text-center">
                                          Henüz satın alma siparişiniz bulunmuyor.
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>


            <!--! Sattıklarım -->
            <div v-if="secim == 'sales'" class="siparis-alani">
                  <h3 class="siparis-baslik">SATTIKLARIM</h3>

                  <table class="table table-striped table-bordered">
                        <thead>
                              <tr>
                                    <th>Sipariş No:</th>
                                    <th>Ürünler:</th>
                                    <th>Alıcı:</th>
                                    <th>Tutar:</th>
                                    <th>Durum:</th>
                                    <th>Tarih:</th>
                              </tr>
                        </thead>

                        <tbody>
                              <tr v-for="siparis in sales" :key="siparis.o_id">
                                    <td>{{ siparis.o_no }}</td>
                                    <td>{{ siparis.o_products }}</td>
                                    <td>{{ siparis.o_person }}</td>
                                    <td>{{ siparis.o_amount }} TL</td>
                                    <td>{{ siparis.o_status }}</td>
                                    <td>{{ formatTarih(siparis.o_created_at) }}</td>
                              </tr>

                              <tr v-if="sales.length == 0">
                                    <td colspan="6" class="text-center">
                                          Henüz satılan ürününüz bulunmuyor.
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>





      </div>

</template>


<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      inject: ['showToast'],

      data() {
            return {

                  secim: "products",
                  Username: "Test",
                  baseUrl: "http://localhost:3001",
                  purchases: [],
                  sales: [],
            };
      },

      mounted() {
            this.getUsername()
      },

      watch: {
            //satin aldiklarim butonu icin 
            secim(yeniSecim) {
                  if (yeniSecim == 'purchases') {
                        this.getPurchases();
                  }
                  if (yeniSecim == 'sales') {
                        this.getSales();
                  }
            },
      },

      computed: {
      },

      methods: {

            //! SATIN ALDIKLARIM BUTONU FONKSIYONU
            async getPurchases() {
                  try {
                        const token = sessionStorage.getItem("token");

                        if (!token) {
                              this.purchases = [];
                              return;
                        }

                        // JWT üzerinden giriş yapan kullanıcının ID'sini al
                        const userRes = await fetch(`${this.baseUrl}/api/me`, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });

                        if (!userRes.ok) {
                              throw new Error("Kullanıcı bilgileri alınamadı.");
                        }

                        const user = await userRes.json();
                        const id = user.u_id;

                        // Sadece giriş yapan kullanıcının siparişlerini getir
                        const res = await fetch(
                              `${this.baseUrl}/api/my-purchases/${id}`
                        );

                        if (!res.ok) {
                              throw new Error("Satın alınan siparişler alınamadı.");
                        }

                        this.purchases = await res.json();

                        console.log("Satın Aldıklarım:", this.purchases);

                  } catch (e) {
                        console.log("Satın alma listeleme hatası:", e.message);
                  }
            },

            //SATTIKLARIM BUTON FONKSIYONU
            async getSales() {
                  try {
                        const token = sessionStorage.getItem("token");

                        if (!token) {
                              this.sales = [];
                              return;
                        }

                        // JWT üzerinden giriş yapan kullanıcının ID'sini al
                        const userRes = await fetch(`${this.baseUrl}/api/me`, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });

                        if (!userRes.ok) {
                              throw new Error("Kullanıcı bilgileri alınamadı.");
                        }

                        const user = await userRes.json();
                        const id = user.u_id;

                        // Giriş yapan kullanıcının sattığı ürünlere ait siparişleri getir
                        const res = await fetch(`${this.baseUrl}/api/my-sales/${id}`);

                        if (!res.ok) {
                              throw new Error("Satışlar getirilemedi.");
                        }

                        this.sales = await res.json();

                        console.log("Sattıklarım:", this.sales);

                  } catch (e) {
                        console.log("Satış listeleme hatası:", e.message);
                  }
            },


            //TURKIYE TARIH SISTEMI EKLEMEK ICIN
            formatTarih(tarih) {
                  if (!tarih) return "";

                  return new Date(tarih).toLocaleString("tr-TR", {
                        timeZone: "Europe/Istanbul",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hourCycle: "h23"
                  });
            },


            async getUsername() {
                  const token = sessionStorage.getItem("token");

                  if (!token) {
                        this.Username = "";
                        return;
                  }

                  try {
                        const res = await fetch(`${this.baseUrl}/api/me`, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });

                        if (!res.ok) {
                              throw new Error("Kullanıcı bilgileri alınamadı.");
                        }

                        const data = await res.json();

                        this.Username = `${data.u_firstName} ${data.u_lastName}`;

                  } catch (e) {
                        console.log("Kullanıcı adı alınamadı:", e.message);
                  }
            },


            logout() {
                  this.showToast("Kullanıcı yönetim panelinden çıkış yaptınız.", "error")

                  sessionStorage.removeItem("isLoggedIn")
                  sessionStorage.removeItem("role")
                  sessionStorage.removeItem("userId")
                  sessionStorage.removeItem("token") // JWT token'ını da sil

                  router.push("/")
            }

      }
};
</script>
<style scoped>
.admin-content {
      margin-left: 200px;
      padding: 20px 20px 20px 0;
      width: calc(100% - 200px);
      box-sizing: border-box;
}

#offcanvasExample {
      height: calc(100vh - 120px) !important;
      max-height: none !important;
}


/* Satın Aldıklarım ve Sattıklarım bölümlerinin yerleşimi */
.siparis-alani {
      margin-left: 15px;
      /* Sol menü ile içerik arasına boşluk ekler */
      margin-top: -180px;
      /* Başlığı ve tabloyu biraz yukarı taşır */
}

/* Sipariş bölümlerinin başlık görünümü */
.siparis-baslik {
      color: white;
      text-align: center;
      /* Başlığı yatay olarak ortalar */
      margin-bottom: 15px;
      /* Başlık ile tablo arasında boşluk bırakır */
}
</style>