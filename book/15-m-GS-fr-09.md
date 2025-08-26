# 09 Bonjour If / si
## Ce que vous apprendrez dans ce tutoriel

- Comment travailler avec **if-then** dans Csound.
- Comment **imprimer des chaines/strings formatés**.

## Une instance appelle la suivante…

Dans le dernier tutoriel nous avons introduit l’opcode `schedule` qui appelle une instance d’instrument.  
Nous avons placé le code `schedule` hors du code de l’instrument. Dans ce cas, il travaille comme une ligne de partition.

Mais que se passe-t-il si je place aussi l’instruction `schedule` à l’intérieur d’un instrument ?

Essayez-le :
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

instr InfiniteCalls
  //play a simple tone
  aSine = poscil:a(.2,415)
  aOut = linen:a(aSine,0,p3,p3)
  outall(aOut)
  //call the next instance after 3 seconds
  schedule("InfiniteCalls",3,2)
endin
schedule("InfiniteCalls",0,2)

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```
Un chaine infinie d’appels est déclenchée.

Le premier appel doit être hors de l’instrument :
```
schedule("InfiniteCalls",0,2)
```
Cette ligne de code appelle une première instance de l’instrument "InfiniteCalls". Mais à l’intérieur de cet instrument, nous avons de nouveau un appelle à un instrument. Trois secondes après la création de l’instance d’instrument, l’instance suivant arrivera :
```
schedule("InfiniteCalls",3,2)
```

Notez que l’heure de départ de la nouvelle instance est très important ici. Si vous le réglez sur 2 secondes plutôt que sur 3 secondes, il créera l’instance suivante immédiatement après l’instance courante. Et si vous réglé l’heure de départ de l’instance suivante sur 1 seconde, les deux instances se chevaucheront.

## Planifier/Schedule en fonction de conditions

Cette auto-planification / self/scheduling est une fonctionnalité très intéressante dans Csound, mais habituellement, nous n’avons pas besoin qu’elle dure indéfiniment. Au contraire, nous voulons qu’elle dépende de certaines conditions.

Nous allons maintenant implémenter un instrument qui se déclenche lui-même six fois.  
Voici ce que nous devons faire :

- Nous devons passe le nombre 6 en tant que variable de compte à la première instance de l’instrument.
- La secondes instance est alors appelée avec le nombre 5 comme variable de compte, et ainsi de suite.
- Si l’instance avec la variable de compte `1` est atteinte, plus aucune instance n’est appelée.

Nous pouvons dessiner ce flux de programme :

![alt text](images/images_09/image.png)  
_Flux de programme pour un re-déclenchement conditionnel d’instances d’un instrument._

## L’opcode 'if' dans Csound

Nous pouvons implémenter cette chaine limitée d’auto-planification / self-scheduling avec l’aide de l’opcode `if`. Essayez cet exemple en l’exécutant et en changeant la variable _iCount_ de 6 à 1, et observez la sortie :
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

instr EssayeMoi
   iCount = 6
   if (iCount > 1) then
      prints("Vrai!\n")
   else
      prints("Faux\n")
   endif
endin
</CsInstruments>

<CsScore>
i "EssayeMoi" 0 0
</CsScore>
</CsoundSynthesizer>
```

Ici, les mots-clé sont `if`, `else` et `endif`. **endif** termine la clause _if_ de la même façon que **endin** termine un instrument.

Vous voyez de nouveau l’opcode `prints` ici, qui affiche une chaine/string dans la console. Nous en dirons plus au sujet du formatage du texte dans la partie optionnelle de ce tutoriel.

