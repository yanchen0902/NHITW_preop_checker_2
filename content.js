// Clinical rules from the user
const PRE_OP_ALERTS = [
  // --- SGLT2 抑制劑 (依台大規範) ---
  { name: 'STEGLUJAN', atc: 'A10BD23', days: '4 天', category: 'SGLT2i', note: '含 Ertugliflozin 需停 4 天', cht: '釋糖健' },
  { name: 'FORXIGA', atc: 'A10BK01', days: '3 天', category: 'SGLT2i', note: 'Dapagliflozin', cht: '福適佳' },
  { name: 'JARDIANCE', atc: 'A10BK03', days: '3 天', category: 'SGLT2i', note: 'Empagliflozin', cht: '恩排糖' },
  { name: 'CANAGLU', atc: 'A10BK02', days: '3 天', category: 'SGLT2i', note: 'Canagliflozin', cht: '可拿糖' },
  { name: 'INVOKANA', atc: 'A10BK02', days: '3 天', category: 'SGLT2i', note: 'Canagliflozin', cht: '穩可糖' },
  { name: 'GLYXAMBI', atc: 'A10BD19', days: '3 天', category: 'SGLT2i', note: 'Empagliflozin/Linagliptin', cht: '恩格醣' },
  { name: 'QTERN', atc: 'A10BD21', days: '3 天', category: 'SGLT2i', note: 'Dapagliflozin/Saxagliptin', cht: '控糖穩' },
  { name: 'XIGDUO', atc: 'A10BD15', days: '3 天', category: 'SGLT2i', note: 'Dapagliflozin/Metformin', cht: '釋多糖' },
  { name: 'SYNJARDY', atc: 'A10BD20', days: '3 天', category: 'SGLT2i', note: 'Empagliflozin/Metformin', cht: '恩美糖' },

  // --- P2Y12 阻斷劑 (高風險) ---
  { name: 'LICODIN', atc: 'B01AC05', days: '10 天', category: 'P2Y12', note: 'Ticlopidine', cht: '力抗栓' },
  { name: 'EFIENT', atc: 'B01AC22', days: '7 天', category: 'P2Y12', note: 'Prasugrel (規範標註 5-7 天)', cht: '抑凝安' },
  { name: 'PLAVIX', atc: 'B01AC04', days: '5 天', category: 'P2Y12', note: 'Clopidogrel (規範標註 5-7 天)', cht: '保栓通' },
  { name: 'BRILINTA', atc: 'B01AC24', days: '5 天', category: 'P2Y12', note: 'Ticagrelor (規範標註 5-7 天)', cht: '百無凝' },

  // --- VKA & 抗血小板 ---
  { name: 'COFARIN', atc: 'B01AA03', days: '5-7 天', category: 'VKA', note: 'Warfarin', cht: '可化凝' },
  { name: 'ASPIRIN', atc: 'B01AC06', days: '5-7 天/不需停', category: 'Antiplatelet', note: '依手術風險而定', cht: '阿斯匹靈' },
  { name: 'BOKEY', atc: 'B01AC06', days: '5-7 天/不需停', category: 'Antiplatelet', note: '依手術風險而定', cht: '伯基' },
  { name: 'PLETAAL', atc: 'B01AC23', days: '3 天', category: 'Antiplatelet', note: 'Cilostazol', cht: '普達' },
  { name: 'SANDEL', atc: 'B01AC07', days: '3 天', category: 'Antiplatelet', note: 'Dipyridamole', cht: '順達' },

  // --- NOAC (新型口服抗凝血劑) ---
  { name: 'ELIQUIS', atc: 'B01AF02', days: '2 天', category: 'NOAC', note: 'Apixaban', cht: '艾必克凝' },
  { name: 'PRADAXA', atc: 'B01AE07', days: '2 天', category: 'NOAC', note: 'Dabigatran', cht: '普泰達' },
  { name: 'LIXIANA', atc: 'B01AF03', days: '2 天', category: 'NOAC', note: 'Edoxaban', cht: '里先安' },
  { name: 'XARELTO', atc: 'B01AF01', days: '2 天', category: 'NOAC', note: 'Rivaroxaban', cht: '拜瑞妥' },

  // --- Heparin & LMWH ---
  { name: 'CLEXANE', atc: 'B01AB05', days: '24 小時', category: 'Heparin', note: 'Enoxaparin', cht: '克立生' },
  { name: 'HEPARIN', atc: 'B01AB01', days: '12 小時', category: 'Heparin', note: 'Unfractionated Heparin', cht: '肝素' },

  // --- 其他 (降血脂/銀杏) ---
  { name: 'LIPANTHYL', atc: 'C10AB05', days: '24 小時', category: 'Lipid', note: 'Fenofibrate', cht: '弗尼利' },
  { name: 'LOPID', atc: 'C10AB01', days: '24 小時', category: 'Lipid', note: 'Gemfibrozil', cht: '洛必得' },
  { name: 'GINCARE', atc: 'N06DX02', days: '36 小時', category: 'Herbal', note: 'Ginkgo Biloba 銀杏', cht: '循利寧' },

  // --- ACEI/ARB (高血壓 C09) ---
  { name: 'ACEI/ARB', atc: 'C09', days: '手術當天早上暫停服用', category: 'ACEI/ARB', note: '降血壓用藥', cht: '血壓藥 (ACEI/ARB)' },

  // --- GLP-1 類藥物 (Aspiration Risk) ---
  { name: 'OZEMPIC', atc: 'A10BJ05', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '胰妥讚' },
  { name: 'TRULICITY', atc: 'A10BJ05', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '易週糖' },
  { name: 'MOUNJARO', atc: 'A10BJ07', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '蒙加若' },
  { name: 'SAXENDA', atc: 'A10BJ02', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '善纖達' },
  { name: 'RYBELSUS', atc: 'A10BJ05', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '瑞倍適' },
  { name: 'VICTOZA', atc: 'A10BJ02', days: '7 天', category: 'GLP-1 RA', note: '前一日晚間清流質飲食', cht: '胰妥善' }
];

