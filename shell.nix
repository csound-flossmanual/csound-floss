{ pkgs ? import (builtins.fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/730024fcaad303c30d879b2e70e532369398088d.tar.gz";
    sha256 = "sha256:0ln59f6p4r2s2aypw636hf8mfdazps6zkj0dhj5bjj29dn0h0s08";
  }) {}}:

pkgs.symlinkJoin {
  name = "csound-floss-build-deps";
  paths = with pkgs; [
    fira
    haskellPackages.pandoc
    texlive.combined.scheme-full
    nodejs
    roboto
    yarn
  ];
}
