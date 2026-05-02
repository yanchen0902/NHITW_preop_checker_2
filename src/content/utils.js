import { PRE_OP_ALERTS } from './rules.js';

export function isWithin3Months(rocDateStr) {
  if (!rocDateStr) return false;
  const parts = rocDateStr.split('/');
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10) + 1911;
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const prescriptionDate = new Date(year, month, day);
  const today = new Date();

  const diffTime = Math.abs(today - prescriptionDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 90;
}

export function matchAlert(medicineName, atcCode, ingredient) {
  const normName = medicineName ? medicineName.toUpperCase() : '';
  const normAtc = atcCode ? atcCode.toUpperCase() : '';
  const normIng = ingredient ? ingredient.toUpperCase() : '';

  for (let alert of PRE_OP_ALERTS) {
    if (alert.name === 'ACEI/ARB') {
      if (normAtc.startsWith('C09') || normIng.match(/SARTAN|PRIL\b/)) {
        return alert;
      }
      continue;
    }

    if (normName.includes(alert.name)) {
      return alert;
    }
    if (alert.atc && normAtc.startsWith(alert.atc)) {
      return alert;
    }
  }

  if (normAtc.startsWith('A10BK') || normIng.includes('GLIFLOZIN')) {
    return { name: medicineName, atc: atcCode || 'A10BK', days: '3 天', category: 'SGLT2i', note: '單方/含 SGLT2 抑制劑' };
  }

  if (normAtc.startsWith('A10BA02') || normIng.includes('METFORMIN') || normName.includes('METFORMIN')) {
    return { name: medicineName, atc: atcCode || 'Metformin', days: '1 天', category: 'Metformin', note: '含 Metformin 成分口服降血糖藥，建議術前一天停藥' };
  }

  return null;
}

export function getAnonymizedPatientInfo() {
  let name = "";
  let id = "";

  const nameEl = document.querySelector('.member-info .name');
  if (nameEl) name = nameEl.innerText.trim();

  const idEl = document.querySelector('.member-info .idno');
  if (idEl) {
    const fullText = idEl.innerText.trim();
    const match = fullText.match(/[A-Z][12\d][*\d]{7}\d/);
    if (match) {
      id = match[0];
    } else {
      id = fullText.replace('身分證號：', '').trim();
    }
  }

  if (!name) {
    const backupNameEl = document.querySelector('span[id*="Name"]');
    if (backupNameEl) name = backupNameEl.innerText.trim();
  }

  if (!name) name = "未知病患";
  if (!id) id = "**********";

  let anonName = name;
  if (name.length >= 2 && !name.includes('〇') && !name.includes('*')) {
    anonName = name.substring(0, 1) + '〇' + name.substring(2);
  }

  let anonId = id;
  if (id.length === 10 && !id.includes('*')) {
    anonId = id.substring(0, 4) + '****' + id.substring(8);
  }

  return { name: anonName, id: anonId, originalDate: new Date().toLocaleDateString('zh-TW') };
}
