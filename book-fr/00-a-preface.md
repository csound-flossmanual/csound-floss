# PRÉFACE

![alt text](../resources/images/00-preface-image.png)

## BIENVENUE DANS CSOUND !

TODO: Traduire la préface en français.

... est l'un des programmes les plus connus et les plus établis dans le domaine de la programmation audio. Il a été publié pour la première fois en 1986 au Massachusetts Institute of Technology (MIT) par Barry Vercoe. Mais l'histoire de Csound s'enracine encore plus profondément dans les racines de la musique informatique car il est un descendant direct du plus ancien programme informatique pour la synthèse sonore,
_MusicN_, de Max Mathews. Csound est libre et open source, distribué sous la licence LGPL, et il est maintenu et étendu par un noyau de développeurs avec le soutien d'une communauté mondiale plus large.

Au cours de la dernière décennie, grâce au travail de Victor Lazzarini, Steven Yi, John ffitch, Hlöðver Sigurðsson, Rory Walsh, et bien d'autres, Csound est passé d'un langage de programmation audio quelque peu archaïque à une bibliothèque audio moderne. Il peut non seulement être utilisé depuis la ligne de commande et les interfaces classiques. Il peut également être utilisé comme plugin VST. Il peut être utilisé dans le moteur de jeu Unity. Il peut être utilisé sur Android ou sur n'importe quel micro-ordinateur comme Raspberry Pi ou Bela Board. Il peut être utilisé via son Interface de Programmation d'Application (API) dans n'importe quel autre langage de programmation, comme Python, C++ ou Java. Et maintenant, il peut aussi être utilisé dans un navigateur comme bibliothèque JavaScript, juste en le chargeant en tant que module WebAssembly (WaSM Csound). Essayez-le ici, si vous connaissez déjà un peu Csound :
```javascript
<CsoundSynthesizer>
<CsOptions>
-o dac
</CsOptions>
<CsInstruments>
sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr TryMe
  //some code here ...
endin
schedule("TryMe",0,-1)

</CsInstruments>
<CsScore>
</CsScore>
</CsoundSynthesizer>
```

Ce livre ne peut couvrir tous les cas d’utilisations. Ses objectifs principaux sont :

- Fournir un [Guide de Démarrage](https://flossmanual.csound.com/fr/premiers-pas/gs-01)
- Compiler de nombreuses [recettes](https://flossmanual.csound.com/how-to).
- Offrir une introduction au langage Csound lisible et compréhensible au [Chapitre 03](https://flossmanual.csound.com/csound-language).
- Discuter quelques méthodes de synthèse sonore classiques et plus récentes au [Chapitre 04](https://flossmanual.csound.com/sound-synthesis), ainsi que de modification des sons au [Chapitre 05](https://flossmanual.csound.com/sound-modification).
- Offrir un [Guide des Opcodes]() pour aider l’utilisateur à s’orienter dans la quantité toujours croissante d’opcodes Csound.
- Recueillir différentes descriptions et instructions approfondies sur divers sujets, pas forcément complètes et parfois non à jour, dans les _chapitres 06 à 14_.

_Pour le moment, seul le Guide de Démarrage est traduit en français._

Ce livre s’appelle _Manuel FLOSS de Csound_ car il a été publié pour la première fois en 2011 sur [Flossmanuals.net](https://flossmanuals.net/). Il ne doit pas être confondu avec le [Manuel de Référence Csound](https://csound.com/docs/manual-fr/index.html).

Amusez-vous à lire et à coder, et s’il vous plait, aidez-nous à améliorer ce livre par vos retours et suggestions  sur les [pages de discussions](https://github.com/csound-flossmanual/csound-floss/discussions) sur Github ou ailleurs.

## À propos de ce manuel

Ce manuel FLOSS (Free/Libre and Open Source Software) de Csound est un projet communautaire
visant à fournir une documentation complète et accessible pour Csound en français.

## Comment utiliser ce manuel

Pour le moment, seul le Guide de Démarrage a été traduit. D’autres traductions devraient suivre peu à peu. En attendant, tous les liens pointant vers des chapitres non encore traduits de ce manuel pointent vers la version originale en anglais.

D’autre part, les liens vers le Manuel de Référence de Csound pointent vers sa version française. Cette version française du Manuel de Référence n’étant pas toujours clairement référencée sur le site de Csound, voici comment la trouver manuellement:

- L’adresse du manuel dans sa version originale en anglais est :  
https://csound.com/docs/manual/index.html

- Pour trouver la version traduite en français, insérez `-fr` après _manual_. Ce qui donne :
https://csound.com/docs/manual-fr/index.html

## Remerciements

À Joachim Heintz, qui m’a rapidement fait confiance malgré mon peu d’expérience en la matière pour cette traduction en français.
