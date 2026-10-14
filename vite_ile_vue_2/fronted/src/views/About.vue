<template>

    <!--! ABOUT İÇERİK -->
    <section class="hakkimizda-konteynir">


        <div class="about-intro">

            <span>01 — HİKAYEMİZ</span>

            <h1>
                DAHA GÜÇLÜ<br>
                İNSANLARA İNANIYORUZ.
            </h1>

            <p>
                Stryve, spor tutkusunu kaliteli ekipmanlarla buluşturmak
                için oluşturuldu.
            </p>

        </div>


        <div class="metin-kutusu">
            <h2 class="dev-baslik" style="color: white;">HAKKIMIZDA</h2>
            <p class="aciklama-yazisi">
                Spor bizim için sadece hareket etmek değil, kendini her gün biraz daha ileri taşımaktır.

                STRYVE, spor tutkusunu kaliteli ve işlevsel ürünlerle buluşturmak için yola çıktı. Antrenman yaparken
                ihtiyaç duyduğun ekipmanları tek bir yerde bulabilmen ve hedeflerine giden yolda kendini daha güçlü
                hissetmen için çalışıyoruz.

                İster spora yeni başlıyor ol, ister uzun zamandır antrenman yapıyor ol; önemli olan kendi hedefinin
                peşinden gitmek ve vazgeçmemek.

                STRYVE olarak, bu yolculukta sana eşlik etmek için buradayız. </p>
        </div>

        <div class="neden-strive">

            <h3 style="color: white;">NEDEN STRYVE?</h3>

            <p style="color: white;">
                Hedeflerine ulaşırken ihtiyacın olan ekipmanları
                tek bir yerde keşfet.
            </p>

            <div class="istatistikler">

                <div class="istatistik">
                    <strong>+50</strong>
                    <span>Spor Ürünü</span>
                </div>

                <div class="istatistik">
                    <strong>+100</strong>
                    <span>Mutlu Kullanıcı</span>
                </div>

                <div class="istatistik">
                    <strong>7/24</strong>
                    <span>Online Alışveriş</span>
                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* ACIKLAMA YAZISI ICIN CSS  */
.aciklama-yazisi {
    font-family: "Segoe UI", sans-serif;
    font-size: 19px;
    font-weight: 500;
    line-height: 1.8;
    letter-spacing: 0.3px;
}

/* ABOUT YAZISI ICIN CSS */
.dev-baslik {
    font-family: "Franklin Gothic Medium", sans-serif;
    font-size: 55px;
    font-weight: 700;
    letter-spacing: 3px;
    color: white;
    margin-bottom: 15px;
    position: relative;
}

.dev-baslik::after {
    content: "";
    display: block;
    width: 339px;
    height: 10px;
    background-color: white;
    margin-top: 10px;
}

/* STRIVE YAZISI ICIN CSS LER */
.neden-strive {
    margin-left: 80px;
    margin-top: 20px;
    max-width: 400px;
}

.neden-strive h3 {
    font-family: "Franklin Gothic Medium", sans-serif;
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 15px;
}

.neden-strive p {
    color: white;
    font-family: "Segoe UI", sans-serif;
    font-size: 17px;
    line-height: 1.6;
}

/* ISTATISTIK YAZISI ICIN EKLENEN CSS LER */
.istatistikler {
    display: flex;
    gap: 35px;
    margin-top: 30px;
}

.istatistik {
    display: flex;
    flex-direction: column;
}

.istatistik strong {
    color: white;
    font-family: "Franklin Gothic Medium", sans-serif;
    font-size: 28px;
    font-weight: 700;
}

.istatistik span {
    color: white;
    font-family: "Segoe UI", sans-serif;
    font-size: 14px;
    margin-top: 3px;
}

/* SAYFA USTUNDEKI YAZILAR ICIN CSS LER  */
.hakkimizda-konteynir {
    display: flex;
    flex-wrap: wrap;
}

.about-intro {
    width: 100%;
    margin-bottom: 70px;
}

.about-intro span {
    color: white;
    font-family: "Segoe UI", sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 2px;
}

.about-intro h1 {
    color: white;
    font-family: "Franklin Gothic Medium", sans-serif;
    font-size: 52px;
    line-height: 1.05;
    letter-spacing: 2px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.about-intro p {
    color: white;
    font-family: "Segoe UI", sans-serif;
    font-size: 27px;
    line-height: 1.6;
    margin: 0;
    max-width: 600px;
}

.metin-kutusu {
    width: 55%;
}

.neden-strive {
    width: 45%;
    margin-left: 0;
    margin-top: 0;
    max-width: none;
}







/* MOBIL RESPONSIVE ICIN AYRI DUZENLENEN CSS LER */

/* RESPONSIVE - HAKKIMIZDA SAYFASI */

/* Tablet */
@media (max-width: 768px) {

    .hakkimizda-konteynir {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        padding-left: 5%;
        padding-right: 5%;
    }

    .about-intro {
        width: 100%;
        min-width: 0;
        margin-bottom: 45px;
    }

    .about-intro h1 {
        font-size: clamp(28px, 5.5vw, 42px);
        line-height: 1.12;
        letter-spacing: 1px;
        overflow-wrap: anywhere;
    }

    .about-intro p {
        font-size: clamp(17px, 2.8vw, 23px);
        max-width: 100%;
    }

    .metin-kutusu,
    .neden-strive {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
    }

    .metin-kutusu {
        margin-bottom: 35px;
    }

    .dev-baslik {
        font-size: clamp(30px, 6vw, 45px);
        letter-spacing: 2px;
        overflow-wrap: anywhere;
    }

    .dev-baslik::after {
        width: min(339px, 100%);
        max-width: 100%;
    }

    .aciklama-yazisi {
        font-size: 17px;
        line-height: 1.7;
        overflow-wrap: anywhere;
    }

    .neden-strive h3 {
        font-size: clamp(25px, 4.5vw, 32px);
    }

    .istatistikler {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
    }

    .istatistik {
        min-width: 0;
    }
}

/* Küçük telefonlar */
@media (max-width: 480px) {

    .hakkimizda-konteynir {
        padding-left: 16px;
        padding-right: 16px;
    }

    .about-intro {
        margin-bottom: 35px;
    }

    .about-intro h1 {
        font-size: clamp(25px, 7vw, 32px);
        letter-spacing: 0;
    }

    .about-intro p {
        font-size: 17px;
        line-height: 1.5;
    }

    .dev-baslik {
        font-size: clamp(27px, 8vw, 36px);
        letter-spacing: 1px;
    }

    .dev-baslik::after {
        height: 6px;
        margin-top: 8px;
    }

    .aciklama-yazisi {
        font-size: 16px;
        line-height: 1.7;
    }

    .neden-strive h3 {
        font-size: 26px;
    }

    .neden-strive p {
        font-size: 16px;
    }

    .istatistikler {
        gap: 20px;
        justify-content: space-between;
    }

    .istatistik strong {
        font-size: 24px;
    }

    .istatistik span {
        font-size: 12px;
    }
}


</style>