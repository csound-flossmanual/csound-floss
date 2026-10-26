import { DownloadSimpleIcon } from "@phosphor-icons/react";

const labels = {
  en: ["Download all examples", "ZIP with Csound files and samples"],
  fr: [
    "Télécharger tous les exemples",
    "ZIP avec fichiers Csound et échantillons",
  ],
  fa: ["دانلود همه مثال‌ها", "فایل ZIP شامل فایل‌های Csound و نمونه‌های صوتی"],
};
export default function ExampleDownload({ lang = "en" }) {
  const [label, detail] = labels[lang];
  return (
    <a
      href={`/examples/csound-floss-examples-${lang}.zip`}
      download
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 0",
        whiteSpace: "normal",
      }}
    >
      <DownloadSimpleIcon
        size={24}
        style={{ flexShrink: 0, color: "#6f519b" }}
      />
      <span>
        <span style={{ display: "block" }}>{label}</span>
        <small style={{ display: "block", fontSize: 14 }}>{detail}</small>
      </span>
    </a>
  );
}
