<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title data-url="<?= $site->url() ?>">Rythmes</title>
        <link rel="stylesheet" href="<?= $kirby->url('assets') ?>/style.css">
        <script src="<?= $kirby->url('assets') ?>/app.js" defer ></script>
    </head>
    <body>
        <div class="fermer cache">
            <span></span>
            <span></span>
        </div>
        <nav class="menu">
            <ul>
            <?php foreach($site->children()->listed() as $texte): ?>
                <a href="<?= $texte->url() ?>" data-titre="<?= $texte->title() ?>">
                    <li class="menu__texte">
                        <h1><?= $texte->title() ?></h1>
                        <p><?= $texte->auteur() ?></p>
                    </li>
                </a>
            <?php endforeach ?>
            </ul>
        </nav>
    </body>
</html>