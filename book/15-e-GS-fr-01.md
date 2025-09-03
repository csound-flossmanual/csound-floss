# 01 Bonjour Csound

## Ce que vous apprendrez dans ce tutoriel

- Comment créer et émettre un son sinusoïdal
- Que sont les **opcodes** dans Csound
- Quelle est la signification de l’**audio rate / fréquence d’échantillonnage** dans Csound
- Qu’est-ce qu’une **variable audio**
- Comment dessiner un **flux de signal / signal flow**
- Qu’est-ce qu’une **partition/score** Csound

## Qu’est-ce qu’un oscillateur sinusoïdal / sine oscillator

Une onde sinusoïdale peut être considérée comme l’élément sonore le plus élémentaire au monde. Quand nous dessinons une onde sinusoïdale comme un graphique montrant son amplitude au cours du temps, elle ressemble à ça :

![Onde sinusoïdale serpent](../resources/images/01-GS-01-sine.png)

Pour produire une onde sinusoïdale, Csound utilise un oscillateur. Un oscillateur nécessite certaines entrées pour fonctionner :

1. Une amplitude maximum de sortie. Ce qui résultera en un son plus ou moins fort.
2. Le nombre de périodes (cycles) par seconde à générer. Ce qui résultera en un son plus ou moins aigüe ou grave. L’unité est le _Hertz(Hz)_. 1000 Hz signifie qu’une sinusoïde comporte 1000 périodes par seconde.

## Un oscillateur sinusoïdal dans Csound : Opcode et Arguments

