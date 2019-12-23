# A shellfile for nixos users
with import <nixpkgs> {};

in stdenv.mkDerivation {
  name = "csound-floss";
  buildInputs = with pkgs; [
    # build deps
    pandoc
    nodejs
    yarn
  ];
  propagatedBuildInputs = builtins.attrValues py.packages;
  # shellHook = '' '';
}
