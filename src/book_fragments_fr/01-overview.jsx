
import React, { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
  Link,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Stack
} from "@chakra-ui/react";
import ChapterHOC from "../ChapterHOC";
import { useTitle } from "../use-title";

const Chapter = () => {
  useTitle("Premiers Pas");
return (
   <Stack spacing={6}>
<Heading as='h1' fontWeight="400" noOfLines={1}>Chapter 1 overview - Premiers Pas</Heading>
<Accordion sx={{borderColor: "aliceblue"}} allowMultiple>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-01" color="linkColor">
             01 Bonjour Csound
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#qu-est-ce-qu-un-oscillateur-sinuso-dal-sine-oscillator">Qu’est-ce qu’un oscillateur sinusoïdal / sine oscillator</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#un-oscillateur-sinuso-dal-dans-csound-opcode-et-arguments">Un oscillateur sinusoïdal dans Csound : Opcode et Arguments</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#le-flux-d-un-signal-et-son-code">Le flux d’un signal et son code</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#votre-premier-instrument-csound">Votre premier instrument Csound</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#exemple"> Exemple</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#opcodes-mots-cl-s-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Opcodes, Mots-Clés et termes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#opcodes"> Opcodes</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#mots-cl-s"> Mots-clés</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#termes"> Termes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#avan-ons">Avançons…</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-01#ou-lisez-quelques-informations-suppl-mentaires-ici">Ou lisez quelques informations supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#pourquoi-l-onde-sinuso-dale-est-elle-le-son-le-plus-l-mentaire-au-monde"> Pourquoi l’onde sinusoïdale est-elle « le son le plus élémentaire au monde » ?</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-01#deux-fa-ons-d-crire-du-code-dans-csound-la-fa-on-traditionnelle-et-la-fa-on-fonctionnelle"> Deux façons d’écrire du code dans Csound : la façon Traditionnelle, et la façon fonctionnelle</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-02" color="linkColor">
             02 Bonjour Fréquences
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#une-ligne-pour-la-fr-quence">Une ligne pour la fréquence</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#une-ligne-dessin-e-avec-l-opcode-linseg">Une ligne Dessinée avec l’opcode 'linseg'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#signal-k-rate-la-fr-quence-de-contr-le">Signal k-rate (à la fréquence de contrôle)</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#flux-du-signal">Flux du signal</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#la-structure-d-un-document-csound.csd">La structure d’un document Csound (.csd)</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#essayez-le-vous-m-me">Essayez-le vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#opcodes-balises-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Opcodes, balises et termes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#opcodes"> Opcodes</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#balises"> Balises</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#termes"> Termes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-02#ou-lisez-quelques-explication-suppl-mentaire-ici">…ou lisez quelques explication supplémentaire ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#linseg-versus-line"> linseg versus line</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#conventions-de-codage"> Conventions de codage</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-02#quand-choisir-a-rate-ou-k-rate"> Quand choisir a-rate ou k-rate ?</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-03" color="linkColor">
             03 Bonjour amplitude
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#une-ligne-pour-l-amplitude">Une ligne pour l’amplitude</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#retour-au-d-but">Retour au début</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#sr"> sr</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#ksmps"> ksmps</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#nchnls"> nchnls</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#0dbfs"> 0dbfs</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#valeurs-par-d-faut-dans-l-ent-te-d-orchestre-orchestra-header"> Valeurs par défaut dans l’entête d’orchestre / orchestra header</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#essayez-le-vous-m-me">Essayez-le vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#flux-du-signal-et-ordre-d-ex-cution">Flux du signal et ordre d’exécution</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#lisez-les-messages-d-erreur">Lisez les messages d’erreur</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#constantes-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Constantes et termes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#constantes"> Constantes</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#termes"> Termes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-03#ou-lisez-quelques-explications-suppl-mentaires-ici">ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#quelques-notes-sur-ksmps"> Quelques notes sur ksmps</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-03#comment-cela-se-passe-t-il-dans-pd"> Comment cela se passe-t-il dans PD ?</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-04" color="linkColor">
             04 Bonjour fondu en sortie / fade out
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#fondu-en-entr-e-et-fondu-en-sortie-fade-in-and-fade-out">Fondu en entrée et fondu en sortie (Fade-in and Fade-out)</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-04#l-opcode-linen"> L’opcode 'linen'</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#les-champsfields-de-param-tres-de-la-partition-score">Les champs/fields de paramètres de la partition/score</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#p3-dans-un-instrument">'p3' dans un instrument</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#changement-de-volume-par-multiplication">Changement de volume par multiplication</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#essayez-vous-m-me">Essayez vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#opcodes-et-symbols-que-vous-avez-appris-dans-ce-tutoriel">Opcodes et symbols que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-04#opcodes"> Opcodes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#symbols">Symbols</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-04#ou-lisez-quelque-explications-suppl-mentaires-ici">… Ou lisez quelque explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-04#l-entr-e-d-amplitude-de-linen"> L’entrée d’amplitude de 'linen'</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-04#ne-devrions-nous-pas-utiliser-un-opcode-k-rate-pour-les-fondus"> Ne devrions-nous pas utiliser un opcode k-rate pour les fondus ?</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-05" color="linkColor">
             05. Bonjour touches MIDI / Midi keys
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#probl-mes-li-s-l-utilisation-des-fr-quences-brutes">Problèmes liés à l’utilisation des fréquences brutes</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#les-num-ros-de-notes-midi-et-l-opcode-mtof">Les numéros de notes MIDI et l’opcode 'mtof'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#les-variables-i-rate-dans-csound">Les variables 'i-rate' dans Csound</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#l-opcode-print">L’opcode 'print'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#l-opcode-prints-et-les-stringschaines-de-caract-res">L’opcode 'prints' et les 'strings/chaines de caractères'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#essayez-le-vous-m-me">Essayez-le vous même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#opcodes-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Opcodes et termes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-05#opcodes"> Opcodes</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-05#termes"> Termes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-05#ou-lisez-quelques-explications-suppl-mentaires-ici">… ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-05#le-m-me-n-est-pas-le-m-me"> Le même n’est pas le même…</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-05#diapason-standard-pour-midi-et-temp-rament-gal"> Diapason standard pour MIDI et tempérament égal</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-05#i-dans-la-partitionscore-et-i-rate"> 'i' dans la partition/score, et 'i-rate'…</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-06" color="linkColor">
             06 Bonjour Decibels
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#probl-mes-li-s-l-utilisation-d-amplitudes-brutes">Problèmes liés à l’utilisation d’amplitudes brutes</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#decibel">Decibel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#l-opcode-ampdb">L’opcode 'ampdb'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#insertion-d-une-expression-comme-argument-d-entr-e">Insertion d’une expression comme argument d’entrée</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#court-ou-lisible">Court ou lisible ?</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#essayez-vous-m-me">Essayez vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#les-opcodes-que-vous-avez-appris-dans-ce-tutoriel">Les opcodes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#avan-ons">Avançons…</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#ou-lisez-quelques-explications-suppl-mentaires-ici">ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-06#qu-est-ce-que-0-db"> Qu’est-ce que 0 dB ?</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-06#puis-je-utiliser-des-valeurs-en-db"> Puis-je utiliser des valeurs en dB ?</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-06#un-aper-u-des-s-ries-arithm-tiques-et-g-om-triques">Un aperçu des séries arithmétiques et géométriques</Link>
<UnorderedList p="0"></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-07" color="linkColor">
             07 Bonjour p-champs / p-fields
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#les-instruments-sont-des-mod-les-qui-sont-instanci-s">Les instruments sont des modèles qui sont instanciés</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#rendre-les-instruments-plus-adaptables">Rendre les instruments plus adaptables</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#insertion-directe-de-p-fieldchamps-ou-d-finition-de-variables">Insertion directe de p-field/champs ou définition de variables ?</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#commentaires-dans-le-code">Commentaires dans le code</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#un-coup-d-il-sur-l-histoire">Un coup d’œil sur l’histoire</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#essayez-le-vous-m-me">Essayez-le vous même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#termes-et-symboles-que-vous-avez-appris-dans-ce-tutoriel">Termes et symboles que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-07#termes"> Termes</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-07#symboles"> Symboles</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-07#ou-lisez-quelques-explications-suppl-mentaires">… ou lisez quelques explications supplémentaires</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-07#notes-midi-et-d-viations-microtonales"> Notes MIDI et déviations microtonales</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-07#num-ration-des-instances-en-tant-que-parties-fractionnaires"> énumération des instances en tant que parties fractionnaires</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-07#noms-d-instruments-et-parties-fractionnaires"> Noms d’instruments et parties fractionnaires</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-08" color="linkColor">
             08 Bonjour 'Schedule' / planification temporelle
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#le-fichier.csd-nouveau-plus-un-peu-de-l-histoire-de-csound">Le fichier csd à nouveau, plus un peu de l’histoire de Csound</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#utilisation-de-csound-sans-la-section-score">Utilisation de Csound sans la section Score</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#l-opcode-schedule">l’opcode 'schedule'</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#essayez-le-vous-m-me">Essayez-le vous même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#csound-s-ex-cute-s-ex-cute-et-s-ex-cute">Csound s’exécute, s’exécute et s’exécute…</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#le-manuel-de-r-f-rence-csound-comme-compagnon-et-terrain-d-volution">Le manuel de référence Csound comme compagnon et terrain d’évolution</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#les-opcodes-que-vous-avez-appris-dans-ce-tutoriel">Les opcodes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-08#opcodes"> Opcodes</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-08#ou-lisez-quelques-explications-suppl-mentaires-ici">… Ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-08#instructions-score-et-utilitaires"> Instructions 'Score' et utilitaires</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-08#d-clencher-d-autres-v-nements-score-que-i-depuis-le-code-de-l-orchestreorchestra"> Déclencher d’autres évènements score que 'i' depuis le code de l’orchestre/orchestra</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-08#trois-dur-es-particuli-res-0-1-et-z"> Trois durées particulières : 0, -1 et z</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-09" color="linkColor">
             09 Bonjour If / si
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#une-instance-appelle-la-suivante">Une instance appelle la suivante…</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#planifierschedule-en-fonction-de-conditions">Planifier/Schedule en fonction de conditions</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#l-opcode-if-dans-csound">L’opcode 'if' dans Csound</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#essayez-le-vous-m-me">Essayez-le vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#plus-sur-if-if-else-et-if-elsif-else">Plus sur 'if' : if-else et if-elsif-else</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#if-else"> if - else</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#if-elseif-else">if - elseif - else</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#if-s-imbriqu-s-and-et-or">'if(s) imbriqués, AND et OR</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#les-if-s-imbriqu-s"> Les if(s) imbriqués</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#and-et-or-logiques-et-et-ou"> AND et OR logiques (ET et OU)</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#les-opcodes-que-vous-avez-appris-dans-ce-tutoriel">Les opcodes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-09#ou-lisez-quelques-explications-suppl-mentaires-ici">Ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#une-forme-courte"> Une forme courte</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#les-boucles-avec-if"> Les boucles avec 'if'</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-09#formatage-des-stringschaines-de-caract-res"> Formatage des strings/chaines de caractères</Link></ListItem></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
<AccordionItem><Heading as='h3' margin="0" size="md">
        <AccordionButton cursor="initial" fontSize="inherit">
          <Box as="span" flex='1' textAlign='left'>
           <Link as={ReactLink} to="/fr/premiers-pas/GS-10" color="linkColor">
             10 Bonjour Aléatoire / Random
            </Link>
           </Box>
          <AccordionIcon cursor="pointer" />
          </AccordionButton>
        </Heading>
<AccordionPanel>
          <UnorderedList sx={{listStyleType: "' '", margin: 0, li: {
             textTransform: "uppercase",
             maxWidth: "70%",
             textOverflow: "ellipsis",
             whiteSpace: "nowrap",
             overflow: "hidden"
            }}}>
<ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#ce-que-vous-apprendrez-dans-ce-tutoriel">Ce que vous apprendrez dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#nombres-al-atoires-et-d-cisions-artistiques">Nombres aléatoires et décisions artistiques</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#les-opcode-random-et-seed-al-atoire-et-graine">Les opcode 'random' et 'seed' (aléatoire et graine)</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#espace-global-global-space-ou-instrument-0">"Espace global / global space" ou "instrument 0"</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#exemple">Exemple</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#essayez-le-vous-m-me">Essayez-le vous-même</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#marche-al-atoire">Marche aléatoire</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#opcodes-et-termes-que-vous-avez-appris-dans-ce-tutoriel">Opcodes et termes que vous avez appris dans ce tutoriel</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#avan-ons">Avançons</Link>
<UnorderedList p="0"></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#ou-lisez-quelques-explications-suppl-mentaires-ici">… Ou lisez quelques explications supplémentaires ici</Link>
<UnorderedList p="0"><ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-10#souvenez-vous-de-i-rate-et-k-rate"> Souvenez-vous de i-rate et k-rate…</Link></ListItem>
<ListItem maxWidth="100%!important" w="100%"> <Link as={ReactLink}
                  color="linkColor" fontSize="15px" fontWeight="400"
                  to="/fr/premiers-pas/GS-10#randomal-atoire-avec-interpolation-ou-avec-valeurs-maintenues"> Random/aléatoire avec interpolation ou avec valeurs maintenues</Link></ListItem></UnorderedList></ListItem><ListItem>
           <Link as={ReactLink} color="linkColor" fontSize="17px" fontWeight="600"
            to="/fr/premiers-pas/GS-10#bravo">Bravo !</Link>
<UnorderedList p="0"></UnorderedList></ListItem>
</UnorderedList></AccordionPanel></AccordionItem>
</Accordion>
</Stack>
)};

export default Chapter;