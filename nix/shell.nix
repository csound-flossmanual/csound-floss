# pypi2nix command:
# pypi2nix -r requirements.txt -E "pkgconfig zlib libjpeg openjpeg libtiff freetype lcms2 libwebp tcl libffi"

with import <nixpkgs> {};

let py = import ./requirements.nix { inherit pkgs; };

in stdenv.mkDerivation {
  name = "csound-floss";
  buildInputs = with pkgs; [
    pandoc
    python3
    python37Packages.pip
    python37Packages.pyyaml
    python37Packages.weasyprint
    haskellPackages.pandoc-citeproc
  ];
  propagatedBuildInputs = builtins.attrValues py.packages;
}
