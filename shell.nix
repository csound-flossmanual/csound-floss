# A shellfile for nixos users

with import <nixpkgs> {
  config = {
    allowBroken = true;
    allowUnfree = true;
  };
};

let
  texliveDeps = pkgs.texliveSmall.withPackages (ps: with ps; [
    adjustbox
    booktabs
    caption
    chngcntr
    collectbox
    ec
    dejavu
    etoolbox
    fancyvrb
    fira
    float
    fontinst
    fontspec
    footmisc
    framed
    hyperref
    listings
    mdwtools # <-- footnote.sty
    metafont
    parskip
    pgf
    placeins
    plstmary
    psnfss
    roboto
    scheme-basic
    setspace
    stix
    stmaryrd
    titlesec
    translator
    truncate
    unicode-math
    wrapfig
    xcolor
    xetex
    xkeyval
  ]);
  deps = with pkgs; [
    fontconfig
    fira
    librsvg
    texliveDeps
    nodejs
    pandoc
  ];
in
pkgs.symlinkJoin {
  name = "csound-floss-build-deps";
  buildInputs = deps;
  paths = deps;
}
