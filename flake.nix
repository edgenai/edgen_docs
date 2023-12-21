# good nix template: https://srid.ca/rust-nix

{
    inputs = {
        nixpkgs.url = "nixpkgs";
        rust-overlay.url = "github:oxalica/rust-overlay";
        flake-utils.url = "github:numtide/flake-utils";
    };

    outputs = { self, nixpkgs, rust-overlay, flake-utils }:
        flake-utils.lib.eachDefaultSystem (system:
        let
            overlays = [ (import rust-overlay) ];
            pkgs = import nixpkgs {
                inherit system overlays;
            };
            # pkgs = nixpkgs.legacyPackages.${system};

            rust-toolchain = pkgs.rust-bin.selectLatestNightlyWith (toolchain: toolchain.default.override {
                extensions = [ "rust-src" ];
                #targets = [ "wasm32-unknown-unknown" ];
            });

            nativeBuildInputs = with pkgs; [
                pkg-config
            ];

            packages = with pkgs; [
                nodejs_18
            ];

            buildInputs = packages;
        in
        rec {
            # `nix develop`
            devShell = pkgs.mkShell {
                inherit buildInputs nativeBuildInputs;
                shellHook = ''
                # For rust-analyzer 'hover' tooltips to work.
                export RUST_SRC_PATH=${rust-toolchain}

                # add ~/.cargo/bin to PATH for crates installed with `cargo install`
                export PATH=$PATH:$HOME/.cargo/bin

                '';
            };
        });
}
