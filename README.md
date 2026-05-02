# 🇹🇼 NHITW Pre-op Checker (台灣健保雲端術前高風險藥物警示與列印工具)

[![CI](https://github.com/yanchen0902/NHITW_preop_checker_2/actions/workflows/ci.yml/badge.svg)](https://github.com/yanchen0902/NHITW_preop_checker_2/actions/workflows/ci.yml)

這是一個專為台灣醫療專業人員打造的 Chrome 擴充功能。能夠在「健保雲端藥歷系統」中，自動掃描並過濾近三個月的術前高風險藥物（如：抗凝血劑、SGLT2 抑制劑、ACEi/ARB 等），並提供**一鍵產出「去識別化」精美術前評估單**的功能。

## ✨ 核心特色

- ⚡ **自動掃描**：無需手動比對，自動透過內建字典檔 (ATC5 代碼與學名成分) 辨識高風險藥物。
- 🛡️ **隱私安全**：**100% 於本地端 (Local) 運算**。完全不收集、不外流任何病患隱私健康資訊 (PHI)。
- 🖨️ **一鍵列印**：將混亂的藥歷轉換成排版乾淨、自動去識別化的列印報表，方便直接夾入紙本病歷排刀。
- 🎯 **針對性警示**：專注於麻醉與外科手術最在意的藥物種類（如：可能造成低血壓的血壓藥、可能造成酮酸中毒的 SGLT2、影響凝血功能的抗凝劑）。

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
