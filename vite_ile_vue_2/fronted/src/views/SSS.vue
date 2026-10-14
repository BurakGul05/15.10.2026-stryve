<template>

  <section class="faq-header">
    <h1 style="color: white;">✦ SIKÇA SORULAN SORULAR ✦ </h1>
        <br>
  </section>

  <!-- !YENI SORU CEVAP KISMI -->
  <div class="accordion accordion-flush" id="one">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
          1. Antrenmanım için doğru ekipmanı nasıl seçebilirim? </button>
      </h2>
      <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">İhtiyacınıza, antrenman türünüze ve kullanım amacınıza göre ürünlerimizi inceleyerek
          size en uygun ekipmanı seçebilirsiniz.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="two">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
          2. Ürünleriniz günlük kullanım için de uygun mu? </button>
      </h2>
      <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">Evet. Birçok ürünümüz yalnızca antrenman sırasında değil, günlük sportif yaşamınızda
          da rahatlıkla kullanılabilir.</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="three">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
          3. Yeni başlayan biri STRYVE'den hangi ürünlerle başlamalı?
        </button>
      </h2>
      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">Temel antrenman ekipmanları, spora yeni başlayanlar için iyi bir başlangıç
          noktasıdır. İhtiyacınız arttıkça ekipmanlarınızı da geliştirebilirsiniz.</div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="four">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
          4. Aldığım ürünün kullanım alanını nasıl öğrenebilirim? </button>
      </h2>
      <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">Her ürünün sayfasında kullanım amacı ve öne çıkan özellikleri hakkında gerekli
          bilgilere ulaşabilirsiniz.</div>
      </div>
    </div>


    <div class="accordion-item">
      <h2 class="accordion-header" id="five">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
          5. STRYVE'yi diğer spor mağazalarından farklı kılan nedir? </button>
      </h2>
      <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive"
        data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">STRYVE, sporu yalnızca bir aktivite olarak değil, daha güçlü ve aktif bir yaşam
          tarzının parçası olarak görür. Bu anlayışla ürünlerimizi seçiyoruz.</div>
      </div>
    </div>





  </div>








</template>

<style scoped>
/* FAQ başlığının konumu */
.faq-header {
  text-align: center;
  margin-top: -80px;
  margin-bottom: 50px;
}

/* FAQ başlığının görünümü */
.faq-header h1 {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 4px;
  text-shadow: 0 0 15px #8a2be2;
}

/* Soru kutularının görünümü */
.accordion-item {
  background-color: #0b0b0f;
  border: 1px solid #292044;
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
}

/* Soruların görünümü */
.accordion-button {
  background-color: #0b0b0f;
  color: #f5f5f5;
  font-size: 18px;
  font-weight: 600;
  padding: 24px 28px;
  transition: 0.3s;
}

/* Mouse üzerine geldiğinde */
.accordion-button:hover {
  color: #b56cff;
  text-shadow: 0 0 8px #8a2be2;
}

/* Soru açıldığında */
.accordion-button:not(.collapsed) {
  background-color: #15101f;
  color: #b56cff;
  box-shadow: inset 4px 0 0 #8a2be2;
}

/* Mavi focus efektini kaldırır */
.accordion-button:focus {
  box-shadow: inset 4px 0 0 #8a2be2;
}

/* Ok işareti */
.accordion-button::after {
  filter: invert(1);
}

/* Cevap bölümü */
.accordion-body {
  background-color: #111018;
  color: #aaa;
  font-size: 16px;
  line-height: 1.8;
  padding: 22px 28px;
}

/* =========================================
   TELEFONLAR
   =========================================
   768px ve daha küçük ekranlarda çalışır.
*/
@media (max-width: 768px) {

  /* FAQ başlığını telefona uyarlar */
  .faq-header {
    margin-top: 100px;
    margin-bottom: 35px;
    padding: 0 15px;
  }

  /* FAQ başlığını küçültür */
  .faq-header h1 {
    font-size: 28px;
    letter-spacing: 2px;
  }

  /* Soru kutularını küçültür */
  .accordion-item {
    margin-bottom: 12px;
    border-radius: 10px;
  }

  /* Soruların yazı boyutunu küçültür */
  .accordion-button {
    font-size: 15px;
    padding: 18px 18px;
  }

  /* Cevap yazısını küçültür */
  .accordion-body {
    font-size: 14px;
    line-height: 1.7;
    padding: 18px;
  }
}

/* =========================================
   TABLET
   ========================================= */
@media (min-width: 481px) and (max-width: 768px) {

  /* FAQ başlığını tablete uyarlar */
  .faq-header h1 {
    font-size: 32px;
  }

  /* Soru yazılarını tablete uyarlar */
  .accordion-button {
    font-size: 16px;
    padding: 20px 22px;
  }

  /* Cevap bölümünü tablete uyarlar */
  .accordion-body {
    font-size: 15px;
    padding: 20px 22px;
  }
}


/* =========================================
   TELEFON
   ========================================= */
@media (max-width: 480px) {

  /* Başlığın üst boşluğunu ayarlar */
  .faq-header {
    margin-top: 100px;
    padding: 0 15px;
  }

  /* FAQ başlığını telefona uyarlar */
  .faq-header h1 {
    font-size: 23px;
    letter-spacing: 1px;
  }

  /* Soruları telefona uyarlar */
  .accordion-button {
    font-size: 14px;
    padding: 16px;
  }

  /* Cevapları telefona uyarlar */
  .accordion-body {
    font-size: 13px;
    padding: 16px;
  }
}

</style>