// 判斷日期是否在近三個月內 (90天)
function isWithin3Months(rocDateStr) {
  if (!rocDateStr) return false;
  // Format usually: 112/05/20
  const parts = rocDateStr.split('/');
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10) + 1911;
  const month = parseInt(parts[1], 10) - 1; // 0-indexed
  const day = parseInt(parts[2], 10);

  const prescriptionDate = new Date(year, month, day);
  const today = new Date();

  const diffTime = Math.abs(today - prescriptionDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays <= 90;
}

// 根據藥品名稱、ATC 或成分比對高風險群
function matchAlert(medicineName, atcCode, ingredient) {
  const normName = medicineName ? medicineName.toUpperCase() : '';
  const normAtc = atcCode ? atcCode.toUpperCase() : '';
  const normIng = ingredient ? ingredient.toUpperCase() : '';

  for (let alert of PRE_OP_ALERTS) {
    // 獨立處理 ACEI/ARB (如果沒有 ATC，則從成分字尾檢查 sartan 或 pril)
    if (alert.name === 'ACEI/ARB') {
      if (normAtc.startsWith('C09') || normIng.match(/SARTAN|PRIL\b/)) {
        return alert;
      }
      continue;
    }

    // Exact name match
    if (normName.includes(alert.name)) {
      return alert;
    }
    // ATC is primary, but fallback if ATC exists in table
    if (alert.atc && normAtc.startsWith(alert.atc)) {
      return alert;
    }
  }

  // Generic SGLT2 single drug rule (fallback generic ingredient match)
  if (normAtc.startsWith('A10BK') || normIng.includes('GLIFLOZIN')) {
    return { name: medicineName, atc: atcCode || 'A10BK', days: '3 天', category: 'SGLT2i', note: '單方/含 SGLT2 抑制劑' };
  }

  // Metformin rule (checked AFTER SGLT2 so that SGLT2+Metformin combo pills correctly stop for 3 days instead of 1)
  if (normAtc.startsWith('A10BA02') || normIng.includes('METFORMIN') || normName.includes('METFORMIN')) {
    return { name: medicineName, atc: atcCode || 'Metformin', days: '1 天', category: 'Metformin', note: '含 Metformin 成分口服降血糖藥，建議術前一天停藥' };
  }

  return null;
}

// 建立主按鈕
function createFloatingButton() {
  const existingBtn = document.getElementById('preop-checker-btn');
  if (existingBtn) return;

  const btn = document.createElement('button');
  btn.id = 'preop-checker-btn';
  btn.className = 'preop-floating-btn';
  btn.innerText = '🔍 術前藥物檢索';

  btn.addEventListener('click', () => {
    scanTables();
  });

  document.body.appendChild(btn);
}