Csound dispose de nombreux oscillateurs différents. (vous pouvez trouver [ici](https://flossmanual.csound.com/how-to/opcodes) quelques descriptions et comparaisons.) Dans cet exemple, nous utilisons l’opcode `poscil`, qui signifie _precise oscillator_.

Un **opcode** est une unité de traitement dans Csound, comparable à un _object_ dans PureData ou Max, ou un _UGen_ dans SuperCollider. Si vous êtes familier des langages de programmation, vous pouvez considérer un opcode comme une _building fonction / fonction intégrée_.

Les entrées d’un opcode sont appelées **arguments** et sont écrites entre parenthèses immédiatement après le nom de l’opcode. Donc `poscil(0.2,400)` signifie : L’opcode `poscil` prend deux arguments en entrée :

- Le premier argument est le nombre `0.2`.
- Le second argument est le nombre `400`.

La signification des arguments en entrée dépend de la façon dont l’opcode a été implémenté. Pour `poscil`, la première entrée est l’amplitude et la seconde entrée est la fréquence. Le [Manuel de Référence Csound](https://csound.com/docs/manual-fr/index.html) contient toutes les informations à son sujet. Nous apporterons quelques éclaircissements dans notre [Tutoriel 08](15-l-GS-fr-08.md) pour aider à son utilisation.

Cette manière d’écrire du code est commune à de nombreux langages de programmation, comme `range(13)` en Python, ou `printf("no no")` en C, ou `Date.now()` en JavaScript (dans ce cas les parenthèses sont vides, ce qui signifie : pas d’argument en entrée).
Note : Il existe une autre manière d’écrire du code Csound. Si vous voulez en apprendre plus sur ce sujet, voyez la section "Deux façons d’écrire du code dans Csound" à la fin de ce tutoriel.

## Le flux d’un signal et son code

Nous créons maintenant une onde sinusoïdale d’une amplitude de 0.2 et de 400 cycles par seconde (Hz).
Nous nommerons ce signal _aSine_ car il s’agit d’un signal **a**udio. Le caractère **a** au début du nom de la variable signifie exactement ça.

Un signal audio est un signal qui produit une nouvelle valeur à chaque sample/échantillon. (Apprenez-en davantage [ici](https://flossmanual.csound.com/basics/digital-audio) sur les samples et les _sample rates / taux d’échantillonnage_).

```
aSine = poscil:a(0.2,400)
```

Cela signifie : Le signal _aSine_ est créé par l’opcode `poscil` au taux audio / audio rate (`:a`), et les entrées pour `poscil` sont 0.2 pour l’amplitude, et 400 pour la fréquence.

Pour sortir le signal (pour que nous puissions l’entendre), nous introduisons l’opcode `outall`. Cet opcode envoie un signal audio à tous les canaux de sortie disponibles.

```
outall(aSine)
```

Notez que le signal _aSine_ est d’abord la sortie de l’oscillateur, puis devient l’entrée de l’opcode `outall`. C’est une chaine typique qui est bien connue depuis les synthétiseurs modulaires : un cable connecte la sortie d’un module à l’entrée d’un autre.

Nous pouvons dessiner le flux de ce programme comme ceci :

![Flux de signal et code Csound pour un oscillateur sinusoïdal et une sortie.](../resources/images/01-GS-01-a.png){width=80%}

Au milieu, vous voyez le flux du signal, avec des symbols pour l’oscillateur et la sortie. Vous pouvez les imaginer comme les modules d’un synthétiseur, connectés par un cable nommé _aSine_.

Sur le côté gauche, vous voyez la chaine entre les entrées, l’opcode et la sortie. notez que la sortie de la première chaine, contenue dans la variable _aSine_, devient l’entrée de la seconde chaine.

À droite, vous voyez le code Csound correspondant. Chaque ligne de code représente une chaine _entrée -> opcode -> sortie_, dans la forme _sortie = opcode(entrée)_. La ligne `outall(aSine)` n’a pas de sortie vers Csound, car elle envoie l’audio au matériel (comme l’objet `dac~` dans PD ou Max).

## Votre premier instrument Csound

Dans Csound, tous les oscillateurs, filtres, lecteurs d’échantillons / sample players, et autres unités de traitement sont encapsulés dans un **instrument**. Un instrument comporte les mots-clé :

- `instr` à son début
- et `endin` à sa fin.

Après le mot-clé `instr`, séparé par un espace, nous assignons un nombre (1, 2, 3, …) ou un nom à l’instrument. Nommons notre instrument "Hello", et tapons le code que nous venons de discuter :

```
instr Hello
    aSine = poscil:a(0.2,400)
    outAll(aSine)
endin
```

### Exemple

Nous somme maintenant prêt à exécuter notre code. Tout ce qui nous reste à faire est d’inclure le code de notre instrument dans un fichier Csound complet.

Regardez le code de l’exemple. Pouvez-vous repérer le code de l’instrument ?

Appuyez sur le bouton "Play". Vous devriez entendre deux secondes d’un son sinusoïdal à 400 Hz.

Pouvez-vous comprendre la raison pour laquelle il joue pendant deux secondes ?

```
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>

sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr Bonjour
  aSine = poscil:a(0.2,400)
  outall(aSine)
endin

</CsInstruments>
<CsScore>
i "Bonjour" 0 2
</CsScore>
</CsoundSynthesizer>
```

#### La partition / score Csound

En bas de notre exemple de code, vous voyez ceci :

```
<CsScore>
i "Bonjour" 0 2
</CsScore>
```

C’est la section **Partition / Score** du fichier .csd. Elle commence par la balise \<CsScore> et se termine par la balise \</CsScore>. Entre ces deux balises, il y a cette ligne de partition :

```
i "Bonjour" 0 2
```

Chaque colonne (champ de paramètre / parameter field) spécifie une certaine information :

- `"Bonjour"` : L’instrument auquel cette ligne de partition se réfère.

- `0` : L’heure de départ de cet instrument : `0` (= départ immédiat).

- `2` : La durée du son venant de l’instrument : `2` (secondes).

#### Essayez vous-même

(Vous pouvez éditer l’exemple juste en tapant à l’intérieur)

- Changez la durée de l’instrument

- Changez l’heure de départ de l’instrument

- Changez la fréquence de l’oscillateur

- Changez l’amplitude de l’oscillateur

## Opcodes, Mots-Clés et termes que vous avez appris dans ce tutoriel

### Opcodes

- `poscil:a(Amplitude,Frequence)` : oscillateur au taux audio, avec entrées d’amplitude et de fréquence.
- `outall(aSignal)` : envoie _aSignal_ vers les canaux de sortie physiques.

### Mots-clés

- `instr ... endin` sont les mots-clés qui commencent et finissent une définition d’instrument.

### Termes

- Un signal à la _fréquence audio / audio rate_ ou _a-rate_ est mis à jour à chaque sample/échantillon.

## Avançons…

Avec le tutoriel suivant : [02_Bonjour Fréquences](15-f-GS-fr-02.md)

## Ou lisez quelques informations supplémentaires ici

### Pourquoi l’onde sinusoïdale est-elle « le son le plus élémentaire au monde » ?

Pour être honnête, j'aime les sons sinusoïdaux. Je sais que beaucoup de gens les trouvent ennuyeux. J'aime leur simplicité, alors contre tous les bons conseils, je vais consacrer les dix premiers tutoriels uniquement aux sons sinusoïdaux. Désolé de vous en faire subir les conséquences...

Mais revenons à la question : qu'y a-t-il d'élémentaire dans les ondes sinusoïdales ?

D'un point de vue mathématique, il est assez fascinant de pouvoir comprendre et construire une sinusoïde comme le mouvement constant d'un point sur un cercle. C'est ce qu'on appelle un [mouvement harmonique simple](https://en.wikipedia.org/wiki/Simple_harmonic_motion), qui est à la base de nombreux phénomènes du monde physique, y compris le son.

En acoustique musicale, les sinusoïdes ont une autre signification élémentaire.

Une sinusoïde est le seul son qui représente une seule hauteur. Tous les autres sons ont deux hauteurs ou plus.

Cela signifie que tous les autres sons peuvent être compris comme la somme de sons sinusoïdaux simples. Ces sinusoïdes qui se trouvent à l'intérieur d'un son périodique, comme un son chanté ou d'autres sons naturels, sont appelés partiels ou harmoniques.

Bien que la réalité sonore soit un peu plus complexe, cela montre que les ondes sinusoïdales peuvent en quelque sorte être comprises comme les sons les plus élémentaires, du moins dans le monde des hauteurs.

Vous trouverez plus d'informations à ce sujet dans le chapitre [Synthèse additive](https://flossmanual.csound.com/sound-synthesis/additive-synthesis) et dans le chapitre [Résynthèse spectrale](https://flossmanual.csound.com/sound-modification/fourier-analysis-spectral-processing) de ce livre.

### Deux façons d’écrire du code dans Csound : la façon Traditionnelle, et la façon fonctionnelle

Vous êtes peut-être surpris de voir le code Csound écrit de la façon décrite ci-dessus. En fait, la façon classique d’écrire du code Csound ressemble à ceci :

```
aSine poscil 0.2, 400
    outall aSine
```

Vous pouvez sans problème continuer d’écrire le code Csound ainsi. Les raisons pour lesquelles j’utilise l’écriture fonctionnelle dans ce tutoriel sont :

1. Nous sommes tous familiarisés avec cette manière de déclarer une variable `y` à gauche comme étant la somme d’une autre variable `x` plus deux : `y = x + 2`.
2. Comme mentionné plus haut, la plupart des langages de programmation utilisent une syntaxe similaire, dans la forme `sortie = fonction(arguments)`. Donc pour les personnes ayant quelques connaissances en programmation, c’est une aide à l’apprentissage de Csound.
3. Le style fonctionnel d’écrire du code Csound a toujours existé dans des expressions comme `ampdb(-10)` ou `ftlen(giTable)`. Ce n’est donc pas totalement nouveau, mais plutôt une extension.
4. Chaque fois que nous voulons utiliser une expression comme argument (vous en apprendrez plus à ce sujet dans le [tutoriel 6](15-j-GS-fr-06.md)), nous devons écrire le code de cette manière. Il est donc bon de l’utiliser en permanence pour plus de cohérence.

   NOTE DU TRADUCTEUR pour les francophones : Sauf dans les commentaires où ça ne pose aucun
   problème, n’utilisez que des caractères ASCII dans vos programmes. J’ai essayé et chez moi ça plante. Donc pas de lettres accentuées, pas de œ et autres signes propres au français.

## Au sujet de ces tutoriels

Ce _Guide de démarrage_ a été écrit par Joachim Heintz en 2023. Il est basé sur de nombreuses expériences d’enseignement de Csound auprès de jeunes compositeurs.

J’espère que ce tutoriel permettra à davantage de musiciens de réaliser à quel point il était et reste admirable et fructueux de transformer le plus ancien langage de programmation audio en un langage moderne, sans perdre aucune composition réalisée avec Csound, même écrite il y a de nombreuses années.

Chaque tutoriel comporte une première partie à lire _impérativement_, suivie d’une partie facultative (dans laquelle se trouvent bien sûr les choses les plus intéressantes). Pour que quelque chose au moins dans ce monde soit stable, chaque partie à lire _impérativement_ comporte cinq rubriques, et chaque partie à lire _facultativement_ en comporte trois. En fait, j’avais prévu 4+3, mais j’ai demandé à Csound qui m’a répondu :

```
if 4+3 == 7 then
    "Écrivez ce Tutoriel!\n"
else
    8!
endif
```

J’ai pris cela comme une révélation et j’ai opté pour 5+3 entêtes, afin de satisfaire également l’exigence `8!`. D’après mon expérience, il vaut toujours mieux satisfaire les deux dieux d’une branche conditionnelle.

Les parties "À lire absolument" comprennent également une section "À faire absolument". Tout d’abord un exemple central, oui très central, substantiel, opportun, agréable et bien sûr très instructif. Puis une section "Essayez vous-même" qui représente en quelque sorte le revers de la médaille : Autant il est facile d’appuyer sur le bouton "Exécuter/Run", autant il sera peut-être difficile de résoudre ces maudits exercices. Mais, pour citer John Ffitch : "Nous sommes tous passés par là…".

Je dois admettre que ce _Guide de démarrage_ n’en est qu’un parmi d’autres. Il se concentre sur l’apprentissage du langage : comment penser et programmer en Csound. Je pense que pour ceux qui comprennent cela et apprécient la simplicité et la clarté de Csound, toutes les portes sont ouvertes pour explorer l’univers infini de ce langage de programmation audio. Qu’il s’agisse de live coding, de [Bela Board](https://bela.io/) ou de [Raspberry Pi](https://www.raspberrypi.com/), de musique _noise_ ou de la production des sons les plus doux et les plus subtiles, de supports fixes ou d’applications en temps réel les plus rapides possibles, que vous utilisiez Csound en tant que logiciel autonome ou en tant que plugin pour votre DAW. En ce qui concerne les sons, je vous invite à écouter les exemples de Iain McCurdy, soit sur son [site web](http://iainmccurdy.org/csound.html), sois dans [Cabbage](https://cabbageaudio.com/). Ils constituent une source inépuisable d’inspiration et une référence en matière de qualité sonore.
