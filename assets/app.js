let texte
let reglages
let app

document.addEventListener('DOMContentLoaded', () => {

    window.onpopstate = function() {
        window.location.href = window.location.href
    }

    // =========================================== OBJETS

    app = {
        vues: {
            versTexte: (url, titre) => {

                history.pushState(null, titre, url)

                const liens = document.querySelectorAll('.menu__texte')

                liens.forEach((lien, index) => {
                    const delai = index * 80

                    setTimeout(() => {
                        lien.classList.add('menu__texte--dehors')
                        if (index === liens.length - 1) {
                            setTimeout(() => {
                                document.querySelector('.menu').classList.add('desactive')
                                document.querySelector('.conteneurGlobal').classList.remove('desactive')
                                setTimeout(() => {
                                    document.querySelector('.conteneurTexte').classList.remove('cache')
                                    document.querySelector('.conteneurReglages').classList.remove('conteneurReglages--dehors')
                                    document.querySelector('.fermer').classList.remove('cache')

                                    setTimeout(() => {
                                        document.querySelector('.fermer').classList.add('fermer--deploye')
                                    }, 500);
                                }, 50);
                            }, 500);
                            document.querySelector('.conteneurGlobal')
                        }
                    }, delai);
                })

                fetch(url)
                    .then(rep => {
                        rep.text().then(html => {

                            const codePage = document.createElement('div')
                            codePage.innerHTML = html

                            const conteneur = codePage.querySelector('.conteneurGlobal')

                            conteneur.classList.add('desactive')

                            document.querySelector('body').appendChild(conteneur)

                            app.vues.texte.init()
                        })
                    })
            },

            versMenu: () => {

                history.pushState(null, document.querySelector('title').textContent, document.querySelector('title').dataset.url)

                document.querySelector('.fermer').classList.remove('fermer--deploye')
                document.querySelector('.fermer').classList.add('cache')
                document.querySelector('.conteneurTexte').classList.add('cache')
                document.querySelector('.conteneurReglages').classList.add('conteneurReglages--dehors')
                setTimeout(() => {
                    document.querySelector('.conteneurGlobal').parentNode.removeChild(document.querySelector('.conteneurGlobal'))
                    document.querySelector('.menu').classList.toggle('desactive')
                    setTimeout(() => {
                        document.querySelectorAll('.menu__texte').forEach((lien, index) => {
                            const delai = index * 80

                            setTimeout(() => {
                                lien.classList.toggle('menu__texte--dehors')
                            }, delai);
                        })
                    }, 50);
                }, 500);
            },

            texte: {
                init: () => {
                    texte = {

                        conteneur: document.querySelector('.conteneurTexte'),
                        origine: document.querySelector('.conteneurTexte').dataset.origine,
                        partition: '',
                        preparerPartition: () => {
                            texte.partition = texte.origine.replaceAll('()()', '<span class="silence pause"></span>').replaceAll('()', '<span class="silence soupir"></span>')
                        },
                        installerPartition: partition => {
                            texte.conteneur.innerHTML = texte.partition
                        },
                        nettoyer: () => {
                            return texte.origine.replaceAll('()()', '').replaceAll('()', '')
                        },
                        prendrePonctuations: () => {
                            let texteNettoye = texte.nettoyer()
                
                            const regExpPoints = /\./g
                            const points = Array.from(texteNettoye.matchAll(regExpPoints))
                            
                            const regExpPointsInterrogation = /\? (?!»)/g
                            const pointsInterrogation = Array.from(texteNettoye.matchAll(regExpPointsInterrogation))
                
                            const regExpGuillemets = /\»/g
                            const guillemets = Array.from(texteNettoye.matchAll(regExpGuillemets))
                            
                            const ponctuations = points.concat(pointsInterrogation, guillemets)
                            
                            ponctuations.sort((a, b) => {
                                return a['index'] - b['index']
                            })
                
                            return ponctuations
                        }
                    }
                
                    reglages = {
                        conteneur: document.querySelector('.conteneurReglages'),
                        rythme: 0,
                        boutons: {
                            panneau: document.querySelector('.basculerPanneau'),
                            reglages: document.querySelectorAll('.reglages')
                        },
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
                        deconstruire: () => {
                
                            const ponctuations = texte.prendrePonctuations()
                            let deconstruction = texte.nettoyer()
                
                            ponctuations.forEach((ponctuation, position) => {
                                const fin = position === 0 ? ponctuation.index + 1 : ponctuation.index + ((position * 8)+1)
                                console.log(`Fin : ${fin}`)
                
                                const partieUne = deconstruction.slice(0, fin)
                                const partieDeux = deconstruction.slice(fin)
                
                                deconstruction = partieUne + '<br><br>' + partieDeux
                            })
                
                            texte.conteneur.innerHTML = deconstruction
                
                        },
                        essayer: () => {
                            const ponctuations = texte.prendrePonctuations()
                            let essai = texte.nettoyer()
                            let nbrCaracteresAjoutes = 0
                
                            ponctuations.forEach((ponctuation, position) => {
                                let hasard = Math.floor(Math.random() * 10)
                                console.log(hasard)
                                if (hasard <= 1) {
                                    console.log(`Hasard : ${hasard} = saut de ligne`);
                                    const fin = position === 0 ? ponctuation.index + 1 : ponctuation.index + (nbrCaracteresAjoutes + 1)
                                    console.log(`Fin : ${fin}`)
                
                                    const partieUne = essai.slice(0, fin)
                                    const partieDeux = essai.slice(fin)
                
                                    nbrCaracteresAjoutes += 8 
                                    essai = partieUne + '<br><br>' + partieDeux
                                } else if (hasard > 1 && hasard <=3) {
                                    console.log(`Hasard : ${hasard} = alinéa`);
                                    const fin = position === 0 ? ponctuation.index + 1 : ponctuation.index + (nbrCaracteresAjoutes + 1)
                                    console.log(`Fin : ${fin}`)
                
                                    const partieUne = essai.slice(0, fin)
                                    const partieDeux = essai.slice(fin)
                
                                    nbrCaracteresAjoutes += 4 
                                    essai = partieUne + '<br>' + partieDeux
                                } else {
                                    console.log(`Hasard : ${hasard} = rien`);
                                }
                            })
                            
                            texte.conteneur.innerHTML = essai
                        },
                        copier: () => {
                            navigator.clipboard.writeText(texte.conteneur.innerHTML)
                        }
                    }
                
                    // =========================================== INITIALISATION
                
                    texte.preparerPartition()
                    texte.installerPartition()
                
                    // =========================================== INTERACTIONS
                
                    reglages.boutons.reglages.forEach(bouton => {
                        bouton.addEventListener('mouseenter', cible => {
                            cible.target.querySelectorAll('.contenuBtn').forEach(contenu => {
                                contenu.classList.toggle('contenuBtn--action')
                            })
                        })
                        bouton.addEventListener('mouseleave', cible => {
                            cible.target.querySelectorAll('.contenuBtn').forEach(contenu => {
                                contenu.classList.toggle('contenuBtn--action')
                            })
                        })
                
                        bouton.addEventListener('click', () => {
                
                            switch (bouton.dataset.action) {
                                case 'origine':
                                    texte.preparerPartition()
                                    texte.installerPartition()
                                    reglages.rythme = 0
                                    break
                                case 'couper':
                                    reglages.couper()
                                    break
                                case 'reunir':
                                    reglages.reunir()
                                    break
                                case 'deconstruire':
                                    reglages.deconstruire()
                                    break
                                case 'essayer':
                                    reglages.essayer()
                                    break
                                case 'copier':
                                    reglages.copier()
                                    break
                            }
                
                            // console.log(`Rythme : ${reglages.rythme}`);
                        })
                    })
                
                    reglages.boutons.panneau.addEventListener('click', () => {
                        reglages.conteneur.classList.toggle('conteneurReglages--ouvert')
                        reglages.boutons.panneau.classList.toggle('basculerPanneau--ouvert')
                        document.querySelector('.chevron').classList.toggle('chevron--ouvert')
                        if (window.innerWidth > 800) {
                            texte.conteneur.classList.toggle('conteneurTexte--centre')
                        }
                    })
                }
            }
        }
    }

    // =========================================== INTERACTIONS

    document.querySelectorAll('.menu a').forEach(lien => {
        lien.addEventListener('click', e => {
            e.preventDefault()

            const cible = e.target.closest('a')
            const titre = cible.dataset.titre
            const url = cible.getAttribute('href')
        
            app.vues.versTexte(url, titre)
        })
    })

    document.querySelector('.fermer').addEventListener('click', () => {
        app.vues.versMenu()
    })

   

// =========================================== FIN
})