// 掃描 DOM 以獲取病患資訊並去識別化
function getAnonymizedPatientInfo() {
  let name = "";
  let id = "";

  // Strategy 1: Real NHI DOM (從真實網頁結構抓取)
  const nameEl = document.querySelector('.member-info .name');
  if (nameEl) name = nameEl.innerText.trim();

  const idEl = document.querySelector('.member-info .idno');
  if (idEl) {
    const fullText = idEl.innerText.trim();
    // 支援捕捉原始或已經有星號的 ID (例如 G201***899)
    const match = fullText.match(/[A-Z][12\d][*\d]{7}\d/);
    if (match) {
      id = match[0];
    } else {
      id = fullText.replace('身分證號：', '').trim();
    }
  }

  // Backup element matching
  if (!name) {
    const backupNameEl = document.querySelector('span[id*="Name"]');
    if (backupNameEl) name = backupNameEl.innerText.trim();
  }

  if (!name) name = "未知病患";
  if (!id) id = "A123456789";

  // Anonymize Name (e.g. 王大明 -> 王〇明)
  let anonName = name;
  if (name.length >= 2 && !name.includes('〇') && !name.includes('*')) {
    anonName = name.substring(0, 1) + '〇' + name.substring(2);
  }

  // Anonymize ID (e.g. A123456789 -> A123****89)
  let anonId = id;
  if (id.length === 10 && !id.includes('*')) {
    anonId = id.substring(0, 4) + '****' + id.substring(8);
  }

  return { name: anonName, id: anonId, originalDate: new Date().toLocaleDateString('zh-TW') };
}

// 掃描表格
function scanTables() {
  const tables = document.querySelectorAll('table');
  let matchedDrugs = [];

  tables.forEach(table => {
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    if (headers.length === 0) return;

    const columnMap = {
      藥品名稱: headers.indexOf('藥品名稱'),
      就醫日期: headers.indexOf('就醫日期'),
      ATC5代碼: headers.indexOf('ATC5代碼'),
      成分名稱: headers.indexOf('成分名稱')
    };

    if (columnMap['藥品名稱'] === -1 || columnMap['就醫日期'] === -1) {
      return; // Skip table if it doesn't have the required columns
    }

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length === 0) return;

      const rocDate = cells[columnMap['就醫日期']]?.textContent.trim();
      const medName = cells[columnMap['藥品名稱']]?.textContent.trim();
      const atcCode = columnMap['ATC5代碼'] !== -1 ? cells[columnMap['ATC5代碼']]?.textContent.trim() : '';
      const ingredient = columnMap['成分名稱'] !== -1 ? cells[columnMap['成分名稱']]?.textContent.trim() : '';

      // Rule 1: Within 3 months
      if (isWithin3Months(rocDate)) {
        // Rule 2: Match alert rules
        const alertObj = matchAlert(medName, atcCode, ingredient);
        if (alertObj) {
          matchedDrugs.push({
            date: rocDate,
            medicineName: medName,
            atcCode: atcCode || alertObj.atc,
            rule: alertObj
          });
        }
      }
    });
  });

  // Deduplicate matched drugs based on the matched rule's category and name
  let deduped = {};
  matchedDrugs.forEach(item => {
    // Unique key could be the matched alert's generic representation or the specific ATC code if generalized
    const key = `${item.rule.category}_${item.rule.name}`;
    // If it exists, we could keep the most recent one. Since NHI dates are usually sorted descending, 
    // the first one we encounter is likely the most recent.
    if (!deduped[key]) {
      deduped[key] = item;
    } else {
      // Update if the current is more recent
      const currentParts = item.date.split('/');
      const existingParts = deduped[key].date.split('/');
      const currentScore = parseInt(currentParts[0]) * 10000 + parseInt(currentParts[1]) * 100 + parseInt(currentParts[2]);
      const existingScore = parseInt(existingParts[0]) * 10000 + parseInt(existingParts[1]) * 100 + parseInt(existingParts[2]);
      if (currentScore > existingScore) {
        deduped[key] = item;
      }
    }
  });

  const finalDrugs = Object.values(deduped);
  const patientInfo = getAnonymizedPatientInfo();

  renderModal(patientInfo, finalDrugs);
}

