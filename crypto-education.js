// Crypto & Blockchain Education Module
// Comprehensive educational content for onboarding users to blockchain security

const CryptoEducation = {
  // ==========================================
  // BLOCKCHAIN FUNDAMENTALS
  // ==========================================
  
  fundamentals: {
    whatIsBlockchain: {
      title: "What is a Blockchain?",
      icon: "⛓️",
      summary: "A blockchain is a distributed digital ledger that records transactions across many computers in a way that makes the records difficult to alter retroactively.",
      
      keyPoints: [
        {
          title: "Decentralized Network",
          description: "No single authority controls the blockchain. It's maintained by thousands of computers (nodes) worldwide.",
          analogy: "Like a Google Doc everyone can read, but no single person can delete or alter past entries"
        },
        {
          title: "Immutable Records",
          description: "Once data is written to the blockchain, it's extremely difficult to change. Each block is cryptographically linked to the previous one.",
          analogy: "Like writing in permanent ink in a shared notebook that everyone watches"
        },
        {
          title: "Transparent & Public",
          description: "Anyone can view all transactions on public blockchains like Ethereum. Addresses are pseudonymous, not anonymous.",
          analogy: "Like a glass bank vault where everyone can see the transactions but not necessarily who owns which account"
        },
        {
          title: "Consensus Mechanism",
          description: "The network agrees on the current state through proof-of-work (mining) or proof-of-stake (validators).",
          analogy: "Like a democracy where the majority of computers must agree before recording any transaction"
        }
      ],
      
      visualExplanation: `
        📦 Block 1        📦 Block 2        📦 Block 3
        ├─ Transactions   ├─ Transactions   ├─ Transactions
        ├─ Timestamp      ├─ Timestamp      ├─ Timestamp
        └─ Hash A    ──→  └─ Hash B    ──→  └─ Hash C
        
        Each block contains:
        • Multiple transactions
        • A timestamp
        • A unique hash (fingerprint)
        • Previous block's hash (the chain)
      `,
      
      whyItMatters: "Understanding blockchain basics helps you recognize when something is inconsistent with how blockchains actually work - a common scam tactic!"
    },

    whatIsCrypto: {
      title: "What is Cryptocurrency?",
      icon: "💰",
      summary: "Cryptocurrency is digital money that uses cryptography for security and operates on blockchain technology without central authority.",
      
      keyPoints: [
        {
          title: "Digital-Only Currency",
          description: "Crypto exists only as digital entries on a blockchain. There are no physical coins or bills.",
          example: "Bitcoin (BTC), Ethereum (ETH), and thousands of other tokens"
        },
        {
          title: "Peer-to-Peer Transfers",
          description: "Send value directly to anyone without intermediaries like banks. Transactions are verified by network consensus.",
          benefit: "Fast, borderless, censorship-resistant"
        },
        {
          title: "Cryptographic Security",
          description: "Your crypto is secured by private keys - long strings of characters that prove ownership.",
          warning: "⚠️ If someone gets your private key, they own your crypto. No recovery possible."
        },
        {
          title: "Programmable Money",
          description: "Smart contracts allow crypto to be programmable - money that can automatically execute complex conditions.",
          example: "Automated trades, lending protocols, NFT marketplaces"
        }
      ],
      
      commonTypes: {
        "Bitcoin (BTC)": "Digital gold - store of value, limited to 21 million coins",
        "Ethereum (ETH)": "Programmable blockchain for smart contracts and dApps",
        "Stablecoins (USDC, USDT)": "Pegged to USD - designed to maintain $1 value",
        "Altcoins": "Alternative cryptocurrencies with various use cases",
        "Tokens": "Built on existing blockchains (ERC-20 on Ethereum)"
      },
      
      whyItMatters: "Scammers exploit people's excitement about crypto wealth. Understanding what crypto IS helps you spot what it ISN'T."
    },

    wallets: {
      title: "How Crypto Wallets Work",
      icon: "👛",
      summary: "A crypto wallet doesn't actually 'store' crypto - it stores the keys that prove you own crypto recorded on the blockchain.",
      
      keyComponents: [
        {
          term: "Public Address",
          description: "Like your account number - safe to share. Others use this to send you crypto.",
          format: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb (Ethereum)",
          visual: "🏠 Your home address - anyone can see it, use it to send you mail"
        },
        {
          term: "Private Key",
          description: "Like your password - NEVER share. Anyone with this controls your crypto forever.",
          format: "64 random hexadecimal characters",
          visual: "🔑 Your house keys - possession = ownership, no recovery if lost"
        },
        {
          term: "Seed Phrase / Recovery Phrase",
          description: "12-24 words that can restore your private keys. Backup of all your crypto.",
          format: "witch collapse practice feed shame open despair creek road again ice least",
          visual: "🔐 Master key to your entire crypto vault"
        }
      ],

      walletTypes: {
        "Hot Wallets (Software)": {
          examples: "MetaMask, Trust Wallet, Coinbase Wallet",
          pros: "Convenient, easy to use, connects to dApps",
          cons: "Connected to internet = vulnerable to hacking",
          bestFor: "Small amounts, active trading, daily use"
        },
        "Cold Wallets (Hardware)": {
          examples: "Ledger, Trezor",
          pros: "Offline storage, maximum security",
          cons: "Less convenient, costs money ($50-200)",
          bestFor: "Large holdings, long-term storage"
        },
        "Exchange Wallets": {
          examples: "Coinbase, Binance",
          pros: "Easy fiat on-ramp, customer support",
          cons: "Not your keys = not your crypto, counterparty risk",
          bestFor: "Beginners, buying/selling only"
        }
      },

      criticalRules: [
        "🚨 NEVER share your seed phrase with ANYONE - not support, not websites, not 'validators'",
        "🚨 NEVER type your seed phrase on any website or app",
        "🚨 Write seed phrase on paper, store securely offline",
        "🚨 Hardware wallets never ask for seed phrase on computer",
        "🚨 Legitimate crypto projects NEVER need your private keys"
      ],

      whyItMatters: "90% of crypto scams involve tricking you into revealing your seed phrase or private keys. This is THE most important concept to understand."
    },

    smartContracts: {
      title: "What are Smart Contracts?",
      icon: "📜",
      summary: "Smart contracts are self-executing programs on the blockchain that automatically enforce agreements when conditions are met.",
      
      howTheyWork: [
        {
          step: "Code is Written",
          description: "Developer writes contract in Solidity (for Ethereum) or similar language",
          example: "IF user deposits 1 ETH, THEN mint 100 tokens"
        },
        {
          step: "Deployed to Blockchain",
          description: "Contract is uploaded to blockchain with a unique address",
          immutable: "Once deployed, the code generally cannot be changed"
        },
        {
          step: "Users Interact",
          description: "Anyone can call contract functions by sending transactions",
          example: "Click 'Swap' on Uniswap → calls contract function"
        },
        {
          step: "Automatic Execution",
          description: "Contract executes exactly as programmed when conditions met",
          trustless: "No human can interfere or stop it"
        }
      ],

      commonUses: [
        {
          category: "DeFi (Decentralized Finance)",
          examples: [
            "Uniswap: Automated token swaps without centralized exchange",
            "Aave: Borrow/lend crypto with algorithmic interest rates",
            "MakerDAO: Create stablecoins backed by collateral"
          ]
        },
        {
          category: "NFTs (Non-Fungible Tokens)",
          examples: [
            "OpenSea: Marketplace smart contracts for buying/selling NFTs",
            "ERC-721: Standard for creating unique digital items",
            "Royalty contracts: Automatic creator payments on resales"
          ]
        },
        {
          category: "DAOs (Decentralized Organizations)",
          examples: [
            "Voting contracts: Token holders vote on proposals",
            "Treasury management: Automated fund allocation",
            "Multi-signature wallets: Require multiple approvals"
          ]
        }
      ],

      risks: [
        {
          risk: "Code Vulnerabilities",
          description: "Bugs in smart contract code can be exploited to steal funds",
          realExample: "The DAO hack (2016): $60M stolen due to reentrancy bug",
          protection: "Use audited contracts, check audit reports"
        },
        {
          risk: "Immutable Bugs",
          description: "Once deployed, bugs can't be fixed (unless contract is upgradeable)",
          realExample: "Parity wallet freeze (2017): $280M permanently locked",
          protection: "Prefer battle-tested, non-upgradeable contracts"
        },
        {
          risk: "Malicious Code",
          description: "Scammers deploy contracts designed to steal your funds",
          realExample: "Honeypot tokens: You can buy but can't sell",
          protection: "Read contract code or use scanner tools"
        },
        {
          risk: "Upgradeable Contracts",
          description: "Owner can change contract logic after you interact",
          realExample: "Rug pulls: Swap safe contract for malicious version",
          protection: "Check if contract has upgrade functions"
        }
      ],

      whyItMatters: "Many scams involve malicious smart contracts. Understanding how they work helps you spot dangerous patterns before interacting."
    },

    gasAndFees: {
      title: "Understanding Gas Fees",
      icon: "⛽",
      summary: "Gas is the fee paid to process transactions and smart contract operations on blockchain networks like Ethereum.",
      
      whatIsGas: [
        {
          concept: "Computational Cost",
          description: "Every operation (transfer, swap, mint) requires computational resources",
          measured: "Gas units - complex operations need more gas"
        },
        {
          concept: "Gas Price",
          description: "How much you pay per unit of gas (measured in Gwei = 0.000000001 ETH)",
          variable: "Changes based on network congestion - high demand = high price"
        },
        {
          concept: "Transaction Fee",
          description: "Total Fee = Gas Used × Gas Price",
          example: "21,000 gas × 50 Gwei = 0.00105 ETH ($2-3 typically)"
        }
      ],

      gasPriority: {
        "Slow (Low Priority)": "Cheapest, might take 5-30 minutes",
        "Standard (Normal)": "Average price, usually 1-3 minutes",
        "Fast (High Priority)": "More expensive, typically under 1 minute",
        "Custom": "Set your own price - too low = stuck forever"
      },

      commonScams: [
        {
          scam: "Approval Phishing",
          description: "Malicious site requests approval for your entire token balance",
          howItWorks: "You approve, scammer drains wallet in separate transaction",
          protection: "Always check approval amount, use Revoke.cash to check existing approvals"
        },
        {
          scam: "Gas Fee Scams",
          description: "Fake 'airdrop' requires you to pay gas to claim nothing",
          howItWorks: "Scammer collects small gas fees from thousands of victims",
          protection: "Legitimate airdrops never require paying upfront fees"
        },
        {
          scam: "Gas Price Manipulation",
          description: "Contract has hidden code that makes gas cost 1000x normal",
          howItWorks: "Buy succeeds with normal gas, sell requires impossible gas",
          protection: "Simulate transactions before executing"
        }
      ],

      bestPractices: [
        "✅ Always check gas fee before confirming in wallet",
        "✅ For Ethereum, anything over 100 Gwei is expensive - wait if not urgent",
        "✅ Use gas trackers (Etherscan Gas Tracker, ETH Gas Station)",
        "✅ Test with small amounts first for unfamiliar contracts",
        "✅ Beware of contracts that fail with 'Out of Gas' - might be malicious"
      ],

      whyItMatters: "Scammers use gas mechanisms to trap funds or trick users. Understanding gas helps you spot suspicious transaction patterns."
    }
  },

  // ==========================================
  // COMMON BLOCKCHAIN CONCEPTS
  // ==========================================

  concepts: {
    addresses: {
      term: "Blockchain Address",
      simple: "Your account number on the blockchain",
      detailed: "A unique string of characters that identifies your wallet. Think of it like an email address for crypto - public and safe to share.",
      format: "Ethereum: 0x + 40 hexadecimal characters",
      example: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      important: "Addresses are case-insensitive but checksummed addresses use capital letters to detect typos"
    },

    transactions: {
      term: "Transaction (TX)",
      simple: "A record of sending crypto from one address to another",
      detailed: "Every transaction is broadcast to the network, verified by nodes, and permanently recorded on the blockchain.",
      components: [
        "Sender address (from)",
        "Recipient address (to)",
        "Amount of crypto",
        "Gas fee",
        "Transaction hash (unique ID)"
      ],
      irreversible: "⚠️ Once confirmed, transactions CANNOT be reversed or cancelled"
    },

    tokens: {
      term: "Tokens vs Coins",
      coins: "Native cryptocurrencies of their own blockchains (BTC, ETH, BNB)",
      tokens: "Built on top of existing blockchains (USDC on Ethereum, most altcoins)",
      standards: {
        "ERC-20": "Fungible tokens on Ethereum (all units identical)",
        "ERC-721": "Non-fungible tokens (NFTs - each unique)",
        "ERC-1155": "Multi-token standard (fungible + non-fungible)"
      },
      important: "Anyone can create tokens! Having a token doesn't mean it's valuable or legitimate."
    },

    dApps: {
      term: "dApp (Decentralized Application)",
      simple: "Apps that run on blockchain instead of centralized servers",
      examples: [
        "Uniswap (decentralized exchange)",
        "OpenSea (NFT marketplace)",
        "Aave (lending platform)",
        "ENS (domain name system)"
      ],
      difference: "Traditional apps: company controls. dApps: smart contracts control (theoretically no single owner)",
      risk: "Even 'decentralized' apps can have admin keys, upgradeable contracts, or centralized components"
    },

    defi: {
      term: "DeFi (Decentralized Finance)",
      simple: "Financial services (lending, trading, investing) without traditional banks",
      benefits: [
        "No middleman required",
        "Accessible to anyone with internet",
        "Transparent and auditable",
        "Composable (protocols work together)"
      ],
      risks: [
        "Smart contract vulnerabilities",
        "No insurance or recovery",
        "Price volatility",
        "Complex protocols easy to exploit"
      ],
      recentStats: "$2.17B+ stolen in first half of 2025 alone"
    },

    layer2: {
      term: "Layer 2 / L2",
      simple: "Networks built on top of Ethereum to make transactions faster and cheaper",
      examples: [
        "Arbitrum - optimistic rollup",
        "Optimism - optimistic rollup",
        "Base - Coinbase's L2",
        "zkSync - zero-knowledge rollup"
      ],
      howTheyWork: "Process transactions off main chain, periodically submit batches to Ethereum",
      scamRisk: "New L2s mean new phishing opportunities - fake bridges, airdrop scams, etc."
    }
  },

  // ==========================================
  // SECURITY FUNDAMENTALS
  // ==========================================

  security: {
    goldenRules: [
      {
        icon: "🔐",
        rule: "Not Your Keys, Not Your Crypto",
        explanation: "If you don't control the private keys, you don't truly own the crypto",
        consequence: "Exchange gets hacked? Your funds are at risk. Exchange freezes accounts? You're locked out."
      },
      {
        icon: "🤐",
        rule: "Never Share Your Seed Phrase",
        explanation: "Seed phrase = complete access to all your crypto forever. No legitimate service ever needs it.",
        consequence: "Share seed phrase = instant loss of all funds. No recovery possible."
      },
      {
        icon: "✅",
        rule: "Verify Everything",
        explanation: "Check URLs, contract addresses, social media accounts. Scammers impersonate legitimate projects.",
        consequence: "One wrong character in address = funds sent to scammer forever."
      },
      {
        icon: "🔬",
        rule: "Test Small Amounts First",
        explanation: "Before sending large amounts, test with tiny transactions to verify everything works.",
        consequence: "Smart contract bug or wrong address = lose everything instantly."
      },
      {
        icon: "📚",
        rule: "Research Before Investing",
        explanation: "Check team, audit reports, token contract, community. If it sounds too good to be true, it is.",
        consequence: "FOMO leads to scams. 99% of new tokens go to zero or are rug pulls."
      },
      {
        icon: "🛡️",
        rule: "Use Multiple Wallets",
        explanation: "Hot wallet for daily use (small amounts), cold wallet for savings (large amounts)",
        consequence: "Single wallet compromised = lose everything. Segregation limits damage."
      }
    ],

    commonMistakes: [
      "Storing seed phrase in cloud, photos, or email (hackable)",
      "Using same password across multiple services",
      "Clicking links from Discord/Telegram DMs",
      "Connecting wallet to unknown/unaudited dApps",
      "Not checking transaction details before approving",
      "Trading based on social media hype without research",
      "Assuming high APY is safe and sustainable",
      "Ignoring contract verification and audit status"
    ]
  },

  // ==========================================
  // ONBOARDING JOURNEY STEPS
  // ==========================================

  onboardingJourney: [
    {
      step: 1,
      title: "Understand the Basics",
      icon: "📖",
      duration: "10 minutes",
      content: [
        "What is blockchain and how does it work?",
        "What is cryptocurrency and why it matters?",
        "How wallets work (keys, addresses, seed phrases)"
      ],
      goal: "Build foundational knowledge before handling real crypto"
    },
    {
      step: 2,
      title: "Learn the Threats",
      icon: "⚠️",
      duration: "20 minutes",
      content: [
        "Common scam types: phishing, rug pulls, honeypots",
        "Social engineering tactics used by scammers",
        "Real case studies of major crypto thefts"
      ],
      goal: "Recognize red flags and threat patterns"
    },
    {
      step: 3,
      title: "Practice with Scenarios",
      icon: "🎯",
      duration: "30 minutes",
      content: [
        "Interactive scenarios simulating real scams",
        "Use investigation tools to analyze threats",
        "Learn to spot subtle manipulation techniques"
      ],
      goal: "Apply knowledge in realistic situations"
    },
    {
      step: 4,
      title: "Master Security Tools",
      icon: "🔧",
      duration: "20 minutes",
      content: [
        "How to read Etherscan and block explorers",
        "Using contract scanners (Token Sniffer, GoPlus)",
        "Transaction simulation and gas estimation"
      ],
      goal: "Gain practical skills for due diligence"
    },
    {
      step: 5,
      title: "Build Safe Habits",
      icon: "🛡️",
      duration: "Ongoing",
      content: [
        "Bookmark legitimate sites",
        "Set up hardware wallet for large holdings",
        "Regular security audits of approvals",
        "Stay updated on new threats"
      ],
      goal: "Develop long-term security-first mindset"
    }
  ],

  // ==========================================
  // HELPER FUNCTIONS
  // ==========================================

  getConceptByTerm(term) {
    return this.concepts[term] || null;
  },

  getFundamentalByKey(key) {
    return this.fundamentals[key] || null;
  },

  getOnboardingStep(stepNumber) {
    return this.onboardingJourney.find(s => s.step === stepNumber) || null;
  },

  getAllGoldenRules() {
    return this.security.goldenRules;
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CryptoEducation;
}
