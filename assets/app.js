document.addEventListener('DOMContentLoaded', () => {

    // =========================================== OBJETS

    const texte = {
        conteneur: document.querySelector('.conteneurTexte'),
        origine: document.querySelector('.conteneurTexte').dataset.origine,
        partition: '',
        preparerPartition: () => {
            texte.partition = texte.origine.replaceAll('()', '<span class="silence soupir"></span>').replaceAll('(-)', '<span class="silence pause"></span>')
        },
        installerPartition: partition => {
            texte.conteneur.innerHTML = texte.partition
        }
    }

    const reglages = {
        rythme: 0,
        boutons: document.querySelectorAll('button'),
        couper: () => {
            if (reglages.rythme < 2) {
                reglages.rythme++
                if (reglages.rythme === 1) {
                    document.querySelectorAll('.silence').forEach(silence => {
                        silence.innerHTML = '<br>'
                    })
                }
                
                if (reglages.rythme === 2) {
                    document.querySelectorAll('.pause').forEach(pause => {
                        pause.innerHTML = '<br><br>'
                    })
                }
            }
        },
        reunir: () => {
            if (reglages.rythme > 0) {
                reglages.rythme--
                if (reglages.rythme === 1) {
                    document.querySelectorAll('.silence').forEach(silence => {
                        silence.innerHTML = '<br>'
                    })
                }
                if (reglages.rythme === 0) {
                    document.querySelectorAll('.silence').forEach(silence => {
                        silence.innerHTML = ''
                    })
                }
            }
        },
        essayer: () => {
            const regExpPoints = /\./g
            const points = Array.from(texte.origine.matchAll(regExpPoints))
            let essai = texte.origine
            points.forEach(point => {
                const fin = point.index + 1
                console.log(`Fin : ${fin}`)

                const partieUne = texte.origine.slice(0, fin)
                const partieDeux = texte.origine.slice(fin)

                essai = partieUne + '<br>' + partieDeux
            })
            console.log(essai)
        }
    }

    // =========================================== INITIALISATION

    texte.preparerPartition()
    texte.installerPartition()

    // =========================================== INTERACTIONS

    reglages.boutons.forEach(bouton => {
        bouton.addEventListener('mouseenter', () => {
            bouton.textContent = bouton.dataset.action
        })
        bouton.addEventListener('mouseout', () => {
            bouton.textContent = bouton.dataset.signe
        })

        bouton.addEventListener('click', () => {
            if (bouton.dataset.action === 'couper') {
                reglages.couper()
            }
            
            if (bouton.dataset.action === 'reunir') {
                reglages.reunir()
            }

            if (bouton.dataset.action === 'essayer') {
                reglages.essayer()
            }

            console.log(`Rythme : ${reglages.rythme}`);
        })
    })

// =========================================== FIN
})