// 宣染 Modal
// --- Updated renderModal in content.js ---
function renderModal(patientInfo, drugs) {
  const oldModal = document.getElementById('preop-modal-backdrop');
  if (oldModal) oldModal.remove();

  const backdrop = document.createElement('div');
  backdrop.id = 'preop-modal-backdrop';
  backdrop.className = 'preop-modal-backdrop';

  let tableHtml = '';
  if (drugs.length === 0) {
    tableHtml = `<div class="preop-no-data">近三個月內無偵測到特定術前高風險藥物。</div>`;
  } else {
    const rowsHtml = drugs.map(d => `
      <tr>
        <td><span class="preop-tag">${d.rule.days}</span></td>
        <td>
          ${d.rule.cht ? `<strong>${d.rule.cht}</strong><br/>` : ''}
          <span style="font-size: 0.9em; color: #4a5568;">${d.medicineName}</span>
        </td>
        <td class="hide-in-print">${d.atcCode}</td>
        <td>${d.rule.category}</td>
        <td>${d.date}</td>
        <td>${d.rule.note}</td>
      </tr>
    `).join('');

    tableHtml = `
      <table class="preop-table">
        <thead>
          <tr>
            <th style="width: 12%">建議停藥</th>
            <th style="width: 25%">藥品名稱</th>
            <th class="hide-in-print" style="width: 12%">ATC碼</th>
            <th style="width: 15%">藥理類別</th>
            <th style="width: 13%">最近處方日</th>
            <th style="width: 23%">臨床備註/指示</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  const modalHtml = `
    <div class="preop-modal-content">
      <!-- Header Section -->
      <div class="preop-modal-header">
        <div style="flex-grow: 1; text-align: center;">
          <h2 class="print-title">【術前高風險用藥評估暨停藥建議單】</h2>
          <div class="preop-subtitle">※ 本表供臨床參考，實際處置請依醫囑為準。</div>
        </div>
        <button class="preop-modal-close hide-in-print" id="preop-modal-close">&times;</button>
      </div>

      <div class="preop-modal-body">
        <!-- Patient Info Section -->
        <div class="preop-patient-info">
          <table class="patient-info-table">
            <tr>
              <th>病患姓名</th><td>${patientInfo.name}</td>
              <th>身分證字號</th><td>${patientInfo.id}</td>
              <th>評估日期</th><td>${patientInfo.originalDate}</td>
            </tr>
          </table>
        </div>

        <!-- GLP-1 Specific Alert -->
        ${drugs.some(d => d.rule.category === 'GLP-1 RA') ? `
        <div class="preop-clinical-alert">
          <strong>⚠️ 【高度 Aspiration 風險警示】</strong><br>
          偵測到 GLP-1 類藥物 (如 Ozempic, Trulicity)。除建議停藥 7 天外，<br>
          <strong>手術前一日晚間建議僅能進食清流質飲食</strong>。
        </div>` : ''}

        <!-- Main Drug Table -->
        ${tableHtml}

        <!-- Signature Section (Visible in Print) -->
        <div class="preop-signature-section">
          <div class="sig-row">
            <div class="sig-box">評估醫師/藥師簽章：____________________</div>
            <div class="sig-box">麻醉科醫師複核：____________________</div>
          </div>
          <div class="sig-footer">
            評估時間：${new Date().toLocaleString('zh-TW')} | 本文件由健保雲端藥歷自動化掃描系統產生
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="preop-modal-footer hide-in-print">
        <button class="preop-btn preop-btn-cancel" id="preop-modal-cancel">取消</button>
        <button class="preop-btn preop-btn-print" id="preop-modal-print">🖨️ 一鍵列印評估單</button>
      </div>
    </div>
  `;

  backdrop.innerHTML = modalHtml;
  document.body.appendChild(backdrop);

  // Event Listeners
  document.getElementById('preop-modal-close').onclick = () => backdrop.remove();
  document.getElementById('preop-modal-cancel').onclick = () => backdrop.remove();
  document.getElementById('preop-modal-print').onclick = () => {
    window.print();
  };
}

// 持續監控並確保按鈕存在 (處理 SPA 單頁應用程式的問題)
function ensureButtonExists() {
  const currentUrl = window.location.href;
  // 放寬檢查：只要是 NHI 網域或是我們的 mock 就可以顯示按鈕，讓醫師隨時能點擊
  if (currentUrl.includes('nhi.gov.tw') || currentUrl.includes('mock_medcloud.html')) {
    createFloatingButton();
  }
}

// 建立一個 MutationObserver 觀察整個 document.body
const observer = new MutationObserver(() => {
  ensureButtonExists();
});

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ensureButtonExists();
    observer.observe(document.body, { childList: true, subtree: true });
  });
} else {
  ensureButtonExists();
  observer.observe(document.body, { childList: true, subtree: true });
}
