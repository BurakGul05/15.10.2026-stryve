<template>
      <!-- !PRODUCT ICERIK-- YALNIZ IMG LERI KABUL ETMEMISTI -->
      <div class="page-title">
            <h1>ÜRÜNLERİMİZ</h1>
      </div>

      <div class="filter-box">

            <div class="filter-item">
                  <label>Ürün Adı:</label>
                  <input type="text" v-model="productName" placeholder="Ürün adı ara...">
            </div>

            <div class="filter-item">
                  <label>Minimum Fiyat:</label>
                  <input type="number" min="1" v-model="minPrice" placeholder="Min. fiyat">
            </div>

            <div class="filter-item">
                  <label>Maksimum Fiyat:</label>
                  <input type="number" min="1" v-model="maxPrice" placeholder="Max. fiyat">
            </div>

            <div class="filter-buttons">
                  <button @click="filterProducts" class="filter-button">Filtrele</button>
                  <button @click="clearFilters" class="clear-button">Temizle</button>
            </div>

      </div>

      <div v-if="filteredProducts.length > 0" class="filter-result">
            {{ filteredProducts.length }} ürün bulundu
      </div>

      <div v-if="filteredProducts.length === 0" class="filter-result">
            Aradığınız kriterlere uygun ürün bulunamadı.
      </div>

      <div class="row">
            <div class="col-3 mt-4" v-for="product in filteredProducts">

                  <div class="card product-card">

                        <div class="product-image">

                              <img :src="`${baseUrl}/uploads/${product.p_images}`" class="card-img-top" alt="">
                        </div>

                        <div class="card-body">

                              <h5 class="card-title">
                                    {{ product.p_name }}
                              </h5>

                              <div class="stars">
                                    ★★★★★
                              </div>

                              <p class="card-text product-desc">
                                    {{ product.p_desc }}
                              </p>

                              <p class="product-stock">
                                    Stok: {{ product.p_stock }}
                              </p>

                              <p class="product-price">
                                    Fiyat: {{ product.p_price }}₺
                              </p>

                              <div v-if="product.p_stock" class="quantity-box">

                                    <label>Adet:</label>

                                    <button @click="product.quantity > 1 ? product.quantity-- : null">
                                          -
                                    </button>

                                    <span>{{ product.quantity || 1 }}</span>

                                    <button @click="product.quantity < product.p_stock ? product.quantity++ : null">
                                          +
                                    </button>

                              </div>

                              <button v-if="product.p_stock" @click="addCart(product.p_id)" class="btn btn-primary"
                                    type="submit">
                                    Sepete Ekle
                              </button>

                              <button v-else class="btn btn-secondary" disabled>
                                    Stok Yok!
                              </button>

                              <!-- <p class="card-text product-desc">
                                    {{ product.p_desc }}
                              </p>

                              <p class="product-price">
                                    Fiyat: {{ product.p_price }}₺
                              </p>

                              <button v-if="product.p_stock" @click="addCart(product.p_id)" class="btn btn-primary"
                                    type="submit">
                                    Sepete Ekle
                              </button>

                              <button v-else class="btn btn-secondary" disabled>
                                    Stok Yok!
                              </button> -->

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
                  products: [],

                  productName: "",
                  minPrice: "",
                  maxPrice: "",
                  filterApplied: false,

                  baseUrl: "http://localhost:3001",
            }

      },
      mounted() {
            this.getProducts();
      },
      watch: {

      },
      computed:
      {
            filteredProducts() {

                  if (!this.filterApplied) {
                        return this.products;
                  }

                  const filtered = this.products.filter(product => {

                        const nameMatch = product.p_name
                              .toLowerCase()
                              .includes(this.productName.toLowerCase());

                        const minPriceMatch = this.minPrice === "" ||
                              Number(product.p_price) >= Number(this.minPrice);

                        const maxPriceMatch = this.maxPrice === "" ||
                              Number(product.p_price) <= Number(this.maxPrice);

                        return nameMatch && minPriceMatch && maxPriceMatch;
                  });

                  return filtered.sort((a, b) =>
                        Number(a.p_price) - Number(b.p_price)
                  );
            }
      },
      methods: {

            filterProducts() {
                  this.filterApplied = true;
            },

            clearFilters() {
                  this.productName = "";
                  this.minPrice = "";
                  this.maxPrice = "";
                  this.filterApplied = false;
            },

            async getProducts() {
                  try {
                        const res = await fetch(`${this.baseUrl}/api/productPage`);

                        if (!res.ok) {
                              throw new Error("Products endpoint hatasi");
                        }

                        this.products = await res.json();

                        this.products.forEach(product => {
                              product.quantity = 1;
                        });

                  } catch (e) {
                        console.log(e.message);
                  }
            },

            addCart(id) {
                  // this.products[index].quantity = this.products[index].quantity || 1; 
                  // this.sepet.push(this.products.find(product => product.p_id == id))
                  // alert("Sepete Eklendi");
                  const product = this.products.find(product => product.p_id == id);
                  product.quantity = product.quantity || 1;

                  this.sepet.push(product);

                  alert("Sepete Eklendi");


            }
      }
};
</script>

<style scoped>
/* URUNLERIMIZ YAZISINI EKRANIN USTUNE TASIDIM */
.page-title {
      margin-top: -200px;

}

.page-title h1 {
      font-family: "Arial Black", sans-serif;
}

/* !PRODUCT CARDLAR ICIN EKLENEN CSSLER */
.product-card {
      width: 100%;
      height: 590px;
      border: none;
      border-radius: 0;
}

