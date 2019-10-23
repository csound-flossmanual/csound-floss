# generated using pypi2nix tool (version: 2.0.0)
# See more at: https://github.com/nix-community/pypi2nix
#
# COMMAND:
#   pypi2nix -r requirements.txt
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

  commonBuildInputs = [];
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
      name = "future-0.18.1";
      src = pkgs.fetchurl {
        url = "https://files.pythonhosted.org/packages/3f/bf/57733d44afd0cf67580658507bd11d3ec629612d5e0e432beb4b8f6fbb04/future-0.18.1.tar.gz";
        sha256 = "858e38522e8fd0d3ce8f0c1feaf0603358e366d5403209674c7b617fa0c24093";
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