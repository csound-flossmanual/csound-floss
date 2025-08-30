# 02 Bonjour Fréquences

## Ce que vous apprendrez dans ce tutoriel

- Comment créer un glissement/sliding de fréquence, ou **glissando**.

- Ce que **k-rate** ou **control rate / fréquence de contrôle** signifient, et
- que sont les **k-variables** dans Csound.

- Comment un **document .csd** Csound est structuré :

    - Que sont les **CsOptions** et

    - Qu’est-ce que la section **CsInstruments** ou **orchestra**.

## Une ligne pour la fréquence

Dans les sons naturels, la fréquence est rarement fixe. Habituellement, par exemple quand nous parlons, la hauteur de notre voix varie constamment à l’intérieur d’une certaine plage.

Le cas le plus simple de ce genre de mouvement est une ligne. Nous avons besoin de trois valeurs pour construire cette ligne :

1. Une valeur de commencement.

2. Une durée pour nous déplacer de cette valeur vers une valeur cible.

3. La valeur-cible elle-même.

Voici une ligne qui se déplace de 500 à 400 en 0.5 secondes, et qui reste à 400 pendant 1.5 secondes :

![Ligne de fréquence.](../resources/images/01-GS-02-a.png)  


    Note : Acoustiquement, cette façon d’appliquer un _glissando_ est discutable. Nous en parlerons dans le [Tutoriel 05](15-i-GS-fr-05.md).

    Note 2 : Ne devrions-nous pas dire : "Voici une ligne qui se déplace depuis 500 Hz jusqu’à 400 Hz, en 0.5 secondes", plutôt que "Voici une ligne qui se déplace depuis 500 jusqu’à 400 en 0.5 secondes" ? Non. La ligne produit des nombres. Ces nombres peuvent être utilisés pour des fréquences, mais peuvent avoir une signification différente dans un autre contexte.

## Une ligne Dessinée avec l’opcode 'linseg'

Dans Csound, nous créons ce genre de ligne avec l’opcode `linseg`, qui signifie "linear segments / segments linéaires". Ici, nous n’avons besoin que d’un seul segment qui se déplace de 500 à 400 en 0.5 secondes.

Voici le code Csound pour ce mouvement linéaire :
```
kFreq = linseg:k(500, 0.5, 400)
```
## Signal k-rate (à la fréquence de contrôle)

Un signal est quelque chose dont les valeurs changent au cours du temps. Mais qu’est-ce que le temps dans une application audio comme Csound ?

Le temps fondamental est donné par la **sample rate / fréquence d’échantillonnage**. Elle détermine le nombre d’échantillons/samples que nous avons par seconde. Nous avons vu le signal _aSine_ dans le premier tutoriel, dont les valeurs changent à la **fréquence d’échantillonnage / audio rate** ; calculant une nouvelle valeur à chaque sample/échantillon.

La seconde résolution temporelle possible dans Csound est moins fine. Elle ne calcule pas une nouvelle valeur à chaque échantillon, mais seulement par **groupe d’échantillons**. Cette résolution temporelle est appelée **control rate / fréquence de contrôle**.

![audio rate vs control rate](../resources/images/01-GS-02-b.png)  


Les variable Csound qui comportent un **k** comme premier caractère, utilisent la fréquence de contrôle / control rate. Leurs valeurs sont mises à jour à la fréquence de contrôle. C’est la raison pour laquelle nous écrivons _**k**Freq_.

Après l’opcode, avant la parenthèse, nous plaçons `:k` pour signifier que cet opcode utilise la fréquence de contrôle comme résolution temporelle.

Je recommande toujours d’utiliser **k** ou **a** aux deux positions :
- À gauche de la variable, et aussi
- à droite, juste après le opcode.

```
aSine = poscil:a(0.2,400)
kFreq = linseg:k(500,0.5,400)
```

Vous en apprendre plus sur _k-rate_ dans le prochain tutoriel.

## Exemple

Appuyez sur le bouton "Play". Vous entendrez un son dont la hauteur descend.  
Pouvez-vous voir comment la ligne mobile est introduite dans l’oscillateur ?

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
  kFreq = linseg:k(500,0.5,400)
  aSine = poscil:a(0.2,kFreq)
  outall(aSine)
