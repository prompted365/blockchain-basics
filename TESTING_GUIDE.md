# Testing Guide - Blockchain Scam Detector 2026

## 🧪 How to Test All Phase 2 Features

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API testing)
- Working speakers/headphones (for audio testing)

---

## 🎯 Feature Testing Checklist

### 1. Basic Functionality ✅

**Test Scenario Loading:**
1. Open the app: https://8000-iu6ifvqtaw2doimiclxsm-d0b9e1e2.sandbox.novita.ai
2. Verify scenario 1 loads (MetaMask wallet drainer)
3. Check that scenario counter shows "Scenario 1 of 30"
4. Verify difficulty badge and category badge display correctly

**Expected Result:** 
- ✅ Scenario card appears with proper formatting
- ✅ Progress bar shows 0% complete
- ✅ Stats panel shows Level 1, 0 XP

---

### 2. Audio System Testing 🔊

**Test Audio Toggle:**
1. Look for audio button in header (🔊 icon)
2. Click the audio toggle button
3. Verify icon changes to 🔇
4. Click again to re-enable
5. Verify you hear a click sound when enabled

**Test Audio Feedback:**
1. Ensure audio is enabled (🔊 showing)
2. Select a CORRECT answer
3. Listen for success sound (pleasant chord)
4. Go to next scenario
5. Select an INCORRECT answer
6. Listen for error sound (harsh buzz)

**Test Audio Persistence:**
1. Disable audio (🔇)
2. Refresh the page (F5 or Cmd+R)
3. Verify audio remains disabled after refresh
4. Enable audio and refresh again
5. Verify audio remains enabled

**Expected Results:**
- ✅ Toggle button changes icon immediately
- ✅ Toast notification shows "Sound enabled/muted"
- ✅ Success sound = pleasant C+E chord
- ✅ Error sound = harsh sawtooth wave
- ✅ Settings persist across page refreshes
- ✅ Click sound plays on re-enable

---

### 3. Animation Testing ✨

**Test Confetti Effect:**
1. Answer any scenario CORRECTLY
2. Watch for confetti animation
3. Verify 50 colorful particles fall from top
4. Verify particles fade out before reaching bottom
5. Answer multiple scenarios correctly to see variation

**Test Scenario Transitions:**
1. Click "Next Scenario →" button
2. Watch for fade-out effect (scenario gets transparent)
3. Watch for fade-in effect (new scenario appears)
4. Verify smooth transition (no jarring changes)
5. Verify page scrolls to top automatically

**Expected Results:**
- ✅ Confetti appears only on CORRECT answers
- ✅ ~50 particles with 7 different colors
- ✅ Mix of circles and squares
- ✅ Particles rotate and drift sideways
- ✅ Fade-out takes ~300ms
- ✅ Fade-in takes ~300ms
- ✅ Smooth visual experience

---

### 4. Investigation Tools Testing 🔍

**Test Basic Tool Functionality:**
1. Look for "Investigation Tools" section in any scenario
2. Click "🔍 URL Scanner" button
3. Verify you hear a tool activation sound (🔊 enabled)
4. Verify results appear below tools
5. Click another tool (e.g., "⛓️ Contract Analyzer")
6. Verify different results appear

**Test API Integration:**
1. Click "⛽ Gas Tracker" tool
2. Wait for "⏳ Analyzing..." message
3. Look for "🌐 LIVE BLOCKCHAIN DATA:" in results
4. Verify real gas prices appear (if API available)
5. Check for "Current Gas: 🐢 X | ⚡ Y | 🚀 Z gwei"

**Test API Fallback:**
1. Open browser console (F12)
2. Use any tool
3. If you see "API enhancement failed, using simulated data"
4. Verify tool still shows simulated results (fallback working)

**Expected Results:**
- ✅ Tool sound plays when clicking tools
- ✅ "Analyzing..." loading state appears
- ✅ Results display with appropriate icons
- ✅ Real API data shows when available
- ✅ Simulated data works as fallback
- ✅ No broken functionality even with API failures

---

### 5. Scenario Coverage Testing 📚

**Test All 30 Scenarios:**
1. Play through first 5 scenarios
2. Verify variety: emails, websites, transactions, chats
3. Jump to scenario 16 (Clipboard Malware) by answering first 15
4. Verify new scenarios show different attack vectors
5. Check scenarios 20-30 for social engineering variety

**Test Difficulty Progression:**
1. Easy scenarios (1-10): Clear red flags
2. Medium scenarios (11-20): Subtle clues
3. Hard scenarios (21-30): Requires tool usage and analysis

**Test Category Distribution:**
- 🔐 Wallet Security (scenarios: 1, 2, 8, 10, 16, 18, 28, 30)
- 💎 DeFi Protocol (scenarios: 3, 5, 9, 17, 21, 23, 24, 26)
- 🖼️ NFT (scenarios: 6, 12, 13, 18, 22, 28)
- ⚡ Layer 2 (scenarios: 11, 19, 24, 29)
- 💬 Social Engineering (scenarios: 14, 20, 27)
- 💵 Stablecoin (scenario: 23)

**Expected Results:**
- ✅ All 30 scenarios load without errors
- ✅ Diverse presentation formats (email, website, chat, transaction)
- ✅ Each scenario has unique educational content
- ✅ Red flags clearly explained in feedback
- ✅ Blockchain context provided

