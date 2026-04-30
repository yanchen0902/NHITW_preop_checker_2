# Chrome Web Store 上架須知 (針對醫療與 PHI)

由於本擴充功能（NHITW Pre-op Checker）用於健保雲端藥歷系統，涉及高度敏感的病患隱私健康資訊 (PHI)，因此在 Chrome Web Store 上架時，審查員會以極度嚴格的標準審查權限與資料流向。

## 審查員關注的核心點

1. **是否有將病患資料傳送出本地端？**
2. **要求的權限是否真的有用到？** (Principle of Least Privilege)

## 權限宣告策略

在 `manifest.json` 中，我們**僅宣告了 `https://*.nhi.gov.tw/*` 的 Host Permissions**。

**為何不需要 `activeTab` 或 `storage`？**
- 過去的版本可能跨頁面傳遞資料，需要 `storage`。但目前的架構直接透過 Content Script 在原網頁上注入 `@media print` 樣式並觸發 `window.print()`。
- 因為已經有了 Host Permission 允許我們在背景自動執行腳本，所以不需要使用者點擊 Icon 來觸發的 `activeTab` 權限。
- 權限越少，越容易通過隱私安全審查。

## 隱私權政策與問卷填寫指南

如果您需要填寫商店的隱私問卷，請遵守以下原則：

1. **是否收集資料？**
   選擇 **「否 (No) / 不收集任何資料」**。因為我們只是「讀取 (Read) 本地 DOM」並「本地處理 (Local process)」，並沒有「收集 (Collect) 到外部伺服器」。

2. **遠端程式碼 (Remote Code)？**
   選擇 **「否 (No)」**。所有的邏輯（含字典檔）皆打包於擴充功能內。

3. **審查員的信件回覆範本 (如有被要求解釋)**
   > "This extension operates entirely locally within the user's browser. It reads the DOM of the NHI MediCloud system solely to highlight high-risk medications. No patient health information (PHI) or personal data is collected, stored remotely, or transmitted to any external servers. We also do not request unnecessary permissions like 'activeTab' or 'storage', adhering to the principle of least privilege."
