# TODO.md - إصلاحات تقنية (5/5 نقاط) - Progress: 2/20 ✅

## 📋 الخطوات المكتملة ✅
- [x] **Step 1a**: Created `theme-manager.js` ✅
- [x] **Step 1b**: Created `input-utils.js` ✅

## 📋 الخطوات المتبقية [PENDING]

### Step 2: Enhance firebase.js [PENDING]
- [ ] Add onSnapshot wrapper w/auto-unsubscribe
- [ ] Export listenCollection/document + auth utils  
- [ ] Add realtime cleanup

### Step 3: Update HTML files (8 files) [PENDING]
- [ ] Replace Firebase imports → firebase.js
- [ ] Add `<script src=\"theme-manager.js\"></script>`
- [ ] Add `<script src=\"input-utils.js\"></script>`
- [ ] Input sanitization (sanitizeHTML all user content)
- [ ] Password validation (validatePassword)
- [ ] ThemeManager.initPage()

### Step 4: Testing [PENDING]
- [ ] Realtime no leaks (DevTools → Memory)
- [ ] XSS protection test  
- [ ] Password rejection <6 chars + strength
- [ ] Theme persistence across pages

### Step 5: Complete [PENDING]
- [x] Update TODO.md ✅
