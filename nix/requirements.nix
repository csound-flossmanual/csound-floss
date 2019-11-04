# generated using pypi2nix tool (version: 2.0.0)
# See more at: https://github.com/nix-community/pypi2nix
#
# COMMAND:
#   pypi2nix -r requirements.txt -E 'pkgconfig zlib libjpeg openjpeg libtiff freetype lcms2 libwebp tcl libffi'
#

{ pkgs ? import <nixpkgs> {},
  overrides ? ({ pkgs, python }: self: super: {})
}:

let

  inherit (pkgs) makeWrapper;
  inherit (pkgs.stdenv.lib) fix' extends inNixShell;

  pythonPackages =
  import "${toString pkgs.path}/pkgs/top-level/python-packages.nix" {
    inherit pkgs;
    inherit (pkgs) stdenv;
    python = pkgs.python3;
  };

  commonBuildInputs = with pkgs; [ pkgconfig zlib libjpeg openjpeg libtiff freetype lcms2 libwebp tcl libffi ];
  commonDoCheck = false;

  withPackages = pkgs':
    let
      pkgs = builtins.removeAttrs pkgs' ["__unfix__"];
      interpreterWithPackages = selectPkgsFn: pythonPackages.buildPythonPackage {
        name = "python3-interpreter";
        buildInputs = [ makeWrapper ] ++ (selectPkgsFn pkgs);
        buildCommand = ''
          mkdir -p $out/bin
          ln -s ${pythonPackages.python.interpreter} \
              $out/bin/${pythonPackages.python.executable}
          for dep in ${builtins.concatStringsSep " "
              (selectPkgsFn pkgs)}; do
            if [ -d "$dep/bin" ]; then
              for prog in "$dep/bin/"*; do
                if [ -x "$prog" ] && [ -f "$prog" ]; then
                  ln -s $prog $out/bin/`basename $prog`
                fi
              done
            fi
          done
          for prog in "$out/bin/"*; do
            wrapProgram "$prog" --prefix PYTHONPATH : "$PYTHONPATH"
          done
          pushd $out/bin
          ln -s ${pythonPackages.python.executable} python
          ln -s ${pythonPackages.python.executable} \
              python3
          popd
        '';
        passthru.interpreter = pythonPackages.python;
      };

      interpreter = interpreterWithPackages builtins.attrValues;
    in {
      __old = pythonPackages;
      inherit interpreter;
      inherit interpreterWithPackages;
      mkDerivation = args: pythonPackages.buildPythonPackage (args // {
        nativeBuildInputs = (args.nativeBuildInputs or []) ++ args.buildInputs;
      });
      packages = pkgs;
      overrideDerivation = drv: f:
        pythonPackages.buildPythonPackage (
          drv.drvAttrs // f drv.drvAttrs // { meta = drv.meta; }
        );
      withPackages = pkgs'':
        withPackages (pkgs // pkgs'');
    };

  python = withPackages {};

  generated = self: {
    "cairocffi" = python.mkDerivation {
      name = "cairocffi-1.1.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/f7/99/b3a2c6393563ccbe081ffcceb359ec27a6227792c5169604c1bd8128031a/cairocffi-1.1.0.tar.gz";
        sha256 = "f1c0c5878f74ac9ccb5d48b2601fcc75390c881ce476e79f4cfedd288b1b05db";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [
        self."cffi"
        self."pytest-runner"
      ];
      propagatedBuildInputs = [
        self."cffi"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/Kozea/cairocffi";
        license = licenses.bsdOriginal;
        description = "cffi-based cairo bindings for Python";
      };
    };

    "cairosvg" = python.mkDerivation {
      name = "cairosvg-2.4.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/ba/46/24514db9c111f4d0b18bc050ff7204065ae9c89db6badcf283661528b329/CairoSVG-2.4.2.tar.gz";
        sha256 = "4e668f96653326780036ebb0a9ff2bb59a8443d7bcfc51a14aab77b57a8e67ad";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [
        self."pytest-runner"
      ];
      propagatedBuildInputs = [
        self."cairocffi"
        self."cssselect2"
        self."defusedxml"
        self."pillow"
        self."tinycss2"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://www.cairosvg.org/";
        license = licenses.lgpl3Plus;
        description = "A Simple SVG Converter based on Cairo";
      };
    };

    "cffi" = python.mkDerivation {
      name = "cffi-1.13.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/2d/bf/960e5a422db3ac1a5e612cb35ca436c3fc985ed4b7ed13a1b4879006f450/cffi-1.13.2.tar.gz";
        sha256 = "599a1e8ff057ac530c9ad1778293c665cb81a791421f46922d80a86473c13346";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."pycparser"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://cffi.readthedocs.org";
        license = licenses.mit;
        description = "Foreign Function Interface for Python calling C code.";
      };
    };

    "click" = python.mkDerivation {
      name = "click-7.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/f8/5c/f60e9d8a1e77005f664b76ff8aeaee5bc05d0a91798afd7f53fc998dbc47/Click-7.0.tar.gz";
        sha256 = "5b94b49521f6456670fdb30cd82a4eca9412788a93fa6dd6df72c94d5a8ff2d7";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://palletsprojects.com/p/click/";
        license = licenses.bsdOriginal;
        description = "Composable command line interface toolkit";
      };
    };

    "cloudpickle" = python.mkDerivation {
      name = "cloudpickle-1.2.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/1f/2d/a6b35415360b3d49c169ad7717966749fe18bb4295a1040955e2f6fce485/cloudpickle-1.2.2.tar.gz";
        sha256 = "922401d7140e133253ff5fab4faa4a1166416066453a783b00b507dca93f8859";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/cloudpipe/cloudpickle";
        license = "BSD 3-Clause License";
        description = "Extended pickling support for Python objects";
      };
    };

    "cssselect2" = python.mkDerivation {
      name = "cssselect2-0.2.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/03/7e/fda589175ac092bff38c17b0a0833b59300839a3f31c004a5ca0315b687f/cssselect2-0.2.2.tar.gz";
        sha256 = "70485a680cd72b023f0ce5ae4dcd392e2b10f7280e20afdb1735334bd6af7e6a";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."tinycss2"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://packages.python.org/cssselect2/";
        license = licenses.bsdOriginal;
        description = "CSS selectors for Python ElementTree";
      };
    };

    "defusedxml" = python.mkDerivation {
      name = "defusedxml-0.6.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/a4/5f/f8aa58ca0cf01cbcee728abc9d88bfeb74e95e6cb4334cfd5bed5673ea77/defusedxml-0.6.0.tar.gz";
        sha256 = "f684034d135af4c6cbb949b8a4d2ed61634515257a67299e5f940fbaa34377f5";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/tiran/defusedxml";
        license = "PSFL";
        description = "XML bomb protection for Python stdlib modules";
      };
    };

    "doit" = python.mkDerivation {
      name = "doit-0.31.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/ac/ef/6964b53e50c9d1901d2c56dd117478c9d9aceb212f8cf893ba5fa81f0014/doit-0.31.1.tar.gz";
        sha256 = "bad01949effd537cade3aea286cc2cde074bdb7a4f442015557b1228dd46f5ea";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."cloudpickle"
        self."pyinotify"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://pydoit.org";
        license = licenses.mit;
        description = "doit - Automation Tool";
      };
    };

    "future" = python.mkDerivation {
      name = "future-0.18.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/45/0b/38b06fd9b92dc2b68d58b75f900e97884c45bedd2ff83203d933cf5851c9/future-0.18.2.tar.gz";
        sha256 = "b1bead90b70cf6ec3f0710ae53a525360fa360d306a86583adc6bf83a4db537d";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://python-future.org";
        license = licenses.mit;
        description = "Clean single-source support for Python 3 and 2";
      };
    };

    "grizzled-python" = python.mkDerivation {
      name = "grizzled-python-2.2.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/2d/93/3073ac4b46932ab33afed375e20eb9a3dfe03d8b0a8d431687936c9765eb/grizzled-python-2.2.0.tar.gz";
        sha256 = "9288b66cce5c7dd0d6d540c35fe1390bd35ef6444c70d468d704fc794a15e4c9";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://software.clapper.org/grizzled-python/";
        license = "BSD license";
        description = "The Grizzled Python Utility Library";
      };
    };

    "html5lib" = python.mkDerivation {
      name = "html5lib-1.0.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/85/3e/cf449cf1b5004e87510b9368e7a5f1acd8831c2d6691edd3c62a0823f98f/html5lib-1.0.1.tar.gz";
        sha256 = "66cb0dcfdbbc4f9c3ba1a63fdb511ffdbd4f513b2b6d81b80cd26ce6b3fb3736";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."six"
        self."webencodings"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/html5lib/html5lib-python";
        license = licenses.mit;
        description = "HTML parser based on the WHATWG HTML specification";
      };
    };

    "livereload" = python.mkDerivation {
      name = "livereload-2.6.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/27/26/85ba3851d2e4905be7d2d41082adca833182bb1d7de9dfc7f623383d36e1/livereload-2.6.1.tar.gz";
        sha256 = "89254f78d7529d7ea0a3417d224c34287ebfe266b05e67e51facaf82c27f0f66";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."six"
        self."tornado"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/lepture/python-livereload";
        license = licenses.bsdOriginal;
        description = "Python LiveReload is an awesome tool for web developers";
      };
    };

    "panflute" = python.mkDerivation {
      name = "panflute-1.11.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/c3/e9/f77cf556dda8ee2ca6eee07e7aba9cfdb63d48c1b79929db300d5c1e5354/panflute-1.11.2.tar.gz";
        sha256 = "61118563a8be3a8e71b9ab3e92c5a21712ed6ce647776914ed978d5f15c673f9";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [
        self."click"
        self."future"
        self."pyyaml"
        self."shutilwhich"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/sergiocorreia/panflute";
        license = "BSD3";
        description = "Pythonic Pandoc filters";
      };
    };

    "pillow" = python.mkDerivation {
      name = "pillow-6.2.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/5b/bb/cdc8086db1f15d0664dd22a62c69613cdc00f1dd430b5b19df1bea83f2a3/Pillow-6.2.1.tar.gz";
        sha256 = "bf4e972a88f8841d8fdc6db1a75e0f8d763e66e3754b03006cbc3854d89f1cb1";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://python-pillow.org";
        license = "HPND";
        description = "Python Imaging Library (Fork)";
      };
    };

    "pycparser" = python.mkDerivation {
      name = "pycparser-2.19";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/68/9e/49196946aee219aead1290e00d1e7fdeab8567783e83e1b9ab5585e6206a/pycparser-2.19.tar.gz";
        sha256 = "a988718abfad80b6b157acce7bf130a30876d27603738ac39f140993246b25b3";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/eliben/pycparser";
        license = licenses.bsdOriginal;
        description = "C parser in Python";
      };
    };

    "pyinotify" = python.mkDerivation {
      name = "pyinotify-0.9.6";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/e3/c0/fd5b18dde17c1249658521f69598f3252f11d9d7a980c5be8619970646e1/pyinotify-0.9.6.tar.gz";
        sha256 = "9c998a5d7606ca835065cdabc013ae6c66eb9ea76a00a1e3bc6e0cfe2b4f71f4";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://github.com/seb-m/pyinotify";
        license = licenses.mit;
        description = "Linux filesystem events monitoring";
      };
    };

    "pyphen" = python.mkDerivation {
      name = "pyphen-0.9.5";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/03/c7/1a8957ffee550b00c6caa73ea23228edc020d1411ca14825b1e4d19b5118/Pyphen-0.9.5.tar.gz";
        sha256 = "3b633a50873156d777e1f1075ba4d8e96a6ad0a3ca42aa3ea9a6259f93f18921";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/Kozea/Pyphen";
        license = "UNKNOWN";
        description = "Pure Python module to hyphenate text";
      };
    };

    "pytest-runner" = python.mkDerivation {
      name = "pytest-runner-5.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/5b/82/1462f86e6c3600f2471d5f552fcc31e39f17717023df4bab712b4a9db1b3/pytest-runner-5.2.tar.gz";
        sha256 = "96c7e73ead7b93e388c5d614770d2bae6526efd997757d3543fe17b557a0942b";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [
        self."setuptools-scm"
      ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/pytest-dev/pytest-runner/";
        license = "UNKNOWN";
        description = "Invoke py.test as distutils command with dependency resolution";
      };
    };

    "pyyaml" = python.mkDerivation {
      name = "pyyaml-5.1.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/e3/e8/b3212641ee2718d556df0f23f78de8303f068fe29cdaa7a91018849582fe/PyYAML-5.1.2.tar.gz";
        sha256 = "01adf0b6c6f61bd11af6e10ca52b7d4057dd0be0343eb9283c878cf3af56aee4";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/yaml/pyyaml";
        license = licenses.mit;
        description = "YAML parser and emitter for Python";
      };
    };

    "setuptools-scm" = python.mkDerivation {
      name = "setuptools-scm-3.3.3";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/83/44/53cad68ce686585d12222e6769682c4bdb9686808d2739671f9175e2938b/setuptools_scm-3.3.3.tar.gz";
        sha256 = "bd25e1fb5e4d603dcf490f1fde40fb4c595b357795674c3e5cb7f6217ab39ea5";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/pypa/setuptools_scm/";
        license = licenses.mit;
        description = "the blessed package to manage your versions by scm tags";
      };
    };

    "shutilwhich" = python.mkDerivation {
      name = "shutilwhich-1.1.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/66/be/783f181594bb8bcfde174d6cd1e41956b986d0d8d337d535eb2555b92f8d/shutilwhich-1.1.0.tar.gz";
        sha256 = "db1f39c6461e42f630fa617bb8c79090f7711c9ca493e615e43d0610ecb64dc6";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://github.com/mbr/shutilwhich";
        license = "PSF";
        description = "shutil.which for those not using Python 3.3 yet.";
      };
    };

    "six" = python.mkDerivation {
      name = "six-1.12.0";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/dd/bf/4138e7bfb757de47d1f4b6994648ec67a51efe58fa907c1e11e350cddfca/six-1.12.0.tar.gz";
        sha256 = "d16a0141ec1a18405cd4ce8b4613101da75da0e9a7aec5bdd4fa804d0e0eba73";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/benjaminp/six";
        license = licenses.mit;
        description = "Python 2 and 3 compatibility utilities";
      };
    };

    "tinycss2" = python.mkDerivation {
      name = "tinycss2-1.0.2";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/0b/10/8332e2a40334292e584c88f24ebf1635c1704f77be50af73cccc7babdbb7/tinycss2-1.0.2.tar.gz";
        sha256 = "6427d0e3faa0a5e0e8c9f6437e2de26148a7a197a8b0992789f23d9a802788cf";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [
        self."pytest-runner"
      ];
      propagatedBuildInputs = [
        self."webencodings"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://tinycss2.readthedocs.io/";
        license = licenses.bsdOriginal;
        description = "Low-level CSS parser for Python";
      };
    };

    "tornado" = python.mkDerivation {
      name = "tornado-6.0.3";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/30/78/2d2823598496127b21423baffaa186b668f73cd91887fcef78b6eade136b/tornado-6.0.3.tar.gz";
        sha256 = "c845db36ba616912074c5b1ee897f8e0124df269468f25e4fe21fe72f6edd7a9";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "http://www.tornadoweb.org/";
        license = licenses.asl20;
        description = "Tornado is a Python web framework and asynchronous networking library, originally developed at FriendFeed.";
      };
    };

    "weasyprint" = python.mkDerivation {
      name = "weasyprint-50";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/46/94/3869a6def7b67d97432c3f3fac2b23bfd5194276a55e983c881f015b9cd8/WeasyPrint-50.tar.gz";
        sha256 = "9c2d185ad87b38cde0aa97a70d4a783865cbb21445d259203799d5fd4dd2db46";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [
        self."pytest-runner"
      ];
      propagatedBuildInputs = [
        self."cairocffi"
        self."cairosvg"
        self."cffi"
        self."cssselect2"
        self."html5lib"
        self."pyphen"
        self."tinycss2"
      ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://weasyprint.org/";
        license = licenses.bsdOriginal;
        description = "The Awesome Document Factory";
      };
    };

    "webencodings" = python.mkDerivation {
      name = "webencodings-0.5.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/0b/02/ae6ceac1baeda530866a85075641cec12989bd8d31af6d5ab4a3e8c92f47/webencodings-0.5.1.tar.gz";
        sha256 = "b36a1c245f2d304965eb4e0a82848379241dc04b865afcc4aab16748587e1923";
};
      doCheck = commonDoCheck;
      buildInputs = commonBuildInputs ++ [ ];
      propagatedBuildInputs = [ ];
      meta = with pkgs.stdenv.lib; {
        homepage = "https://github.com/SimonSapin/python-webencodings";
        license = licenses.bsdOriginal;
        description = "Character encoding aliases for legacy web content";
      };
    };
  };
  localOverridesFile = ./requirements_override.nix;
  localOverrides = import localOverridesFile { inherit pkgs python; };
  commonOverrides = [
    
  ];
  paramOverrides = [
    (overrides { inherit pkgs python; })
  ];
  allOverrides =
    (if (builtins.pathExists localOverridesFile)
     then [localOverrides] else [] ) ++ commonOverrides ++ paramOverrides;

in python.withPackages
   (fix' (pkgs.lib.fold
            extends
            generated
            allOverrides
         )
   )