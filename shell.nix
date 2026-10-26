# A shellfile for nixos users

with import <nixpkgs> {
  config = {
    allowBroken = true;
    allowUnfree = true;
  };
};

let
  texliveDeps = (pkgs.texliveSmall.withPackages (ps: with ps; [
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
  ])).overrideAttrs (old: {
    # libxslt needs an XML catalog to resolve fontconfig's DTD URN.
    fontconfigFile = old.fontconfigFile.overrideAttrs (fonts: {
      buildCommand = ''
        export XML_CATALOG_FILES=${pkgs.writeText "fontconfig-catalog.xml" ''
          <?xml version="1.0"?>
          <catalog xmlns="urn:oasis:names:tc:entity:xmlns:xml:catalog">
            <system systemId="urn:fontconfig:fonts.dtd"
              uri="${pkgs.fontconfig.out}/share/xml/fontconfig/fonts.dtd"/>
          </catalog>
        ''}
      '' + fonts.buildCommand;
    });
  });
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
