FROM nixos/nix
MAINTAINER Hlöðver Sigurðsson <hlolli@gmail.com>

RUN nix-channel --add https://nixos.org/channels/nixpkgs-unstable nixpkgs
RUN nix-channel --update

COPY nix /root
RUN nix-shell /root/shell.nix
