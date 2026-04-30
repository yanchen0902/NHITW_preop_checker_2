import { isWithin3Months, matchAlert, getAnonymizedPatientInfo } from './utils.js';
import { renderModal } from './ui.js';

export function scanTables() {
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
      return;
    }

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      if (cells.length === 0) return;

      const rocDate = cells[columnMap['就醫日期']]?.textContent.trim();
      const medName = cells[columnMap['藥品名稱']]?.textContent.trim();
      const atcCode = columnMap['ATC5代碼'] !== -1 ? cells[columnMap['ATC5代碼']]?.textContent.trim() : '';
      const ingredient = columnMap['成分名稱'] !== -1 ? cells[columnMap['成分名稱']]?.textContent.trim() : '';

      if (isWithin3Months(rocDate)) {
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

  let deduped = {};
  matchedDrugs.forEach(item => {
    const key = `${item.rule.category}_${item.rule.name}`;
    if (!deduped[key]) {
      deduped[key] = item;
    } else {
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
