<script setup>
// import { inject } from 'vue';
// const p = inject('p')
</script>

<template>

      <!--! Ürünlerimiz -->
      <h3 style="color: white; text-align: center; margin-top: -210px;">ÜRÜNLER</h3>
      <button style="float: right;" type="button" class="btn-sm btn btn-outline-success" data-bs-toggle="modal"
            data-bs-target="#addproduct">
            Ürün Ekle
      </button>

      <table class="table table-striped">
            <thead>
                  <tr>
                        <th scope="col">ID</th>
                        <th scope="col">AD:</th>
                        <th scope="col">STOK:</th>
                        <th scope="col">FİYAT:</th>
                        <th scope="col">KDV'Lİ FİYAT:</th>
                        <th scope="col">AÇIKLAMA:</th>
                        <th scope="col">İŞLEM:</th>
                  </tr>
            </thead>
            <tbody>
                  <tr v-for="product, index in products">
                        <!--! index + 1 ile ürünün listedeki sırasını gösteriyoruz.-->
                        <!-- ! p_id veritabanındaki gerçek ürün kimliğidir ve değiştirilmez. -->
                        <th scope="row">{{ index + 1 }}</th>
                        <td><input class="form-control" type="text" v-model="product.p_name"> </td>
                        <td><input class="form-control" type="number" min="0" v-model="product.p_stock"> </td>
                        <td><input class="form-control" type="text" v-model="product.p_price"> </td>
                        <td>{{ product.p_price * 1.2 }} </td>
                        <td><textarea class="form-control" type="text " v-model="product.p_desc"></textarea></td>
                        <td>
                              <div class="text-nowrap">
                                    <button
                                          @click="updateProduct(product.p_id, product.p_name, product.p_stock, product.p_price, product.p_desc)"
                                          class="btn-sm btn btn-outline-primary">Düzenle</button>

                                    <button style="margin-left: 10px;" class="btn-sm btn btn-outline-danger"
                                          @click="deleteProduct(product.p_id)">Sil</button>

                              </div>
                        </td>
                  </tr>
            </tbody>
      </table>

      <!--! ürün ekle modal'ı -->
      <div class="modal fade" id="addproduct" tabindex="-1">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Ürün Ekle</h1>
                              <button type="button" class="btn-close " data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <!--! Ürün ekleme Formu  -->
                        <form @submit.prevent="addProduct()">
                              <div class="modal-body">

                                    <div class="row">
                                          <div class="col-12 mb-3">
                                                <label class="form-label">Ürün Adı:</label>
                                                <input type="text" class="form-control" v-model="newProduct[0].p_name"
                                                      required>
                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">Stok:</label>
                                                <input type="number" class="form-control" min="0"
                                                      v-model="newProduct[0].p_stock" required>
                                          </div>
                                          <div class="col-6">
                                                <label class="form-label">Fiyat:</label>
                                                <input type="text" class="form-control"
                                                      v-model.number="newProduct[0].p_price"
                                                      pattern="[0-9]+([.][0-9]{1,2})?" required>
                                          </div>

                                          <div class="col-12 mt-3">
                                                <label class="form-label ">Ürün Açıklaması:</label>
                                                <textarea class="form-control" v-model="newProduct[0].p_desc" required>
                                                </textarea>
                                          </div>

                                          <label>Resim</label>
                                          <input class="form-control mb-2 mt-2" type="file" name="file"
                                                @change="newProduct[0].p_image = $event.target.files[0]">




                                    </div>
                              </div>
                              <div class="modal-footer">
                                    <button class="btn btn-success w-100" type="submit">Ürün Ekle</button>
                                    <label> {{ productMessage }} </label>
                                    <!--! Sayfa ilk açıldığında ekranda hiçbir şey görünmez, çünkü productMessage'ın değeri nulldır. -->

                              </div>
                        </form>
                  </div>
            </div>
      </div>

</template>

<script>

