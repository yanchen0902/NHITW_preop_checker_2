# 隱私權政策 (Privacy Policy)

**最後更新日期：2026年5月**

本隱私權政策適用於「NHITW Pre-op Checker (健保雲端術前高風險藥物警示與列印)」Chrome 擴充功能（以下簡稱「本擴充功能」）。我們非常重視醫療從業人員與病患的隱私安全，並嚴格遵守最小權限原則。

## 1. 資料收集與使用 (Data Collection and Use)
**本擴充功能「完全不會」收集、儲存或傳輸任何使用者或病患的資料。**

本擴充功能的核心功能為掃描並比對術前高風險藥物。所有的 HTML/DOM 解析、藥物比對邏輯、以及評估單的產生（包含病患姓名的去識別化處理），**100% 皆於您的本地端瀏覽器 (Local Browser) 內完成**。

我們不具備任何外部伺服器 (External Servers)，也不會將任何病患隱私健康資訊 (PHI, Protected Health Information) 傳送至網際網路上的任何地方。

## 2. 權限說明 (Permissions Justification)
為了讓本擴充功能正常運作，我們在 `manifest.json` 中僅宣告了最低限度所需的權限：

*   **Host Permission (`https://*.nhi.gov.tw/*`)**：
    此權限僅用於允許擴充功能在「健保雲端藥歷系統」的西藥頁面自動執行掃描腳本，以即時比對高風險藥物。本擴充功能不會在其他任何非相關的網站上執行。

本擴充功能**不使用**且**不要求**以下權限：
*   無 `storage` 權限：我們不會在您的瀏覽器中長期儲存任何病歷資料。
*   無 `activeTab` 權限：因為功能會自動在特定網域生效，我們不需要廣泛的分頁讀取權限。

## 3. 第三方服務與資料分享 (Third-Party Services & Data Sharing)
由於我們並未收集任何資料，因此**絕對沒有**任何資料會被分享、出售、或提供給任何第三方機構、廣告商或分析服務（例如 Google Analytics）。

## 4. 變更隱私權政策 (Changes to This Privacy Policy)
我們可能會不定時更新本隱私權政策以符合最新的法規或商店審查要求。任何政策的重大變更都會在此頁面更新。

## 5. 聯絡我們 (Contact Us)
若您對本隱私權政策有任何疑問或疑慮，請透過 GitHub Issues 聯絡專案維護者：
https://github.com/yanchen0902/NHITW_preop_checker_2/issues
