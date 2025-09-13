# 10 Bonjour Aléatoire / Random

## Ce que vous apprendrez dans ce tutoriel

- Comment travailler avec des **nombres aléatoires** dans Csound.
- Comment choisir une **graine/seed** particulière pour une séquence aléatoire.
- Comment implémenter des **idées structurelles** comportant des portions aléatoires.
- Comment une **marche aléatoire** peut être implémentée.
- Qu’est-ce que l’**espace global** dans l’orchestre Csound.

## Nombres aléatoires et décisions artistiques

Lancer des dés et inventer des jeux qui suivent le résultat de ces lancés a toujours été un plaisir pour les gens. Le plus excitant se situe dans la relation entre les règles établies et l’imprévisibilité du prochain lancé.

En art et en musique moderne, les choix aléatoires ont souvent un rôle important. Ça peut se produire à un niveau très technique, par exemple quand on utilise des déviations aléatoires en [synthèse granulaire](https://flossmanual.csound.com/sound-synthesis/granular-synthesis#asynchronous-granular-synthesis) pour imiter la nature dans sa variété permanente.

Mais le fait de créer des structures qui – plutôt que déterminer chaque note comme une mélodie –, peuvent évoluer de différentes manières, peut aussi constituer une part essentielle de nos créations.

Nous allons créer ici un simple exemple pour illustrer cette façon de composer. Nous verrons que **travailler avec le hasard** ne signifie pas du tous **se retirer des décisions**. Au contraire, les décisions sont bien présentes et primordiales dans ce qui pourra arriver.

## Les opcode 'random' et 'seed' (aléatoire et graine)

Pour obtenir un nombre aléatoire, on définit une limite à la plus petite valeur possible, et une limite à la plus grande valeur possible. À l’intérieur de cette plage, un nombre aléatoire est sélectionné.

Voici un exemple simple pour générer un nombre aléatoire entre 10 et 20. S’il-vous-plait, exécutez-le trois fois et regardez le résultat dans la console :

```
<CsoundSynthesizer>
<CsOptions>
-o dac -m 128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr Random
  iRandomNumber = random:i(10,20)
  prints("Nombre aléatoire entre 10 and 20: %f\n",iRandomNumber)
endin

</CsInstruments>
<CsScore>
i "Random" 0 0
</CsScore>
</CsoundSynthesizer>
```

Vous verrez que le même nombre aléatoire est choisi trois fois de suite. Ma sortie de console affiche :

```
Nombre aléatoire entre 10 et 20: 18.828730
```

À proprement parler, l’ordinateur ne connait pas le hasard car il ne sait que calculer. Un nombre aléatoire est donc généré en interne par un calcul. Une fois le premier nombre généré, tous les nombres suivants seront déterminés par un _générateur de nombre pseudo-aléatoire_.

Ce point de départ d’une séquence aléatoire est appelé **seed/graine**. Si nous ne définissons pas une graine/seed, Csound utilise un nombre fixe. C’est la raison pour laquelle nous obtenons toujours le même nombre.

L’opcode `seed` offre deux possibilités :

- `seed(0)` sera défini par l’heure actuelle. C’est ce que font la plupart des applications par défaut. Le nombre résultant donnera donc toujours un valeur de départ différente. En général, c’est ce que nous voulons quand on utilise le hasard/random.
- Pour chaque nombre entier placé dans `seed`, par exemple `seed(1)` ou `seed(783298)`, nous obtenons une certaine valeur de départ pour la séquence aléatoire. `seed(1)` produira un résultat différent que `seed(783298)`. Mais une fois que vous exécutez votre programme Csound une deuxième fois avec `seed(1)`, il en résultera la même valeur aléatoire. C’est une bonne occasion de découvrir différentes possibilités aléatoires, tout en gardant la possibilité de reproduire chacune d’entre elles précisément.

S’il-vous-plait, insérez `seed(0)` dans l’exemple précédent. Il devrait être placé sous la ligne `0dbfs = 0`, dans l’espace global de l’orchestre. Quand vous exécuterez votre code plusieurs fois, il devrait toujours imprimer un `iRandomNumber` différent.

Maintenant, insérez `seed(1)` ou `seed(2)` ou autre, à la place. Vous verrez que chaque graine/seed génère un nombre différent. Par contre, si vous exécuter ce code plusieurs fois avec la même graine/seed (par exemple `seed(1)`), vous obtiendrez toujours le même nombre.

## "Espace global / global space" ou "instrument 0"

Comme vous l’avez appris dans le [tutoriel 02](15-f-GS-fr-02.md) et dans le [tutoriel 08](15-l-GS-fr-08.md), l’espace qui contient le code Csound dans un document csd est inséré entre les balises `<CsInstruments>` et `<\CsInstruments>`. Cet espace est également appelé "orchestre/orchestra".

À l’intérieur de l’orchestre, nous avons les définitions des instruments. Chaque instrument commence par le mot-clé `instr` et finit par le mot-clé `endin`.

Mais nous avons également un "espace global" dans l’orchestre. "global" signifie ici **à l’extérieur** de toute définition d’instrument.

![Espace Global (en vert) et définitions d’instruments (en saumon) dans une section CsInstruments.](../resources/images/01-GS-10-b.png)

Comme vous le voyez, l’espace global n’est pas seulement celui situé en haut de l’orchestre. En fait, toute ligne vide hors d’une définition d’instrument fait partie de l’espace global.

Nous utilisons déjà l’espace global. Les "constantes de l’entête de l’orchestre" se situent dans cet espace global, hors de tout instrument, quand nous définissons

```
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1
```

Nous utilisons aussi l’espace global en définissant nos appels d’instrument via `schedule`, sous une définition d’instrument.

```
instr MonEspace
    //définition de l’instrument
endin
schedule("MonEspace",0,1)
```

Une définition d’instrument établit un espace local. La ligne `schedule(...)` réside dans l’espace global.

Cet espace global est parfois appelé _instrument 0_. La raison en est que les instruments définis dans l’orchestre ne peuvent avoir un numéro inférieur à `1`.

Voici ce que nous pouvons faire dans l’espace global :

- Nous pouvons définir des paramètres comme le taux d’échantillonnage, etc., et aussi le `seed`, car c’est un paramètre global également.
- Nous pouvons définir nos propres fonctions ou importer du code externe.
  <<<<<<< HEAD
- Nous pouvons créer des tables/tampons (buffers) et assigner des canaux logiciels.
- # Nous pouvons exécuter des expression _i-rate_. Par exemple, `prints("Bonjour Espace Global!\n")` dans l’espace global, et regarder son résultat dans la sortie de console.
- Nous pouvons créer des tables/tampons (buffers) et assigner des canaux logiciels.
- Nous pouvons exécuter des expression _i-rate_. Par exemple,  
   `prints("Bonjour Espace Global!\n")` dans l’espace global, et regarder son résultat dans la sortie de console.
  > > > > > > > c9576890a19c871cb299cf2796c5d68c80ef27f0

Ce que nous ne pouvons pas faire dans l’espace globale :

- Nous ne pouvons exécuter aucune instruction `k-rate` ou `a-rate`.

L’espace global n’est lu et exécuté qu’une seule fois à chaque exécution de Csound, même si nous n’appelons aucun instrument.

## Exemple

Cette fois – s’il-vous-plait –, lisez le code avant de l’exécuter, et tentez de deviner comment chaque note sonnera. Comment pensez-vous que cette esquisse va évoluer, et combien de temps pensez-vous qu’elle va durer.

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
seed(1234)

instr Salut
   //Notes MIDI aléatoires entre 55 et 80
   //pour le début et la fin du glissando.
   iMidiDebut = random:i(55,80)
   iMidiFin = random:i(55,80)
   //décibels aléatoires entre -40 et -20
   //pour le début et la fin du glissé des volume.
   iDbDebut = random:i(-40,-20)
   iDbFin = random:i(-40,-20)
   //Calcul les 'lines' en fonction des résultats
   //obtenus à partir des variables précédentes.
   kDb = linseg:k(iDbDebut,p3/2,iDbFin)
   kMidi = linseg:k(iMidiDebut,p3/3,iMidiFin)
   //Génère un son avec fade-out et le passe à la sortie.
   aSine = poscil:a(ampdb(kDb),mtof(kMidi))
   aOut = linen:a(aSine,0.01,p3, p3/2)
   outall(aOut)

   //Déclenche l’instance suivante avec des plages aléatoires
   //pour le début et la durée.
   iCount = p4
   if(iCount > 1) then
      iDebut = random:i(1,3)
      iDur = p3 + random:i(-p3/2, p3)
      schedule("Salut", iDebut, iDur, iCount-1)
   endif
endin
   schedule("Salut", 0, 2, 15)
</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

Nous avons beaucoup d’opcodes `random()` dans ce code. Examinons de plus prêt les décisions qu’ils sous-tendent, et les effets qui résultent de ces décisions.

```
iMidiDebu = random:i(55,80)
iMidiFun = random:i(55,80)
```

Régler le début et la fin de la ligne du glissando dans une plage entre les notes MIDI 55 (F#4) et 80 (G#6) génère une probabilité égale d’obtenir des lignes ascendante ou descendantes. Certaines auront une forte pente, d’autres une pente légère, et même – même si la probabilité est faible – d’autres encore hériterons d’une ligne horizontale.

Une alternative serait ce code :

```
iMidiDebut = random:i(55,70)
iMidiFin = random:i(65,80)
```

Dans ce cas, les lignes de hauteur seraient la plupart du temps ascendantes, mais pas toujours.

Des décisions similaires s’appliquent aux lignes du volume :

```
iDbDebut = random:i(-40,-20)
iDbfin = random:i(-30,-10)
```

L’écart de volume maximum est de 20 dB, ce qui n’est pas énorme. Il y a donc un certain écart entre les forts et les sons faibles, mais tous sont bien perceptibles, le contraste _premier-plan_ / _arrière-plan_ est peu marqué, contrairement à ce qui se produirait probablement avec une plage comprise entre -50 et -10 dB.

Les décisions les plus importantes concernant la forme sont celles qui ont trait à la distance entre les notes successives et à la durée des notes :

```
iDebut = random:i(1,3)
iDur = p3 + random:i(-p3/2, p3)
```

La distance entre deux notes se situe entre Une et trois secondes. Nous avons donc en moyenne une nouvelle note toutes les deux secondes.

Mais la durée des notes est gérée de telle façon que la durée de la note suivante ait la durée de la note actuelle (**p3**), plus une durée aléatoire comprise dans une plage entre :

- moins la moitié de la note actuelle comme minimum, et
- la durée de la note actuelle au maximum.  
  (C’est la même chose qu’une plage aléatoire entre `p3/2` et `p3*2`, mais je préfère personnellement penser ici la durée suivante comme "Cette durée plus/minus something".)

Pour la première note qui a une durée de deux secondes, ça signifie une plage aléatoire entre une et quatre secondes. Les durées ont donc tendance à s’allonger de plus en plus. Voici ce qui se produit dans l’exemple précédent pour les sept premières notes :

![Développement des durées pour les notes 1 à 7.](../resources//images/01-GS-10-a.png)

C’est intéressant de voir que les notes 2 et 3 allongent leur durées comme attendu, mais que les notes 4 et 5 les raccourcissent car elles ont choisi leurs durée proche du minimum.

Mais sur des exécutions longues, les durée plus grandes prévaudront, de telle façon que de plus en plus de notes sonneront en même temps, formant un accord de plus en plus complexe.

## Essayez-le vous-même

- Définissez la graine à `seed(0)` plutôt que `seed(12345)` et écoutez quelques exécutions.
- Changez la ligne `iDur = …` afin d’obtenir des possibilités égales de durées courtes ou de durées longues. Faites-vous votre idée de cette version.
- Changez la même ligne que précédemment afin que les durées les plus longues deviennent de plus en plus courtes.
- Changez le code afin que les durées deviennent plus longues pour la moitié des notes jouées, et plus courtes pour l’autre moitié.
- Changez le code de manière à ce que la distance entre les notes successives diminue dans la première moitié des notes, puis qu’elle augmente dans la seconde moitié.
- Appliquez aussi ce changement aux hauteurs et aux volumes afin que la première moitié des hauteurs augmente tandis que les volumes diminuent, et l’inverse dans la seconde moitié.

## Marche aléatoire

Dans une _marche aléatoire_, les valeurs aléatoires d’un pas dépend des valeurs du pas précédent.

Dans l’exemple ci-dessus, les durées suivent une marche aléatoire, tandis que les autres décisions aléatoires sont indépendantes du pas précédent.

Comme nous l’avons vu dans la figure précédente, la septième note d’une durée de 11.8 secondes n’aurait pas été possible dans un des pas précédents. Elle dépend de la plage aléatoire générée au sixième pas.

La marche aléatoire des durées de note est combinée avec une tendance qui conduit à une augmentation progressive de ces durées. Mais il est aussi possible de garder des conditions constantes pour le pas suivant, tout en obtenant malgré tout des motifs surprenants. Jetez un œil sur [l’article Wikipedia](https://en.wikipedia.org/wiki/Random_walk) ou une autre source concernant les marches aléatoires.

Voici une marche aléatoire pour la hauteur, le volume et la durée. Les conditions pour le pas suivant restent identiques, mais il peut néanmoins y avoir une direction dans chacun des trois paramètres.

```
<CsoundSynthesizer>
<CsOptions>
-o dac -m 128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1
seed(54321)

instr RandomWalk
  //Reçoit la hauteur et le volume
  iMidiPitch = p4
  iDecibel = p5
  //Crée une note avec fade-out, puis la fait sortir sur la carte son
  aSine = poscil:a(ampdb:i(iDecibel),mtof:i(iMidiPitch))
  aOut = linen:a(aSine,0,p3,p3)
  outall(aOut)

  //Obtient le nombre de départ pour le compteur
  iCount = p6
  //only continue if notes are left
  if (iCount > 1) then
    //Les notes se suivent toujours
    iStart = p3
    //La durée suivante est plus ou moins la moitié
    //des maximum/minimum courants
    iDur = p3 + random:i(-p3/2,p3/2)
    //La hauteur suivante est à un demi-ton au dessus
    //ou en dessous des demi-tons maximum/minimum actuels
    iNextPitch = iMidiPitch + random:i(-1,1)
    //Le volume suivant est à ±2dB au dessus ou dessous des dB maximum/minimum
    //actuel, mais toujours dans une plage entre -50 et -6
    iNextDb = iDecibel + random:i(-3,3)
    if (iNextDb > -6) || (iNextDb < -50) then
      iNextDb = -25
    endif
    //Démarre l’instance suivante
    schedule("RandomWalk",iStart,iDur,iNextPitch,iNextDb,iCount-1)
  //Sinon Arrête.
  else
    event_i("e",0,0)
  endif

  //Imprime les paramètres de cette instance sur la console
  prints("Note # %2d, Duration = %.3f, Pitch = %.2f, Volume = %.1f dB\n",
         50-iCount+1, p3, iMidiPitch, iDecibel)
endin
schedule("RandomWalk",0,2,71,-20,50)

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

_Marche Aléatoire_

Sans changer les conditions de cette marche aléatoire, nous obtenons une extrême réduction des durées à la fin de la séquence.

En général, le hasard en art fait partie de notre fantaisie et de notre inventivité. En introduisant un `if`, nous pouvons changer les conditions quelle que soit la situation. Par exemple : « Si la hauteur a été constante pendant les trois derniers pas, saute à la plus haute ou la plus basse hauteur possible ».

`random` et `if` ensemble permettent de créer d’étranges réalités. Réalités très individuelles car c’est vous-même qui avez ces idées. Très rationnelles car elles sont toutes basées sur des règles et conditions écrites. Très imprévisibles car les chaines aléatoires peuvent conduire à des résultats inattendus… et peut-être tenons-nous là une de leurs plus grandes qualité.

## Opcodes et termes que vous avez appris dans ce tutoriel

- `random:i(iMin,iMax)`
- `seed(iNum)`
- _espace global / global space_ s’identifie aux parties de la section `CsInstruments` qui sont hors des définitions d’instruments.
- `instrument 0` est un autre mot pour désigner cet _espace global_.

## Avançons

avec le tutoriel suivant : _11 Hello Keys_ (à venir).

## … Ou lisez quelques explications supplémentaires ici

### Souvenez-vous de i-rate et k-rate…

Vous avez peut-être remarqué que jusqu’ici nous n’avons utilisé random qu’au taux d’instrument (i-rate). Comme vous l’avez appris dans le [Tutoriel 05](15-i-GS-fr-05.md), ça signifie que la valeur aléatoire n’est générée qu’une fois, au moment de l’initialisation de l’instance de l’instrument.

Que se passe-t-il si nous utilisons `random` au taux de contrôle (k-rate) ? Comme :

```
kMidi = random:k(55,80)
```

Ici, un nombre aléatoire entre 55 et 80 sera généré **tous les k-cycles**. Selon les calcules effectués  
[ici](15-g-GS-fr-03.md#quelques-notes-sur-ksmps), autour de 1000 fois par seconde.

C’est donc une très grande différence qui est introduite entre un appel à `random:i`, un appel à `random:k`. Bien que ce soit logique, juste, et que ça corresponde parfaitement avec ce que nous avons appris dans les [tutoriel 02](15-f-GS-fr-02.md) et [tutoriel 05](15-i-GS-fr-05.md), c’est souvent surprenant pour un débutant.

Nous pouvons même utiliser l’opcode `random` au taux audio (a-rate). Alors nous générons une valeur aléatoire à chaque échantillon/sample, soit 44100 fois par secondes si c’est le taux d’échantillonnage (sample rate) courant. Dans ce cas, si nous choisissons des plages minimum et maximum raisonnables, nous pouvons entendre un résultat qui se nomme bruit blanc / white noise.

```
aNoise = random:a(-0.1, 0.1)
```

### Random/aléatoire avec interpolation ou avec valeurs maintenues

Devoir choisir entre une valeur aléatoire pour toute la durée d’un évènement d’instrument (i-rate) et environ mille différentes valeurs par seconde (k-rate) n’est – dans de nombreux cas d’utilisation – pas satisfaisant. Imaginons que nous voulions qu’un son se déplace entre deux haut-parleurs. Nous pourrions souhaiter qu’il change de direction environ une fois par seconde.

Dans ce genre de cas, l’opcode `randomi` est particulièrement adapté. Le `i` à la fin de son nom signifie **interpolation**. Cet opcode génère des nombres aléatoires à une certaine densité, et dessine des lignes entre eux. Ces lignes sont les interpolations.

Les argument d’entrée pour `randomi` sont :

1. minimum
2. maximum
3. combien de valeurs seront générées par seconde
4. règles certaines possibilités données au début et devrait être réglé sur `3` pour un usage normal (consultez la référence pour plus de détails, ou regardez [ici](https://flossmanual.csound.com/basics/random#iii.-miscellaneous-examples)).

Voici une ligne aléatoire entre 0 et 1, avec une nouvelle valeur chaque seconde :

![Interpolation aléatoire.](../resources/images/01-GS-10-d.png)

Parfois nous voulons que la valeur aléatoire se maintienne jusqu’à la suivante. C’est le boulot de l’opcode `randomh` (_h_ pour _hold_ = maintien)

Les arguments d’entrée de `randomh` ont la même signification que ceux de `randomi`.  
Voici – avec les même arguments d’entrée du tracé précédent – la sortie obtenue avec `randomh` :

![Random avec valeurs maintenues.](../resources/images/01-GS-10-e.png)

Tout ça n’est qu’un petit aperçu de l’univers immense de _random_.

Avec tous les opcodes _random_ que nous avons discuté jusqu’ici, nous obtenons dans une certaine plage, une distribution égale des nombres aléatoires. Pourtant dans la nature, les probabilités sont souvent plus élevées au milieu plutôt qu’aux limites de la plage aléatoire.

La [distribution Gaussienne](https://en.wikipedia.org/wiki/Normal_distribution) est une formulation mathématique de cette particularité. Elle est implémentée dans l’opcode `gauss` de Csound.

Et la _marche aléatoire/random walk_ n’est qu’une des possibilités qui dépend d’un contexte plutôt que d’un jet de dés. La **chaine de Markov** est une autre approche. Si vous voulez en apprendre d’avantage et exécuter quelques exemples, examinez le chapitre [Random](https://flossmanual.csound.com/basics/random) de ce livre.

## Bravo !

Vous avez maintenant terminé les dix premiers de ces tutoriels. Ce bloc a été pensé comme une introduction générale. Voici un petit résumé de quelques-unes des connaissances que vous avez acquises :

- Vous savez maintenant comment un fichier .csd est structuré.
- Vous savez comment configurer le **sample rate (sr)**, la **block size** et d’autres constantes.
- Vous savez comment définir des **instruments** en tant qu’unités principales de tout programme Csound.
- Vous savez comment appeler une **instance** d’instrument via une **ligne de partition / score line**.
- Vous savez comment faire la même chose depuis l’intérieur du code de l’orchestre via **schedule**.
- Vous savez ce que sont **i-rate**, **k-rate** et **a-rate** (au cas où vous vous sentiriez un peu fragile à ce propos, voyez [ici](15-f-GS-fr-02.md#Signal-k-rate-a-la-frequence-de-controle) et [ici](15-i-GS-fr-05.md#Les-variables-i-rate-dans-Csound.md)).
- Vous savez comment utiliser les **opcodes** et comment lire le [Manuel de Référence Csound](https://csound.com/docs/manual-fr/index.html).

- Vous connaissez déjà quelques opcodes essentiels comme :

  - `outall` et `out` pour sortir des signaux audio.
  - `poscil` comme oscillateur multi-propos.
  - `linseg` comme générateur de n’importe quelles lignes.
  - `linen` comme outil simple pour les fondus (fades).
  - `mtof` et `ampdb` comme convertisseurs pour les hauteurs et les volumes.
  - `if` comme condition de branchement.
  - `random` et ses dérivés comme générateurs d’aléatoires.

Je pense que ça devrait être suffisant pour vous permettre de vous repérer dans ce manuel et d’approfondir vos connaissances.

- Rendez-vous par exemple au [chapitre 03](https://flossmanual.csound.com/csound-language) pour aller plus loin avec le langage Csound.
- Ou au [chapitre 04](https://flossmanual.csound.com/sound-synthesis) pour étudier les méthodes de synthèse sonore.
- Ou encore au [chapitre 05](https://flossmanual.csound.com/sound-modification) où vous découvrirez comment modifier des sons existants.

<<<<<<< HEAD
Note du traducteur : Les trois chapitres mentionnés ci-dessus ne sont pas encore traduits en français. Peut-être un jour ;)
=======
Note du traducteur : Les trois chapitres mentionnés ci-dessus ne sont pas encore traduits en français. Peut-être un jour ;)

> > > > > > > c9576890a19c871cb299cf2796c5d68c80ef27f0
