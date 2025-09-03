# 08 Bonjour 'Schedule' / planification temporelle

## Ce que vous apprendrez dans ce tutoriel

- Comment appeler des instruments sans utiliser **la partition/score**
- Comment obtenir le **numéro** d’un **instrument nommé**
- Comment lire le **Manuel de référence de Csound**

## Le fichier csd à nouveau, plus un peu de l’histoire de Csound

Vous avez appris dans le [Tutoriel 02](15-f-GS-fr-02.md) qu’un fichier Csound _.csd_ est composé de trois parties :

- La section `CsOptions` configure quelques options générales qui sont utilisées quand vous appuyez sur le bouton Play. Par exemple, quand vous voulez rendre Csound en temps réel sur votre carte son, ou écrire un fichier sonore, ou indiquer quelle carte MIDI utiliser, ou combien de messages afficher dans la console.

- La section `CsInstruments` contient le code Csound à proprement parler. Cette section est appelée le code de 'l’Orchestre/Orchestra' car elle contient les instruments Csound.

- La section `CsScore` contient les lignes de partition. Chaque ligne de partition commençant par `i` initie une instance d’instrument, à un certain moment, pour une certaine durée, et éventuellement d’autres paramètres.

D’une certaine manière, il s’agit là d’une façon raisonnable de diviser le travail. Dans `CsInstruments`, nous codons les instruments, dans `CsScore` nous les appelons, et dans les `CsOptions` nous déterminons quelques réglages concernant la performance. Dans les premiers temps de Csound, les définitions d’instrument et la partition résidaient dans deux fichiers texte séparés. Les définitions d’instruments, ou orchestre/orchestra, étaient collectées dans un fichier _.orc_, et les lignes de partition étaient collectées dans un fichier _.sco_. Les options étaient écrites à l’aide de drapeaux que vous pouvez toujours voir dans la section `CsOptions`. Le drapeau `-o`, par exemple, assigne la sortie audio(out).

Il est encore possible d’utiliser Csound de cette façon à partir de la "ligne de commande", ou "Terminal". Une exécution de Csound est démarrée par un ligne de commande comme celle-ci :

```
csound -o dac -m 128 my_instruments.orc my_score_lines.sco
```

L’appel pour exécuter Csound est produit en tapant `csound` en première position. En seconde position nous pouvons avoir plusieurs options. Dans ce cas : `o- dac -m 128` pour la sortie en temps réel et la réduction du nombre de message à afficher. En troisième et en quatrième position, suivent les fichiers _.orc_ et _.sco_.

Cette façon d’exécuter Csound par une ligne de commande est toujours une option très souple. Si vous aimez apprendre Csound et continuez de l’utiliser pour vos propres projets audio, vous l’utiliserez probablement à un moment ou un autre, car c’est rapide et stable, et vous pouvez ainsi intégrer Csound dans n’importe quel environnement de script.

## Utilisation de Csound sans la section Score

Nous avons parcouru cette mini-rétrospective de l’histoire de Csound parce que la séparation entre un fichier _orchestra_ et un fichier _score_ dans les débuts de Csound montre clairement les différents rôles de chacun.

Ce n’est pas seulement un rôle différent. On peut dire qu’un instrument sait quelque chose sur la partition/score. Comme vous l’avez appris dans les [Tutoriel 04](15-h-GS-fr-04.md) et [Tutoriel 05](15-i-GS-fr-05.md), chaque instance d’instrument est au courant des _p-fields/p-champs_ qui la crée. Elle connait sa durée, et même son heure de départ dans la performance Csound en son entier, et si elle est appelée par un nombre fractionnaire, elle connait son instance par un numéro unique.

Par contre, la partition/score ne sait rien des instruments. Même pas la fréquence d’échantillonnage, ou le nombre de canaux. Nous ne pouvons utiliser aucun opcode dans la partition, pas plus que des noms de variables. La partition ne comprend pas l’orchestre, et pour continuer dans ce sens : la partition/score ne comprend pas le langage de Csound.

