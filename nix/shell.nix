with import <nixpkgs> {};

let py = import ./requirements.nix { inherit pkgs; };

in stdenv.mkDerivation {
  name = "csound-floss";
  buildInputs = with pkgs; [
    pandoc
    plantuml
    python3
    python37Packages.pip
    python37Packages.pyyaml
    python37Packages.weasyprint
    haskellPackages.pandoc-citeproc
  ];
  propagatedBuildInputs = builtins.attrValues py.packages;
}