export default {
      inject: ['showToast'],
      data() {
            return {
                  newProduct: [
                        { p_name: "", p_stock: 0, p_price: 0, p_desc: "", p_image: null }
                  ],
                  products: [],
                  productMessage: null,
                  baseUrl: "http://localhost:3001"
            };
      },
      mounted() {
            this.getProducts();
      },

      unmounted() {

      },

      watch: {
      },
      computed: {
      },
      methods: {
            //!!HOCANIN EKLEDIGI KISIM
            // async idbul() {
            //       try {
            //             const jwt = sessionStorage.getItem("jwt")
            //             const res = await fetch(`${this.baseUrl}/api/idbul`, {
            //                   method: "GET",
            //                   headers: {
            //                         "Content-type": "application/json"
            //                   },
            //                   body: JSON.stringify({ 
            //                         jwt: jwt,
            //                   })
            //             });

            //             if (!res.ok) throw new Error("idbul endpoint hatasi");
            //             return await res.json();
            //       } catch (e) {
            //             return e.message;
            //       }
            // },

            //GET-URUNLERI CEKTIK
            async getProducts() {
                  try {
                        const token = sessionStorage.getItem("token");

                        if (!token) {
                              this.products = [];
                              return;
                        }

                        const res = await fetch(`${this.baseUrl}/api/products/0`, {
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              }
                        });

                        if (!res.ok) {
                              throw new Error("Ürünler getirilemedi.");
                        }

                        this.products = await res.json();

                        console.log("Gelen ürünler:", this.products);

                  } catch (e) {
                        console.log("Ürün listeleme hatası:", e.message);
                  }
            },


            //--------------------------------------------------------------------------------------------
            // POST- URUNLERI EKLEME

            // async addProduct() {
            //  try {//!bu kodlari calistirmayi dene eger hata alirsan catche git
            // const formData = new FormData();
            //const res = await fetch(`${this.baseUrl}/api/products`, {
            //   method: "POST",
            //headers: { //!Başlık / üst bilgi.HTTP isteğinin yanında gönderilen ek bilgilerdir.

            //"Content-Type": "application/json" 

            // },
            // body: JSON.stringify({

            // name: this.newProduct[0].p_name, 
            // stock: this.newProduct[0].p_stock,
            // price: this.newProduct[0].p_price,
            // desc: this.newProduct[0].p_desc,
            // u_id: sessionStorage.getItem("userId"),
            // p_images:"1.jpg" + "," + "2.jpg" + "," + "3.jpg"
            // })
            //  });
            // if (!res.ok) throw new Error("addProduct endpoint hatası");

            // const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

            // this.productMessage = data; //Backend'den gelen mesajı Vue'daki productMessage değişkenine kaydet.sunucu eklendi dedigi zamam gosterir

            // this.getProducts();// ekledikten sonra birdaha cek demek gerekiyor. her seferinde refresh atmamak icin. Yeni ürün eklendikten sonra backend'deki güncel ürün listesini tekrar çekerek ekranı yeniler.

            //Kullanıcı yeni ürün ekledikten sonra eski bilgiler kutularda kalmasın diye giriş alanlarını başlangıç değerlerine döndürür.
            // this.newProduct[0].p_name = "";
            //this.newProduct[0].p_stock = 0;
            //this.newProduct[0].p_price = 0;
            // this.newProduct[0].p_desc = "";
            // }
            //catch (e) {
            //  this.productMessage = e.message;// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
            // }
            // },
            //-----------------------------------------------------------------------------------------------------------


            async addProduct() {
                  try {
                        const token = sessionStorage.getItem("token");

                        if (!token) {
                              throw new Error("Giriş tokenı bulunamadı.");
                        }

                        const formData = new FormData();

                        formData.append("name", this.newProduct[0].p_name);
                        formData.append("stock", this.newProduct[0].p_stock);
                        formData.append("price", this.newProduct[0].p_price);
                        formData.append("desc", this.newProduct[0].p_desc);

                        if (this.newProduct[0].p_image) {
                              formData.append("file", this.newProduct[0].p_image);
                        }

                        const res = await fetch(`${this.baseUrl}/api/products`, {
                              method: "POST",
                              headers: {
                                    "Authorization": `Bearer ${token}`
                              },
                              body: formData
                        });

                        const data = await res.json();

                        if (!res.ok) {
                              throw new Error(data.error || "Ürün eklenemedi.");
                        }

                        this.productMessage = data.message;

                        await this.getProducts();

                        this.newProduct[0].p_name = "";
                        this.newProduct[0].p_stock = 0;
                        this.newProduct[0].p_price = 0;
                        this.newProduct[0].p_desc = "";
                        this.newProduct[0].p_image = null;

                  } catch (e) {
                        this.productMessage = e.message;
                        console.log("Ürün ekleme hatası:", e.message);
                  }
            },














            // PUT- Urun Guncelleme
            async updateProduct(p_id, p_name, p_stock, p_price, p_desc) {
                  try {

                        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {


                              method: "PUT",
                              headers: {

                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify({

                                    name: p_name,
                                    stock: p_stock,
                                    price: p_price,
                                    desc: p_desc
                              })
                        });
                        if (!res.ok) throw new Error("updateProduct endpoint hatasi");

                        const data = await res.json(); //Backend'in gönderdiği cevabı JSON olarak oku.

                        if (data) {
                              this.showToast("Ürün başarıyla güncellendi!", "edit");
                        }

                        this.getProducts();//guncelle isleminden sonra tekrardan verileri cek
                  }
                  catch (e) {
                        console.log(e.message);// eger hata alirsa catch calisiyor ve urun ekle butonu altinda urun basariyla eklendi kismina failed yazisi geliyor 
                  }
            },


            //DELETE URUN SIL
            async deleteProduct(p_id) {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/products/${p_id}`, {

                              method: "DELETE",
                              headers: {

                                    "Content-Type": "application/json"
                              },

                        });
                        if (!res.ok) throw new Error("deleteProduct endpoint hatası");

                        const data = await res.json();

                        if (data) {
                              this.showToast("Ürün başarıyla silindi!", "error");
                        }

                        this.getProducts();
                  }
                  catch (e) {
                        console.log(e.message);
                  }
            },
      }
};
</script>


<style scoped>
/* TABLONUN GENEL KONUMU */
table {
      margin-top: -15px;
      margin-left: 20px;
      width: calc(100% - 40px);
}

/* TABLO BAŞLIKLARI */
table th {
      text-align: center;
      vertical-align: middle;
      white-space: nowrap;
}

/* TABLO İÇERİĞİ */
table td {
      text-align: center;
      vertical-align: middle;
}

/* ÜRÜN ADI INPUT'U */
table td:nth-child(2) input {
      min-width: 180px;
}

/* STOK INPUT'U */
table td:nth-child(3) input {
      width: 90px;
      margin: auto;
}

/* FİYAT INPUT'U */
table td:nth-child(4) input {
      width: 110px;
      margin: auto;
}

/* KDV'Lİ FİYAT */
table td:nth-child(5) {
      min-width: 120px;
      white-space: nowrap;
}

/* AÇIKLAMA ALANI */
table td:nth-child(6) textarea {
      width: 220px;
      min-height: 70px;
      resize: vertical;
      margin: auto;
}

/* GÜNCELLE - SİL ALANI */
table td:nth-child(7) {
      min-width: 170px;
      white-space: nowrap;
}

/* ÜRÜN EKLE BUTONU */
button[data-bs-target="#addproduct"] {
      margin-right: 20px;
      margin-bottom: 10px;
      padding: 7px 18px;
      border-radius: 8px;
}

/* BAŞLIK */
h3 {
      margin-top: -240px;
}

/* ÜRÜN EKLE MODALINDAKİ INPUTLAR */
.modal .form-control {
      border-radius: 7px;
}

/* MODALDAKİ ÜRÜN EKLE BUTONU */
.modal-footer .btn-success {
      border-radius: 8px;
}
</style>