endin

</CsInstruments>
<CsScore>
i "Bonjour" 0 2
</CsScore>
</CsoundSynthesizer>
```

## Flux du signal

Si vous examinez le code de notre instrument, vous constaterez qu’il existe un schéma commun :

![Input output insertions](../resources/images/01-GS-02-c.png)  

- La première ligne produit un signal et le stocke dans la variable _kFreq_. Cette variable est ensuite utilisée comme entrée dans la seconde ligne.

- La seconde ligne produit un signal et le stocke dans la variable _aSine_. Cette variable est ensuite utilisée comme entrée dans la troisième ligne.

## La structure d’un document Csound (.csd)

Le document Csound complet consiste en trois parties :

1. Entre les balises \<CsOptions> et \</CsOptions>. Vous voyez ici l’instruction `-o dac`, qui signifie : La sortie/out (`-o`) sera transmise au convertisseur digital-to-analog (`dac`) ; en d’autres termes : à la carte son. Pour cette raison, nous entendons le résultat en temps réel. Sinon, Csound aurait écrit un fichier audio résultant de son rendu.

2. Entre les balises \<CsInstruments> et \</CsInstruments>. C’est le lieu où sont placés tous les instruments. Le code Csound réside à cet emplacement, qu’on appelle également "Orchestra".

3. Entre les balises \<CsScore> et \</CsScore>, partie qui a été discutée dans la section précédente.

Comme vous pouvez le voir, ces trois paires de balises sont englobées entre une autre paire de balises :

```
<CsoundSynthesizer>...</CsoundSynthesizer>
```
Cette dernière paire de balises définit les limites d’écriture pour le programme Csound. En d’autre termes : Ce que nous écrivons hors de ces limites est ignoré par Csound.

## Essayez-le vous-même

- Rendez la ligne de fréquences ascendante plutôt que descendante.

- Utilisez `linseg` pour créer une fréquence constante de 400 ou de 500 Hz.

- Rendez la durée de la rampe du glissando plus longue ou plus courte.

- Ajoutez un autre segment en ajoutant une valeur supplémentaire de durée, et une valeur supplémentaire pour la seconde valeur-cible.

- Restaurez les arguments originaux de linseg. Puis remplacez `linseg` par `line`, et écoutez la différence.

## Opcodes, balises et termes que vous avez appris dans ce tutoriel

### Opcodes

- `linseg:k(Value1,Duration1,Value2,Duration2,…)` génère des segments de lignes droites.

### Balises

- \<CsoundSynthesizer>...\</CsoundSynthesizer> déterminent le début et la fin du fichier Csound.

- \<CsOptions>...\</CsOptions> déterminent le début et la fin des [Options Csound]().

- \<CsInstruments>... \</CsInstruments> déterminent le début et la fin de l’espace réservé à la définition des instruments Csound.

- \<CsScore>...\</CsScore> déterminent le début et la fin de la partition Csound.

### Termes

- Un _control rate_, ou _k-rate_ est un signal qui n’est pas mis à jour à chaque échantillon, mais pour chaque groupe ou bloc d’échantillons.

## Avançons

Avec le tutoriel suivant : [03 Bonjour Amplitude](15-g-GS-fr-03.md)

## …ou lisez quelques explication supplémentaire ici

### linseg versus line

Csound a un opcode `line` que nous pouvons utiliser à la place de `linseg`.

Nous pouvons remplacer `linseg` dans notre code par `line` :

```
instr Bonjour
    kFreq = line:k(500,0.5,400)
    aSine = poscil:a(0.2,kFreq)
    outall(aSine)