Il existe cependant quelques situations dans lesquelles nous avons besoin d’**un** langage pour tout faire. Nous pouvons vouloir démarrer des instruments à partir d’un autre instrument. Nous pouvons vouloir passer une variable à un instrument dont nous calculerons la durée pendant la performance. Nous pouvons vouloir déclencher des instances d’instrument depuis une entrée live, comme un écran tactile, un clavier MIDI ou des messages provenant d’autres applications.

Csound offre cette souplesse. Les opcodes les plus utilisés pour appeler des instruments depuis l’intérieur de la section `CsInstruments`, sont `schedule` et `schedulek`. Nous introduirons d’abord `schedule`, puis passerons dans le _tutoriel_ 11 à `schedulek` (à venir).

Donc à partir de maintenant vous verrez la section _score_ vide la plupart du temps. Mais bien sûr, il existe encore de nombreuses situations dans lesquelles une partition/score traditionnelle peut être utilisée. Vous trouverez quelques conseils concernant l’usage de _score_ dans une section optionnelle de ce tutoriel.

## l’opcode 'schedule'

L’opcode `schedule` a la même fonction qu’une ligne de partition/score commençant par `i`. Il appelle une instance d’un instrument défini. Il a au moins trois arguments d’entrée que chaque appel d’instrument doit contenir :

1. Le numéro ou le nom de l’instrument appelé.
2. L’heure de début de l’instrument appelé.
3. la durée de l’instrument appelé.

Le code suivant appelle l’instrument "Bonjour" à l’heure de départ zéro pour une durée de deux secondes :

```
schedule("Bonjour",0,1)
```

Comme `Schedule` est un opcode, ses arguments d’entrée sont **séparés par des virgules**. C’est la grosse différence avec la score/partition, dans laquelle les champs/fields de paramètres sont séparés par des espaces :

```
i "Bonjour" 0 1
```

Note 1 : Comme vous pouvez le voir, le `i` du début présent dans la section \<score> est omi. C’est possible car `schedule` n’instancie que des évènements de type _instrument_, alors qu’une ligne de partition/score peut avoir d’autres types d’instructions. Voyez plus bas dans la partie optionnelle de ce tutoriel si vous voulez en savoir plus à ce sujet.

Note 2 : Vous êtes libres de choisir d’ajouter ou non des espaces aux virgules dans la liste d’argument de `schedule`. Pour Csound, les virgules sont le séparateur. Sachant cela, vous pouvez utiliser des espaces ou tabulations en plus, ou pas. Ces deux ligne sont donc valides :

```
//Les arguments sont séparés par des virgules seulement :
schedule("Hello",0,2)
//Les arguments sont séparés par des virgules suivies d’espaces :
schedule("Hello", 0, 2)
```

## Exemple

L’exemple suivant transfère simplement les lignes de partition du [Tutoriel 07](15-k-GS-fr-07.md) vers l’instruction `schedule`. Il sonnera exactement de la même façon que l’exemple du tutoriel 07 :

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

//code identique à celui du tutoriel 07
instr Bonjour
  iMidiStart = p4
  iMidiEnd = p5
  kDb = linseg:k(-10,p3/2,-20)
  kMidi = linseg:k(iMidiStart,p3,iMidiEnd)
  aSine = poscil:a(ampdb:k(kDb),mtof:k(kMidi))
  aOut = linen:a(aSine,0,p3,1)
  outall(aOut)
endin
//suivi par les instructions schedule plutôt que les lignes de partition/score
schedule("Bonjour",   0,      2,  72, 68  )
schedule("Bonjour",   4,      3,  67, 73  )
schedule("Bonjour",   9,      5,  74, 66  )
schedule("Bonjour",   11,     .5, 72, 73  )
schedule("Bonjour",   12.5,   .5, 73, 73.5)
</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

## Essayez-le vous même

Assurez-vous que vous arrêtez et redémarrez toujours Csound quand vous vous déplacez vers l’exercice suivant.

- Vous pouvez placer les lignes `schedule` à n’importe quel endroit dans la section `CsInstruments`. Assurez-vous seulement de les placer hors de l’instrument "Bonjour". Tentez de placer les ligne ailleurs par copier/coller. Vous pouvez également les disperser n’importe où et dans n’importe quel ordre. Ça n’améliorera probablement pas la lisibilité de votre code, mais pour Csound, ça ne fera aucune différence.

