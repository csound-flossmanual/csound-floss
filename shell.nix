# A shellfile for nixos users
with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "csound-floss";
  buildInputs = with pkgs; [
    # build deps
    pandoc
    nodejs
    yarn
  ];
}