---

### 6. Gamification Testing 🏆

**Test XP System:**
1. Start with 0 XP at Level 1
2. Answer correctly: +100 XP (or scenario-specific amount)
3. Verify XP bar fills gradually
4. Reach 1000 XP to level up to Level 2
5. Verify "🎊 LEVEL UP!" notification appears

**Test Achievements:**
1. Get first correct answer → "🎯 First Blood" achievement
2. Use any investigation tool → Progress toward "🔍 Tool Master"
3. Get 5 correct in a row → "🔥 Perfect Five" achievement
4. Listen for achievement sound (arpeggio)
5. Check achievements panel to see unlocked badges

**Test Streaks:**
1. Answer 3 correctly in a row → Streak: 3
2. Answer incorrectly → Streak resets to 0
3. Check stats panel for "Current Streak" and "Best Streak"

**Expected Results:**
- ✅ XP increases after correct answers
- ✅ Level up animation and sound
- ✅ Achievements unlock with notification
- ✅ Achievement sound = C-E-G-C arpeggio
- ✅ Streak counter updates in real-time
- ✅ Stats panel reflects current progress

---

### 7. Skill Tree Testing 🌳

**Test Skill Progress:**
1. Answer a phishing email correctly → "Phishing Detection" skill gains XP
2. Answer a DeFi scenario correctly → "Contract Analysis" skill gains XP
3. Answer a social engineering scenario → "Social Engineering" skill gains XP
4. Use tools → "Technical Auditing" skill gains XP

**Test Skill Level-Up:**
1. Gain 100 XP in a skill → Skill levels up
2. Verify skill bar resets and max XP increases
3. Check skill level indicator updates

**Expected Results:**
- ✅ Skills gain XP based on scenario category
- ✅ Each skill has independent progress bar
- ✅ Skills level up separately from main level
- ✅ Skill progress visible in stats panel

---

### 8. Mobile Responsiveness Testing 📱

**Test on Mobile Device or Responsive Mode:**
1. Open DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)
2. Select iPhone or Android device
3. Verify layout adapts to smaller screen
4. Check that buttons are touchable (not too small)
5. Verify audio toggle still accessible
6. Test scenario navigation works smoothly

**Expected Results:**
- ✅ Layout stacks vertically on mobile
- ✅ Text remains readable (not too small)
- ✅ Buttons large enough for touch (44x44px minimum)
- ✅ No horizontal scrolling required
- ✅ All features work on touchscreen

---

### 9. Final Results Screen Testing 📊

**Test Completion:**
1. Play through all 30 scenarios (or answer quickly to test)
2. Click "See Results →" after scenario 30
3. Verify results screen shows:
   - Total score (X/30)
   - Accuracy percentage
   - Rank badge (Crypto Newbie → Blockchain Guardian)
   - Total time taken
   - Best streak
   - Skills breakdown
   - Achievements earned

**Test Social Sharing:**
1. Look for "Share Your Results" section
2. Click "Share on Twitter" button
3. Verify pre-filled tweet text includes your score
4. Click "Copy Results" button
5. Verify toast notification confirms copy

**Expected Results:**
- ✅ Results screen displays accurate statistics
- ✅ Rank badge appropriate for score
- ✅ Time displayed in readable format
- ✅ Skills show final levels
- ✅ Achievements list all unlocked badges
- ✅ Share buttons work correctly

---

## 🐛 Bug Reporting

If you find any issues during testing:

### Check Browser Console
1. Press F12 to open DevTools
2. Click "Console" tab
3. Look for red error messages
4. Copy any error messages

### Report Format
```
**Bug:** [Short description]
**Steps to Reproduce:** 
1. Step 1
2. Step 2
**Expected:** [What should happen]
**Actual:** [What actually happened]
**Browser:** [Chrome/Firefox/Safari/Edge + version]
**Console Errors:** [Any error messages]
```

---

## ✅ Testing Completion Checklist

After testing all features, verify:

- [ ] All 30 scenarios load without errors
- [ ] Audio system works (toggle, persistence, sounds)
- [ ] Confetti appears on correct answers
- [ ] Scenario transitions are smooth
- [ ] Investigation tools show results
- [ ] API integration works (or falls back gracefully)
- [ ] XP and leveling system functions
- [ ] Achievements unlock properly
- [ ] Skills progress independently
- [ ] Mobile layout is responsive
- [ ] Final results screen displays correctly
- [ ] No JavaScript console errors
- [ ] Page loads in under 10 seconds

**If all items checked, Phase 2 testing is COMPLETE!** ✅

---

## 🔧 Developer Testing Commands

### Validate JavaScript Syntax
```bash
cd /home/user/webapp
node --check audio-manager.js
node --check api-service.js
node --check scenarios.js
node --check game.js
```

### Start Local Server
```bash
cd /home/user/webapp
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Check File Sizes
```bash
cd /home/user/webapp
ls -lh *.js *.html
```

### View Git Status
```bash
cd /home/user/webapp
git status
git log --oneline -5
```

---

**Happy Testing! 🚀**

Remember: The goal is to ensure users have a smooth, educational, and engaging experience while learning to identify blockchain scams.
