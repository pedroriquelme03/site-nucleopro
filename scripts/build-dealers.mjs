import XLSX from "xlsx";
import fs from "node:fs";

const UF_TO_ID = {
  AC: "BRAC",
  AL: "BRAL",
  AM: "BRAM",
  AP: "BRAP",
  BA: "BRBA",
  CE: "BRCE",
  DF: "BRDF",
  ES: "BRES",
  GO: "BRGO",
  MA: "BRMA",
  MG: "BRMG",
  MS: "BRMS",
  MT: "BRMT",
  PA: "BRPA",
  PB: "BRPB",
  PE: "BRPE",
  PI: "BRPI",
  PR: "BRPR",
  RJ: "BRRJ",
  RN: "BRRN",
  RO: "BRRO",
  RR: "BRRR",
  RS: "BRRS",
  SC: "BRSC",
  SE: "BRSE",
  SP: "BRSP",
  TO: "BRTO",
};

const path = "C:/Users/pedro/Downloads/Clientes site proaudio (2).xlsx";
const wb = XLSX.readFile(path);
const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: null });

function digitsPhone(raw) {
  if (!raw) return "";
  let digits = String(raw).replace(/\D/g, "");
  if (digits.startsWith("55") && digits.length >= 12) digits = digits.slice(2);
  if (digits.length === 10 && /[6-9]/.test(digits[2] ?? "")) {
    digits = `${digits.slice(0, 2)}9${digits.slice(2)}`;
  }
  return digits;
}

function formatPhone(raw) {
  const digits = digitsPhone(raw);
  if (digits.length === 11) return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (digits.length === 10) return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  return raw ? String(raw).trim() : "";
}

function titleCaseCity(city) {
  if (!city) return "";
  return String(city)
    .trim()
    .toLowerCase()
    .replace(/(^|[\s'-])(\S)/g, (_, a, b) => a + b.toUpperCase());
}

function esc(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
}

const byState = {};
const seen = new Set();

for (const row of rows) {
  const name = String(row["Nome do cliente"] ?? "").trim();
  const uf = String(row["UF"] ?? "")
    .trim()
    .toUpperCase();
  const city = titleCaseCity(row["Cidade"]);
  const phoneRaw = row["Celular"];
  const email =
    String(row["E-mail do cliente"] ?? "")
      .trim()
      .split(/[\s,;]+/)
      .filter(Boolean)[0] ?? "";

  if (!name || !uf || !UF_TO_ID[uf]) continue;

  const key = `${uf}|${city.toLowerCase()}|${name.toLowerCase()}`;
  if (seen.has(key)) continue;
  seen.add(key);

  const id = UF_TO_ID[uf];
  const phone = formatPhone(phoneRaw);
  const digits = digitsPhone(phoneRaw);
  const whatsapp =
    digits.length >= 10
      ? `https://wa.me/55${digits}?text=${encodeURIComponent(
          `Olá! Vim pelo site da Núcleo ProAudio e gostaria de falar com a loja ${name}.`,
        )}`
      : "";

  (byState[id] ??= []).push({
    name,
    region: city ? `${city} — ${uf}` : uf,
    phone: phone || "—",
    email,
    whatsapp,
  });
}

for (const id of Object.keys(byState)) {
  byState[id].sort((a, b) => a.region.localeCompare(b.region, "pt-BR") || a.name.localeCompare(b.name, "pt-BR"));
}

const stateIds = Object.keys(byState).sort();
const lines = [];
lines.push(`export interface Representative {`);
lines.push(`  name: string;`);
lines.push(`  region: string;`);
lines.push(`  phone: string;`);
lines.push(`  email: string;`);
lines.push(`  whatsapp: string;`);
lines.push(`}`);
lines.push(``);
lines.push(`/** Lojas / clientes da planilha — mapa “Onde comprar”. */`);
lines.push(`export const dealersByState: Record<string, Representative[]> = {`);

for (const id of stateIds) {
  lines.push(`  ${id}: [`);
  for (const d of byState[id]) {
    lines.push(`    {`);
    lines.push(`      name: ${JSON.stringify(d.name)},`);
    lines.push(`      region: ${JSON.stringify(d.region)},`);
    lines.push(`      phone: ${JSON.stringify(d.phone)},`);
    lines.push(`      email: ${JSON.stringify(d.email)},`);
    lines.push(`      whatsapp: ${JSON.stringify(d.whatsapp)},`);
    lines.push(`    },`);
  }
  lines.push(`  ],`);
}
lines.push(`};`);
lines.push(``);

fs.writeFileSync("src/data/dealers.ts", lines.join("\n"));
console.log(
  "wrote dealers.ts —",
  seen.size,
  "unique clients across",
  stateIds.length,
  "states",
);