.product-image {
      height: 260px;
      width: 100%;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
}

.product-image img {
      width: 100%;
      height: 100%;
      object-fit: contain;
}

.product-card .card-body {
      padding: 15px 5px;
}

.product-card .card-title {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 5px;
}

.stars {
      font-size: 13px;
      margin-bottom: 8px;
}

.product-desc {
      font-size: 13px;
      color: #777;
      margin-bottom: 8px;
}

.product-price {
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 10px;
}








/* ! STOK YAZISINI KÜÇÜK VE ŞIK BİR ETİKET HALİNE GETİRİR */
.product-stock {
      display: inline-block;
      padding: 4px 9px;
      margin-bottom: 8px;
      border-radius: 5px;
      background-color: #f2f2f2;
      font-size: 13px;
      font-weight: 600;
      color: #555;
}


/* ! ADET ALANINI DÜZENLER VE SEPETE EKLE BUTONUNDAN UZAKLAŞTIRIR */
.quantity-box {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 2px;
      margin-bottom: 15px;
}


/* ! ADET YAZISINI DAHA BELİRGİN VE DÜZENLİ GÖSTERİR */
.quantity-box label {
      font-size: 14px;
      font-weight: 600;
      margin-right: 2px;
}


/* ! EKSİ VE ARTI BUTONLARINI DAHA KÜÇÜK VE ŞIK YAPAR */
.quantity-box button {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f7f7f7;
      font-size: 17px;
      font-weight: bold;
      line-height: 1;
      cursor: pointer;
}


/* ! EKSİ VE ARTI BUTONLARININ ÜZERİNE GELİNCE HAFİF RENK DEĞİŞTİRİR */
.quantity-box button:hover {
      background-color: #e9e9e9;
}


/* ! SEÇİLEN ADET SAYISINI ORTALAR VE BELİRGİNLEŞTİRİR */
.quantity-box span {
      min-width: 24px;
      text-align: center;
      font-size: 14px;
      font-weight: 600;
}


/* URUNLERI ARAMAK ICIN FILTRELEME KISMINA EKLENEN CSS LER */
.filter-box {
      width: 90%;
      margin: 25px auto 35px auto;
      padding: 20px 25px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);

      display: flex;
      align-items: flex-end;
      gap: 20px;
}

.filter-item {
      flex: 1;
}

.filter-item label {
      display: block;
      margin-bottom: 7px;
      font-size: 13px;
      font-weight: 600;
      color: #333;
}

.filter-item input {
      width: 100%;
      height: 42px;
      padding: 0 12px;
      border: 1px solid #ddd;
      border-radius: 7px;
      outline: none;
      font-size: 14px;
}

.filter-item input:focus {
      border-color: #0d6efd;
      box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.1);
}

.filter-buttons {
      display: flex;
      gap: 8px;
}

.filter-buttons button {
      height: 42px;
      padding: 0 18px;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
}

.filter-button {
      border: none;
      background-color: #0d6efd;
      color: white;
}

.filter-button:hover {
      background-color: #0b5ed7;
}

.clear-button {
      border: 1px solid #ddd;
      background-color: #f7f7f7;
      color: #555;
}

.clear-button:hover {
      background-color: #e9e9e9;
}

/* FILTRELEME ICIN CSS */
.filter-result {
      text-align: center;
      margin-top: 15px;
      margin-bottom: 10px;
      font-weight: bold;
      color: white;
}




/* STRYVE - RESPONSIVE: SADECE GEREKLI EKRANLAR */

/* Tablet ve kucuk dizustu */
@media screen and (min-width: 577px) and (max-width: 992px) {
      .filter-box {
            width: 94%;
            padding: 16px;
            gap: 12px;
            flex-wrap: wrap;
      }

      .filter-item {
            flex: 1 1 180px;
            min-width: 0;
      }

      .filter-buttons {
            flex-wrap: wrap;
      }

      .row>.col-3.mt-4 {
            width: 50%;
            max-width: 50%;
            flex: 0 0 50%;
            box-sizing: border-box;
      }
}

/* Telefon */
@media screen and (max-width: 576px) {
      .page-title {
            margin-top: -70px;
            padding: 0 10px;
            text-align: center;
      }

      .page-title h1 {
            font-size: clamp(23px, 7vw, 32px);
      }

      .filter-box {
            width: 94%;
            padding: 14px;
            margin: 20px auto 25px;
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
            box-sizing: border-box;
      }

      .filter-item {
            width: 100%;
            flex: none;
            min-width: 0;
      }

      .filter-item input {
            width: 100%;
            box-sizing: border-box;
      }

      .filter-buttons {
            width: 100%;
            gap: 8px;
      }

      .filter-buttons button {
            flex: 1;
            min-width: 0;
            padding: 0 8px;
      }

      .row>.col-3.mt-4 {
            width: 100%;
            max-width: 100%;
            flex: 0 0 100%;
            box-sizing: border-box;
      }

      .product-card {
            width: 100%;
      }

      .product-card .card-body {
            padding: 15px 12px;
      }

      .product-card .card-title,
      .product-desc {
            overflow-wrap: anywhere;
      }

      .quantity-box {
            flex-wrap: wrap;
      }

      .filter-result {
            padding: 0 12px;
            text-align: center;
            overflow-wrap: anywhere;
      }
}

/* Cok kucuk telefonlar */
@media screen and (max-width: 375px) {
      .filter-box {
            width: 96%;
            padding: 12px;
      }

      .product-image {
            height: 230px;
      }

      .filter-buttons button {
            font-size: 12px;
      }
}
</style>