Si vous voulez en savoir plus sur les branchements conditionnels avec `if`, consultez [cette section](https://flossmanual.csound.com/csound-language/control-structures#if---then---elseif---then---else) au [chapitre 03](https://flossmanual.csound.com/csound-language/initialization-and-performance-pass) de ce livre.

## Exemple

Exécutez cet exemple et lisez en le code. Pouvez-vous déterminer de quelle manière la variable _iCount_ est modifiée ? Quels autres paramètres sont changés d’une instance à l’autre ?

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

instr Salut
   //Note midi de début
   iMidiStart = p4
   //Note midi de fin
   iMidiEnd = p5
   //Diminution glissée du volume en dB
   kDb = linseg:k(-10, p3/2, -20)
   //Glissando en n° de notes MIDI
   kMidi = linseg:k(iMidiStart, p3/3, iMidiEnd)
   //Crée un oscillateur a-rate dont le paramètre
   //amplitude est une conversion dB > amp, et MIDI > freq
   aSine = poscil:a(ampdb(kDb), mtof(kMidi))
   //Ajoute un fade-in et un fade-out au signal
   aOut = linen:a(aSine, 0.01, p3, 1)
   //Envoie le signal vers la sortie audio
   outall(aOut)

   iCount = p6
   print(iCount)
   if (iCount > 1) then
      schedule("Salut", p3, p3 + 1, iMidiStart - 1, iMidiEnd + 2, iCount - 1)
   endif
   //À chaque passe,
      //— la durée de la note est augmentée de 1: p3 + 1
      //— le n° de note MIDI de départ est diminué de 1 : iMidiStart - 1
      //— le n° de note MIDI de fin est augmenté de 2 : iMidiStart + 2
      //— le nombre du compteur est diminué de 1 : iCount - 1
   //Ce qui résulte
      //— en un son de plus en plus long à chaque passe
      //— en un glissando de plus en plus étiré vers le grave et vers l’aigüe.
endin
//Le 'schedule' qui déclenche la première instance de l’instrument 'Salut'
schedule("Salut", 0, 2, 72, 68, 6)
</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

## Essayez-le vous-même
Changez le code afin que d’instance en instance :
- La durée entre deux instances augmente,
- durée entre deux instances diminue d’un rapport 1/2,
- la durée augmente d’un rapport de 3/2
- la première hauteur MIDI augmente de deux demi-tons, tandis que
- la seconde hauteur MIDI diminue de une demi-ton.

## Plus sur 'if' : if-else et if-elsif-else

`if` est probablement le mot le plus important dans n’importe quel langage. L’utilisation de `if` permet la création de branches, et de branches de branches, dans un flux de programme. Comme nous utilisons beaucoup cette condition `if` (si) dans notre vie quotidienne, il peut facilement être transféré dans un langage de programmation, ici Csound.

Suivent quelques exemples simples basés sur des situations du quotidien.

### if - else
« Si le soleil brille, alors je vais sortir, sinon je resterai à la maison .»

Voici la version Csound. Changez la variable _iSoleil_ s’il-vous-plait.
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

instr If_Then
    iSoleil = 0 //1 = oui, 0 = non
    if(iSoleil == 1) then
        prints("Je sors !\n")
    else
        prints("Je reste à la maison !\n")
    endif
endin
</CsInstruments>
<CsScore>
i "If_Then" 0 0
</CsScore>
</CsoundSynthesizer>
```

Dans `if(iSoleil == 1)`, nous exigeons une égalité. C’est la raison pour laquelle nous utilisons `==` plutôt que `=`. Le double-signe `==` exige une égalité entre la gauche et la droite. Le simple signe `=` sert à relier la partie gauche (le nom de la variable) à la partie droite de la variable (sa valeur), comme ceci : `iSoleil = 1`. Csound accepte aussi `if(iSoleil = 1)`, mais je pense qu’il vaut mieux distinguer les deux fonctionnalités.

Les parenthèse dans (iSoleil == 1) peuvent être omises, mais je préfère les garder pour des questions de lisibilité, et la plupart des autres langages de programmation les utilisent.

Csound ne comporte pas de symbol ou de mot-clé pour le booléen "True" et "False". Habituellement, nous utilisons `1` pour True/Yes, et `0` pour False/No.

## if - elseif - else

Quand nous ajoutons une ou plusieurs instructions `elseif`, nous débouchons sur un choix entre plusieurs décisions possibles :

« Si (if) la hauteur est plus haute que la note MIDI 80, alors l’instrument `Aigu` démarre. Sinon, si (Elseif) la hauteur est plus haute que la note midi 60, alors l’instrument `Medium` démarre. Sinon (else) l’instrument `Grave` démarre. »

Voici la version Csound :

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

instr If_Elseif_then
//L’instrument qui sera joué est dépendant de la hauteur
//de la note MIDI donnée (iHauteur)
   iHauteur = 90 // Pour l’expérience, changez à 70 et 50
   if(iHauteur > 80) then
      schedule("Aigu", 0, 0)
   elseif(iHauteur > 60) then
      schedule("Medium", 0, 0)
   else
      schedule("Grave", 0, 0)
   endif
endin

instr Aigu
   prints("Instrument 'Aigu'\n")
endin

instr Medium
   prints("Instrument 'Medium'\n")
endin

instr Grave
   prints("Instrument 'Grave'\n")
endin
</CsInstruments>
<CsScore>
i  "If_Elseif_then" 0 1
</CsScore>
</CsoundSynthesizer>
```

Notez que dans la seconde condition `elseif(iHauteur > 60)`, nous incluons toutes les hauteurs plus hautes que 60 et plus graves ou égales à 80, car nous ne parvenons à cette branche que si la première condition `if(iHauteur > 80)` n’est pas remplie (not true).

## 'if(s) imbriqués, AND et OR
### Les if(s) imbriqués
Nous pouvons avoir plusieurs niveaux de ramifications :
"Si (if) le soleil brille, alors (then)
- Si (if) j’ai besoin de fruits, alors (then) j’irai au marché,
- Sinon (else) j’irai au bois ;
Sinon (else) (= si le soleil est caché) :
- Si (if) j’ai faim, alors (then) je me préparerai une petit plat,
- Sinon (else) (= Si je n’ai pas faim) :
   - Si (if) je ne suis pas fatigué, j’apprendrai un peu de Csound,
   - Sinon (else) je ferai une sieste."

La version Csound :
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

instr Nested_If
   //Situation en ouverture : 1 = oui
   iSoleil = 1
   iVeuxFruits = 1
   iJaiFaim = 1
   iFatigue = 1
   //Structure IFs imbriqués
   if(iSoleil == 1) then //Le soleil brille
      if(iVeuxFruits == 1) then //Je veux des fruits
         prints("Je vais aller au marché\n")
      else  //Je me passerai de fruits
         prints("Je vais aller au bois\n")
      endif //Fin de la clause 'Fruits'
   else  //Le soleil est caché
      if(iJaiFaim == 1) then  //J’ai faim
         prints("Je vais me faire un petit plat\n")
      else  //Je n’ai pas faim
         if(iFatigue == 0) then    //Je ne suis pas fatigué
            prints("Je vais apprendre un peu de Csound\n")
         else  //Je suis fatigué
            prints("Je vais faire une sieste\n")
         endif
      endif
   endif
endin
   </CsInstruments>
   <CsScore>
   i  "Nested_If" 0 0
   </CsScore>
   </CsoundSynthesizer>
```

### AND et OR logiques (ET et OU)

Plutôt que deux _if_ imbriqués qui devraient être vrais, nous pouvons également demander si les deux sont vrais :  
« Si le soleil brille **et** que j’ai fini mon travail, je sortirai. »

Dans Csound, comme dans la plupart des langages de programmation, le symbole AND pour ce faire est `&&`.  
…et le symbol pour le OR logique est `||`.

Voici un exemple qui utilise ces deux symboles. Essayez de changer les valeurs et regardez la sortie :
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

instr AndOr
   iSoleilBrille = 1
   iBoulotFini = 1
   prints("iSoleilBrille = %d\n", iSoleilBrille)
   prints("iBoulotFini = %d\n", iBoulotFini)
   //AND
   if(iSoleilBrille == 1) && (iBoulotFini == 1) then
      prints("AND = True\n")
   else
      prints("AND = False\n")
   endif
   //OR
   if(iSoleilBrille == 1) || (iBoulotFini == 1) then
      prints("OR = True\n")
   else
      prints("OR = False\n")
   endif
endin
</CsInstruments>
<CsScore>
i  "AndOr"  0  0
</CsScore>
</CsoundSynthesizer>
```

## Les opcodes que vous avez appris dans ce tutoriel

- Les branchements conditionnels `if … then … [elseif] … [else] … [endif]

## Avançons

avec le tutoriel suivant : [10 Hello Random/aléatoire](10_HelloRandom.md).

## Ou lisez quelques explications supplémentaires ici

### Une forme courte

Dans Csound, il existe une forme courte pour `if` qui est très pratique quand on définit une variable à une certaine valeur en fonction d’une condition.

Plutôt que :
```
if(iCondition == 1) then
    iVariable = 10
else
    iVariable = 20
endif
```
… nous pouvons écrire :
```
iVariable = (iCondition == 1) ? 10 : 20
```
Vous pouvez trouver un autre exemple [ici](https://flossmanual.csound.com/csound-language/control-structures#short-form-a-v-b-x-y) dans ce livre.

### Les boucles avec 'if'

Il est même possible de construire des boucles avec l’opcode `if`. Je l’indique à titre d’information, pas pour écrire du code dans ce style. Mais ça montre que même pour la construction des boucles dans les langages de programmation, 'if' est dans les coulisses.

Tout ce dont nous avons besoin, en plus de l’opcode `if`, c’est :
- Une 'étiquette/label' qui marque une certaine position dans le texte du programme. Dans Csound, ces étiquettes/labels finissent par un deux-points. Ici, utilisons `start:` comme étiquette/label.
- Un mécanisme 'sauter vers / jump to'. Dans Csound, c’est `goto`.

Cette "ancienne façon" de boucler compte – dans le code suivant – de 10 à 1, puis quitte la boucle :
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

instr LoopIf
   iCount = p4
   start:
   if(iCount > 0) then
      print(iCount)
      iCount = iCount - 1
      igoto start
   else
      prints("Finished !\n")
   endif
endin
</CsInstruments>
<CsScore>
i "LoopIf"  0  0  10
</CsScore>
</CsoundSynthesizer>
```
Nous aurions pu écrire la ligne `iCount = iCount - 1` comme ceci : `iCount -=`

### Formatage des strings/chaines de caractères

L’opcode `prints` imprime une chaine/string dans la console.  
La chaine peut être une chaine de format / format string. Ça signifie qu’elle comporte des parties vides ou endroits réservés qui peuvent être remplis par des variables.

 Ces endroits réservés commencent toujours par `%` suivi d’un caractère qui représente un type de données. Les plus communes sont :
 - `%d` pour un entier
 - `%f` pour un nombre en virgule flottante
 - `%s` pour une string / chaine

 Notez qu’une nouvelle ligne doit est assignée par `\n`. Sinon, un fois imprimé, le message suivant serait collé immédiatement après, sur la même ligne.

 Voici un exemple simple :
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

instr FormatString
  prints("This is %d - an integer.\n",4)
  prints("This is %f - a float.\n",sqrt(2))
  prints("This is a %s.\n","string")
  prints("This is a %s","concate")
  prints("nated ")
  prints("string.\n")
endin

</CsInstruments>
<CsScore>
i "FormatString" 0 0
</CsScore>
</CsoundSynthesizer>
```

Vous pouvez en apprendre davantage sur l’impression [ici](https://flossmanual.csound.com/how-to/print) dans ce livre. Les spécificateurs de formats sont basiquement les mêmes que ceux présent dans le langage de programmation C, dont vous trouverez une référence [ici](https://cplusplus.com/reference/cstdio/printf/).