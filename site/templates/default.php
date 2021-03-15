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
            <div class="conteneur conteneurTexte" data-origine="<?= $site->texte()->kt() ?>">
            </div>
            <div class="conteneur conteneurReglages">
                <h1>Rythme</h1>
                <button data-action="couper" data-signe="– / –">– / –</button>
                <button data-action="reunir" data-signe="—">—</button>
                <button data-action="essayer" data-signe="?">?</button>
            </div>
        </div>
    </body>
</html>