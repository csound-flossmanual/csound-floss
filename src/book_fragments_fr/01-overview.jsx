import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CodeElement from "../components/Editor";
import MathJax from "react-mathjax";
import { useTitle } from "../use-title";
import ChapterHOC from "../ChapterHOC";

const Chapter = () => {
  useTitle("Premiers Pas");
return (
 <MathJax.Provider>
   <ChapterHOC>

    <div>
      <h1>Premiers Pas</h1>
      <p>Ce chapitre couvre les sujets suivants :</p>
      <ul>
        <li><a href="/fr/premiers-pas/GS-01">GS 01</a></li>
<li><a href="/fr/premiers-pas/GS-02">GS 02</a></li>
<li><a href="/fr/premiers-pas/GS-03">GS 03</a></li>
<li><a href="/fr/premiers-pas/GS-04">GS 04</a></li>
<li><a href="/fr/premiers-pas/GS-05">GS 05</a></li>
<li><a href="/fr/premiers-pas/GS-06">GS 06</a></li>
<li><a href="/fr/premiers-pas/GS-07">GS 07</a></li>
<li><a href="/fr/premiers-pas/GS-08">GS 08</a></li>
<li><a href="/fr/premiers-pas/GS-09">GS 09</a></li>
<li><a href="/fr/premiers-pas/GS-10">GS 10</a></li>
      </ul>
    </div>
  </ChapterHOC>
</MathJax.Provider>
)};

export default Chapter;
