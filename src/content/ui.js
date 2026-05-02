export function createFloatingButton(onClickHandler) {
  const existingBtn = document.getElementById('preop-checker-btn');
  if (existingBtn) return;

  const btn = document.createElement('button');
  btn.id = 'preop-checker-btn';
  btn.className = 'preop-floating-btn';
  btn.innerText = '🔍 術前藥物檢索';

  btn.addEventListener('click', onClickHandler);

  document.body.appendChild(btn);
}

function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag])
  );
}


export function renderModal(patientInfo, drugs) {
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
        <td><span class="preop-tag">${escapeHTML(d.rule.days)}</span></td>
        <td>
          ${d.rule.cht ? `<strong>${escapeHTML(d.rule.cht)}</strong><br/>` : ''}
          <span style="font-size: 0.9em; color: #4a5568;">${escapeHTML(d.medicineName)}</span>
        </td>
        <td class="hide-in-print">${escapeHTML(d.atcCode)}</td>
        <td>${escapeHTML(d.rule.category)}</td>
        <td>${escapeHTML(d.date)}</td>
        <td>${escapeHTML(d.rule.note)}</td>
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
              <th>病患姓名</th><td>${escapeHTML(patientInfo.name)}</td>
              <th>身分證字號</th><td>${escapeHTML(patientInfo.id)}</td>
              <th>評估日期</th><td>${escapeHTML(patientInfo.originalDate)}</td>
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

  document.getElementById('preop-modal-close').onclick = () => backdrop.remove();
  document.getElementById('preop-modal-cancel').onclick = () => backdrop.remove();
  document.getElementById('preop-modal-print').onclick = () => {
    window.print();
  };
}
