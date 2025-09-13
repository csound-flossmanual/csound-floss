import React from "react";
import ChapterHOC from "../ChapterHOC";

const Chapter = () => (
  <div>
    <h1>01 Bonjour Csound</h1>
    <h3>Ce que vous apprendrez dans ce tutoriel</h3>
    <ul>
      <li>Comment créer et émettre un son sinusoïdal</li>
      <li>Que sont les <strong>opcodes</strong> dans Csound</li>
      <li>Quelle est la signification de l'<strong>audio rate / fréquence d'échantillonnage</strong> dans Csound</li>
      <li>Qu'est-ce qu'une <strong>variable audio</strong></li>
      <li>Comment dessiner un <strong>flux de signal / signal flow</strong></li>
      <li>Qu'est-ce qu'une <strong>partition/score</strong> Csound</li>
    </ul>
    
    <h2>Qu'est-ce qu'un oscillateur sinusoïdal / sine oscillator</h2>
    <p>
      Une onde sinusoïdale peut être considérée comme l'élément sonore le plus élémentaire au monde. 
      Quand nous dessinons une onde sinusoïdale comme un graphique montrant son amplitude au cours du temps, elle ressemble à ça :
    </p>
    
    <p>
      Pour produire une onde sinusoïdale, Csound utilise un oscillateur. Un oscillateur nécessite certaines entrées pour fonctionner :
    </p>
    
    <ol>
      <li>Une amplitude maximum de sortie. Ce qui résultera en un son plus ou moins fort.</li>
      <li>Une fréquence. Ce qui déterminera la hauteur du son.</li>
      <li>Une forme d'onde ou table de fonction. Dans notre cas, une onde sinusoïdale.</li>
    </ol>
    
    <p>
      Ceci est un exemple de base de la traduction française du manuel Csound FLOSS.
    </p>
  </div>
);

export default ChapterHOC(Chapter, "Bonjour Csound");
