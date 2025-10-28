// Blockchain Scam Detector 2026 - Game Engine
// Interactive investigation tools, gamification, and scenario management

// ========================================
// AUDIO MANAGEMENT
// ========================================

function toggleAudio() {
  const enabled = audioManager.toggle();
  document.getElementById('audioIcon').textContent = enabled ? '🔊' : '🔇';
  showToast(enabled ? 'Sound enabled' : 'Sound muted', 'info');
}

function playClickSound() {
  if (typeof audioManager !== 'undefined') {
    audioManager.playClick();
  }
}

// Initialize audio on first user interaction
document.addEventListener('click', () => {
  if (typeof audioManager !== 'undefined') {
    audioManager.init();
  }
}, { once: true });

// ========================================
// ANIMATIONS
// ========================================

function createConfetti() {
  const confettiCount = 50;
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.zIndex = '10000';
    confetti.style.pointerEvents = 'none';
    
    document.body.appendChild(confetti);
    
    const duration = 2000 + Math.random() * 1000;
    const rotation = Math.random() * 360;
    const xMovement = (Math.random() - 0.5) * 100;
    
    confetti.animate([
      { 
        transform: 'translateY(0) translateX(0) rotate(0deg)',
        opacity: 1
      },
      { 
        transform: `translateY(${window.innerHeight + 20}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
        opacity: 0
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
      confetti.remove();
    };
  }
}

// ========================================
// GAME STATE MANAGEMENT
// ========================================

const gameState = {
  currentScenarioIndex: 0,
  xp: 0,
  level: 1,
  streak: 0,
  maxStreak: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  toolsUsed: 0,
  hintsUsed: 0,
  startTime: Date.now(),
  scenariosCompleted: [],
  achievements: [],
  skills: {
    phishingDetection: { level: 1, xp: 0, maxXP: 100 },
    contractAnalysis: { level: 1, xp: 0, maxXP: 100 },
    socialEngineering: { level: 1, xp: 0, maxXP: 100 },
    technicalAuditing: { level: 1, xp: 0, maxXP: 100 }
  }
};

// ========================================
// ACHIEVEMENTS SYSTEM
// ========================================

const ACHIEVEMENTS = [
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Detect your first scam',
    icon: '🎯',
    condition: () => gameState.correctAnswers >= 1,
    xpReward: 50
  },
  {
    id: 'perfect_five',
    name: 'Perfect Five',
    description: 'Get 5 scenarios correct in a row',
    icon: '🔥',
    condition: () => gameState.streak >= 5,
    xpReward: 200
  },
  {
    id: 'investigator',
    name: 'Investigator',
    description: 'Use investigation tools 10 times',
    icon: '🔍',
    condition: () => gameState.toolsUsed >= 10,
    xpReward: 100
  },
  {
    id: 'phishing_destroyer',
    name: 'Phishing Destroyer',
    description: 'Correctly identify 10 phishing attempts',
    icon: '🎣',
    condition: () => {
      const phishingScenarios = gameState.scenariosCompleted.filter(s => 
        SCENARIOS[s]?.category === 'wallet' && gameState.correctAnswers > 0
      );
      return phishingScenarios.length >= 10;
    },
    xpReward: 300
  },
  {
    id: 'defi_expert',
    name: 'DeFi Expert',
    description: 'Master all DeFi scam scenarios',
    icon: '💎',
    condition: () => {
      const defiScenarios = SCENARIOS.filter(s => s.category === 'defi');
      const completed = gameState.scenariosCompleted.filter(idx => 
        SCENARIOS[idx]?.category === 'defi'
      );
      return completed.length >= defiScenarios.length;
    },
    xpReward: 500
  },
  {
    id: 'speedrun',
    name: 'Speedrunner',
    description: 'Complete a scenario in under 30 seconds',
    icon: '⚡',
    condition: () => false, // Checked per scenario
    xpReward: 150
  },
  {
    id: 'flawless_victory',
    name: 'Flawless Victory',
    description: 'Complete all scenarios with 100% accuracy',
    icon: '👑',
    condition: () => {
      return gameState.scenariosCompleted.length === SCENARIOS.length && 
             gameState.incorrectAnswers === 0;
    },
    xpReward: 1000
  }
];

// ========================================
// INVESTIGATION TOOLS
// ========================================

const InvestigationTools = {
  urlAnalyzer: {
    name: 'URL Analyzer',
    icon: '🔗',
    description: 'Check for unicode spoofing, suspicious domains',
    analyze: (url) => {
      const results = {
        type: 'info',
        findings: []
      };

      // Check for unicode characters
      const hasUnicode = /[^\x00-\x7F]/.test(url);
      if (hasUnicode) {
        results.type = 'danger';
        results.findings.push('⚠️ Unicode characters detected! This could be domain spoofing.');
        results.findings.push(`Original: ${url}`);
        results.findings.push(`ASCII: ${url.replace(/[^\x00-\x7F]/g, '?')}`);
      }

      // Check for suspicious keywords
      const suspiciousKeywords = ['verify', 'claim', 'airdrop', 'support', 'security', 'wallet', 'migration', 'urgent'];
      const foundSuspicious = suspiciousKeywords.filter(kw => url.toLowerCase().includes(kw));
      if (foundSuspicious.length > 0) {
        results.type = results.type === 'danger' ? 'danger' : 'warning';
        results.findings.push(`⚠️ Suspicious keywords: ${foundSuspicious.join(', ')}`);
      }

      // Extract actual domain
      try {
        const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
        const domain = urlObj.hostname;
        results.findings.push(`🌐 Domain: ${domain}`);
        
        // Check for subdomain tricks
        const parts = domain.split('.');
        if (parts.length > 2) {
          results.type = results.type === 'danger' ? 'danger' : 'warning';
          results.findings.push(`⚠️ Subdomain detected: ${parts.slice(0, -2).join('.')}`);
          results.findings.push(`🎯 Actual domain: ${parts.slice(-2).join('.')}`);
        }

        // Check for known legitimate domains
        const legitimateDomains = ['uniswap.org', 'aave.com', 'opensea.io', 'metamask.io', 'arbitrum.io', 'optimism.io', 'base.org', 'ethereum.org'];
        const isLegit = legitimateDomains.some(d => domain.endsWith(d));
        if (isLegit && results.type === 'info') {
          results.type = 'success';
          results.findings.push('✅ Domain matches known legitimate protocol');
        }
      } catch (e) {
        results.type = 'danger';
        results.findings.push('❌ Invalid URL format');
      }

      if (results.findings.length === 0) {
        results.findings.push('ℹ️ No obvious red flags detected. Always verify URLs through official channels.');
      }

      return results;
    }
  },

  domainLookup: {
    name: 'Domain Lookup',
    icon: '🌐',
    description: 'Check domain registration info',
    analyze: (url) => {
      const results = {
        type: 'info',
        findings: []
      };

      try {
        const urlObj = new URL(url.startsWith('http') ? url : 'https://' + url);
        const domain = urlObj.hostname;

        // Simulate WHOIS data (in real app, would call API)
        results.findings.push(`📋 Domain: ${domain}`);
        
        // Check if domain looks suspicious
        if (domain.includes('support') || domain.includes('verify') || domain.includes('secure')) {
          results.type = 'warning';
          results.findings.push('⚠️ Domain contains suspicious keywords often used in phishing');
        }

        if (domain.split('.').length > 3) {
          results.type = 'warning';
          results.findings.push('⚠️ Multiple subdomains - verify this is the correct site');
        }

        // Provide context
        results.findings.push('');
        results.findings.push('💡 Tips:');
        results.findings.push('• Always verify domains via official Twitter/Discord');
        results.findings.push('• Bookmark legitimate sites');
        results.findings.push('• Be wary of extra words in domain names');

      } catch (e) {
        results.type = 'danger';
        results.findings.push('❌ Could not parse URL');
      }

      return results;
    }
  },

  contractAnalyzer: {
    name: 'Contract Analyzer',
    icon: '📜',
    description: 'Check smart contract safety',
    analyze: (address) => {
      const results = {
        type: 'info',
        findings: []
      };

      // Check if it looks like an address
      if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
        results.type = 'warning';
        results.findings.push('⚠️ Invalid Ethereum address format');
        return results;
      }

      results.findings.push(`📍 Address: ${address}`);
      results.findings.push('');

      // Simulate contract check (in real app, would call Etherscan API)
      const isVerified = Math.random() > 0.5; // Simulate
      
      if (isVerified) {
        results.type = 'success';
        results.findings.push('✅ Contract is verified on Etherscan');
        results.findings.push('✅ Source code is publicly available');
      } else {
        results.type = 'danger';
        results.findings.push('❌ Contract is NOT verified');
        results.findings.push('⚠️ Cannot audit source code - HIGH RISK');
      }

      results.findings.push('');
      results.findings.push('🔍 What to check:');
      results.findings.push('• Is contract verified on Etherscan?');
      results.findings.push('• Does it have an audit report?');
      results.findings.push('• How old is the contract?');
      results.findings.push('• How many transactions has it processed?');

      return results;
    }
  },

  tokenScanner: {
    name: 'Token Scanner',
    icon: '🪙',
    description: 'Analyze token safety and liquidity',
    analyze: (tokenAddress) => {
      const results = {
        type: 'info',
        findings: []
      };

      if (!tokenAddress || !tokenAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        results.type = 'warning';
        results.findings.push('⚠️ Invalid token address format');
        return results;
      }

      results.findings.push(`🪙 Token Address: ${tokenAddress}`);
      results.findings.push('');

      // Simulate token analysis
      const riskScore = Math.floor(Math.random() * 100);
      
      if (riskScore < 30) {
        results.type = 'success';
        results.findings.push('✅ Low Risk Token');
        results.findings.push('✅ Liquidity is locked');
        results.findings.push('✅ No hidden mint functions');
        results.findings.push('✅ Contract is verified');
      } else if (riskScore < 70) {
        results.type = 'warning';
        results.findings.push('⚠️ Medium Risk Token');
        results.findings.push('⚠️ Some concerns detected');
        results.findings.push('⚠️ Low liquidity (< $100k)');
      } else {
        results.type = 'danger';
        results.findings.push('🚨 HIGH RISK TOKEN');
        results.findings.push('❌ Honeypot detected - cannot sell');
        results.findings.push('❌ Owner can modify balances');
        results.findings.push('❌ Unverified contract');
      }

      results.findings.push('');
      results.findings.push('🛡️ Safety Checklist:');
      results.findings.push('• Check liquidity depth (>$1M safer)');
      results.findings.push('• Verify liquidity is locked');
      results.findings.push('• Check if honeypot using tools');
      results.findings.push('• Look for audit reports');

      return results;
    }
  },

  gasTracker: {
    name: 'Gas Tracker',
    icon: '⛽',
    description: 'Check current gas prices',
    analyze: () => {
      const results = {
        type: 'info',
        findings: []
      };

      // Simulate gas prices
      const slowGas = Math.floor(Math.random() * 10) + 10;
      const normalGas = slowGas + Math.floor(Math.random() * 10) + 5;
      const fastGas = normalGas + Math.floor(Math.random() * 15) + 5;

      results.findings.push('⛽ Current Ethereum Gas Prices:');
      results.findings.push('');
      results.findings.push(`🐢 Slow: ${slowGas} gwei (~2-5 min)`);
      results.findings.push(`⚡ Normal: ${normalGas} gwei (~1-2 min)`);
      results.findings.push(`🚀 Fast: ${fastGas} gwei (~30 sec)`);
      results.findings.push('');
      results.findings.push('💡 Gas Price Tips:');
      results.findings.push('• Scams often claim "urgent, gas is 300 gwei!"');
      results.findings.push('• Normal gas is typically 15-50 gwei');
      results.findings.push('• High gas (>100 gwei) = network congestion');
      results.findings.push('• Never rush transactions due to "high gas"');

      return results;
    }
  },

  addressLookup: {
    name: 'Address Lookup',
    icon: '🔎',
    description: 'Check address history and reputation',
    analyze: (address) => {
      const results = {
        type: 'info',
        findings: []
      };

      if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
        results.type = 'warning';
        results.findings.push('⚠️ Invalid Ethereum address format');
        return results;
      }

      results.findings.push(`📍 Address: ${address}`);
      results.findings.push('');

      // Simulate address analysis
      const txCount = Math.floor(Math.random() * 10000);
      const age = Math.floor(Math.random() * 365);

      if (txCount < 10 && age < 7) {
        results.type = 'danger';
        results.findings.push('🚨 HIGH RISK ADDRESS');
        results.findings.push(`❌ Very new (${age} days old)`);
        results.findings.push(`❌ Few transactions (${txCount})`);
        results.findings.push('⚠️ Possible scam address');
      } else if (txCount > 1000 && age > 180) {
        results.type = 'success';
        results.findings.push('✅ Established Address');
        results.findings.push(`✅ ${age} days old`);
        results.findings.push(`✅ ${txCount.toLocaleString()} transactions`);
      } else {
        results.type = 'info';
        results.findings.push(`📊 ${age} days old`);
        results.findings.push(`📊 ${txCount.toLocaleString()} transactions`);
      }

      results.findings.push('');
      results.findings.push('🔍 What to check:');
      results.findings.push('• Age of address (new = risky)');
      results.findings.push('• Transaction count');
      results.findings.push('• Interaction with known contracts');
      results.findings.push('• Any scam reports online');

      return results;
    }
  }
};

// ========================================
// UI HELPER FUNCTIONS
// ========================================

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function updateProgressBar() {
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const progress = ((gameState.currentScenarioIndex) / scenarios.length) * 100;
  document.getElementById('progressBar').style.width = progress + '%';
}

function updateStats() {
  document.getElementById('xpDisplay').textContent = gameState.xp.toLocaleString();
  document.getElementById('levelDisplay').textContent = gameState.level;
  document.getElementById('streakDisplay').textContent = gameState.streak;
}

function addXP(amount, skillType = null) {
  gameState.xp += amount;
  
  // Level up check
  const xpForNextLevel = gameState.level * 500;
  if (gameState.xp >= xpForNextLevel) {
    gameState.level++;
    showToast(`🎉 Level Up! You're now Level ${gameState.level}`, 'success');
  }

  // Update skill XP if specified
  if (skillType && gameState.skills[skillType]) {
    gameState.skills[skillType].xp += amount;
    if (gameState.skills[skillType].xp >= gameState.skills[skillType].maxXP) {
      gameState.skills[skillType].level++;
      gameState.skills[skillType].xp = 0;
      gameState.skills[skillType].maxXP = Math.floor(gameState.skills[skillType].maxXP * 1.5);
      showToast(`📈 ${skillType} improved to Level ${gameState.skills[skillType].level}!`, 'success');
    }
  }

  updateStats();
}

function checkAchievements() {
  ACHIEVEMENTS.forEach(achievement => {
    if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
      gameState.achievements.push(achievement.id);
      addXP(achievement.xpReward);
      
      // Play achievement sound
      if (typeof audioManager !== 'undefined') {
        audioManager.playAchievement();
      }
      
      showToast(`🏆 Achievement Unlocked: ${achievement.name}`, 'success');
    }
  });
}

// ========================================
// SCENARIO RENDERING
// ========================================

function renderScenario(scenario) {
  let html = `
    <div class="scenario-card">
      <div class="scenario-header">
        <div>
          <span class="scenario-type">${getCategoryName(scenario.category)}</span>
          <span class="scenario-difficulty ${scenario.difficulty}">${scenario.difficulty.toUpperCase()}</span>
        </div>
        <div style="color: var(--text-secondary); font-size: 0.9em;">
          Scenario ${gameState.currentScenarioIndex + 1} of ${(window.ACTIVE_SCENARIOS || SCENARIOS).length}
        </div>
      </div>

      <h2 class="scenario-title">${scenario.title}</h2>
  `;

  // Render based on type
  if (scenario.type === 'email') {
    html += renderEmail(scenario);
  } else if (scenario.type === 'website') {
    html += renderWebsite(scenario);
  } else if (scenario.type === 'transaction') {
    html += renderTransaction(scenario);
  } else if (scenario.type === 'chat') {
    html += renderChat(scenario);
  }

  // Add investigation tools if available
  if (scenario.tools && scenario.tools.length > 0) {
    html += renderInvestigationTools(scenario);
  }

  // Add question and answer section
  html += `
    <div class="question-section">
      <div class="question-text">${scenario.question}</div>
      <div class="answer-options" id="answerOptions">
  `;

  scenario.options.forEach(option => {
    html += `
      <button class="answer-btn" onclick="playClickSound(); selectAnswer('${option.id}')" id="option-${option.id}">
        ${option.text}
      </button>
    `;
  });

  html += `
      </div>
      <div id="feedbackPanel"></div>
    </div>
    </div>
  `;

  return html;
}

function getCategoryName(category) {
  const names = {
    wallet: '🔐 Wallet Security',
    defi: '💎 DeFi Protocol',
    nft: '🖼️ NFT',
    layer2: '⚡ Layer 2',
    social: '💬 Social Engineering',
    stablecoin: '💵 Stablecoin',
    mev: '⚙️ MEV Attack'
  };
  return names[category] || '🔒 Security';
}

function renderEmail(scenario) {
  return `
    <div class="email-view">
      <div class="email-header">
        <div class="email-field">
          <span class="email-field-label">From:</span>
          <span class="email-field-value">${scenario.from}</span>
        </div>
        <div class="email-field">
          <span class="email-field-label">To:</span>
          <span class="email-field-value">${scenario.to}</span>
        </div>
        <div class="email-field">
          <span class="email-field-label">Subject:</span>
          <span class="email-field-value"><strong>${scenario.subject}</strong></span>
        </div>
      </div>
      <div class="email-body">
        ${scenario.body.replace(/\n/g, '<br>')}
      </div>
    </div>
  `;
}

function renderWebsite(scenario) {
  return `
    <div class="website-view">
      <div class="browser-bar">
        <div class="browser-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="url-bar">🔒 ${scenario.url}</div>
      </div>
      <div class="website-content">
        ${scenario.content}
      </div>
    </div>
  `;
}

function renderTransaction(scenario) {
  return `
    <div class="transaction-view">
      <h3 style="margin-bottom: 15px; color: var(--warning);">⚠️ Transaction Approval Request</h3>
      ${Object.entries(scenario.txData).map(([key, value]) => `
        <div class="tx-field">
          <div class="tx-label">${key}:</div>
          <div class="tx-value">${value}</div>
        </div>
      `).join('')}
      <div style="margin-top: 20px; padding: 15px; background: var(--bg-card); border-radius: 8px;">
        <div style="font-weight: bold; margin-bottom: 10px; color: var(--danger);">Decoded Function:</div>
        <div style="font-family: monospace; color: var(--primary);">${scenario.decodedFunction}</div>
        <div style="margin-top: 15px; font-weight: bold; color: var(--danger);">Parameters:</div>
        ${Object.entries(scenario.decodedParams).map(([key, value]) => `
          <div style="margin-top: 8px;">
            <span style="color: var(--text-secondary);">${key}:</span>
            <span style="color: var(--text-primary); margin-left: 10px;">${value}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderChat(scenario) {
  return `
    <div class="chat-view">
      ${scenario.messages.map(msg => `
        <div class="chat-message ${msg.sender}">
          ${msg.from ? `<div style="font-size: 0.85em; opacity: 0.8; margin-bottom: 5px;"><strong>${msg.from}</strong></div>` : ''}
          <div>${msg.text}</div>
          <div class="chat-timestamp">${msg.time}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderInvestigationTools(scenario) {
  const tools = scenario.tools.map(toolId => {
    const tool = InvestigationTools[toolId];
    return tool ? `
      <button class="tool-btn" onclick="playClickSound(); useTool('${toolId}')">
        ${tool.icon} ${tool.name}
      </button>
    ` : '';
  }).join('');

  return `
    <div class="investigation-tools">
      <div class="tools-header">
        <span style="font-size: 1.5em;">🔍</span>
        <h3>Investigation Tools</h3>
      </div>
      <div class="tools-grid">
        ${tools}
      </div>
      <div id="toolResults"></div>
    </div>
  `;
}

// ========================================
// GAME INTERACTION HANDLERS
// ========================================

async function useTool(toolId) {
  const tool = InvestigationTools[toolId];
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const scenario = scenarios[gameState.currentScenarioIndex];
  
  if (!tool) return;

  gameState.toolsUsed++;
  addXP(10, 'technicalAuditing');

  let analysisTarget = '';
  
  // Determine what to analyze based on scenario type
  if (scenario.type === 'email' || scenario.type === 'website') {
    analysisTarget = scenario.url || scenario.from || 'https://example.com';
  } else if (scenario.type === 'transaction') {
    analysisTarget = scenario.txData.to || '0x0000000000000000000000000000000000000000';
  }

  // Show loading state
  const toolResults = document.getElementById('toolResults');
  toolResults.innerHTML = '<div class="tool-result info"><strong>⏳ Analyzing...</strong></div>';

  // Get basic tool results
  const results = tool.analyze(analysisTarget);

  // Try to enhance with real API data if available
  let enhancedResults = results;
  if (typeof blockchainAPI !== 'undefined') {
    try {
      enhancedResults = await blockchainAPI.enhanceToolResult(toolId, results, analysisTarget);
      
      // If we got real data, add it to the findings
      if (enhancedResults.realData && enhancedResults.enhanced) {
        const realData = enhancedResults.realData;
        results.findings.unshift('🌐 LIVE BLOCKCHAIN DATA:');
        
        // Add specific real data based on tool
        if (toolId === 'gasTracker' && realData.slow) {
          results.findings.push(`Current Gas: 🐢 ${realData.slow} | ⚡ ${realData.normal} | 🚀 ${realData.fast} gwei`);
          results.findings.push(`Source: ${realData.source || 'Etherscan'}`);
        } else if (toolId === 'addressLookup' && realData.balance !== undefined) {
          results.findings.push(`Balance: ${realData.balance} ETH`);
          results.findings.push(`Transactions: ${realData.transactionCount}`);
          results.findings.push(`Estimated Age: ${realData.ageEstimate}`);
        } else if (toolId === 'contractAnalyzer' && realData.isVerified !== undefined) {
          results.findings.push(`Verified: ${realData.isVerified ? '✅ YES' : '❌ NO'}`);
          if (realData.contractName) results.findings.push(`Name: ${realData.contractName}`);
        } else if (toolId === 'tokenScanner' && realData.riskScore !== undefined) {
          results.findings.push(`Risk Score: ${realData.riskScore}/100`);
          results.findings.push(`Honeypot: ${realData.isHoneypot ? '🚨 YES' : '✅ NO'}`);
          if (realData.warnings) {
            realData.warnings.forEach(w => results.findings.push(w));
          }
        }

        if (realData.note) {
          results.findings.push(`ℹ️ ${realData.note}`);
        }
      }
    } catch (error) {
      console.log('API enhancement failed, using simulated data');
    }
  }

  const resultDiv = document.createElement('div');
  resultDiv.className = `tool-result ${results.type}`;
  resultDiv.innerHTML = `
    <strong>${tool.icon} ${tool.name} Results:</strong>
    ${results.findings.map(f => `<div style="margin-top: 8px;">${f}</div>`).join('')}
  `;

  toolResults.innerHTML = '';
  toolResults.appendChild(resultDiv);

  // Play tool sound
  if (typeof audioManager !== 'undefined') {
    audioManager.playTool();
  }

  showToast(`Used ${tool.name} (+10 XP)`, 'info');
  checkAchievements();
}

let scenarioStartTime = Date.now();
let selectedAnswer = null;

function selectAnswer(answerId) {
  if (selectedAnswer) return; // Already answered

  selectedAnswer = answerId;
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const scenario = scenarios[gameState.currentScenarioIndex];
  const isCorrect = answerId === scenario.correctAnswer;
  const timeSpent = (Date.now() - scenarioStartTime) / 1000;

  // Visual feedback
  const btn = document.getElementById(`option-${answerId}`);
  btn.classList.add(isCorrect ? 'correct' : 'incorrect');

  // Disable all buttons
  scenario.options.forEach(opt => {
    const optBtn = document.getElementById(`option-${opt.id}`);
    optBtn.disabled = true;
  });

  // Play audio feedback
  if (typeof audioManager !== 'undefined') {
    if (isCorrect) {
      audioManager.playSuccess();
    } else {
      audioManager.playError();
    }
  }

  // Update game state
  if (isCorrect) {
    gameState.correctAnswers++;
    gameState.streak++;
    if (gameState.streak > gameState.maxStreak) {
      gameState.maxStreak = gameState.streak;
    }

    // Celebrate with confetti!
    createConfetti();

    // Determine skill to level up
    let skillType = 'phishingDetection';
    if (scenario.category === 'defi') skillType = 'contractAnalysis';
    else if (scenario.category === 'social') skillType = 'socialEngineering';
    else if (scenario.category === 'nft' || scenario.category === 'layer2') skillType = 'technicalAuditing';

    addXP(scenario.feedback.xpReward, skillType);

    // Speed bonus
    if (timeSpent < 30) {
      addXP(50);
      showToast('⚡ Speed Bonus! +50 XP', 'success');
      // Check speedrun achievement
      if (!gameState.achievements.includes('speedrun')) {
        const speedAch = ACHIEVEMENTS.find(a => a.id === 'speedrun');
        gameState.achievements.push('speedrun');
        addXP(speedAch.xpReward);
        showToast(`🏆 Achievement: ${speedAch.name}`, 'success');
      }
    }

  } else {
    gameState.incorrectAnswers++;
    gameState.streak = 0;
  }

  gameState.scenariosCompleted.push(gameState.currentScenarioIndex);
  updateStats();
  checkAchievements();
  showFeedback(isCorrect, scenario);
}

function showFeedback(isCorrect, scenario) {
  const feedbackPanel = document.getElementById('feedbackPanel');
  
  let html = `
    <div class="feedback-panel ${isCorrect ? 'correct' : 'incorrect'}">
      <div class="feedback-title">
        ${isCorrect ? '✅ Correct!' : '❌ Incorrect'}
        ${isCorrect ? '<span class="xp-earned">+' + scenario.feedback.xpReward + ' XP</span>' : ''}
      </div>
      <div class="feedback-content">
        ${isCorrect ? scenario.feedback.correct : scenario.feedback.incorrect}
      </div>
  `;

  // Red flags
  if (scenario.feedback.redFlags) {
    html += `
      <div class="red-flags-list">
        <h4>🚩 Red Flags to Watch For:</h4>
        <ul>
          ${scenario.feedback.redFlags.map(flag => `<li>${flag}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Blockchain info
  if (scenario.feedback.blockchainInfo) {
    html += `
      <div class="blockchain-details">
        <h4>⛓️ Blockchain Context:</h4>
        <ul>
          ${scenario.feedback.blockchainInfo.map(info => `<li>${info}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  html += `
      <button class="next-btn" onclick="nextScenario()">
        ${gameState.currentScenarioIndex < SCENARIOS.length - 1 ? 'Next Scenario →' : 'See Results →'}
      </button>
    </div>
  `;

  feedbackPanel.innerHTML = html;
}

function nextScenario() {
  gameState.currentScenarioIndex++;
  
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  if (gameState.currentScenarioIndex >= scenarios.length) {
    showResults();
  } else {
    loadScenario();
  }
}

function loadScenario() {
  selectedAnswer = null;
  scenarioStartTime = Date.now();
  
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const scenario = scenarios[gameState.currentScenarioIndex];
  const gameArea = document.getElementById('gameArea');
  
  // Fade out
  gameArea.style.opacity = '0';
  gameArea.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    gameArea.innerHTML = renderScenario(scenario);
    updateProgressBar();
    
    // Fade in
    setTimeout(() => {
      gameArea.style.opacity = '1';
      gameArea.style.transform = 'translateY(0)';
    }, 50);
  }, 300);
  
  window.scrollTo(0, 0);
}

// ========================================
// RESULTS SCREEN
// ========================================

function showResults() {
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const totalTime = Math.round((Date.now() - gameState.startTime) / 1000);
  const accuracy = Math.round((gameState.correctAnswers / scenarios.length) * 100);
  
  let rank = '';
  let rankColor = '';
  let message = '';
  
  if (accuracy === 100 && gameState.incorrectAnswers === 0) {
    rank = 'BLOCKCHAIN GUARDIAN';
    rankColor = 'var(--primary)';
    message = 'Perfect score! You\'re ready to protect yourself and others from crypto scams. Share your knowledge!';
  } else if (accuracy >= 85) {
    rank = 'SECURITY EXPERT';
    rankColor = 'var(--info)';
    message = 'Excellent work! You have strong scam detection skills. Review the missed scenarios to reach perfection.';
  } else if (accuracy >= 70) {
    rank = 'VIGILANT USER';
    rankColor = 'var(--warning)';
    message = 'Good job! You\'re developing solid instincts. Keep practicing to become an expert.';
  } else {
    rank = 'AT RISK';
    rankColor = 'var(--danger)';
    message = 'You need more practice. These scams are real and costly. Go through the scenarios again carefully.';
  }

  const unlockedAchievements = ACHIEVEMENTS.filter(a => gameState.achievements.includes(a.id));

  const html = `
    <div class="results-screen">
      <div class="results-title" style="color: ${rankColor};">${rank}</div>
      <div class="results-subtitle">${message}</div>

      <div class="results-grid">
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--primary);">${accuracy}%</div>
          <div class="result-stat-label">Accuracy</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--primary);">${gameState.correctAnswers}</div>
          <div class="result-stat-label">Detected</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--danger);">${gameState.incorrectAnswers}</div>
          <div class="result-stat-label">Missed</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--warning);">${gameState.maxStreak}</div>
          <div class="result-stat-label">Best Streak</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--info);">${gameState.toolsUsed}</div>
          <div class="result-stat-label">Tools Used</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value">${totalTime}s</div>
          <div class="result-stat-label">Total Time</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--primary);">${gameState.xp.toLocaleString()}</div>
          <div class="result-stat-label">Total XP</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-value" style="color: var(--info);">${gameState.level}</div>
          <div class="result-stat-label">Level</div>
        </div>
      </div>

      ${unlockedAchievements.length > 0 ? `
        <div class="achievements-section">
          <h3>🏆 Achievements Unlocked</h3>
          <div class="achievements-grid">
            ${unlockedAchievements.map(ach => `
              <div class="achievement-card unlocked">
                <div class="achievement-icon">${ach.icon}</div>
                <div class="achievement-info">
                  <h4>${ach.name}</h4>
                  <p>${ach.description}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="skills-section">
        <h3>📊 Skill Progression</h3>
        ${Object.entries(gameState.skills).map(([skill, data]) => `
          <div class="skill-bar">
            <div class="skill-header">
              <span class="skill-name">${formatSkillName(skill)}</span>
              <span class="skill-level">Level ${data.level}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${(data.xp / data.maxXP) * 100}%"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="share-section">
        <h3 style="margin-bottom: 20px;">Share Your Results</h3>
        <div class="btn-group">
          <button class="btn btn-primary" onclick="shareToTwitter()">
            𝕏 Share to Twitter
          </button>
          <button class="btn btn-secondary" onclick="copyResults()">
            📋 Copy Results
          </button>
          <button class="btn btn-outline" onclick="restartGame()">
            🔄 Try Again
          </button>
        </div>
      </div>

      <div class="warning-box">
        <h3>⚠️ Real-World Impact</h3>
        <p style="margin-bottom: 15px; line-height: 1.8;">
          Based on 2024-2025 threat intelligence and research:
        </p>
        <ul>
          <li><strong>$2.17B+ stolen</strong> in H1 2025 alone (worst year on record)</li>
          <li><strong>1,900% increase</strong> in Layer 2 phishing scams (Base, Arbitrum)</li>
          <li><strong>$3.5B lost</strong> to pig butchering romance scams in 2024</li>
          <li><strong>80.5% of funds</strong> stolen via off-chain social engineering attacks</li>
          <li><strong>$295M+ drained</strong> by wallet drainer malware in 2024</li>
          <li><strong>AI deepfakes</strong> enabling sophisticated video call impersonations</li>
        </ul>
        <p style="margin-top: 15px; font-weight: bold; color: var(--warning);">
          These scams are real, sophisticated, and constantly evolving. Stay vigilant and share your knowledge!
        </p>
      </div>
    </div>
  `;

  document.getElementById('gameArea').innerHTML = html;
}

function formatSkillName(skill) {
  return skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

function shareToTwitter() {
  const accuracy = Math.round((gameState.correctAnswers / SCENARIOS.length) * 100);
  const text = `I scored ${accuracy}% on the Blockchain Scam Detector 2026! 🔐\n\n✅ Detected: ${gameState.correctAnswers}\n❌ Missed: ${gameState.incorrectAnswers}\n🔥 Best Streak: ${gameState.maxStreak}\n\nCan you spot crypto scams better than me? Test yourself!`;
  
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

function copyResults() {
  const scenarios = window.ACTIVE_SCENARIOS || SCENARIOS;
  const accuracy = Math.round((gameState.correctAnswers / scenarios.length) * 100);
  const text = `Blockchain Scam Detector 2026 Results:\n\nAccuracy: ${accuracy}%\nDetected: ${gameState.correctAnswers}\nMissed: ${gameState.incorrectAnswers}\nBest Streak: ${gameState.maxStreak}\nLevel: ${gameState.level}\nXP: ${gameState.xp}`;
  
  navigator.clipboard.writeText(text).then(() => {
    showToast('Results copied to clipboard!', 'success');
  });
}

function restartGame() {
  if (confirm('Start a new training session? Your current progress will be reset.')) {
    // Clear active scenarios
    window.ACTIVE_SCENARIOS = null;
    
    // Return to dashboard
    showDashboard();
  }
}

// ========================================
// DASHBOARD
// ========================================

const gameConfig = {
  quizLength: 30,
  difficulty: 'all',
  categories: 'all'
};

function showDashboard() {
  const gameArea = document.getElementById('gameArea');
  
  const html = `
    <div class="dashboard">
      <div class="dashboard-hero">
        <h1>🛡️ Blockchain Scam Detector 2026</h1>
        <p>Master the art of spotting crypto scams. Train your skills. Protect your assets.</p>
      </div>

      <div class="config-section">
        <h2>⚙️ Configure Your Training</h2>
        
        <h3 style="margin-top: 30px; margin-bottom: 15px; color: var(--text-secondary);">Quiz Length</h3>
        <div class="config-grid">
          <div class="config-option selected" onclick="selectQuizLength(5)" data-quiz="5">
            <div class="config-option-icon">⚡</div>
            <div class="config-option-label">Quick Challenge</div>
            <div class="config-option-desc">5 scenarios (~5 min)</div>
          </div>
          <div class="config-option" onclick="selectQuizLength(10)" data-quiz="10">
            <div class="config-option-icon">🎯</div>
            <div class="config-option-label">Standard Practice</div>
            <div class="config-option-desc">10 scenarios (~10 min)</div>
          </div>
          <div class="config-option" onclick="selectQuizLength(15)" data-quiz="15">
            <div class="config-option-icon">🔥</div>
            <div class="config-option-label">Extended Training</div>
            <div class="config-option-desc">15 scenarios (~15 min)</div>
          </div>
          <div class="config-option" onclick="selectQuizLength(30)" data-quiz="30">
            <div class="config-option-icon">🏆</div>
            <div class="config-option-label">Full Mastery</div>
            <div class="config-option-desc">All 30 scenarios (~30 min)</div>
          </div>
        </div>

        <h3 style="margin-top: 30px; margin-bottom: 15px; color: var(--text-secondary);">Difficulty Level</h3>
        <div class="config-grid">
          <div class="config-option selected" onclick="selectDifficulty('all')" data-difficulty="all">
            <div class="config-option-icon">🌟</div>
            <div class="config-option-label">All Levels</div>
            <div class="config-option-desc">Mixed difficulty</div>
          </div>
          <div class="config-option" onclick="selectDifficulty('easy')" data-difficulty="easy">
            <div class="config-option-icon">🟢</div>
            <div class="config-option-label">Beginner</div>
            <div class="config-option-desc">Easy scenarios only</div>
          </div>
          <div class="config-option" onclick="selectDifficulty('medium')" data-difficulty="medium">
            <div class="config-option-icon">🟡</div>
            <div class="config-option-label">Intermediate</div>
            <div class="config-option-desc">Medium challenges</div>
          </div>
          <div class="config-option" onclick="selectDifficulty('hard')" data-difficulty="hard">
            <div class="config-option-icon">🔴</div>
            <div class="config-option-label">Expert</div>
            <div class="config-option-desc">Hard scenarios only</div>
          </div>
        </div>
      </div>

      <div class="config-section">
        <h2>🌳 Skills You'll Develop</h2>
        <div class="skills-preview">
          <div class="skill-preview-card">
            <div class="skill-preview-icon">🎣</div>
            <div class="skill-preview-name">Phishing Detection</div>
            <div class="skill-preview-desc">Spot fake emails, websites, and social media scams</div>
          </div>
          <div class="skill-preview-card">
            <div class="skill-preview-icon">📜</div>
            <div class="skill-preview-name">Contract Analysis</div>
            <div class="skill-preview-desc">Identify malicious smart contracts and DeFi exploits</div>
          </div>
          <div class="skill-preview-card">
            <div class="skill-preview-icon">🧠</div>
            <div class="skill-preview-name">Social Engineering</div>
            <div class="skill-preview-desc">Recognize manipulation tactics and trust-building scams</div>
          </div>
          <div class="skill-preview-card">
            <div class="skill-preview-icon">🔧</div>
            <div class="skill-preview-name">Technical Auditing</div>
            <div class="skill-preview-desc">Use blockchain tools to verify addresses and transactions</div>
          </div>
        </div>
      </div>

      <div class="start-button-container">
        <button class="start-button" onclick="startTraining()">
          🚀 Start Training
        </button>
      </div>
    </div>
  `;
  
  gameArea.innerHTML = html;
}

function selectQuizLength(length) {
  gameConfig.quizLength = length;
  
  // Update UI
  document.querySelectorAll('[data-quiz]').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-quiz="${length}"]`).classList.add('selected');
  
  playClickSound();
}

function selectDifficulty(difficulty) {
  gameConfig.difficulty = difficulty;
  
  // Update UI
  document.querySelectorAll('[data-difficulty]').forEach(option => {
    option.classList.remove('selected');
  });
  document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('selected');
  
  playClickSound();
}

function startTraining() {
  playClickSound();
  
  // Filter scenarios based on config
  let filteredScenarios = [...SCENARIOS];
  
  if (gameConfig.difficulty !== 'all') {
    filteredScenarios = filteredScenarios.filter(s => s.difficulty === gameConfig.difficulty);
  }
  
  // Limit to selected quiz length
  if (gameConfig.quizLength < filteredScenarios.length) {
    // Shuffle and take first N
    filteredScenarios = filteredScenarios
      .sort(() => Math.random() - 0.5)
      .slice(0, gameConfig.quizLength);
  }
  
  // Store filtered scenarios globally
  window.ACTIVE_SCENARIOS = filteredScenarios;
  
  // Reset game state
  gameState.currentScenarioIndex = 0;
  gameState.xp = 0;
  gameState.level = 1;
  gameState.streak = 0;
  gameState.maxStreak = 0;
  gameState.correctAnswers = 0;
  gameState.incorrectAnswers = 0;
  gameState.toolsUsed = 0;
  gameState.scenariosCompleted = [];
  gameState.achievements = [];
  gameState.startTime = Date.now();
  
  // Reset skills
  Object.keys(gameState.skills).forEach(skill => {
    gameState.skills[skill] = { level: 1, xp: 0, maxXP: 100 };
  });
  
  updateStats();
  loadScenario();
}

// ========================================
// INITIALIZE GAME
// ========================================

window.addEventListener('load', () => {
  updateStats();
  showDashboard();
});
