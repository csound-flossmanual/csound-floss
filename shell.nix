# A shellfile for nixos users

with import (builtins.fetchTarball {
  url = "https://github.com/NixOS/nixpkgs/archive/730024fcaad303c30d879b2e70e532369398088d.tar.gz";
  sha256 = "sha256:0ln59f6p4r2s2aypw636hf8mfdazps6zkj0dhj5bjj29dn0h0s08";
}) {};

let
  texliveDeps = pkgs.texlive.combine {
   inherit (pkgs.texlive)
     adjustbox
     beamer
     booktabs
     caption
     collectbox
     ec
     etoolbox
     fancyvrb
     fira
     float
     fontinst
     fontspec
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
     sectsty
     setspace
     stix
     stmaryrd
     titlesec
     translator
     unicode-math
     wrapfig
     xcolor
     xetex
     xkeyval;
  };
  deps = with pkgs; [
    fontconfig
    fira
    haskellPackages.pandoc
    tetex
    texliveDeps
    nodejs
    yarn
  ];
in pkgs.symlinkJoin {
  name = "csound-floss-build-deps";
  buildInputs = deps;
  paths = deps;
}
