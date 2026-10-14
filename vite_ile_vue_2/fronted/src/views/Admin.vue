<script setup>
import adminProducts from '@/components/admin-products.vue'
import adminUsers from '@/components/admin-users.vue';
import adminOrders from '@/components/admin-orders.vue'
import adminMessages from '@/components/admin-messages.vue';
import router from '@/router';




</script>


<template>

      <div style="width: 200px; position: absolute; top: 145px;" class=" bg-primary offcanvas offcanvas-start show"
            tabindex="0" data-bs-backdrop="false">
            <div class="offcanvas-header">
                  <h5 style="color: white;" class="offcanvas-title"> Admin Yönetim Paneli</h5>
            </div>
            <div class="offcanvas-body">
                  <div class="mb-4">
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'products'"
                              :class="secim == 'products' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Ürünler</button>
                        <button style="color: black; background-color: aliceblue; " @click="secim = 'users'"
                              :class="secim == 'users' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Kullanıcılar</button>
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'orders'"
                              :class="secim == 'orders' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Siparişler</button>
                        <button style="color: black; background-color: aliceblue;" @click="secim = 'messages'"
                              :class="secim == 'messages' ? 'btn btn-light m-2 w-100' : 'btn btn-outline-light m-2 w-100'">Mesajlar</button>
                  </div>

                  <div style="bottom: 50px;">
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

            <!--! Kullanıcılar -->
            <div v-if="secim == 'users'">
                  <adminUsers />
            </div>

            <!--! Siparişler -->
            <div v-if="secim == 'orders'">
                  <adminOrders />
            </div>

            <!--! Mesajlar -->
            <div v-if="secim == 'messages'">
                  <adminMessages />
            </div>

      </div>

</template>


<!--! Programlama ve fonksiyonların olduğu yer -->
<script>
export default {
      data() {
            return {

                  secim: "products",
                  Username: "Test",
                  baseUrl: "http://localhost:3001",
            };
      },

      mounted() {
            this.getUsername()
      },

      watch: {
      },

      computed: {
      },

      methods: {
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
                  sessionStorage.setItem("logoutMessage", "Admin yönetim panelinden çıkış yaptınız.")
                  sessionStorage.setItem("logoutType", "error")
                  sessionStorage.removeItem("isLoggedIn")
                  sessionStorage.removeItem("role")
                  sessionStorage.removeItem("userId")
                  sessionStorage.removeItem("token")


                  router.push("/")
            }

      }
};
</script>
<style scoped>
/* Masaüstünde sidebar ve içerik yan yana */
.admin-content {
      margin-left: 200px;
      padding: 20px;
      width: calc(100% - 200px);
      min-width: 0;
      box-sizing: border-box;
      position: relative;
      min-height: calc(100vh - 145px);
}

/* Sidebar arkasındaki mavi alan */
.admin-content::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: -200px;
      width: 200px;
      background-color: #0d6efd;
      z-index: -1;
      pointer-events: none;
}

/* Sidebar'ın gereksiz uzun yüksekliğini kaldır */
.offcanvas {
      height: auto !important;
      min-height: calc(100vh - 145px);
      max-height: none !important;
}

/* Tabletler ve orta genişlikteki ekranlar */
@media (min-width: 577px) and (max-width: 991px) {
      .admin-content {
            margin-left: 180px;
            width: calc(100% - 180px);
            padding: 16px;
      }

      .admin-content::before {
            left: -180px;
            width: 180px;
      }

      .offcanvas {
            width: 180px !important;
      }
}

/* Telefonlar ve dar ekranlar */
@media (max-width: 576px) {
      .admin-content {
            margin-left: 0;
            width: 100%;
            padding: 12px;
            min-height: 0;
      }

      .admin-content::before {
            display: none;
      }

      /* Mavi menüyü içeriğin üstünde yatay bir alana dönüştür */
      .offcanvas {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            min-height: 0;
            border-radius: 0 0 12px 12px;
      }

      .offcanvas-header {
            padding: 12px 16px 4px;
      }

      .offcanvas-title {
            font-size: 18px;
      }

      .offcanvas-body {
            padding: 8px 12px 14px;
      }

      /* Dört yönetim butonunu ikişerli yerleştir */
      .offcanvas-body>.mb-4 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            margin-bottom: 12px !important;
      }

      .offcanvas-body>.mb-4>button {
            width: 100% !important;
            min-width: 0;
            margin: 0 !important;
            padding: 9px 4px;
            font-size: 14px;
      }

      .offcanvas-body h5 {
            font-size: 15px;
      }
}

/* Dikey sayfa kaydırmasını koru */
:global(body) {
      overflow-y: auto !important;
}
</style>