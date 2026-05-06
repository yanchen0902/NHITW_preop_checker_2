# 🇹🇼 NHITW Pre-op Checker (台灣健保雲端術前高風險藥物警示與列印工具)

[![CI](https://github.com/yanchen0902/NHITW_preop_checker_2/actions/workflows/ci.yml/badge.svg)](https://github.com/yanchen0902/NHITW_preop_checker_2/actions/workflows/ci.yml)

這是一個專為台灣醫療專業人員打造的 Chrome 擴充功能。能夠在「健保雲端藥歷系統」中，自動掃描並過濾近三個月的術前高風險藥物（如：抗凝血劑、SGLT2 抑制劑、ACEi/ARB 等），並提供**一鍵產出「去識別化」精美術前評估單**的功能。

## ✨ 核心特色

- ⚡ **自動掃描**：無需手動比對，自動透過內建字典檔 (ATC5 代碼與學名成分) 辨識高風險藥物。
- 🛡️ **隱私安全**：**100% 於本地端 (Local) 運算**。完全不收集、不外流任何病患隱私健康資訊 (PHI)。
- 🖨️ **一鍵列印**：將混亂的藥歷轉換成排版乾淨、自動去識別化的列印報表，方便直接夾入紙本病歷排刀。
- 🎯 **針對性警示**：專注於麻醉與外科手術最在意的藥物種類（如：可能造成低血壓的血壓藥、可能造成酮酸中毒的 SGLT2、影響凝血功能的抗凝劑）。

## 💊 術前高風險藥物停藥規則表 (Pre-op Medication Rules)

系統內建以下高風險藥物的自動辨識與停藥建議規則。請注意，部分規則（如 Metformin）採動態關鍵字與 ATC 代碼比對，涵蓋範圍更廣：

| 藥物類別 (Category) | 成分學名 (Generic Name) | 常見商品名 (Brand Name) | ATC 代碼 | 停藥天數 (Days) | 備註說明 (Note) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Metformin** | Metformin | *(多廠牌)* | A10BA02 | **1 天** | 含 Metformin 成分口服降血糖藥，建議術前一天停藥 |
| **SGLT2i** | Ertugliflozin | Steglujan (釋糖健) | A10BD23 | 4 天 | 複方(含 Sitagliptin)，需停 4 天 |
| **SGLT2i** | Dapagliflozin | Forxiga (福適佳) | A10BK01 | 3 天 | |
| **SGLT2i** | Empagliflozin | Jardiance (恩排糖) | A10BK03 | 3 天 | |
| **SGLT2i** | Canagliflozin | Canaglu (可拿糖), Invokana (穩可糖) | A10BK02 | 3 天 | |
| **SGLT2i** | Empagliflozin/Linagliptin | Glyxambi (恩格醣) | A10BD19 | 3 天 | 複方 |
| **SGLT2i** | Dapagliflozin/Saxagliptin | Qtern (控糖穩) | A10BD21 | 3 天 | 複方 |
| **SGLT2i** | Dapagliflozin/Metformin | Xigduo (釋多糖) | A10BD15 | 3 天 | 複方 |
| **SGLT2i** | Empagliflozin/Metformin | Synjardy (恩美糖) | A10BD20 | 3 天 | 複方 |
| **GLP-1 RA** | Semaglutide | Ozempic (胰妥讚), Rybelsus (瑞倍適) | A10BJ05, A10BJ06 | 7 天 | 前一日全天清流質飲食 |
| **GLP-1 RA** | Liraglutide | Victoza (胰妥善), Saxenda (善纖達) | A10BJ02 | 7 天 | 前一日全天清流質飲食 |
| **GLP-1 RA** | Dulaglutide | Trulicity (易週糖) | A10BJ05 | 7 天 | 前一日全天清流質飲食 |
| **GLP-1 RA** | Tirzepatide | Mounjaro (蒙加若) | A10BJ07 | 7 天 | 前一日全天清流質飲食 (GLP-1/GIP) |
| **GLP-1 RA** | Exenatide | Byetta (百泌達), Bydureon (百達揚) | A10BJ01 | 7 天 | 前一日全天清流質飲食 |
| **P2Y12** | Ticlopidine | Licodin (力抗栓) | B01AC05 | 10 天 | |
| **P2Y12** | Prasugrel | Efient (抑凝安) | B01AC22 | 7 天 | (規範標註 5-7 天) |
| **P2Y12** | Clopidogrel | Plavix (保栓通) | B01AC04 | 5 天 | (規範標註 5-7 天) |
| **P2Y12** | Ticagrelor | Brilinta (百無凝) | B01AC24 | 5 天 | (規範標註 5-7 天) |
| **VKA** | Warfarin | Cofarin (可化凝) | B01AA03 | 5-7 天 | |
| **Antiplatelet**| Aspirin | Bokey (伯基), Aspirin (阿斯匹靈) | B01AC06 | 5-7 天/不需停 | 依手術風險而定 |
| **Antiplatelet**| Cilostazol | Pletaal (普達) | B01AC23 | 3 天 | |
| **Antiplatelet**| Dipyridamole | Sandel (順達) | B01AC07 | 3 天 | |
| **NOAC** | Apixaban | Eliquis (艾必克凝) | B01AF02 | 2 天 | |
| **NOAC** | Dabigatran | Pradaxa (普泰達) | B01AE07 | 2 天 | |
| **NOAC** | Edoxaban | Lixiana (里先安) | B01AF03 | 2 天 | |
| **NOAC** | Rivaroxaban | Xarelto (拜瑞妥) | B01AF01 | 2 天 | |
| **Heparin** | Enoxaparin | Clexane (克立生) | B01AB05 | 24 小時 | |
| **Heparin** | Unfractionated Heparin | Heparin (肝素) | B01AB01 | 12 小時 | |
| **Lipid** | Fenofibrate | Lipanthyl (弗尼利) | C10AB05 | 24 小時 | |
| **Lipid** | Gemfibrozil | Lopid (洛必得) | C10AB01 | 24 小時 | |
| **Herbal** | Ginkgo Biloba | Gincare (循利寧) | N06DX02 | 36 小時 | 銀杏 |
| **ACEI/ARB** | ACEI / ARB 類 | *(多廠牌血壓藥)* | C09 | 手術當天早上暫停 | 降血壓用藥 |

## 🚀 安裝方式

目前您可以透過兩種方式安裝此擴充功能：

### 方法一：從 Chrome Web Store 下載 (推薦)
*(待審核通過後，可在此補上 Chrome Web Store 連結)*

### 方法二：開發者模式 (從 GitHub 載入)
如果您想直接使用最新原始碼，或是自行修改字典檔：
1. 將此專案 Clone 或下載 ZIP 檔並解壓縮到您的電腦中。
2. 請先安裝 [Node.js](https://nodejs.org/)。
3. 在終端機 (Terminal) 中進入專案資料夾，執行 `npm install` 安裝相依套件。
4. 執行 `npm run build` 編譯專案，這會產生一個 `dist/` 資料夾。
5. 打開 Chrome 瀏覽器，在網址列輸入 `chrome://extensions/` 並進入。
6. 開啟右上角的 **「開發人員模式 (Developer mode)」**。
7. 點擊左上角的 **「載入未封裝項目 (Load unpacked)」**。
8. 選擇剛剛編譯出來的 **`dist/`** 資料夾。
9. 完成！您現在可以在健保雲端系統中使用它了。

## 🛠️ 開發與技術架構

本專案使用 **Vite** 進行模組化打包，符合 Chrome Extension Manifest V3 規範。

- `npm run dev`：啟動開發模式，當您修改 `src/` 內的程式碼時，Vite 會自動進行 Hot Reload (需重新整理擴充功能載入的頁面)。
- `npm run build`：建立可用於上架的正式版本 (輸出至 `dist/`)。
- `npm run test`：執行 Vitest 單元測試。
- `npm run lint` / `npm run format`：執行 ESLint 與 Prettier 進行程式碼品質檢查與格式化。

**核心目錄結構 (Canonical Structure)：**
```text
NHITW_preop_checker_2/
├── .github/                 ← CI/CD 工作流與 Issue 模板
├── public/                  ← 靜態資源 (圖示、列印頁面)
│   ├── icon{16,32,48,128}.png
│   └── med_record.html
├── src/                     ← 核心原始碼
│   └── content/
│       ├── rules.js         ← 高風險藥物規則表 (ATC 代碼與天數)
│       ├── scanner.js       ← 網頁 DOM 表格掃描邏輯
│       ├── ui.js            ← 負責產生浮動按鈕與列印評估單 Modal (具備 XSS 防護)
│       └── utils.js         ← 日期計算與資料去識別化工具
├── tests/                   ← 測試程式碼
│   ├── e2e/                 ← Playwright E2E 模擬測試
│   ├── fixtures/
│   │   └── mock_medcloud.html ← 開發用 Mock 頁面
│   └── unit/                ← Vitest 單元測試
├── dist/                    ← 擴充功能打包產物 (由 Vite 產生，不進版控)
├── docs/                    ← 開發與上架說明文件
├── manifest.json            ← 擴充功能設定檔 (Vite 進入點)
├── package.json             
└── README.md
```

## ⚠️ 免責聲明 (Disclaimer)

本工具僅為「醫療輔助性質」，旨在減少人工肉眼審閱的時間與疏漏。**實際的臨床醫療決策與藥物確認，仍須由專業醫師親自核對為準**。本擴充功能開發者不對任何醫療疏漏或系統判讀錯誤負擔法律責任。

## 📝 授權條款 (License)

MIT License
