import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CodeElement from "../components/Editor";
import MathJax from "react-mathjax";
import { useTitle } from "../use-title";
import ChapterHOC from "../ChapterHOC";

const Chapter = () => {
  useTitle("Gs 01");
return (
 <MathJax.Provider>
   <ChapterHOC>
{' '}<h1 id="bonjour-csound">01 Bonjour Csound</h1>{' '}
{/* Test change */}
{' '}<h2 id="ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez
dans ce tutoriel</h2>{' '}
{' '}<ul>{' '}
{' '}<li>Comment cr&#xe9;er et &#xe9;mettre un son sinuso&#xef;dal</li>{' '}
{' '}<li>Que sont les <strong>opcodes</strong> dans Csound</li>{' '}
{' '}<li>Quelle est la signification de l&#x2019;<strong>audio rate / fr&#xe9;quence
d&#x2019;&#xe9;chantillonnage</strong> dans Csound</li>{' '}
{' '}<li>Qu&#x2019;est-ce qu&#x2019;une <strong>variable audio</strong></li>{' '}
{' '}<li>Comment dessiner un <strong>flux de signal / signal
flow</strong></li>{' '}
{' '}<li>Qu&#x2019;est-ce qu&#x2019;une <strong>partition/score</strong> Csound</li>{' '}
{' '}</ul>{' '}
{' '}<h2 id="quest-ce-quun-oscillateur-sinuso&#xef;dal-sine-oscillator">Qu&#x2019;est-ce
qu&#x2019;un oscillateur sinuso&#xef;dal / sine oscillator</h2>{' '}
{' '}<p>Une onde sinuso&#xef;dale peut &#xea;tre consid&#xe9;r&#xe9;e comme l&#x2019;&#xe9;l&#xe9;ment sonore le
plus &#xe9;l&#xe9;mentaire au monde. Quand nous dessinons une onde sinuso&#xef;dale
comme un graphique montrant son amplitude au cours du temps, elle
ressemble &#xe0; &#xe7;a&#x202f;:</p>{' '}
{' '}<figure>{' '}
{' '}<img src="../../resources/images/01-GS-01-sine.png" alt="Onde sinuso&#xef;dale serpent"/>{' '}
{' '}<figcaption aria-hidden="true">Onde sinuso&#xef;dale serpent</figcaption>{' '}
{' '}</figure>{' '}
{' '}<p>Pour produire une onde sinuso&#xef;dale, Csound utilise un oscillateur. Un
oscillateur n&#xe9;cessite certaines entr&#xe9;es pour fonctionner&#x202f;:</p>{' '}
{' '}<ol type="1">{' '}
{' '}<li>Une amplitude maximum de sortie. Ce qui r&#xe9;sultera en un son plus ou
moins fort.</li>{' '}
{' '}<li>Le nombre de p&#xe9;riodes (cycles) par seconde &#xe0; g&#xe9;n&#xe9;rer. Ce qui
r&#xe9;sultera en un son plus ou moins aig&#xfc;e ou grave. L&#x2019;unit&#xe9; est le
{' '}<em>Hertz(Hz)</em>. 1000&#x202f;Hz signifie qu&#x2019;une sinuso&#xef;de comporte 1000
p&#xe9;riodes par seconde.</li>{' '}
{' '}</ol>{' '}
{' '}<h2 id="un-oscillateur-sinuso&#xef;dal-dans-csound-opcode-et-arguments">Un
oscillateur sinuso&#xef;dal dans Csound&#x202f;: Opcode et Arguments</h2>{' '}
{' '}<p>Csound dispose de nombreux oscillateurs diff&#xe9;rents. (vous pouvez
trouver <a href="https://flossmanual.csound.com/how-to/opcodes">ici</a>{' '}
quelques descriptions et comparaisons.) Dans cet exemple, nous utilisons
l&#x2019;opcode <code>poscil</code>, qui signifie <em>precise
oscillator</em>.</p>{' '}
{' '}<p>Un <strong>opcode</strong> est une unit&#xe9; de traitement dans Csound,
comparable &#xe0; un <em>object</em> dans PureData ou Max, ou un
{' '}<em>UGen</em> dans SuperCollider. Si vous &#xea;tes familier des langages de
programmation, vous pouvez consid&#xe9;rer un opcode comme une <em>building
fonction / fonction int&#xe9;gr&#xe9;e</em>.</p>{' '}
{' '}<p>Les entr&#xe9;es d&#x2019;un opcode sont appel&#xe9;es <strong>arguments</strong> et
sont &#xe9;crites entre parenth&#xe8;ses imm&#xe9;diatement apr&#xe8;s le nom de l&#x2019;opcode.
Donc <code>poscil(0.2,400)</code> signifie&#x202f;: L&#x2019;opcode
{' '}<code>poscil</code> prend deux arguments en entr&#xe9;e&#x202f;:</p>{' '}
{' '}<ul>{' '}
{' '}<li>Le premier argument est le nombre <code>0.2</code>.</li>{' '}
{' '}<li>Le second argument est le nombre <code>400</code>.</li>{' '}
{' '}</ul>{' '}
{' '}<p>La signification des arguments en entr&#xe9;e d&#xe9;pend de la fa&#xe7;on dont
l&#x2019;opcode a &#xe9;t&#xe9; impl&#xe9;ment&#xe9;. Pour <code>poscil</code>, la premi&#xe8;re entr&#xe9;e
est l&#x2019;amplitude et la seconde entr&#xe9;e est la fr&#xe9;quence. Le <a href="https://csound.com/docs/manual-fr/index.html">Manuel de R&#xe9;f&#xe9;rence
Csound</a> contient toutes les informations &#xe0; son sujet. Nous
apporterons quelques &#xe9;claircissements dans notre <Link to="/basics/GS-fr-08">Tutoriel 08</Link> pour aider &#xe0; son
utilisation.</p>{' '}
{' '}<p>Cette mani&#xe8;re d&#x2019;&#xe9;crire du code est commune &#xe0; de nombreux langages de
programmation, comme <code>range(13)</code> en Python, ou
{' '}<code>printf(&quot;no no&quot;)</code> en C, ou <code>Date.now()</code> en
JavaScript (dans ce cas les parenth&#xe8;ses sont vides, ce qui signifie&#x202f;:
pas d&#x2019;argument en entr&#xe9;e). Note&#x202f;: Il existe une autre mani&#xe8;re d&#x2019;&#xe9;crire
du code Csound. Si vous voulez en apprendre plus sur ce sujet, voyez la
section &#x201c;Deux fa&#xe7;ons d&#x2019;&#xe9;crire du code dans Csound&#x201d; &#xe0; la fin de ce
tutoriel.</p>{' '}
{' '}<h2 id="le-flux-dun-signal-et-son-code">Le flux d&#x2019;un signal et son
code</h2>{' '}
{' '}<p>Nous cr&#xe9;ons maintenant une onde sinuso&#xef;dale d&#x2019;une amplitude de 0.2 et
de 400 cycles par seconde (Hz). Nous nommerons ce signal <em>aSine</em>{' '}
car il s&#x2019;agit d&#x2019;un signal <strong>a</strong>udio. Le caract&#xe8;re
{' '}<strong>a</strong> au d&#xe9;but du nom de la variable signifie exactement
&#xe7;a.</p>{' '}
{' '}<p>Un signal audio est un signal qui produit une nouvelle valeur &#xe0;
chaque sample/&#xe9;chantillon. (Apprenez-en davantage <a href="https://flossmanual.csound.com/basics/digital-audio">ici</a> sur
les samples et les <em>sample rates / taux d&#x2019;&#xe9;chantillonnage</em>).</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`aSine = poscil:a(0.2,400)`}></CodeElement></div>{' '}
{' '}<p>Cela signifie&#x202f;: Le signal <em>aSine</em> est cr&#xe9;&#xe9; par l&#x2019;opcode
{' '}<code>poscil</code> au taux audio / audio rate (<code>:a</code>), et les
entr&#xe9;es pour <code>poscil</code> sont 0.2 pour l&#x2019;amplitude, et 400 pour
la fr&#xe9;quence.</p>{' '}
{' '}<p>Pour sortir le signal (pour que nous puissions l&#x2019;entendre), nous
introduisons l&#x2019;opcode <code>outall</code>. Cet opcode envoie un signal
audio &#xe0; tous les canaux de sortie disponibles.</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`outall(aSine)`}></CodeElement></div>{' '}
{' '}<p>Notez que le signal <em>aSine</em> est d&#x2019;abord la sortie de
l&#x2019;oscillateur, puis devient l&#x2019;entr&#xe9;e de l&#x2019;opcode <code>outall</code>.
C&#x2019;est une chaine typique qui est bien connue depuis les synth&#xe9;tiseurs
modulaires&#x202f;: un cable connecte la sortie d&#x2019;un module &#xe0; l&#x2019;entr&#xe9;e d&#x2019;un
autre.</p>{' '}
{' '}<p>Nous pouvons dessiner le flux de ce programme comme ceci&#x202f;:</p>{' '}
{' '}<figure>{' '}
{' '}<img src="../../resources/images/01-GS-01-a.png" style={{width: '80.0%'}} alt="Flux de signal et code Csound pour un oscillateur sinuso&#xef;dal et une sortie."/>{' '}
{' '}<figcaption aria-hidden="true">Flux de signal et code Csound pour un
oscillateur sinuso&#xef;dal et une sortie.</figcaption>{' '}
{' '}</figure>{' '}
{' '}<p>Au milieu, vous voyez le flux du signal, avec des symbols pour
l&#x2019;oscillateur et la sortie. Vous pouvez les imaginer comme les modules
d&#x2019;un synth&#xe9;tiseur, connect&#xe9;s par un cable nomm&#xe9; <em>aSine</em>.</p>{' '}
{' '}<p>Sur le c&#xf4;t&#xe9; gauche, vous voyez la chaine entre les entr&#xe9;es, l&#x2019;opcode
et la sortie. notez que la sortie de la premi&#xe8;re chaine, contenue dans
la variable <em>aSine</em>, devient l&#x2019;entr&#xe9;e de la seconde chaine.</p>{' '}
{' '}<p>&#xc0; droite, vous voyez le code Csound correspondant. Chaque ligne de
code repr&#xe9;sente une chaine <em>entr&#xe9;e -&gt; opcode -&gt; sortie</em>,
dans la forme <em>sortie = opcode(entr&#xe9;e)</em>. La ligne
{' '}<code>outall(aSine)</code> n&#x2019;a pas de sortie vers Csound, car elle
envoie l&#x2019;audio au mat&#xe9;riel (comme l&#x2019;objet <code>dac~</code> dans PD ou
Max).</p>{' '}
{' '}<h2 id="votre-premier-instrument-csound">Votre premier instrument
Csound</h2>{' '}
{' '}<p>Dans Csound, tous les oscillateurs, filtres, lecteurs d&#x2019;&#xe9;chantillons
/ sample players, et autres unit&#xe9;s de traitement sont encapsul&#xe9;s dans un
{' '}<strong>instrument</strong>. Un instrument comporte les mots-cl&#xe9;&#x202f;:</p>{' '}
{' '}<ul>{' '}
{' '}<li><code>instr</code> &#xe0; son d&#xe9;but</li>{' '}
{' '}<li>et <code>endin</code> &#xe0; sa fin.</li>{' '}
{' '}</ul>{' '}
{' '}<p>Apr&#xe8;s le mot-cl&#xe9; <code>instr</code>, s&#xe9;par&#xe9; par un espace, nous
assignons un nombre (1, 2, 3, &#x2026;) ou un nom &#xe0; l&#x2019;instrument. Nommons notre
instrument &#x201c;Hello&#x201d;, et tapons le code que nous venons de discuter&#x202f;:</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`instr Hello
    aSine = poscil:a(0.2,400)
    outAll(aSine)
endin`}></CodeElement></div>{' '}
{' '}<h3 id="exemple">Exemple</h3>{' '}
{' '}<p>Nous somme maintenant pr&#xea;t &#xe0; ex&#xe9;cuter notre code. Tout ce qui nous
reste &#xe0; faire est d&#x2019;inclure le code de notre instrument dans un fichier
Csound complet.</p>{' '}
{' '}<p>Regardez le code de l&#x2019;exemple. Pouvez-vous rep&#xe9;rer le code de
l&#x2019;instrument&#x202f;?</p>{' '}
{' '}<p>Appuyez sur le bouton &#x201c;Play&#x201d;. Vous devriez entendre deux secondes
d&#x2019;un son sinuso&#xef;dal &#xe0; 400&#x202f;Hz.</p>{' '}
{' '}<p>Pouvez-vous comprendre la raison pour laquelle il joue pendant deux
secondes&#x202f;?</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`&lt;CsoundSynthesizer&gt;
&lt;CsOptions&gt;
-o dac
&lt;/CsOptions&gt;
&lt;CsInstruments&gt;

sr = 44100
ksmps = 64
nchnls = 2
0dbfs = 1

instr Bonjour
  aSine = poscil:a(0.2,400)
  outall(aSine)
endin

&lt;/CsInstruments&gt;
&lt;CsScore&gt;
i &quot;Bonjour&quot; 0 2
&lt;/CsScore&gt;
&lt;/CsoundSynthesizer&gt;`}></CodeElement></div>{' '}
{' '}<h4 id="la-partition-score-csound">La partition / score Csound</h4>{' '}
{' '}<p>En bas de notre exemple de code, vous voyez ceci&#x202f;:</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`&lt;CsScore&gt;
i &quot;Bonjour&quot; 0 2
&lt;/CsScore&gt;`}></CodeElement></div>{' '}
{' '}<p>C&#x2019;est la section <strong>Partition / Score</strong> du fichier .csd.
Elle commence par la balise &lt;CsScore&gt; et se termine par la balise
&lt;/CsScore&gt;. Entre ces deux balises, il y a cette ligne de
partition&#x202f;:</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`i &quot;Bonjour&quot; 0 2`}></CodeElement></div>{' '}
{' '}<p>Chaque colonne (champ de param&#xe8;tre / parameter field) sp&#xe9;cifie une
certaine information&#x202f;:</p>{' '}
{' '}<ul>{' '}
{' '}<li><p><code>&quot;Bonjour&quot;</code>&#x202f;: L&#x2019;instrument auquel cette ligne de
partition se r&#xe9;f&#xe8;re.</p></li>{' '}
{' '}<li><p><code>0</code>&#x202f;: L&#x2019;heure de d&#xe9;part de cet instrument&#x202f;:
{' '}<code>0</code> (= d&#xe9;part imm&#xe9;diat).</p></li>{' '}
{' '}<li><p><code>2</code>&#x202f;: La dur&#xe9;e du son venant de l&#x2019;instrument&#x202f;:
{' '}<code>2</code> (secondes).</p></li>{' '}
{' '}</ul>{' '}
{' '}<h4 id="essayez-vous-m&#xea;me">Essayez vous-m&#xea;me</h4>{' '}
{' '}<p>(Vous pouvez &#xe9;diter l&#x2019;exemple juste en tapant &#xe0; l&#x2019;int&#xe9;rieur)</p>{' '}
{' '}<ul>{' '}
{' '}<li><p>Changez la dur&#xe9;e de l&#x2019;instrument</p></li>{' '}
{' '}<li><p>Changez l&#x2019;heure de d&#xe9;part de l&#x2019;instrument</p></li>{' '}
{' '}<li><p>Changez la fr&#xe9;quence de l&#x2019;oscillateur</p></li>{' '}
{' '}<li><p>Changez l&#x2019;amplitude de l&#x2019;oscillateur</p></li>{' '}
{' '}</ul>{' '}
{' '}<h2 id="opcodes-mots-cl&#xe9;s-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Opcodes,
Mots-Cl&#xe9;s et termes que vous avez appris dans ce tutoriel</h2>{' '}
{' '}<h3 id="opcodes">Opcodes</h3>{' '}
{' '}<ul>{' '}
{' '}<li><code>poscil:a(Amplitude,Frequence)</code>&#x202f;: oscillateur au taux
audio, avec entr&#xe9;es d&#x2019;amplitude et de fr&#xe9;quence.</li>{' '}
{' '}<li><code>outall(aSignal)</code>&#x202f;: envoie <em>aSignal</em> vers les
canaux de sortie physiques.</li>{' '}
{' '}</ul>{' '}
{' '}<h3 id="mots-cl&#xe9;s">Mots-cl&#xe9;s</h3>{' '}
{' '}<ul>{' '}
{' '}<li><code>instr ... endin</code> sont les mots-cl&#xe9;s qui commencent et
finissent une d&#xe9;finition d&#x2019;instrument.</li>{' '}
{' '}</ul>{' '}
{' '}<h3 id="termes">Termes</h3>{' '}
{' '}<ul>{' '}
{' '}<li>Un signal &#xe0; la <em>fr&#xe9;quence audio / audio rate</em> ou
{' '}<em>a-rate</em> est mis &#xe0; jour &#xe0; chaque sample/&#xe9;chantillon.</li>{' '}
{' '}</ul>{' '}
{' '}<h2 id="avan&#xe7;ons">Avan&#xe7;ons&#x2026;</h2>{' '}
{' '}<p>Avec le tutoriel suivant&#x202f;: <Link to="/basics/GS-fr-02">02_Bonjour
Fr&#xe9;quences</Link></p>{' '}
{' '}<h2 id="ou-lisez-quelques-informations-suppl&#xe9;mentaires-ici">Ou lisez
quelques informations suppl&#xe9;mentaires ici</h2>{' '}
{' '}<h3 id="pourquoi-londe-sinuso&#xef;dale-est-elle-le-son-le-plus-&#xe9;l&#xe9;mentaire-au-monde">Pourquoi
l&#x2019;onde sinuso&#xef;dale est-elle &#xab; le son le plus &#xe9;l&#xe9;mentaire au monde &#xbb;
?</h3>{' '}
{' '}<p>Pour &#xea;tre honn&#xea;te, j&#x2019;aime les sons sinuso&#xef;daux. Je sais que beaucoup
de gens les trouvent ennuyeux. J&#x2019;aime leur simplicit&#xe9;, alors contre tous
les bons conseils, je vais consacrer les dix premiers tutoriels
uniquement aux sons sinuso&#xef;daux. D&#xe9;sol&#xe9; de vous en faire subir les
cons&#xe9;quences&#x2026;</p>{' '}
{' '}<p>Mais revenons &#xe0; la question : qu&#x2019;y a-t-il d&#x2019;&#xe9;l&#xe9;mentaire dans les
ondes sinuso&#xef;dales ?</p>{' '}
{' '}<p>D&#x2019;un point de vue math&#xe9;matique, il est assez fascinant de pouvoir
comprendre et construire une sinuso&#xef;de comme le mouvement constant d&#x2019;un
point sur un cercle. C&#x2019;est ce qu&#x2019;on appelle un <a href="https://en.wikipedia.org/wiki/Simple_harmonic_motion">mouvement
harmonique simple</a>, qui est &#xe0; la base de nombreux ph&#xe9;nom&#xe8;nes du monde
physique, y compris le son.</p>{' '}
{' '}<p>En acoustique musicale, les sinuso&#xef;des ont une autre signification
&#xe9;l&#xe9;mentaire.</p>{' '}
{' '}<p>Une sinuso&#xef;de est le seul son qui repr&#xe9;sente une seule hauteur. Tous
les autres sons ont deux hauteurs ou plus.</p>{' '}
{' '}<p>Cela signifie que tous les autres sons peuvent &#xea;tre compris comme la
somme de sons sinuso&#xef;daux simples. Ces sinuso&#xef;des qui se trouvent &#xe0;
l&#x2019;int&#xe9;rieur d&#x2019;un son p&#xe9;riodique, comme un son chant&#xe9; ou d&#x2019;autres sons
naturels, sont appel&#xe9;s partiels ou harmoniques.</p>{' '}
{' '}<p>Bien que la r&#xe9;alit&#xe9; sonore soit un peu plus complexe, cela montre que
les ondes sinuso&#xef;dales peuvent en quelque sorte &#xea;tre comprises comme les
sons les plus &#xe9;l&#xe9;mentaires, du moins dans le monde des hauteurs.</p>{' '}
{' '}<p>Vous trouverez plus d&#x2019;informations &#xe0; ce sujet dans le chapitre <a href="https://flossmanual.csound.com/sound-synthesis/additive-synthesis">Synth&#xe8;se
additive</a> et dans le chapitre <a href="https://flossmanual.csound.com/sound-modification/fourier-analysis-spectral-processing">R&#xe9;synth&#xe8;se
spectrale</a> de ce livre.</p>{' '}
{' '}<h3 id="deux-fa&#xe7;ons-d&#xe9;crire-du-code-dans-csound-la-fa&#xe7;on-traditionnelle-et-la-fa&#xe7;on-fonctionnelle">Deux
fa&#xe7;ons d&#x2019;&#xe9;crire du code dans Csound&#x202f;: la fa&#xe7;on Traditionnelle, et la
fa&#xe7;on fonctionnelle</h3>{' '}
{' '}<p>Vous &#xea;tes peut-&#xea;tre surpris de voir le code Csound &#xe9;crit de la fa&#xe7;on
d&#xe9;crite ci-dessus. En fait, la fa&#xe7;on classique d&#x2019;&#xe9;crire du code Csound
ressemble &#xe0; ceci&#x202f;:</p>{' '}
{' '}<div className="code-container undefined"><CodeElement lang="undefined" data={`aSine poscil 0.2, 400
    outall aSine`}></CodeElement></div>{' '}
{' '}<p>Vous pouvez sans probl&#xe8;me continuer d&#x2019;&#xe9;crire le code Csound ainsi.
Les raisons pour lesquelles j&#x2019;utilise l&#x2019;&#xe9;criture fonctionnelle dans ce
tutoriel sont&#x202f;:</p>{' '}
{' '}<ol type="1">{' '}
{' '}<li>Nous sommes tous familiaris&#xe9;s avec cette mani&#xe8;re de d&#xe9;clarer une
variable <code>y</code> &#xe0; gauche comme &#xe9;tant la somme d&#x2019;une autre
variable <code>x</code> plus deux&#x202f;: <code>y = x + 2</code>.</li>{' '}
{' '}<li>Comme mentionn&#xe9; plus haut, la plupart des langages de programmation
utilisent une syntaxe similaire, dans la forme
{' '}<code>sortie = fonction(arguments)</code>. Donc pour les personnes ayant
quelques connaissances en programmation, c&#x2019;est une aide &#xe0;
l&#x2019;apprentissage de Csound.</li>{' '}
{' '}<li>Le style fonctionnel d&#x2019;&#xe9;crire du code Csound a toujours exist&#xe9; dans
des expressions comme <code>ampdb(-10)</code> ou
{' '}<code>ftlen(giTable)</code>. Ce n&#x2019;est donc pas totalement nouveau, mais
plut&#xf4;t une extension.</li>{' '}
{' '}<li>Chaque fois que nous voulons utiliser une expression comme argument
(vous en apprendrez plus &#xe0; ce sujet dans le <Link to="/basics/GS-fr-06">tutoriel 6</Link>), nous devons &#xe9;crire le code de
cette mani&#xe8;re. Il est donc bon de l&#x2019;utiliser en permanence pour plus de
coh&#xe9;rence.</li>{' '}
{' '}</ol>{' '}
{' '}<p>NOTE DU TRADUCTEUR pour les francophones : Sauf dans les commentaires
o&#xf9; &#xe7;a ne pose aucun probl&#xe8;me, n&#x2019;utilisez que des caract&#xe8;res ASCII dans
vos programmes. J&#x2019;ai essay&#xe9; et chez moi &#xe7;a plante. Donc pas de lettres
accentu&#xe9;es, pas de &#x153; et autres signes propres au fran&#xe7;ais.</p>{' '}
</ChapterHOC>
</MathJax.Provider>
)};

export default Chapter;
