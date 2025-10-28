// Contract Security Patterns Library
// Real-world red flags and detection patterns for blockchain security education
// Based on 2024-2025 threat intelligence and research

const ContractPatterns = {
  // ==========================================
  // HONEYPOT DETECTION PATTERNS
  // ==========================================
  
  honeypotPatterns: {
    maliciousUpgradeability: {
      name: 'Malicious Upgradeability',
      severity: 'critical',
      description: 'Contract has upgrade functions that can swap implementation to drain funds',
      codePatterns: [
        'upgradeTo(',
        'setImplementation(',
        'delegatecall',
        'fallback() external payable',
        '_setImplementation'
      ],
      redFlags: [
        'Proxy contract with changeable implementation address',
        'No timelock on upgrade function',
        'Owner can upgrade without governance',
        'Implementation address stored in mutable storage'
      ],
      howToCheck: [
        '1. Search for "upgradeTo" or "setImplementation" in contract code',
        '2. Check if implementation address is in mutable storage slot',
        '3. Look for delegatecall in fallback/receive functions',
        '4. Verify if there\'s a timelock or multi-sig for upgrades',
        '5. Check transaction history for implementation changes'
      ],
      realExample: 'Many rug pulls use proxy patterns: deploy safe V1, get users to deposit, upgrade to malicious V2 that transfers all funds to owner'
    },

    balanceDisorder: {
      name: 'Balance Disorder',
      severity: 'high',
      description: 'Logic compares msg.value with contract balance incorrectly to trap funds',
      codePatterns: [
        'address(this).balance',
        'msg.value',
        'require(msg.value == address(this).balance',
        'if (msg.value > address(this).balance - msg.value)'
      ],
      redFlags: [
        'Withdraw function requires msg.value to equal balance',
        'Transfer amount calculated using both msg.value AND balance',
        'Impossible mathematical conditions for withdrawal',
        'Contract appears profitable but withdrawals always fail'
      ],
      howToCheck: [
        '1. Find withdraw/claim functions in code',
        '2. Look for conditions using both msg.value and address(this).balance',
        '3. Check if the math actually allows withdrawal',
        '4. Test with simulation (Tenderly/Remix) before real transaction',
        '5. Look for failed withdrawal attempts in transaction history'
      ],
      realExample: 'Fake "drain contract" games where you send 1 ETH to get 10 ETH but the condition requires sending exactly the contract balance'
    },

    hiddenStateUpdate: {
      name: 'Hidden State Update',
      severity: 'high',
      description: 'Critical state variables set by hidden functions only attacker can call',
      codePatterns: [
        'private bool',
        'private mapping',
        'onlyOwner',
        'internal function',
        'assembly { sstore'
      ],
      redFlags: [
        'Public claim function checks private variables',
        'No visible way to set winning condition',
        'State variables initialized but never updated publicly',
        'Assembly blocks that write to storage directly'
      ],
      howToCheck: [
        '1. Find all state variables (especially private ones)',
        '2. Trace where each variable is set/modified',
        '3. Check if public functions reference private state',
        '4. Look for hidden setter functions or assembly writes',
        '5. Verify if users can actually trigger winning conditions'
      ],
      realExample: 'Lottery contracts where "winner" variable is set by owner-only function, public can buy tickets but never win'
    },

    hiddenTransfer: {
      name: 'Hidden Transfer',
      severity: 'critical',
      description: 'Payout functions have unreachable code paths or owner-only conditions',
      codePatterns: [
        'if (msg.sender == owner)',
        'require(isWinner[msg.sender])',
        'modifier onlyWinner',
        'if (block.timestamp > impossibleDate)'
      ],
      redFlags: [
        'Transfer guarded by conditions only attacker satisfies',
        'Multiple if/else branches where user branch reverts',
        'Time-based locks that are already expired or unreachable',
        'Mapping checks for winner status never publicly set'
      ],
      howToCheck: [
        '1. Find all transfer/send/call statements',
        '2. Trace the conditions required to reach each one',
        '3. Check if users can satisfy those conditions',
        '4. Look for contradictory require statements',
        '5. Simulate function calls to see which branches execute'
      ],
      realExample: 'Contract shows withdraw function but has hidden "require(msg.sender == deployer)" before the transfer'
    },

    sweeperBot: {
      name: 'Sweeper Bot Pattern',
      severity: 'critical',
      description: 'Automated scripts immediately transfer incoming funds to attacker wallet',
      codePatterns: [
        'receive() external payable',
        'fallback() external payable',
        'transfer(owner)',
        'call{value: address(this).balance}'
      ],
      redFlags: [
        'Deposits immediately followed by outbound transfers',
        'All funds go to single address',
        'Transactions happen in same block or within seconds',
        'Pattern: deposit tx → sweep tx repeatedly'
      ],
      howToCheck: [
        '1. Sort Etherscan transactions by age',
        '2. Look at deposits: are they followed by immediate withdrawals?',
        '3. Check if all outbound transfers go to same address',
        '4. Calculate time delta between deposit and sweep',
        '5. Check receive/fallback functions for auto-forward logic'
      ],
      realExample: 'Fake airdrop contracts: you send gas fee, bot immediately sweeps it. Check 0x[scam address] transaction list'
    },

    unverifiedContract: {
      name: 'Unverified Source Code',
      severity: 'high',
      description: 'Contract bytecode not verified on Etherscan - impossible to audit',
      codePatterns: [
        'N/A - bytecode only'
      ],
      redFlags: [
        'No green checkmark on Etherscan',
        '"Contract Source Code Not Verified"',
        'Bytecode exists but source hidden',
        'Partial verification or obfuscated code'
      ],
      howToCheck: [
        '1. Go to Etherscan contract page',
        '2. Look for green checkmark and "Contract Source Code Verified"',
        '3. If unverified, check creation date (new = suspicious)',
        '4. Check if similar contracts by same deployer are verified',
        '5. Never interact with unverified contracts for large amounts'
      ],
      realExample: 'Token launches that refuse to verify source code are usually hiding malicious mint/transfer restrictions'
    }
  },

  // ==========================================
  // TOKEN SECURITY PATTERNS
  // ==========================================

  tokenPatterns: {
    unlimitedMinting: {
      name: 'Unlimited Mint Function',
      severity: 'critical',
      description: 'Owner can mint infinite tokens, diluting all holders',
      codePatterns: [
        'function mint(',
        '_mint(',
        'onlyOwner',
        'totalSupply +=',
        'balanceOf[owner] +='
      ],
      redFlags: [
        'Public or owner-callable mint function with no cap',
        'No max supply constant',
        'Mint function not renounced',
        'Recent mint transactions by owner'
      ],
      howToCheck: [
        '1. Search contract for "mint" function',
        '2. Check if it has onlyOwner modifier',
        '3. Look for MAX_SUPPLY or supply cap checks',
        '4. Check if ownership was renounced',
        '5. Review transaction history for recent mints'
      ],
      realExample: 'SafeMoon-style tokens where developer minted trillions more tokens and dumped on holders'
    },

    transferRestrictions: {
      name: 'Transfer Restrictions',
      severity: 'high',
      description: 'Contract prevents selling or has hidden transfer taxes',
      codePatterns: [
        'require(canSell[msg.sender])',
        'if (to == uniswapPair) revert()',
        'bool private tradingEnabled = false',
        'uint256 sellTax = 99'
      ],
      redFlags: [
        'Trading can be paused by owner',
        'Sell transactions have higher fees than buy',
        'Whitelist required to sell',
        'Anti-bot measures that never get disabled'
      ],
      howToCheck: [
        '1. Find transfer/transferFrom functions',
        '2. Look for conditional blocks on recipient address',
        '3. Check for tradingEnabled or similar bool flags',
        '4. Calculate tax percentages for buy vs sell',
        '5. Check if restrictions can be removed or are permanent'
      ],
      realExample: 'SQUID token from Squid Game - holders could buy but not sell, devs rugpulled $3.38M'
    },

    hiddenOwnership: {
      name: 'Hidden Ownership Transfer',
      severity: 'high',
      description: 'Ownership can be transferred without obvious function',
      codePatterns: [
        'owner = msg.sender',
        'setOwner(',
        'changeOwner(',
        'assembly { sstore(0, caller()) }'
      ],
      redFlags: [
        'Owner variable not immutable',
        'Public/external functions that modify owner',
        'No two-step ownership transfer',
        'Ownership transferred recently'
      ],
      howToCheck: [
        '1. Find "owner" variable declaration',
        '2. Search for all places it gets assigned',
        '3. Check if there are hidden setter functions',
        '4. Look for assembly blocks that write to owner slot',
        '5. Check transaction history for ownership changes'
      ],
      realExample: 'Contracts that appear "renounced" but have hidden setOwner function called via fallback'
    },

    proxyPatternAbuse: {
      name: 'Proxy Pattern Abuse',
      severity: 'critical',
      description: 'Transparent proxy can be upgraded to malicious implementation',
      codePatterns: [
        'delegatecall(_implementation',
        'TransparentUpgradeableProxy',
        'UUPSUpgradeable',
        '_upgradeTo('
      ],
      redFlags: [
        'Implementation address is mutable',
        'No governance or timelock on upgrades',
        'Recent implementation changes',
        'Proxy admin is EOA not multi-sig'
      ],
      howToCheck: [
        '1. Check if contract uses proxy pattern (delegatecall)',
        '2. Find implementation address storage slot',
        '3. Check who can upgrade (admin/owner address)',
        '4. Look for timelock or governance controls',
        '5. Verify implementation contract is also verified'
      ],
      realExample: 'Countless DeFi rug pulls: launch with safe proxy, gain trust, upgrade to drain implementation'
    }
  },

  // ==========================================
  // ETHERSCAN ANALYSIS CHECKLIST
  // ==========================================

  etherscanChecklist: {
    contractTab: {
      checks: [
        {
          item: 'Verification Status',
          green: 'Green checkmark with "Contract Source Code Verified"',
          red: 'No checkmark or "Contract Source Code Not Verified"',
          action: 'Only interact with verified contracts for significant amounts'
        },
        {
          item: 'Compiler Version',
          green: 'Recent stable version (0.8.x)',
          red: 'Very old version (0.4.x) or experimental/nightly builds',
          action: 'Old compilers have known bugs (reentrancy, overflow)'
        },
        {
          item: 'Optimization',
          green: 'Optimization enabled with reasonable runs (200-1000)',
          red: 'Optimization disabled or extreme runs (>10000)',
          action: 'Check if optimization settings match claimed audit'
        },
        {
          item: 'License',
          green: 'Standard license (MIT, GPL, Apache)',
          red: 'No license or suspicious custom license',
          action: 'Legitimate projects use standard open-source licenses'
        }
      ]
    },

    readContract: {
      checks: [
        {
          item: 'Owner Address',
          green: 'Burned address (0x000...dEaD) or multi-sig',
          red: 'EOA or recently created address',
          action: 'Check etherscan for owner address history and balance'
        },
        {
          item: 'Total Supply vs Max Supply',
          green: 'totalSupply equals maxSupply or close to it',
          red: 'Large gap between total and max (room for minting)',
          action: 'Calculate how many more tokens can be minted'
        },
        {
          item: 'Pause Status',
          green: 'No pause functionality or paused == false permanently',
          red: 'Contract is paused or has pause function',
          action: 'Check if pause can be triggered and by whom'
        },
        {
          item: 'Fee Percentage',
          green: 'Low fees (0-5%) or no fees',
          red: 'High fees (>10%) or different fees for buy/sell',
          action: 'Calculate actual cost of transactions with fees'
        }
      ]
    },

    transactions: {
      checks: [
        {
          item: 'Transaction Pattern',
          green: 'Normal distribution of buys, sells, transfers',
          red: 'Only deposits (no withdrawals) or immediate sweeps',
          action: 'Look for pattern: deposit → instant transfer to same address'
        },
        {
          item: 'Failed Transactions',
          green: 'Low failure rate (<5%)',
          red: 'Many failed withdrawals or sells (>20% failure)',
          action: 'Click on failed txs and read the revert reason'
        },
        {
          item: 'Top Holders',
          green: 'Distributed ownership, no single holder >10%',
          red: 'Top holder has >50% or deployer still holds majority',
          action: 'Check if top holders are exchanges, burn addresses, or suspicious EOAs'
        },
        {
          item: 'Activity Pattern',
          green: 'Steady organic activity over time',
          red: 'All activity from same few addresses (wash trading)',
          action: 'Check if transactions are between same wallets repeatedly'
        }
      ]
    },

    events: {
      checks: [
        {
          item: 'Ownership Events',
          green: 'OwnershipTransferred to 0x000 (renounced) at launch',
          red: 'Recent ownership changes or no renouncement',
          action: 'Check when ownership was transferred and to whom'
        },
        {
          item: 'Upgrade Events',
          green: 'No upgrade events or transparent upgrade history',
          red: 'Recent upgrades without announcement',
          action: 'Check implementation changes in proxy contracts'
        },
        {
          item: 'Large Transfers',
          green: 'Large transfers to/from known exchanges',
          red: 'Large transfers to new addresses before announcements',
          action: 'Track where large amounts are moving (potential dumps)'
        }
      ]
    }
  },

  // ==========================================
  // INVESTIGATION WORKFLOWS
  // ==========================================

  workflows: {
    quickCheck: {
      name: '30-Second Quick Check',
      steps: [
        'Is contract verified on Etherscan? (No = STOP)',
        'Is owner address renounced (0x000...dEaD)? (No = HIGH RISK)',
        'Any recent failed withdrawal transactions? (Yes = RED FLAG)',
        'Do deposits get immediately swept to one address? (Yes = SWEEPER BOT)',
        'Is total supply capped? (No = UNLIMITED MINT RISK)'
      ],
      verdict: 'If any red flags, do deeper analysis before interacting'
    },

    deepAnalysis: {
      name: 'Deep Contract Analysis (30 minutes)',
      steps: [
        '1. ETHERSCAN CONTRACT TAB: Check verification, compiler, license',
        '2. READ CONTRACT: Check owner, supply, pause, fees',
        '3. CODE REVIEW: Search for: upgradeTo, mint, onlyOwner, delegatecall, assembly',
        '4. TRANSACTION HISTORY: Look for patterns, failed txs, sweeps',
        '5. TOKEN HOLDERS: Check distribution and top holder addresses',
        '6. EVENTS LOG: Review ownership changes, upgrades, large transfers',
        '7. EXTERNAL TOOLS: Run through Token Sniffer, GoPlus, HoneyBadger',
        '8. COMMUNITY: Search Twitter/X, Reddit, Discord for warnings',
        '9. SIMULATION: Test small transaction on Tenderly before real tx',
        '10. DECISION: Proceed only if all checks pass'
      ],
      verdict: 'Complete checklist before investing significant amounts'
    }
  },

  // ==========================================
  // COMMON EXPLOITS
  // ==========================================

  commonExploits: {
    reentrancy: {
      name: 'Reentrancy Attack',
      description: 'Attacker calls back into contract before first call finishes',
      pattern: 'External call before state update',
      prevention: 'Checks-Effects-Interactions pattern, ReentrancyGuard'
    },
    integerOverflow: {
      name: 'Integer Overflow/Underflow',
      description: 'Arithmetic operations exceed max/min values',
      pattern: 'Unchecked math operations in old Solidity',
      prevention: 'Use Solidity 0.8+ (built-in checks) or SafeMath'
    },
    frontRunning: {
      name: 'Front-Running (MEV)',
      description: 'Bot sees your transaction and submits same one with higher gas',
      pattern: 'Profitable trades in mempool get copied',
      prevention: 'Use private mempools (Flashbots), slippage protection'
    },
    flashLoan: {
      name: 'Flash Loan Attack',
      description: 'Borrow huge amount, manipulate price, repay in same transaction',
      pattern: 'Price oracle manipulation using flash loans',
      prevention: 'Time-weighted average prices (TWAP), multi-oracle'
    }
  },

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  getPatternByType(type, name) {
    if (type === 'honeypot') return this.honeypotPatterns[name];
    if (type === 'token') return this.tokenPatterns[name];
    return null;
  },

  getAllRedFlags() {
    const flags = [];
    Object.values(this.honeypotPatterns).forEach(pattern => {
      flags.push(...pattern.redFlags.map(f => ({ category: 'honeypot', type: pattern.name, flag: f })));
    });
    Object.values(this.tokenPatterns).forEach(pattern => {
      flags.push(...pattern.redFlags.map(f => ({ category: 'token', type: pattern.name, flag: f })));
    });
    return flags;
  },

  getChecklistForTool(toolName) {
    const toolMappings = {
      'contractAnalyzer': 'contractTab',
      'addressLookup': 'readContract',
      'transactionTracer': 'transactions',
      'eventExplorer': 'events'
    };
    
    const checklistKey = toolMappings[toolName];
    return checklistKey ? this.etherscanChecklist[checklistKey] : null;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContractPatterns;
}