- Placez une des lignes `schedule` dans la section score. Csound rapportera une erreur, car score ne comprend pas le code de l’orchestre/orchestra de Csound.

- Placez **toutes** les lignes `schedule` dans l’instrument "Bonjour". Ce n’est pas une erreur, mais rien ne se passera quand vous exécuterez le code : Il n’y a plus aucune instruction pour invoquer une instance de l’instrument "Bonjour".

- En interne, Csound convertit tous les instruments nommés en un nombre entier positif. Vous pouvez obtenir ce nombre via l’opcode `nstrnum`. Placez le code `iQuelEstTonNumero = nstrnum("Bonjour")` n’importe où dans la section `CsInstruments`, par exemple sous les lignes `schedule`. La performance Csound devrait être identique.

- Quand nous appelons l’instrument "Bonjour" cinq fois, comme nous l’avons fait dans l’exemple, nous appelons cinq instances de cet instrument. Nous pouvons assigner des nombres à ces instances en appelant l’instrument comme un nombre fractionnaire. Plutôt que d’appeler l’instrument **1**, nous appellerons l’instrument 1.1, 1.2, 1.3, 1.4 et 1.5.  
  Remplacez le premier argument de `schedule` par ces nombres et insérez `print(p1)` dans le code de l’instrument, pour prouver que l’instrument reçoit cette information.

## Csound s’exécute, s’exécute et s’exécute…

Quand nous utilisons la partition/score traditionnelle, comme nous l’avons fait dans le tutoriel 01, Csound s’arrête à la fin du dernier évènement de partition.

Mais quand nous laissons la partition/score vide, Csound ne termine pas. Pour le dire d’une façon anthropomorphique : Csound attend. Imaginez que nous avons établi une connection réseau et pouvons communiquer avec cette instance Csound. Alors nous pouvons appeler à nouveau l’instrument "Bonjour" de cette façon. Ou si nous avons un instrument MIDI connecté, nous pouvons aussi le faire.

Donc habituellement, nous voulons cette performance "sans fin". Mais dans le cas ou nous voulons que Csound s’arrête après un certain temps, nous pouvons placer une ligne dans la partition/score : Un `e` suivi d’un espace suivi d’un nombre. Csound s’arrêtera une fois atteint ce nombre de secondes. S’il vous plait, insérez `e 20` dans la section `CsScore` de notre exemple, et exécutez-le à nouveau. Maintenant il devrait s’arrêter après 20 seconde. Si on insère `e 5` alors la lecture sera interrompue si notre code nécessite plus de temps pour se dérouler jusqu’au bout.

## Le manuel de référence Csound comme compagnon et terrain d’évolution

