SourceMaterials
=============================

when adding an sample or any binary based resource to a code example,
few things needs to be considered. The size matters, loading an example
trough bad connection, a MB of binary data could mean up to a minute
large samples can also mean bloated git respository.

The binary data must be places in SourceMaterials directory which
is when this is written under `resources/SourceMaterials`.
Any nesting or new directory inside that directory will not
be seen by the react-app.

By a simple regular expression operation, the react-app will know
which samples from the included included SourceMaterials directory
is being refered to. That means, when playing a code example with
binary resource, the react-app will only download the resources
needed, ignoring all else. For this mechanism to work properly,
it's important to remember to update the json file
`src/assets/source_materials.json` when adding new files.
This way all assets are known ahead of time, and no guesswork
takes place.
