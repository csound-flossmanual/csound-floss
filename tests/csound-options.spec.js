import { requestsFileOutput } from "../src/csound/options";
it.each([
  ["-o result.wav", true],
  ["-oresult.wav", true],
  ["--output=result.wav", true],
  ['--output "a file.wav"', true],
  ['-o"a file.wav"', true],
  ["-o 'a;file.wav'", true],
  ["-odac", false],
  ["-o dac2", false],
  ["--output=dac:device", false],
  ["; -o file.wav\n-odac", false],
  ["// -o file.wav\n-odac", false],
  ["-ofile.wav -odac", false],
  ["-odac -ofile.wav", true],
  ["", false],
])("reads output policy from %s", (options, expected) => {
  expect(requestsFileOutput(`<CsOptions>${options}</CsOptions>`)).toBe(
    expected,
  );
});
it("ignores options in XML comments and instrument strings", () => {
  expect(
    requestsFileOutput(
      "<!-- <CsOptions>-o file.wav</CsOptions> -->\n<CsInstruments>S1 = {{<CsOptions>-o file.wav</CsOptions>}}",
    ),
  ).toBe(false);
});
