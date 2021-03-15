<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Rythmes textuels</title>
        <link rel="stylesheet" href="<?= $kirby->url('assets') ?>/style.css">
        <script src="<?= $kirby->url('assets') ?>/app.js" defer ></script>
    </head>
    <body>
        <div class="conteneurGlobal">
            <div class="conteneur conteneurTexte conteneurTexte--centre" data-origine="<?= $site->texte()->kt() ?>">
            </div>
            <div class="conteneur conteneurReglages">
                <h1>Rythme</h1>
                <button class="basculerPanneau">
                    <span class="chevron"></span>
                    <!-- <img src="<?= $kirby->url('assets') ?>/svg/arrow.svg" alt="">     -->
                </button>

                <button class="reglages" data-action="origine" data-signe="o">
                    <div class="contenuBtn">o</div>
                    <div class="contenuBtn">origine</div>
                </button>
                <button class="reglages" data-action="couper" data-signe="– / –">
                    <div class="contenuBtn">– / –</div>
                    <div class="contenuBtn">couper</div>
                </button>
                <button class="reglages" data-action="reunir" data-signe="—">
                    <div class="contenuBtn">—</div>
                    <div class="contenuBtn">réunir</div>
                </button>
                <button class="reglages" data-action="deconstruire" data-signe="- - -">
                    <div class="contenuBtn">- - -</div>
                    <div class="contenuBtn">déconstruire</div>
                </button>
                <button class="reglages" data-action="essayer" data-signe="?">
                    <div class="contenuBtn">?</div>
                    <div class="contenuBtn">essayer</div>
                </button>
            </div>
        </div>
    </body>
</html>