export const PRE_OP_ALERTS = [
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