endin
```

Si vous exécutez ce code, vous entendrez que `line` comporte une importante différence par rapport à `linseg` : il ne s’arrête pas à la valeur-cible, mais continue son mouvement :

![line vs linseg](../resources/images/01-GS-02-d.png)  

Les cas d’utilisation de `line` ne sont pas courants. Je recommande donc toujours d’utiliser `linseg`, sauf exception.

### Conventions de codage

Quand vous appuyez sur le bouton _Run/Exécuter_, Csound "lit" le code que vous avez écrit. Peut-être avez-vous déjà expérimenté avoir écrit quelque chose qui aboutit à une erreur, parce que quelque chose est "illégal".

Par exemple, ce code :

```
kFreq = linseg:k(500 0.5 400)
```

Qu’est-ce qui est illégal ici ? Nous avons séparé les trois argument pour `linseg` avec des espaces plutôt que des virgules. Csound attend des virgules, et s’il n’y en a pas, il retourne une erreur de syntaxe, et le code ne peut pas être compilé :

```
error: syntax error, unexpected NUMBER_TOKEN,
expecting ',' or ')' (token "0.5")
```

Ceci n’est pas une convention. C’est une syntaxe que nous **devons** respecter si nous voulons que notre code soit compilé et exécuté par Csound.

Par contre, dans la syntaxe, il existe de nombreuses façons d’écrire du code d’une manière ou d’une autre.

Voyons quelques exemples :

1. `kFreq = linseg:k(500,0.5,400)`

2. `kFreq=linseg:k(500,0.5,400)`

3. `kFreq = linseg:k(500, 0.5, 400)`

4. `kFreq = linseg:k(500,.5,400)`

5. `kFreq        =       linseg:k(500,   0.5,    400)`

Explications :

1. C’est la manière dont j’écris le code ici dans ces tutoriels. Je mets un espace à gauche et à droite du signe `=`, mais je ne mets pas d’espace après la virgule.

2. On peut le faire, mais je pense que vous serez d’accord pour dire que cette façon est moins facile à lire.
3. C’est autant utilisé que la manière (1.), voire plus. Je me souviens que lorsque j’ai lu pour la première fois le tutoriel Python de Guido van Rossum, dans lequel il recommande d’écrire comme dans (1.), je n’ai pas aimé du tout. Il m’a fallu vingt ans pour être d’accord.

4. C’est une abréviation commune qui est possible dans Csound et quelques autres langages de programmation : Plutôt qu’écrire `0.5`, on peut juste écrire `.5`. Je l’utilise pour mes programmes, mais je ne l’utiliserai pas dans ces tutoriels car c’est un peu moins clair.

5. Vous êtes autorisés à utiliser des tabulations plutôt que des espaces, ainsi que n’importe quelle combinaison des deux, et autant de tabulations ou d’espaces que vous voulez. Mais habituellement, nous ne souhaitons pas qu’une ligne soit plus longue que nécessaire.

Une autre convention consiste à écrire les mots-clé `instr` et `endin` au début de la ligne, puis le code indenté par deux espaces :

```
instr Bonjour
  kFreq = linseg:k(500,0.5,400)
  aSine = poscil:a(0.2,kFreq)
  outall(aSine)
endin
```

La raison de cette convention est à nouveau de formater le code en faveur d’un maximum de clarté. Dans _Csound Book_, nous utilisions un espace, mais je pense que deux espaces sont préférables.

Pour résumer : Vous avez de nombreuses différentes options pour écrire du code Csound. Vous pouvez adopter celle que vous voulez, mais il est sage de respecter quelques conventions qui permettent une compréhension optimale. Le but est la lisibilité et la transparence du code.

### Quand choisir a-rate ou k-rate ?

La principale raison de l’introduction de _k-rate_ est une économie de puissance pour le CPU. C’était essentiel dans les premières années de la musique sur ordinateur. Aujourd’hui c’est différent. Pour des instruments courants en musique électronique, on peut omettre les variable _k-rate_, et n’utiliser que les variables _a-rate_. Dans notre cas, nous pourrions écrire :

```
aFreq = linseg:a(500,0.5,400)
aSine = poscil:a(0.2,aFreq)
outall(aSine)
```


Un simple avis :

- Utilisez toujours _a-rate_ quand ça améliore le son.

- Utilisez _k-rate_ plutôt que _a-rate_ quand vous voulez économiser de la puissance de calcul au CPU.

- Certains opcodes n’acceptent que des entrées _k-rate_, mais pas les entrées _a-rate_. Dans ce cas, vous devez utiliser des variables _k-rate_.