Toute l’information concernant l’usage d’un opcode est collectée dans le [Manuel de Référence Csound](https://csound.com/docs/manual-fr/index.html).

Chaque opcode a sa propre page ici. S’il-vous-plait, examinez la page pour l’opcode `schedule` qui est à <https://csound.com/docs/manual-fr/schedule.html>.

Vous verrez que la méthode d’écriture de code native de Csound est utilisée ici. Plutôt que :

```
schedule(insnum, iwhen, idur, [, ip4] [, ip5] [...])
```

Il est écrit :

```
schedule insnum, iwhen, idur [, ip4] [, ip5] [...]
```

Ça n’est pas très différent. Dans la syntaxe native de Csound, vous écrivez les arguments d’entrée d’un opcode à droite, et la sortie d’un opcode à gauche.

Comme l’ opcode `schedule` a seulement des argument d’entrée, nous n’avons rien à gauche.

Pour vous familiariser avec cette façon d’écrire, regardons la page de manuel de l’opcode `linseg`. Vous la trouverez [ici](https://csound.com/docs/manual-fr/linseg.html) dans le manuel de référence, et voici ses informations concernant la syntaxe de `linseg` :

```
ares linseg ia, idur1, ib [, idur2] [, ic] [...]
kres linseg ia, idur1, ib [, idur3] [, ic] [...]
```

Dans le style de codage fonctionnel qui est utilisé dans ce tutoriel, nous aurions :

```
ares = linseg:a(ia, idur1, ib [, idur2] [, ic] [...])
kres = linseg:k(ia, idur1, ib [, idur2] [, ic] [...])
```

Vous trouverez des informations détaillées dans ces pages de référence. Certaines seront sans doute trop techniques pour vous. Vous y trouverez aussi un exemple fonctionnel pour chaque opcode qui est très intéressant pour se faire une idée du fonctionnement de l’opcode et de ce qu’il peut faire.

Vous lirez peut être aussi quelque chose d’obsolète sur l’une de ces pages. Pour un projet Open Source, c’est souvent un problème majeur de garder la documentation à jour. Chacun de nous peut contribuer, par exemple en ouvrant un ticket sur Github ou en suggérant une amélioration au manuel de référence à la [communauté Csound](https://csound.com/contribute.html).

## Les opcodes que vous avez appris dans ce tutoriel

### Opcodes

- `schedule` appelle une instance d’instrument comme le fait une ligne de partition `i`.
- `nstrnum` retourne le numéro interne à Csound d’un nom d’instrument.

## Avançons

Avec le tutoriel suivante : [09 Bonjour If](15-m-GS-fr-09.md).

## … Ou lisez quelques explications supplémentaires ici

### Instructions 'Score' et utilitaires

Avant de quitter la partition/score, nous devons au moins mentionner quelques-unes de ses autres fonctionnalités.

Je dois dire que pour ceux qui écrivent des pièces d’une durée fixe, la partition/score offre de nombreux outils utiles et éprouvés.

Jusqu’ici nous n’avons utilisé que l’instruction `i` qui appelle une instance d’instrument, et que nous avons remplacée dans ce tutoriel par l’opcode `schedule` placé dans la section `CsInstruments`.

Nous avons également mentionné l’instruction `e` qui arrête Csound au bout d’un certain temps.

Une autre instruction utile est l’instruction `t` ou "Tempo", qui définit la durée d’un temps (beat), en unités métronomiques. Par défaut, il est de 60, ce qui signifie qu’un temps/beat égale une seconde. Mais il peut être réglé sur d’autres valeurs ; pas seulement une fois pour la performance entière, mais aussi avec différentes valeurs à différents moments. Il peuvent également être interpolés entre eux (ce qui résulte en un tempo qui accélère ou qui ralentit).

Voici une vue d’ensemble, avec des liens vers des descriptions détaillées dans le Manuel de Référence Csound :  
<https://csound.com/docs/manual-fr/ScoreStatements.html.>

…Et dans ce livre, le Csound FLOSS Manual, nous avons un chapitre qui concerne les [méthodes d’écrire des scores/partitions](https://flossmanual.csound.com/miscellanea/methods-of-writing-csound-scores).

L’interface utilisateur [Blue](https://blue.kunstmusik.com/) pour Csound, de Steven Yi’s, offre des fonctionnalités sophistiquées pour travailler avec les évènements de score en tant qu’objets.

### Déclencher d’autres évènements score que 'i' depuis le code de l’orchestre/orchestra

Si vous avez besoins de déclencher un autre type d’évènement score qu’un évènement d’instrument, vous pouvez utiliser l’opcode `event_i`, ou sa version _k-rate_ `event`. N’espérez pas que tout fonctionnera comme vous l’imaginerez, car la partition Csound est pré-traitée avant que la performance ne commence. Ça rend impossible le déclenchement d’évènements de partition depuis l’intérieur de l’orchestre/orchestra. Les instructions `t` et similaires ne fonctionneront donc pas.

L’instruction `e` toutefois fonctionne, et peut être utilisée pour arrêter Csound proprement à n’importe quel instant de la performance. Dans cet exemple, nous appelons en premier l’instrument _Play_, qui joue un son sinusoïdal pendant trois secondes. Ensuite nous appelons l’instrument _Print_ qui affiche ses messages dans la console et appelle l’instrument _Terminate_ après trois secondes. Cet instrument arrête alors la performance Csound.

```
<CsoundSynthesizer>
<CsOptions>
-m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr Play
  aSine = poscil:a(.2,444)
  outall(linen:a(aSine,p3/2,p3,p3/2))
endin
schedule("Play",0,3)

instr Print
  puts("J’appelle maintenant l’instruction 'e' après 3 secondes",1)
  schedule("Terminate",3,0)
endin
schedule("Print",3,1)

instr Terminate
  event_i("e",0)
endin

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

### Trois durées particulières : 0, -1 et z

Nous avons déjà utilisé quelques fois une durée de 0 dans les exemple. Par exemple :

```
<CsoundSynthesizer>
<CsOptions>
-o dac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr Zero
  prints("Look at me!\n")
endin

</CsInstruments>
<CsScore>
i "Zero" 0 0
</CsScore>
</CsoundSynthesizer>
```

Quand vous regardez la sortie de la console, vous voyez `Look at me`.

L’instance de l’instrument a donc bien été appelée, bien qu’il y ait "no duration" dans la ligne de score : le troisième paramètre est `0`.

Pour Csound, appeler un instrument d’une durée de Zéro signifie : Execute seulement la passe d’initialisation. En d’autres termes ; Toute les instruction _i-rate_ fonctionneront, mais pas _k-rate_ ou _a-rate_.

L’autre durée particulière est `-1`. Elle représente une _durée illimitée_ et est également utilisée pour les notes liées (tied). Ce qu’il est important de savoir si nous voulons utiliser la valeur `-1` comme durée :

- Un instrument appelé avec une valeur **p3** négative s’exécutera indéfiniment.
- Mais seulement une instance (!).
- Nous pouvons stopper cette instance en envoyant un évènement de score avec un **p1** négatif.

Voici un exemple simple :

```
<CsoundSynthesizer>
<CsOptions>
-o dac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr 1
  prints("I am there!\n")
  iMidiNote = p4
  aSound = poscil:a(.2,mtof:i(iMidiNote))
  aOut = linenr:a(aSound,0,1,.01)
  outall(aOut)
endin

</CsInstruments>
<CsScore>
i 1 0 -1 70
i 1 1 -1 76
i -1 10 0 0
</CsScore>
</CsoundSynthesizer>
```

Nous entendons que quand la seconde instance démarre après une seconde, la première instance est brutalement arrêtée. Csound suppose que nous voulons continuer une ligne *legato* ; donc aucune raison pour qu’il y ait plus d’une instance en même temps.

Toutefois, après dix secondes la note tenue s’arrête élégamment, interrompue par le dernier évènement de score, qui comporte `-1` comme premier paramètre. Le fade-out est ici produit par l’opcode `linenr`. Nous en dirons plus à son sujet quand nous en serons à parler de l’entrée MIDI temps réel.

Si nous voulons un instrument qui joue indéfiniment, nous pouvons utiliser le caractère `z`, un symbole spécial pour la durée. Conformément au [Manuel de référence Csound](https://csound.com/docs/manual-fr/ScoreTop.html), `z` oblige l’instrument à s’exécuter "environ 25367 ans".

Bien, je ne mets pas ça en doute. Mais dans ce cas, au bout de dix secondes je démarrai un autre instrument qui arrête toutes les instances de l’instrument "Zett". Nous utiliserons `turnoff2` ou `turnoff2_i` plus tard.

```
<CsoundSynthesizer>
<CsOptions>
-o dac -m128
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 32
nchnls = 2
0dbfs = 1

instr Zett
  prints("I am there!\n")
  iMidiNote = p4
  aSound = poscil:a(.1,mtof:i(iMidiNote))
  aOut = linenr:a(aSound,0,3,.01)
  outall(aOut)
endin

instr Turnoff
  turnoff2_i("Zett",0,1)
endin

</CsInstruments>
<CsScore>
i "Zett" 0 z 70
i "Zett" 1 z 76
i "Zett" 4 z 69
i "Turnoff" 10 0
</CsScore>
</CsoundSynthesizer>
```

S’il vous plait, notez que `z` ne peut être utilisé que dans la partition / score. Si nous l’utilisons dans un appelle `schedule()`, il sera interprété comme un nom de variable.
