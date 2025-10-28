// Investigation Tools Library
// Realistic blockchain security tools with educational red flag detection
// Teaches users what to look for when using Etherscan, block explorers, and audit tools

const InvestigationTools = {
  urlScanner: {
    name: 'URL Scanner',
    icon: '🔍',
    description: 'Check URLs for phishing patterns and domain spoofing',
    
    analyze(url) {
      const findings = [];
      const redFlags = [];
      let riskLevel = 'safe';

      // Parse URL
      try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.toLowerCase();
        const path = urlObj.pathname;

        findings.push(`🌐 Domain: ${domain}`);
        findings.push(`📍 Path: ${path || '/'}`);
        findings.push(`🔒 Protocol: ${urlObj.protocol}`);

        // Check for common phishing patterns
        if (!urlObj.protocol.includes('https')) {
          redFlags.push('⚠️ Not using HTTPS - insecure connection');
          riskLevel = 'warning';
        }

        // Domain spoofing checks
        const legitDomains = ['uniswap.org', 'metamask.io', 'etherscan.io', 'opensea.io'];
        const suspiciousPatterns = [
          { pattern: /metam[a4]sk/, desc: 'MetaMask spoofing' },
          { pattern: /un[i1l]swap/, desc: 'Uniswap spoofing' },
          { pattern: /eth[e3]rscan/, desc: 'Etherscan spoofing' },
          { pattern: /op[e3]ns[e3]a/, desc: 'OpenSea spoofing' },
          { pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, desc: 'IP address instead of domain' },
          { pattern: /\w+\-verify/, desc: 'Fake verification subdomain' },
          { pattern: /\w+\-support/, desc: 'Fake support site' }
        ];

        suspiciousPatterns.forEach(({ pattern, desc }) => {
          if (pattern.test(domain)) {
            redFlags.push(`🚨 ${desc} detected`);
            riskLevel = 'danger';
          }
        });

        // Check for typosquatting
        legitDomains.forEach(legit => {
          const distance = this._levenshteinDistance(domain, legit);
          if (distance > 0 && distance <= 2) {
            redFlags.push(`🚨 Similar to ${legit} (possible typosquatting)`);
            riskLevel = 'danger';
          }
        });

        // Suspicious TLDs
        const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.xyz', '.top'];
        const tld = domain.substring(domain.lastIndexOf('.'));
        if (suspiciousTLDs.includes(tld)) {
          redFlags.push(`⚠️ Suspicious TLD: ${tld}`);
          riskLevel = riskLevel === 'safe' ? 'warning' : riskLevel;
        }

        // URL encoding tricks
        if (url.includes('%')) {
          findings.push('⚠️ URL encoding detected - verify destination');
        }

        // Long subdomains (hiding real domain)
        const parts = domain.split('.');
        if (parts.length > 3) {
          findings.push(`⚠️ Multiple subdomains: ${parts.length} levels`);
        }

      } catch (e) {
        findings.push('❌ Invalid URL format');
        riskLevel = 'danger';
      }

      findings.push('');
      findings.push('📚 HOW TO CHECK URLS:');
      findings.push('1. Verify HTTPS lock icon in browser');
      findings.push('2. Check domain spelling carefully (l vs i, 0 vs o)');
      findings.push('3. Look for extra subdomains (real-metamask.fake-site.com)');
      findings.push('4. Never trust links from messages/emails');
      findings.push('5. Bookmark official sites and use them');

      if (redFlags.length > 0) {
        findings.push('');
        findings.push('🚨 RED FLAGS DETECTED:');
        findings.push(...redFlags);
      }

      return {
        findings,
        type: riskLevel,
        educationalNote: 'Real phishers use slight misspellings and look-alike characters to trick users'
      };
    },

    _levenshteinDistance(a, b) {
      const matrix = [];
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }
      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }
      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j] + 1
            );
          }
        }
      }
      return matrix[b.length][a.length];
    }
  },

  contractAnalyzer: {
    name: 'Contract Analyzer',
    icon: '⛓️',
    description: 'Analyze smart contract code for red flags and vulnerabilities',
    
    analyze(address) {
      const findings = [];
      const criticalFlags = [];
      const educationalTips = [];

      findings.push(`📜 Contract Analysis: ${address.substring(0, 10)}...${address.substring(address.length - 8)}`);
      findings.push('');

      // Simulate contract analysis patterns
      const patterns = this._detectPatterns(address);

      findings.push('🔍 VERIFICATION STATUS:');
      if (patterns.verified) {
        findings.push('✅ Source code verified on Etherscan');
        educationalTips.push('Always check for green checkmark on Etherscan');
      } else {
        findings.push('❌ Source code NOT verified');
        criticalFlags.push('Cannot audit unverified contracts');
        educationalTips.push('Unverified = potential scam. Never interact with large amounts');
      }

      findings.push('');
      findings.push('⚙️ CONTRACT FUNCTIONS:');
      
      // Check for dangerous patterns
      if (patterns.hasUpgrade) {
        findings.push('⚠️ Upgradeable proxy detected');
        findings.push('  → Implementation can be changed by owner');
        findings.push('  → Check: Who controls upgrades? Is there a timelock?');
        criticalFlags.push('Upgradeable contracts can be changed to malicious code');
      }

      if (patterns.hasMint) {
        findings.push('⚠️ Mint function found');
        findings.push('  → Owner can create new tokens');
        findings.push('  → Check: Is there a max supply? Was ownership renounced?');
        criticalFlags.push('Unlimited minting dilutes all holders');
      }

      if (patterns.hasPause) {
        findings.push('⚠️ Pausable functions detected');
        findings.push('  → Contract can be paused by owner');
        findings.push('  → Check: Is pausing necessary? Can it be abused?');
      }

      if (patterns.hasHiddenFees) {
        findings.push('🚨 HIDDEN FEE STRUCTURE');
        findings.push('  → Buy tax: 2% | Sell tax: 25%');
        findings.push('  → Different fees for buying vs selling is RED FLAG');
        criticalFlags.push('Asymmetric fees trap holders - classic rug pull pattern');
      }

      findings.push('');
      findings.push('👤 OWNERSHIP:');
      if (patterns.ownerRenounced) {
        findings.push('✅ Ownership renounced (sent to 0x000...dEaD)');
        findings.push('  → No one can change contract parameters');
      } else if (patterns.ownerMultisig) {
        findings.push('✅ Owner is multi-sig wallet');
        findings.push('  → Requires multiple signatures for changes');
      } else {
        findings.push('⚠️ Owner is EOA (single wallet)');
        findings.push('  → Single person controls contract');
        criticalFlags.push('Single owner can rug pull - check their history');
      }

      findings.push('');
      findings.push('📚 ETHERSCAN CHECKLIST:');
      findings.push('1. Check "Contract" tab for verification status');
      findings.push('2. Read "Read Contract" to see owner, supply, fees');
      findings.push('3. Search code for: mint, pause, upgrade, onlyOwner');
      findings.push('4. Look for delegatecall or assembly blocks');
      findings.push('5. Check transaction history for suspicious patterns');

      if (criticalFlags.length > 0) {
        findings.push('');
        findings.push('🚨 CRITICAL RED FLAGS:');
        criticalFlags.forEach(flag => findings.push(`  • ${flag}`));
      }

      findings.push('');
      findings.push('💡 REAL-WORLD TIP:');
      findings.push(educationalTips[Math.floor(Math.random() * educationalTips.length)] || 
        'Always verify contracts on Etherscan before interacting');

      return {
        findings,
        type: criticalFlags.length > 2 ? 'danger' : criticalFlags.length > 0 ? 'warning' : 'info',
        patterns
      };
    },

    _detectPatterns(address) {
      // Simulate pattern detection based on address characteristics
      const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      return {
        verified: hash % 3 !== 0,
        hasUpgrade: hash % 5 === 0,
        hasMint: hash % 4 === 0,
        hasPause: hash % 6 === 0,
        hasHiddenFees: hash % 7 === 0,
        ownerRenounced: hash % 8 === 0,
        ownerMultisig: hash % 9 === 0 && hash % 8 !== 0
      };
    }
  },

  gasTracker: {
    name: 'Gas Price Tracker',
    icon: '⛽',
    description: 'Monitor current gas prices and detect suspicious activity',
    
    analyze() {
      const findings = [];
      
      // Simulate realistic gas prices
      const slow = 8 + Math.floor(Math.random() * 5);
      const normal = slow + 5 + Math.floor(Math.random() * 5);
      const fast = normal + 8 + Math.floor(Math.random() * 8);

      findings.push('⛽ CURRENT GAS PRICES (GWEI):');
      findings.push(`🐢 Slow: ${slow} gwei (~5 min)`);
      findings.push(`⚡ Normal: ${normal} gwei (~2 min)`);
      findings.push(`🚀 Fast: ${fast} gwei (~30 sec)`);
      findings.push('');
      
      findings.push('💡 GAS OPTIMIZATION TIPS:');
      findings.push('1. Use slow gas for non-urgent transactions');
      findings.push('2. Check gas before approving transactions');
      findings.push('3. Beware of contracts that force high gas usage');
      findings.push('4. MEV bots use fast gas to front-run trades');
      findings.push('');
      
      findings.push('🚨 SCAM PATTERN:');
      findings.push('Malicious contracts have "gas bomb" functions');
      findings.push('→ Function looks normal but uses 5M+ gas');
      findings.push('→ Always simulate transactions before executing');
      findings.push('→ Check gas estimate on MetaMask/wallet');

      return {
        findings,
        type: fast > 100 ? 'warning' : 'info',
        gasData: { slow, normal, fast }
      };
    }
  },

  addressLookup: {
    name: 'Address Lookup',
    icon: '📍',
    description: 'Check address history, balance, and risk indicators',
    
    analyze(address) {
      const findings = [];
      const risks = [];

      // Simulate address analysis
      const analysis = this._analyzeAddress(address);

      findings.push(`📍 Address: ${address.substring(0, 10)}...${address.substring(address.length - 8)}`);
      findings.push('');
      
      findings.push('💰 BALANCE & ACTIVITY:');
      findings.push(`Balance: ${analysis.balance} ETH`);
      findings.push(`Total Transactions: ${analysis.txCount}`);
      findings.push(`First Activity: ${analysis.firstSeen}`);
      findings.push(`Last Activity: ${analysis.lastSeen}`);
      findings.push('');

      if (analysis.isNew) {
        findings.push('⚠️ NEW ADDRESS WARNING:');
        findings.push('  → Created less than 30 days ago');
        findings.push('  → New addresses are higher risk');
        risks.push('New addresses may be throwaway scam wallets');
      }

      if (analysis.highActivity) {
        findings.push('⚠️ HIGH ACTIVITY DETECTED:');
        findings.push('  → Many transactions in short time');
        findings.push('  → Could be bot, exchange, or suspicious');
      }

      if (analysis.hasIncomingOnly) {
        findings.push('🚨 HONEYPOT PATTERN:');
        findings.push('  → Only incoming transactions (no outgoing)');
        findings.push('  → Funds go in but never come out');
        risks.push('Classic honeypot: deposits but no withdrawals');
      }

      if (analysis.isContract) {
        findings.push('📜 CONTRACT ADDRESS:');
        findings.push('  → This is a smart contract, not a wallet');
        findings.push('  → Analyze with Contract Analyzer tool');
      }

      findings.push('');
      findings.push('🔍 HOW TO CHECK ADDRESSES:');
      findings.push('1. Paste address into Etherscan search');
      findings.push('2. Check "Transactions" tab for patterns');
      findings.push('3. Look for failed transactions (red flags)');
      findings.push('4. Check if address is labeled (exchange, known scam)');
      findings.push('5. Verify address age (new = suspicious)');

      if (risks.length > 0) {
        findings.push('');
        findings.push('🚨 RISK INDICATORS:');
        risks.forEach(risk => findings.push(`  • ${risk}`));
      }

      return {
        findings,
        type: risks.length > 1 ? 'danger' : risks.length > 0 ? 'warning' : 'info',
        analysis
      };
    },

    _analyzeAddress(address) {
      const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const balance = (hash % 100) / 10;
      const txCount = (hash % 500) + 10;
      const daysOld = (hash % 365) + 1;
      
      return {
        balance: balance.toFixed(3),
        txCount,
        firstSeen: `${daysOld} days ago`,
        lastSeen: `${Math.floor(hash % 30)} hours ago`,
        isNew: daysOld < 30,
        highActivity: txCount > 400,
        hasIncomingOnly: hash % 11 === 0,
        isContract: hash % 7 === 0
      };
    }
  },

  transactionTracer: {
    name: 'Transaction Tracer',
    icon: '🔄',
    description: 'Trace transaction flow and detect wash trading or sweeper bots',
    
    analyze(txHash) {
      const findings = [];
      const warnings = [];

      findings.push(`🔄 Transaction Analysis`);
      findings.push(`TxHash: ${txHash ? txHash.substring(0, 16) + '...' : '0xabc...def'}`);
      findings.push('');

      // Simulate transaction analysis
      const analysis = this._analyzeTransaction(txHash);

      findings.push('📊 TRANSACTION FLOW:');
      findings.push(`From: ${analysis.from}`);
      findings.push(`To: ${analysis.to}`);
      findings.push(`Value: ${analysis.value} ETH`);
      findings.push(`Gas Used: ${analysis.gasUsed.toLocaleString()} (${analysis.gasPrice} gwei)`);
      findings.push(`Status: ${analysis.success ? '✅ Success' : '❌ Failed'}`);
      findings.push('');

      if (analysis.hasInternalTxs) {
        findings.push('🔀 INTERNAL TRANSACTIONS:');
        findings.push('  → Contract made additional transfers');
        findings.push('  → Check where funds actually went');
        if (analysis.sweeperPattern) {
          findings.push('  🚨 SWEEPER BOT DETECTED');
          findings.push('  → Funds immediately sent to another address');
          warnings.push('Sweeper bot = instant rug pull mechanism');
        }
      }

      if (!analysis.success) {
        findings.push('⚠️ TRANSACTION FAILED:');
        findings.push(`  Revert Reason: ${analysis.revertReason}`);
        findings.push('  → Check why it failed before retrying');
        findings.push('  → Failed withdrawals = potential honeypot');
      }

      if (analysis.highGas) {
        findings.push('⚠️ UNUSUALLY HIGH GAS:');
        findings.push('  → Gas usage is abnormally high');
        findings.push('  → Could be "gas bomb" or inefficient code');
        warnings.push('High gas = possible attack or poorly coded contract');
      }

      findings.push('');
      findings.push('🔍 ETHERSCAN TRANSACTION CHECKLIST:');
      findings.push('1. Check "Internal Txns" tab for hidden transfers');
      findings.push('2. Look at "Logs" for events emitted');
      findings.push('3. Check "State" tab for storage changes');
      findings.push('4. Verify recipient address is expected');
      findings.push('5. Compare gas used vs estimated');

      if (warnings.length > 0) {
        findings.push('');
        findings.push('🚨 WARNING SIGNS:');
        warnings.forEach(w => findings.push(`  • ${w}`));
      }

      return {
        findings,
        type: warnings.length > 0 ? 'danger' : !analysis.success ? 'warning' : 'info',
        analysis
      };
    },

    _analyzeTransaction(txHash) {
      const hash = txHash ? txHash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 12345;
      
      return {
        from: '0x' + '1234'.repeat(10).substring(0, 40),
        to: '0x' + '5678'.repeat(10).substring(0, 40),
        value: ((hash % 100) / 100).toFixed(4),
        gasUsed: (hash % 300000) + 21000,
        gasPrice: (hash % 50) + 10,
        success: hash % 10 > 2,
        hasInternalTxs: hash % 5 === 0,
        sweeperPattern: hash % 13 === 0,
        revertReason: 'Insufficient balance or access denied',
        highGas: (hash % 300000) + 21000 > 250000
      };
    }
  },

  tokenScanner: {
    name: 'Token Security Scanner',
    icon: '🪙',
    description: 'Scan tokens for honeypot patterns, hidden fees, and vulnerabilities',
    
    analyze(tokenAddress) {
      const findings = [];
      const criticalIssues = [];

      findings.push('🪙 TOKEN SECURITY SCAN');
      findings.push(`Address: ${tokenAddress.substring(0, 10)}...`);
      findings.push('');

      const scan = this._scanToken(tokenAddress);

      findings.push('🔒 SECURITY ANALYSIS:');
      findings.push(`Risk Score: ${scan.riskScore}/100 ${this._getRiskEmoji(scan.riskScore)}`);
      findings.push('');

      if (scan.isHoneypot) {
        findings.push('🚨 HONEYPOT DETECTED');
        findings.push('  → You can buy but CANNOT sell');
        findings.push('  → Transfer restrictions in code');
        criticalIssues.push('HONEYPOT: Do not buy this token');
      }

      if (scan.hasHiddenMint) {
        findings.push('⚠️ HIDDEN MINT FUNCTION');
        findings.push('  → Owner can create unlimited tokens');
        findings.push('  → No max supply protection');
        criticalIssues.push('Owner can dilute your holdings infinitely');
      }

      if (scan.canPause) {
        findings.push('⚠️ PAUSABLE TRANSFERS');
        findings.push('  → Owner can freeze all transfers');
        findings.push('  → You could lose access to your tokens');
        criticalIssues.push('Trading can be disabled by owner');
      }

      findings.push('');
      findings.push('📊 TOKEN METRICS:');
      findings.push(`Buy Tax: ${scan.buyTax}%`);
      findings.push(`Sell Tax: ${scan.sellTax}%`);
      if (scan.sellTax > scan.buyTax * 2) {
        findings.push('🚨 ASYMMETRIC TAX = RED FLAG');
        criticalIssues.push('Sell tax much higher than buy tax');
      }

      findings.push(`Max Transaction: ${scan.maxTx}%`);
      findings.push(`Max Wallet: ${scan.maxWallet}%`);
      findings.push('');

      findings.push('🛡️ WHAT TO CHECK ON ETHERSCAN:');
      findings.push('1. Go to token contract on Etherscan');
      findings.push('2. Click "Read Contract" tab');
      findings.push('3. Check: name(), symbol(), totalSupply()');
      findings.push('4. Look for: owner(), paused(), maxSupply()');
      findings.push('5. Search code for "sell" restrictions');
      findings.push('6. Check "Write Contract" for dangerous functions');
      findings.push('');
      findings.push('🔬 ADVANCED CHECKS:');
      findings.push('• Use Token Sniffer (tokensniffer.com)');
      findings.push('• Use GoPlus Security (gopluslabs.io)');
      findings.push('• Check honeypot.is for automated scan');
      findings.push('• Test with small amount first (0.001 ETH)');

      if (criticalIssues.length > 0) {
        findings.push('');
        findings.push('🚨 CRITICAL ISSUES FOUND:');
        criticalIssues.forEach(issue => findings.push(`  • ${issue}`));
        findings.push('');
        findings.push('⛔ RECOMMENDATION: DO NOT BUY');
      }

      return {
        findings,
        type: scan.riskScore > 70 ? 'danger' : scan.riskScore > 40 ? 'warning' : 'info',
        scan
      };
    },

    _scanToken(address) {
      const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      const buyTax = hash % 10;
      const sellTax = buyTax + (hash % 20);
      const isHoneypot = hash % 8 === 0;
      const hasHiddenMint = hash % 7 === 0;
      const canPause = hash % 6 === 0;

      let riskScore = 0;
      if (isHoneypot) riskScore += 80;
      if (hasHiddenMint) riskScore += 30;
      if (canPause) riskScore += 20;
      if (sellTax > buyTax * 2) riskScore += 25;
      riskScore = Math.min(riskScore, 100);

      return {
        riskScore,
        isHoneypot,
        hasHiddenMint,
        canPause,
        buyTax,
        sellTax,
        maxTx: (hash % 5) + 1,
        maxWallet: (hash % 10) + 5
      };
    },

    _getRiskEmoji(score) {
      if (score >= 80) return '🔴 EXTREME RISK';
      if (score >= 60) return '🟠 HIGH RISK';
      if (score >= 40) return '🟡 MEDIUM RISK';
      if (score >= 20) return '🟢 LOW RISK';
      return '✅ MINIMAL RISK';
    }
  }
};

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InvestigationTools;
}
