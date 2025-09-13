# A shellfile for nixos users

with import <nixpkgs> {
  config = {
    allowBroken = true;
    allowUnfree = true;
  };
  overlays = [
    (self: super: {
      libfaketime = super.libfaketime.overrideAttrs (oldAttrs: {
        doCheck = false;
        src = super.fetchFromGitHub {
          owner = "wolfcw";
          repo = "libfaketime";
          tag = "v0.9.10";
          sha256 = "sha256-DYRuQmIhQu0CNEboBAtHOr/NnWxoXecuPMSR/UQ/VIQ=";
        };
      });
    })
  ];
};

let
  texliveDeps = pkgs.texlive.combine {
    inherit (pkgs.texlive)
      adjustbox
      beamer
      booktabs
      caption
      chngcntr
      collectbox
      ec
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
      sectsty
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
      ;
  };
  deps = with pkgs; [
    fontconfig
    fira
    haskellPackages.pandoc
    librsvg
    tetex
    texliveDeps
    nodejs
    (yarn.override { nodejs = pkgs.nodejs; })
    pandoc
  ];
in
pkgs.symlinkJoin {
  name = "csound-floss-build-deps";
  buildInputs = deps;
  paths = deps;
}
