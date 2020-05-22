# A shellfile for nixos users

with import (builtins.fetchTarball {
  url = "https://github.com/NixOS/nixpkgs/archive/730024fcaad303c30d879b2e70e532369398088d.tar.gz";
  sha256 = "sha256:0ln59f6p4r2s2aypw636hf8mfdazps6zkj0dhj5bjj29dn0h0s08";
}) {};

let
  texliveDeps = pkgs.texlive.combine {
   inherit (pkgs.texlive)
     beamer
     booktabs
     caption
     ec
     etoolbox
     fancyvrb
     float
     fontinst
     fontspec
     framed
     hyperref
     listings
     metafont
     mdwtools # <-- footnote.sty
     parskip
     pgf
     plstmary
     psnfss
     roboto
     sectsty
     setspace
     scheme-basic
     stmaryrd
     stix
     titlesec
     translator
     unicode-math
     wrapfig
     xcolor
     xetex
     xkeyval;
  };
  deps = with pkgs; [
    fira
    fontconfig
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
