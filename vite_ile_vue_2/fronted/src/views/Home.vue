<template>
  <Toast :show="toastShow" :message="toastMessage" :type="toastType" />

  <main class="container text-center" style="margin-top: 150px;">

    <div class="home-slider">

      <div class="home-track">


        <div class="home-slide">
          <img src="../assets/img/home1.png" alt="Home 1">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home2.png" alt="Home 2">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home3.png" alt="Home 3">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home4.png" alt="Home 4">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home5.png" alt="Home 5">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home6.png" alt="Home 6">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home7.png" alt="Home 7">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home8.png" alt="Home 8">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home9.png" alt="Home 9">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home10.png" alt="Home 10">
        </div>

        <!-- !DONGU ICIN AYNI RESIMLERI TEKRAR EKLEDIM -->
        <div class="home-slide">
          <img src="../assets/img/home1.png" alt="Home 1">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home2.png" alt="Home 2">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home3.png" alt="Home 3">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home4.png" alt="Home 4">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home5.png" alt="Home 5">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home6.png" alt="Home 6">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home7.png" alt="Home 7">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home8.png" alt="Home 8">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home9.png" alt="Home 9">
        </div>

        <div class="home-slide">
          <img src="../assets/img/home10.png" alt="Home 10">
        </div>
      </div>

    </div>

    <p style="cursor: pointer;" class="explore" @click="$router.push('/product')">ÜRÜNLER</p>
    <h1 class="hero-title" style=" color: white;">GÜCÜNÜ KEŞFET, HEDEFİNE ULAŞ.</h1>
    <p style="font-size: 35px;">HEDEFLERİNE UYGUN <br>-EN İYİ EKİPMANLARLA TANIŞ-</p>

  </main>
</template>


<script setup>

import { ref, onMounted } from 'vue'
import Toast from '@/components/toast.vue'

const toastShow = ref(false)
const toastMessage = ref('')
const toastType = ref('error')

onMounted(() => {
  const message = sessionStorage.getItem('logoutMessage')
  const type = sessionStorage.getItem('logoutType')

  if (message) {
    toastMessage.value = message
    toastType.value = type || 'error'
    toastShow.value = true

    sessionStorage.removeItem('logoutMessage')
    sessionStorage.removeItem('logoutType')

    setTimeout(() => {
      toastShow.value = false
    }, 3000)
  }
})



</script>


<style scoped>
/* Ana sayfanın genişliğini, ortalanmasını ve kenar boşluklarını düzenler. */
main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

/* Slider alanını ortalar, taşan resimleri gizler ve üst boşluğu ayarlar. */
.home-slider {
  width: 100%;
  height: clamp(220px, 31vw, 400px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  margin: -310px auto 20px;
}

/* Her slider resminin genişliğini ve yüksekliğini ekran boyutuna uyarlar. */
.home-slide {
  width: clamp(160px, 19vw, 250px);
  height: clamp(200px, 24vw, 300px);
  flex: 0 0 auto;
}

/* Resimlerin oranını koruyarak kart alanını doldurmasını sağlar. */
.home-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* Resimleri yatay sıraya dizer ve mevcut otomatik hareketi korur. */
.home-track {
  display: flex;
  align-items: center;
  gap: 20px;
  width: max-content;
  animation: sliderHareket 50s linear infinite;
}

/* Slider resimlerini mevcut animasyon mantığıyla yatay hareket ettirir. */
@keyframes sliderHareket {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-2700px);
  }
}

/* Ana başlığın yazı boyutunu, hizasını ve satır düzenini kontrol eder. */
main h1 {
  max-width: 1100px;
  margin: 20px auto;
  color: white;
  font-family: Impact, sans-serif;
  font-size: clamp(32px, 5.5vw, 72px);
  line-height: 1.1;
  text-align: center;
  white-space: normal;
  overflow-wrap: break-word;
}

/* Ana sayfadaki paragrafların görünümünü ve taşmasını kontrol eder. */
main p {
  max-width: 900px;
  margin: 20px auto;
  color: white;
  font-family: Impact, sans-serif;
  font-size: clamp(18px, 2.2vw, 35px);
  line-height: 1.3;
  text-align: center;
  overflow-wrap: break-word;
}

/* Ürünler butonunun boyutunu, kenarlığını ve görünümünü düzenler. */
.explore {
  display: inline-block;
  max-width: 100%;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 12px 30px;
  color: white;
  font-family: Impact, sans-serif;
  font-size: clamp(18px, 2vw, 28px);
  text-align: center;
  text-decoration: none;
  overflow-wrap: break-word;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 30px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease, transform 0.3s ease;
}

/* Fareyle Ürünler butonunun üzerine gelindiğinde görsel efekt uygular. */
.explore:hover {
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.15);
  border-color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

/* Tablet ekranlarında slider ve başlık ölçülerini yeniden ayarlar. */
@media (max-width: 991px) {
  .home-slider {
    height: clamp(210px, 35vw, 320px);
    margin-top: -250px;
  }

  .home-slide {
    width: clamp(150px, 24vw, 220px);
    height: clamp(190px, 29vw, 270px);
  }

  main h1 {
    font-size: clamp(34px, 6vw, 58px);
  }

  main p {
    font-size: clamp(19px, 3vw, 26px);
  }

  .explore {
    padding: 11px 26px;
  }
}

/* Telefon ekranlarında kenar boşluklarını azaltır ve içeriği sıkıştırmaz. */
@media (max-width: 600px) {
  main {
    padding-left: 12px;
    padding-right: 12px;
  }

  .home-slider {
    height: 220px;
    gap: 12px;
    margin-top: -180px;
    margin-bottom: 15px;
  }

  .home-track {
    gap: 12px;
  }

  .home-slide {
    width: 155px;
    height: 190px;
  }

  main h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: clamp(30px, 8vw, 42px);
    line-height: 1.15;
  }

  main p {
    margin-top: 12px;
    margin-bottom: 16px;
    font-size: clamp(18px, 4.5vw, 23px);
    line-height: 1.3;
  }

  .explore {
    margin-top: 5px;
    margin-bottom: 10px;
    padding: 10px 22px;
    font-size: 18px;
  }
}

/* Çok dar telefonlarda yazıların ve butonun ekrana sığmasını kolaylaştırır. */
@media (max-width: 360px) {
  main {
    padding-left: 8px;
    padding-right: 8px;
  }

  .home-slide {
    width: 140px;
    height: 175px;
  }

  main h1 {
    font-size: 29px;
  }

  main p {
    font-size: 17px;
  }

  .explore {
    padding: 9px 18px;
    font-size: 17px;
  }
}

/* Kullanıcı animasyonları azaltmayı tercih ediyorsa slider hareketini durdurur. */
@media (prefers-reduced-motion: reduce) {
  .home-track {
    animation: none;
  }
}
</style>
