// Blockchain Scam Scenarios Database - 2024-2026 Threats
// Based on real threat intelligence and research

const SCENARIOS = [
  // CATEGORY: WALLET SECURITY
  {
    id: 1,
    category: 'wallet',
    difficulty: 'easy',
    type: 'email',
    title: 'MetaMask Phishing Email',
    from: 'security@metamask-support.com',
    to: 'you@email.com',
    subject: 'URGENT: Verify Your Wallet Within 24 Hours',
    body: `Dear MetaMask User,

We have detected suspicious activity on your wallet. Your account will be suspended within 24 hours unless you verify your identity immediately.

Click here to verify: https://metamask-verify.support-team.com/auth

You will need to enter your 12-word recovery phrase to confirm ownership.

If you do not complete verification, your funds may be permanently locked.

Best regards,
MetaMask Security Team`,
    question: 'Is this email legitimate or a scam?',
    correctAnswer: 'scam',
    options: [
      { id: 'legit', text: 'Legitimate - I should verify immediately to protect my funds' },
      { id: 'scam', text: 'Scam - MetaMask never asks for seed phrases via email' },
      { id: 'unsure', text: 'Unsure - I should email MetaMask support to confirm' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Excellent! This is a classic phishing scam. MetaMask will NEVER ask for your recovery phrase via email or any other method. The domain "metamask-support.com" is fake (real is metamask.io).',
      incorrect: 'This is a phishing scam! MetaMask never sends emails asking for seed phrases. The domain is fake, and no legitimate service ever requests your recovery phrase.',
      xpReward: 100,
      redFlags: [
        'Requests seed phrase/recovery phrase - NEVER share this',
        'Urgent language creating artificial time pressure',
        'Suspicious domain: metamask-support.com (fake) vs metamask.io (real)',
        'Threatens account suspension/fund locking',
        'MetaMask never emails users about wallet verification',
        'Generic greeting "Dear MetaMask User" instead of personalized'
      ],
      blockchainInfo: [
        'Your seed phrase is the master key to all your crypto assets',
        'Anyone with your seed phrase can drain your wallet completely',
        'Hardware wallets (Ledger, Trezor) never ask for seed phrases online',
        'Always verify URLs by typing them directly into your browser'
      ]
    }
  },

  {
    id: 2,
    category: 'wallet',
    difficulty: 'medium',
    type: 'website',
    title: 'Unicode Domain Phishing',
    url: 'https://ᴜniswap.org/app',
    content: `
      <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#FF007A"/>
            <path d="M12 20L18 14L24 20L18 26L12 20Z" fill="white"/>
          </svg>
          <h1 style="font-size: 2em; color: #FF007A; margin: 0;">Uniswap</h1>
        </div>
        <h2 style="margin-bottom: 20px; color: #333;">Connect Your Wallet</h2>
        <p style="margin-bottom: 20px; color: #666;">To continue trading, please connect your wallet:</p>
        <button style="width: 100%; padding: 15px; margin-bottom: 10px; background: #FF007A; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer;">
          🦊 MetaMask
        </button>
        <button style="width: 100%; padding: 15px; margin-bottom: 10px; background: #0052FF; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer;">
          💙 Coinbase Wallet
        </button>
        <button style="width: 100%; padding: 15px; background: #3375BB; color: white; border: none; border-radius: 12px; font-size: 16px; font-weight: bold; cursor: pointer;">
          🌐 WalletConnect
        </button>
        <p style="margin-top: 20px; font-size: 12px; color: #999; text-align: center;">🔒 Secure Connection - SSL Verified</p>
      </div>
    `,
    question: 'Should you connect your wallet to this site?',
    correctAnswer: 'no',
    options: [
      { id: 'yes', text: 'Yes - It looks exactly like Uniswap and has SSL' },
      { id: 'no', text: 'No - The URL uses unicode spoofing (fake domain)' },
      { id: 'check', text: 'Check the contract address first, then connect' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect detection! The URL uses a unicode character "ᴜ" (U+1D1C) instead of regular "u". This is called homograph/punycode spoofing. The real Uniswap is at uniswap.org (not ᴜniswap.org). When you connect, a wallet drainer would steal all approved tokens.',
      incorrect: 'This is a phishing site using unicode spoofing! The "u" in the URL is actually the unicode character ᴜ (U+1D1C). Real Uniswap: uniswap.org. Connecting would trigger a malicious contract approval.',
      xpReward: 150,
      redFlags: [
        'Unicode character spoofing: ᴜniswap.org uses ᴜ (U+1D1C) instead of regular u',
        'Copy the URL and paste in text editor to see real characters',
        'SSL/HTTPS does NOT mean the site is legitimate',
        'Real Uniswap: app.uniswap.org',
        'Wallet connection would trigger malicious setApprovalForAll()',
        'No ENS verification or official security badges'
      ],
      blockchainInfo: [
        'Punycode/Unicode domains can look identical to real sites',
        'Always type URLs manually or use bookmarks',
        'setApprovalForAll() gives unlimited access to your tokens',
        'Check the actual domain by copying URL to text editor',
        'Wallet drainers stole $295M+ in 2024 via fake sites'
      ]
    }
  },

  {
    id: 3,
    category: 'wallet',
    difficulty: 'hard',
    type: 'transaction',
    title: 'Malicious Token Approval',
    txData: {
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: '0x1234...5678 (Unverified Contract)',
      value: '0 ETH',
      gasLimit: '150000',
      gasPrice: '25 gwei',
      data: '0x095ea7b3000000000000000000000000abcd...ef12ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    },
    decodedFunction: 'approve(address spender, uint256 amount)',
    decodedParams: {
      spender: '0xabcd...ef12 (Unknown Address)',
      amount: '115792089237316195423570985008687907853269984665640564039457584007913129639935 (MAX UINT256)'
    },
    question: 'A website is asking you to sign this transaction. What should you do?',
    correctAnswer: 'reject',
    options: [
      { id: 'approve', text: 'Approve - It\'s just 0 ETH so it\'s safe' },
      { id: 'reject', text: 'Reject - This gives unlimited token access to unknown address' },
      { id: 'reduce', text: 'Approve but manually reduce the amount to something smaller' }
    ],
    tools: ['contractAnalyzer', 'addressLookup'],
    feedback: {
      correct: 'Excellent! This is an unlimited token approval (MAX_UINT256) to an unverified contract. Even though the transaction shows 0 ETH, approving would let the contract spend ALL your tokens of a specific type. This is how wallet drainers work - they get approval then drain your tokens later.',
      incorrect: 'DANGER! This transaction approves unlimited token spending (MAX_UINT256) to an unknown contract. The 0 ETH is deceptive - the approve() function lets them spend your tokens. This is a wallet drainer attack that stole $295M in 2024.',
      xpReward: 200,
      redFlags: [
        'approve() function giving unlimited spending rights',
        'Amount: MAX_UINT256 (infinite approval)',
        'Unverified contract address receiving approval',
        'No legitimate dApp needs unlimited approval',
        '0 ETH value is deceptive - tokens are what\'s at risk',
        'Unknown spender address with no transaction history'
      ],
      blockchainInfo: [
        'ERC-20 approve() lets contracts spend your tokens',
        'MAX_UINT256 = unlimited approval (never do this)',
        'Always check what you\'re approving in your wallet',
        'Use tools like revoke.cash to check/revoke approvals',
        'Legitimate dApps only ask for specific amounts needed',
        'Wallet drainers rely on users not understanding approvals'
      ]
    }
  },

  // CATEGORY: DEFI SCAMS
  {
    id: 4,
    category: 'defi',
    difficulty: 'medium',
    type: 'website',
    title: 'Fake Aave Yield Farming',
    url: 'https://aave-finance.app/farm',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #B6509E 0%, #2EBAC6 100%);">
        <h1 style="color: white; font-size: 2.5em; margin-bottom: 10px;">Aave Finance</h1>
        <p style="color: rgba(255,255,255,0.9); margin-bottom: 30px;">Decentralized Liquidity Protocol</p>
        
        <div style="background: white; padding: 30px; border-radius: 15px; margin-bottom: 20px;">
          <h2 style="color: #333; margin-bottom: 20px;">🚀 NEW: Ultra Yield Farming</h2>
          <div style="background: #f0f0f0; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="font-size: 3em; font-weight: bold; color: #2EBAC6; margin-bottom: 10px;">847% APY</div>
            <div style="color: #666;">USDC-ETH Liquidity Pool</div>
          </div>
          <p style="color: #333; margin-bottom: 20px;">Deposit your USDC to earn massive yields! Limited spots available.</p>
          <button style="width: 100%; padding: 20px; background: linear-gradient(135deg, #B6509E 0%, #2EBAC6 100%); color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;">
            Connect Wallet & Deposit
          </button>
          <p style="font-size: 12px; color: #999; margin-top: 15px; text-align: center;">⏰ Offer ends in 6 hours | ✅ Smart contract audited</p>
        </div>
        
        <div style="color: rgba(255,255,255,0.8); font-size: 14px; text-align: center;">
          <p>Join 12,847 farmers earning passive income 💰</p>
        </div>
      </div>
    `,
    question: 'Is this a legitimate Aave farming opportunity?',
    correctAnswer: 'fake',
    options: [
      { id: 'deposit', text: 'Deposit USDC - 847% APY is amazing!' },
      { id: 'fake', text: 'Fake site - Real Aave doesn\'t have 847% APY pools' },
      { id: 'research', text: 'Check Aave\'s official Twitter for announcements first' }
    ],
    tools: ['urlAnalyzer', 'contractAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Great job! This is a fake Aave site. Real Aave is at aave.com (not aave-finance.app). The 847% APY is impossibly high - real Aave yields are typically 2-15% depending on asset. This is a liquidity pool scam where deposited funds are immediately stolen.',
      incorrect: 'This is a scam! Real Aave: aave.com. The 847% APY is mathematically impossible to sustain. Depositing would send your USDC to the scammer\'s contract with no way to withdraw. Always verify on official channels.',
      xpReward: 150,
      redFlags: [
        'Wrong domain: aave-finance.app (fake) vs aave.com (real)',
        '847% APY is unrealistic and unsustainable',
        'Urgency tactics: "6 hours left", "Limited spots"',
        'Fake user count: "12,847 farmers"',
        '"Audited" claim with no audit report link',
        'No official Aave branding verification',
        'Real DeFi yields are typically 2-15%, not 847%'
      ],
      blockchainInfo: [
        'Aave is a legitimate DeFi protocol for lending/borrowing',
        'Real Aave yields fluctuate with market supply/demand',
        'High APY is funded by protocol revenue and liquidity incentives',
        '847% APY would require unsustainable token emissions',
        'Always check official protocol websites via Twitter/Discord',
        'Real Aave: app.aave.com with .eth ENS domain'
      ]
    }
  },

  {
    id: 5,
    category: 'defi',
    difficulty: 'hard',
    type: 'website',
    title: 'Imposter Uniswap Pool',
    url: 'https://app.uniswap.org/pool/0xabcd...5678',
    content: `
      <div style="max-width: 500px; margin: 0 auto; padding: 20px; background: #fff; color: #000;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h2>Add Liquidity</h2>
          <button style="padding: 8px 15px; background: #f5f5f5; border: none; border-radius: 8px;">Settings ⚙️</button>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 15px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">Token 1</span>
            <span style="color: #666;">Balance: 1,250.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <input type="text" placeholder="0.0" style="border: none; background: transparent; font-size: 24px; width: 60%;" />
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 15px; background: white; border-radius: 20px;">
              <span style="font-size: 20px;">🔵</span>
              <strong>USDC</strong>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 15px 0;">
          <span style="font-size: 24px;">➕</span>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 15px; margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
            <span style="color: #666;">Token 2</span>
            <span style="color: #666;">Balance: 0.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <input type="text" placeholder="0.0" style="border: none; background: transparent; font-size: 24px; width: 60%;" />
            <div style="display: flex; align-items: center; gap: 8px; padding: 8px 15px; background: white; border-radius: 20px;">
              <span style="font-size: 20px;">⭕</span>
              <strong>USDT</strong>
            </div>
          </div>
        </div>
        
        <div style="background: #FFF3CD; border: 1px solid #FFE69C; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
          <div style="color: #856404; font-size: 14px;">
            <strong>⚠️ New Pool Alert</strong><br/>
            This is a newly created pool. Initial price ratio: 1 USDC = 1.02 USDT<br/>
            <span style="font-size: 12px;">Pool created 2 hours ago • TVL: $847</span>
          </div>
        </div>
        
        <button style="width: 100%; padding: 20px; background: #FF007A; color: white; border: none; border-radius: 15px; font-size: 18px; font-weight: bold; cursor: pointer;">
          Supply Liquidity
        </button>
      </div>
    `,
    question: 'Should you provide liquidity to this USDC/USDT pool?',
    correctAnswer: 'no',
    options: [
      { id: 'yes', text: 'Yes - USDC and USDT are both stablecoins, low risk' },
      { id: 'no', text: 'No - This could be a fake token pool (not real USDT)' },
      { id: 'small', text: 'Yes, but start with a small amount to test' }
    ],
    tools: ['contractAnalyzer', 'tokenScanner'],
    feedback: {
      correct: 'Excellent analysis! This is likely a fake token pool. While real USDC/USDT pools exist, this one has red flags: only 2 hours old, tiny TVL ($847), and unusual price ratio. Scammers create pools with fake tokens named "USDT" to steal your real USDC. Always verify token contract addresses!',
      incorrect: 'This is a fake token pool scam! The "USDT" in this pool is likely a fake token with the same name. Real USDC/USDT pools have billions in TVL, not $847. Scammers create these pools to steal your real tokens when you add liquidity.',
      xpReward: 200,
      redFlags: [
        'Extremely low TVL: $847 (real pools have millions/billions)',
        'Pool created only 2 hours ago',
        'Unusual price ratio: 1 USDC = 1.02 USDT (should be ~1:1)',
        'No verification that USDT token is the real one',
        'Real USDC/USDT pool on Uniswap V3 has $100M+ TVL',
        'Scammers create pools with fake tokens using real names'
      ],
      blockchainInfo: [
        'Anyone can create a token with any name (including "USDT")',
        'Always verify token contract addresses from official sources',
        'Real USDT on Ethereum: 0xdAC17F958D2ee523a2206206994597C13D831ec7',
        'Real USDC on Ethereum: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        'Check pool TVL - legitimate pairs have high liquidity',
        'Use tools like Etherscan to verify token contracts',
        'Liquidity pool scams stole $180M+ in 2024'
      ]
    }
  },

  // CATEGORY: LAYER 2 SCAMS
  {
    id: 6,
    category: 'layer2',
    difficulty: 'medium',
    type: 'email',
    title: 'Fake Arbitrum Airdrop',
    from: 'airdrops@arbitrum.foundation',
    to: 'you@email.com',
    subject: '🎉 You\'re Eligible for 2,450 ARB Tokens!',
    body: `Congratulations!

Based on your on-chain activity, you're eligible to claim 2,450 ARB tokens from the Arbitrum Foundation.

Estimated Value: $2,891 USD

To claim your tokens:
1. Visit: https://arbitrum-claim.org/verify
2. Connect your wallet
3. Sign the claim transaction (gas fees ~$3)

⏰ Claim deadline: December 31, 2025

Why am I eligible?
You used Arbitrum protocols before the snapshot date (March 1, 2025). This airdrop rewards early adopters and active users.

IMPORTANT: This is a one-time claim. Unclaimed tokens will be redistributed to the DAO treasury.

Claim your ARB now: https://arbitrum-claim.org/verify

Best regards,
The Arbitrum Foundation Team

---
© 2025 Arbitrum Foundation. All rights reserved.`,
    question: 'Is this airdrop legitimate?',
    correctAnswer: 'scam',
    options: [
      { id: 'claim', text: 'Claim immediately - Don\'t want to miss free tokens!' },
      { id: 'scam', text: 'Scam - Verify through official Arbitrum channels first' },
      { id: 'check', text: 'Visit the link but don\'t connect wallet yet' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! This is an airdrop phishing scam. Real Arbitrum airdrops are announced on their official Twitter (@arbitrum) and website (arbitrum.io). The domain "arbitrum-claim.org" is fake. Connecting your wallet would trigger a wallet drainer. Always verify airdrops through official channels!',
      incorrect: 'This is a scam! Real airdrop domain: arbitrum.foundation (not arbitrum-claim.org). Arbitrum announces airdrops on official Twitter and Discord only. "Claiming" would sign a malicious transaction draining your wallet. Layer 2 phishing increased 1,900% in 2024!',
      xpReward: 150,
      redFlags: [
        'Suspicious domain: arbitrum-claim.org (fake) vs arbitrum.foundation (real)',
        'Unsolicited email about free tokens',
        'Creates urgency with deadline',
        'Generic "based on your on-chain activity" with no specifics',
        'Real airdrops are announced via official Twitter/Discord first',
        'No way to verify eligibility before connecting wallet',
        'Real Arbitrum airdrop already happened in March 2023'
      ],
      blockchainInfo: [
        'Layer 2 networks (Arbitrum, Optimism, Base) are Ethereum scaling solutions',
        'Real airdrops: arbitrum.foundation, optimism.io/airdrop',
        'Always check official Twitter accounts (blue checkmark)',
        'Scammers exploit hype around Layer 2 adoption',
        'Base saw 1,900% increase in phishing scams in 2024',
        'Never connect wallet to unverified airdrop sites',
        '$3.3M stolen via fake Layer 2 airdrops in Q1 2024'
      ]
    }
  },

  {
    id: 7,
    category: 'layer2',
    difficulty: 'hard',
    type: 'website',
    title: 'Fake Base Bridge',
    url: 'https://bridge.base.org.network-migration.com',
    content: `
      <div style="max-width: 700px; margin: 0 auto; background: #0052FF; padding: 40px 30px; color: white;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: #0052FF;">B</div>
          <h1 style="font-size: 2.5em; margin: 0;">Base</h1>
        </div>
        
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 30px; border: 2px solid rgba(255,255,255,0.3);">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
            <span style="font-size: 24px;">⚠️</span>
            <strong style="font-size: 18px;">Network Migration Required</strong>
          </div>
          <p style="opacity: 0.9; line-height: 1.6;">
            Base is upgrading to Base v2 with improved security and lower fees. All existing Base assets must be migrated to the new network by January 15, 2026.
          </p>
        </div>
        
        <div style="background: white; color: #000; padding: 30px; border-radius: 15px;">
          <h2 style="margin-bottom: 20px;">Bridge Assets to Base v2</h2>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            <div style="color: #666; font-size: 14px; margin-bottom: 5px;">From</div>
            <div style="font-size: 18px; font-weight: bold;">Base v1 (Legacy)</div>
          </div>
          
          <div style="text-align: center; margin: 15px 0; font-size: 24px;">↓</div>
          
          <div style="background: #E8F4FF; padding: 15px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #0052FF;">
            <div style="color: #0052FF; font-size: 14px; margin-bottom: 5px; font-weight: bold;">To</div>
            <div style="font-size: 18px; font-weight: bold; color: #0052FF;">Base v2 (New)</div>
          </div>
          
          <div style="background: #FFF3CD; border: 1px solid #FFE69C; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <div style="color: #856404; font-size: 14px;">
              <strong>⏰ Migration Deadline: January 15, 2026</strong><br/>
              Assets not migrated will be locked permanently. Gas fees for migration are covered by the Base Foundation.
            </div>
          </div>
          
          <button style="width: 100%; padding: 20px; background: #0052FF; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">
            Connect Wallet & Migrate All Assets
          </button>
          
          <p style="text-align: center; font-size: 13px; color: #666;">
            ✅ Audited by CertiK • 🔒 Secure Smart Contract • ⚡ Instant Migration
          </p>
        </div>
        
        <p style="margin-top: 20px; opacity: 0.8; font-size: 14px; text-align: center;">
          Learn more: Read the Base v2 announcement on Mirror
        </p>
      </div>
    `,
    question: 'Should you migrate your assets using this bridge?',
    correctAnswer: 'fake',
    options: [
      { id: 'migrate', text: 'Migrate now - Don\'t want my assets locked!' },
      { id: 'fake', text: 'Fake - No such "Base v2" migration exists' },
      { id: 'official', text: 'Check Base\'s official Twitter for migration info' }
    ],
    tools: ['urlAnalyzer', 'contractAnalyzer'],
    feedback: {
      correct: 'Excellent! This is a fake bridge scam. There is no "Base v2" migration. Real Base is at base.org (not base.org.network-migration.com). This subdomain trick makes it look official. Connecting would approve a wallet drainer to steal all your tokens. Always verify protocol upgrades on official Twitter/Discord!',
      incorrect: 'This is a scam! Real Base domain: base.org. The URL "base.org.network-migration.com" looks like a Base subdomain, but the actual domain is "network-migration.com". There is no Base v2 migration. This is a wallet drainer disguised as a bridge. Verify all protocol updates on official channels!',
      xpReward: 200,
      redFlags: [
        'Fake domain: base.org.network-migration.com (actual domain: network-migration.com)',
        'No such "Base v2" migration exists',
        'Urgency: "assets will be locked permanently"',
        'Real Base has no migration announcements on official channels',
        'Subdomain trick: base.org.FAKE.com (domain is FAKE.com)',
        'Claims "gas fees covered" to encourage quick action',
        'No official Base blog post or Twitter announcement',
        'CertiK audit claim with no link to actual audit'
      ],
      blockchainInfo: [
        'Base is Coinbase\'s Layer 2 network on Ethereum',
        'Real Base: base.org, announced on @BuildOnBase Twitter',
        'Layer 2s don\'t require "migrations" - they run on Ethereum',
        'Always verify major protocol changes on official socials',
        'Bridge scams are common: fake Arbitrum, Optimism, zkSync bridges',
        'Real bridges: bridge.base.org (bookmark it!)',
        'Layer 2 bridge exploits cost users $180M+ in 2024',
        'Subdomain spoofing: real.com.fake.com → domain is fake.com'
      ]
    }
  },

  // CATEGORY: NFT SCAMS
  {
    id: 8,
    category: 'nft',
    difficulty: 'easy',
    type: 'website',
    title: 'Fake OpenSea Airdrop',
    url: 'https://opensea.io/claim-anniversary',
    content: `
      <div style="max-width: 650px; margin: 0 auto; text-align: center; padding: 40px 20px; background: linear-gradient(180deg, #2081E2 0%, #1868B7 100%); color: white;">
        <h1 style="font-size: 2.8em; margin-bottom: 15px;">🎉 OpenSea 5th Anniversary!</h1>
        <p style="font-size: 1.3em; margin-bottom: 40px; opacity: 0.95;">You've been selected for an exclusive airdrop</p>
        
        <div style="background: rgba(255,255,255,0.15); padding: 40px; border-radius: 20px; margin-bottom: 30px; backdrop-filter: blur(10px);">
          <div style="width: 250px; height: 250px; margin: 0 auto 30px; background: #34495e; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 120px; border: 3px solid rgba(255,255,255,0.3);">
            🐵
          </div>
          <h2 style="font-size: 2em; margin-bottom: 10px;">Bored Ape #9247</h2>
          <p style="font-size: 1.5em; opacity: 0.9; margin-bottom: 15px;">Estimated Value: <strong>12 ETH</strong> ($24,000)</p>
          <div style="background: rgba(255,255,255,0.2); padding: 10px; border-radius: 8px; display: inline-block;">
            <p style="margin: 0; font-size: 0.9em;">Limited Edition • 1 of 100 Anniversary NFTs</p>
          </div>
        </div>
        
        <button style="width: 100%; max-width: 400px; padding: 25px; background: white; color: #2081E2; border: none; border-radius: 15px; font-size: 20px; font-weight: bold; cursor: pointer; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
          🦊 Connect Wallet to Claim
        </button>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 0.95em;">⏰ <strong>Expires in: 04:27:33</strong></p>
        </div>
        
        <p style="font-size: 0.85em; opacity: 0.8;">* You will need to pay gas fees (~$15) to claim this NFT to your wallet</p>
      </div>
    `,
    question: 'Should you claim this NFT airdrop?',
    correctAnswer: 'scam',
    options: [
      { id: 'claim', text: 'Claim it - Free $24k NFT is amazing!' },
      { id: 'scam', text: 'Scam - This is a wallet drainer disguised as airdrop' },
      { id: 'verify', text: 'Check OpenSea\'s official Twitter first' }
    ],
    tools: ['urlAnalyzer', 'contractAnalyzer'],
    feedback: {
      correct: 'Perfect! This is a classic NFT airdrop scam. OpenSea doesn\'t do random airdrops of valuable NFTs. Real BAYC NFTs don\'t get given away. When you "connect wallet", you\'ll sign a malicious setApprovalForAll() transaction that gives the scammer access to all your NFTs and tokens. The "gas fees" excuse makes it seem legitimate.',
      incorrect: 'This is a scam! OpenSea doesn\'t give away $24k NFTs randomly. BAYC doesn\'t do anniversary airdrops. Connecting your wallet would sign a setApprovalForAll() approval letting the scammer drain all your NFTs. The countdown creates false urgency. Always verify on official channels!',
      xpReward: 100,
      redFlags: [
        'Too good to be true: Free $24,000 NFT',
        'Countdown timer creates false urgency',
        'Unsolicited "selection" - how did they know your address?',
        'OpenSea doesn\'t do random valuable NFT airdrops',
        'BAYC doesn\'t have "anniversary" airdrops to random users',
        'Mentions "gas fees" to seem legitimate',
        'No announcement on official OpenSea Twitter (@opensea)',
        'Real BAYC floor price is public - verify if giving away for free'
      ],
      blockchainInfo: [
        'setApprovalForAll() gives full control of all your NFTs',
        'Real OpenSea: opensea.io (verify domain carefully)',
        'Legitimate projects announce airdrops on official Twitter',
        'NFT scammers stole $300M+ in 2024',
        'Never connect wallet to unverified airdrop sites',
        'Check OpenSea\'s official Discord and Twitter for announcements',
        'Real NFT projects don\'t give away floor-price NFTs randomly'
      ]
    }
  },

  {
    id: 9,
    category: 'nft',
    difficulty: 'medium',
    type: 'chat',
    title: 'Discord NFT Mint Scam',
    messages: [
      { sender: 'them', text: '@everyone', time: '2:34 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: '🚨 SURPRISE MINT ALERT 🚨', time: '2:34 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: 'The Azuki team is dropping 500 free Beanz NFTs to our community!', time: '2:34 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: 'Mint yours now before they\'re gone:', time: '2:34 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: 'https://mint.azuki-official.com', time: '2:34 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: '⏰ Only available for the next 30 minutes!', time: '2:35 PM', from: 'Azuki-Official 👑 (Bot)' },
      { sender: 'them', text: 'Gas fees only (~0.05 ETH). First come, first served! 🎉', time: '2:35 PM', from: 'Azuki-Official 👑 (Bot)' }
    ],
    question: 'What should you do about this Discord announcement?',
    correctAnswer: 'fake',
    options: [
      { id: 'mint', text: 'Mint immediately - Don\'t want to miss free Beanz!' },
      { id: 'fake', text: 'Fake - This is a Discord hack/scam bot' },
      { id: 'dm', text: 'DM the Azuki mods to verify first' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Excellent detection! This is a Discord server hack. Real Azuki domain is azuki.com (not azuki-official.com). The @everyone ping is a major red flag - most legitimate projects disable @everyone. The "Azuki-Official" bot name is fake. Minting would send your ETH to the scammer and mint nothing. ALWAYS verify mint links in official announcements channel!',
      incorrect: 'This is a Discord hack scam! Real Azuki: azuki.com. The @everyone ping and urgent 30-minute deadline are red flags. Minting would send ETH to scammers with nothing minted. Discord NFT scams increased 400% in 2024. Never trust @everyone pings for mints!',
      xpReward: 150,
      redFlags: [
        '@everyone ping (most servers disable this for important announcements)',
        'Suspicious domain: azuki-official.com (fake) vs azuki.com (real)',
        'Extreme urgency: "30 minutes only"',
        'Bot account pretending to be official',
        'No verification in official announcements channel',
        'Legitimate projects announce mints 24-48 hours in advance',
        'Real Beanz are valuable, wouldn\'t be given away with urgency',
        'Discord server may be hacked or user account compromised'
      ],
      blockchainInfo: [
        'Discord is the #1 vector for NFT scams (50%+ of NFT theft)',
        'Always check #announcements or #official channels for mints',
        'Real projects never surprise-mint valuable NFTs with 30min notice',
        'Verify mint links match official project website',
        'Enable 2FA on Discord to prevent account compromise',
        'Mods and founders have specific roles - verify role colors',
        'Real mint contracts are verified on Etherscan',
        'Discord NFT scams stole $150M+ in 2024'
      ]
    }
  },

  // CATEGORY: SOCIAL ENGINEERING
  {
    id: 10,
    category: 'social',
    difficulty: 'hard',
    type: 'chat',
    title: 'Pig Butchering Romance Scam',
    messages: [
      { sender: 'them', text: 'Good morning! ☀️ Hope you slept well', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'you', text: 'Morning! Yeah pretty good, how about you?', time: 'Week 4, Day 3', from: 'You' },
      { sender: 'them', text: 'Great! I was up early checking my investments. Had a really good week 😊', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'them', text: 'Been thinking about our future together... I want us to be financially secure', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'you', text: 'That\'s sweet. What kind of investments?', time: 'Week 4, Day 3', from: 'You' },
      { sender: 'them', text: 'Cryptocurrency trading. My uncle works at a financial firm in Hong Kong, he showed me this platform', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'them', text: 'I\'ve made about $18,000 in the past 2 months. It\'s been amazing for my savings', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'them', text: 'I thought... maybe we could learn together? I could show you how it works 💕', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'them', text: 'The platform is called MetaTradeGlobal. You can start small, like $500, just to see how it works', time: 'Week 4, Day 3', from: 'Emma Chen' },
      { sender: 'them', text: 'I\'ll help you every step. Imagine what we could do with the profits! 🌟', time: 'Week 4, Day 4', from: 'Emma Chen' }
    ],
    question: 'What is happening in this conversation?',
    correctAnswer: 'pigbutcher',
    options: [
      { id: 'genuine', text: 'They genuinely care and want to help me invest' },
      { id: 'pigbutcher', text: 'This is a "pig butchering" romance scam' },
      { id: 'research', text: 'Research MetaTradeGlobal first, then decide' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect detection! This is a "pig butchering" (杀猪盘) romance scam. They spend weeks building trust and romance, then introduce fake "investment platforms." MetaTradeGlobal doesn\'t exist. You\'ll see fake profits on the platform but can never withdraw. The "uncle in finance" is part of the story. These scams cost victims $3.5B+ in 2024. The relationship is 100% fake.',
      incorrect: 'This is a "pig butchering" scam! They build romance over weeks (4 weeks shown), then pivot to crypto. MetaTradeGlobal is a fake platform - you deposit real crypto but can\'t withdraw. The "uncle" story and relationship are fabricated. These elaborate scams cost victims $3.5B in 2024. Block and report immediately!',
      xpReward: 200,
      redFlags: [
        'Romance built over weeks before mentioning money (Week 4)',
        'Gradually introduces "investment opportunities"',
        'Family member "in finance" to legitimize story',
        'Shows impressive gains ($18k in 2 months) with fake screenshots',
        'Pressures you to join using romance angle ("our future together")',
        'Unknown platform: MetaTradeGlobal (doesn\'t exist)',
        'Suggests starting "small" ($500) to build trust',
        'Timeline shows classic pig butchering pattern',
        'Met on dating app/social media, not in person'
      ],
      blockchainInfo: [
        'Pig butchering scams cost victims $3.5B+ in 2024',
        'Scammers spend 4-8 weeks building trust before mentioning money',
        'Fake platforms show profits but won\'t let you withdraw',
        'Often targets people on dating apps (Tinder, Bumble, Hinge)',
        'Scammers use stolen photos and fake identities',
        'Once you deposit, they ask for "taxes" or "fees" to withdraw',
        'You never get money back - platform and romance are fake',
        'FBI reports: Average victim loses $150,000+',
        'Real dating prospects never push investment schemes'
      ]
    }
  },

  // CATEGORY: STABLECOIN RISKS
  {
    id: 11,
    category: 'stablecoin',
    difficulty: 'medium',
    type: 'chat',
    title: 'USDC Depeg Panic Scam',
    messages: [
      { sender: 'them', text: '🚨 URGENT: USDC DEPEGGING 🚨', time: '10:23 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: 'USDC has lost its $1 peg! Currently trading at $0.87', time: '10:23 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: 'Silicon Valley Bank 2.0 situation developing!', time: '10:24 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: 'SWAP YOUR USDC NOW before it goes to $0:', time: '10:24 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: 'https://emergency-swap.usdc-rescue.com', time: '10:24 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: '⏰ This swap portal closes in 60 minutes!', time: '10:25 AM', from: 'CryptoNews_Bot' },
      { sender: 'them', text: 'Swap to USDT (still stable) or DAI. Act fast! 🏃', time: '10:25 AM', from: 'CryptoNews_Bot' }
    ],
    question: 'Should you use this "emergency swap" portal?',
    correctAnswer: 'no',
    options: [
      { id: 'yes', text: 'Yes - Swap immediately before losing everything!' },
      { id: 'no', text: 'No - This is a panic-driven scam exploiting FUD' },
      { id: 'verify', text: 'Check USDC price on Coinbase first' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Excellent judgment! This exploits fear from the SVB crisis. Real USDC info is on circle.com, not "usdc-rescue.com". Even if USDC depegs, you can swap on legitimate DEXes (Uniswap, Curve). Panic scammers create fake urgency. Always verify price on multiple exchanges before acting!',
      incorrect: 'This is a panic scam! Scammers exploit depegging FUD to get you to use fake swap sites. Real stablecoin issues are announced officially. Use legitimate DEXes (Uniswap, Curve) to swap, never random "emergency" sites. Check prices on Coinbase/Binance first!',
      xpReward: 150,
      redFlags: [
        'Creates extreme urgency: "60 minutes"',
        'Exploits real fear (SVB, depegging events)',
        'Fake domain: usdc-rescue.com (real: circle.com)',
        'No official announcement from Circle (USDC issuer)',
        'Legitimate swaps happen on Uniswap, Curve, not random sites',
        'Panic tactics: "before it goes to $0"',
        'Would verify price on Coinbase, Binance first'
      ],
      blockchainInfo: [
        'USDC briefly depegged to $0.88 in March 2023 (SVB crisis)',
        'Real USDC issuer: Circle (circle.com)',
        'Stablecoins can depeg but usually recover quickly',
        'Legitimate swaps: Uniswap, Curve, Coinbase',
        'Always verify prices on multiple exchanges',
        'Circle announces issues on official Twitter @circle',
        'Depegging panic scams increased 400% in 2024'
      ]
    }
  },

  {
    id: 12,
    category: 'stablecoin',
    difficulty: 'hard',
    type: 'website',
    title: 'Algorithmic Stablecoin 2.0',
    url: 'https://terranova-protocol.finance',
    content: `
      <div style="max-width: 700px; margin: 0 auto; padding: 40px 30px; background: linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%); color: white;">
        <h1 style="font-size: 3em; margin-bottom: 10px;">TerraNova Protocol</h1>
        <p style="font-size: 1.2em; opacity: 0.9; margin-bottom: 40px;">The Next Evolution in Algorithmic Stablecoins</p>
        
        <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
          <h2 style="margin-bottom: 20px;">$TNUSD - Algorithmic Stablecoin</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px;">$1.00</div>
              <div style="opacity: 0.9;">Current Price</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 2.5em; font-weight: bold; margin-bottom: 10px; color: #10B981;">45% APY</div>
              <div style="opacity: 0.9;">Staking Rewards</div>
            </div>
          </div>
          <p style="line-height: 1.8; margin-bottom: 20px;">
            TNUSD is backed by our governance token $LUNA2 and maintained by advanced algorithmic mechanisms. Unlike Terra/Luna which failed, we've implemented a dual-peg system and insurance fund to prevent death spirals.
          </p>
        </div>
        
        <div style="background: white; color: #000; padding: 30px; border-radius: 15px;">
          <h3 style="margin-bottom: 20px;">Mint TNUSD</h3>
          <p style="margin-bottom: 20px; color: #666;">Deposit $LUNA2 to mint TNUSD and start earning 45% APY</p>
          <button style="width: 100%; padding: 20px; background: #7C3AED; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer;">
            Connect Wallet & Mint
          </button>
          <p style="margin-top: 20px; font-size: 13px; color: #666; text-align: center;">
            ✅ Audited by CertiK • 🔒 $50M Insurance Fund • 🏦 Backed by top VCs
          </p>
        </div>
      </div>
    `,
    question: 'Should you mint TNUSD stablecoin?',
    correctAnswer: 'no',
    options: [
      { id: 'yes', text: 'Yes - They fixed Terra\'s issues, 45% APY is great!' },
      { id: 'no', text: 'No - Algorithmic stablecoins have fundamental risks' },
      { id: 'research', text: 'Research more about the algorithm first' }
    ],
    tools: ['urlAnalyzer', 'contractAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Excellent analysis! Algorithmic stablecoins like Terra/UST collapsed because of fundamental design flaws. TerraNova uses the EXACT same naming (TNUSD/LUNA2 vs UST/LUNA). The 45% APY is unsustainable - same promise Terra made. These protocols rely on continuous growth and fail in "death spirals." Real stablecoins: USDC (Circle), DAI (MakerDAO).',
      incorrect: 'This is extremely risky! Algorithmic stablecoins caused the $40B Terra/Luna collapse. TerraNova copies the same flawed model. 45% APY is unsustainable (Terra promised 20%). "Insurance fund" can\'t prevent death spiral. Stick to collateralized stablecoins: USDC, USDT, DAI.',
      xpReward: 200,
      redFlags: [
        'Algorithmic stablecoin (Terra/UST collapsed costing $40B)',
        'Unsustainable 45% APY (Ponzi-like economics)',
        'Named suspiciously like Terra: TNUSD/LUNA2 vs UST/LUNA',
        'Claims to "fix" Terra\'s issues but uses same mechanism',
        '"Insurance fund" can\'t prevent algorithmic death spiral',
        'Backed by "governance token" (circular dependency)',
        'High yield comes from printing new tokens (inflation)',
        'CertiK audit doesn\'t make flawed economics safe'
      ],
      blockchainInfo: [
        'Terra/Luna collapsed in May 2022, losing $40B in days',
        'Algorithmic stablecoins rely on continuous growth to maintain peg',
        'Death spiral: peg breaks → massive selling → more peg breaking',
        'Real stablecoins: USDC (cash-backed), DAI (crypto-collateralized)',
        'High APY in crypto = high risk (no free lunch)',
        'Sustainable stablecoin yields: 2-8%, not 45%',
        'Algorithmic stablecoins killed by research as fundamentally flawed',
        'Stick to overcollateralized or fiat-backed stablecoins'
      ]
    }
  },

  // CATEGORY: AI DEEPFAKE SCAMS
  {
    id: 13,
    category: 'social',
    difficulty: 'hard',
    type: 'chat',
    title: 'AI Deepfake Video Call',
    messages: [
      { sender: 'them', text: 'Hey! Thanks for joining the call. Can you hear me okay?', time: '3:00 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'you', text: 'Yes, I can hear you! This is amazing, I can\'t believe I\'m talking to you!', time: '3:00 PM', from: 'You' },
      { sender: 'them', text: 'Haha, yeah! So I saw your work on GitHub. Really impressive stuff.', time: '3:01 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'them', text: 'We\'re actually looking for developers for a new Ethereum Foundation project.', time: '3:01 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'them', text: 'It\'s confidential right now, but we need to test some smart contracts on mainnet.', time: '3:02 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'them', text: 'Can you help us test a transaction? I\'ll send you the contract address to interact with.', time: '3:02 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'them', text: 'You\'ll need to approve a test transaction from your wallet. Only takes a minute.', time: '3:03 PM', from: 'Vitalik Buterin (Video Call)' },
      { sender: 'them', text: 'There\'s a 5 ETH bug bounty if you help us find issues. Sound good?', time: '3:03 PM', from: 'Vitalik Buterin (Video Call)' }
    ],
    question: 'Someone on video call claiming to be Vitalik asks you to test a transaction. What do you do?',
    correctAnswer: 'fake',
    options: [
      { id: 'test', text: 'Help test the transaction - It\'s Vitalik!' },
      { id: 'fake', text: 'This is an AI deepfake scam - Hang up immediately' },
      { id: 'verify', text: 'Ask for verification on official Ethereum channels' }
    ],
    tools: ['urlAnalyzer'],
    feedback: {
      correct: 'Perfect! This is a real-time AI deepfake video call scam. In 2025, scammers use AI to impersonate founders/VCs in video calls. Real Vitalik would NEVER DM random developers asking to test transactions. The "test transaction" is a wallet drainer. These scams increased 600% in 2024. Always verify via official channels!',
      incorrect: 'This is an AI deepfake scam! Real-time deepfakes can now impersonate anyone on video. Real Vitalik/founders never DM asking to test transactions. The "test" would drain your wallet. Deepfake crypto scams stole $150M+ in 2024. Verify all requests via official channels!',
      xpReward: 250,
      redFlags: [
        'Unsolicited contact from "celebrity" crypto figure',
        'Real Vitalik never DMs random people for testing',
        'Asks you to approve transaction (wallet drainer)',
        'Creates urgency with "confidential project"',
        'Offers payment (5 ETH) to encourage quick action',
        'Video call can be AI deepfake (technology exists in 2025)',
        'Would verify by messaging Vitalik on official Twitter',
        'Ethereum Foundation announces projects officially'
      ],
      blockchainInfo: [
        'Real-time AI deepfakes can impersonate anyone in video calls (2025)',
        'Deepfake scams increased 600% in 2024',
        'Real project leads never ask for transaction testing via DM',
        'Always verify unusual requests via official channels',
        'Vitalik\'s real Twitter: @VitalikButerin (verified)',
        'Ethereum Foundation: ethereum.org (official announcements)',
        'Bug bounties are posted publicly on Immunefi, not via DM',
        'AI voice/video cloning costs < $100 in 2025'
      ]
    }
  },

  // CATEGORY: MEV ATTACKS
  {
    id: 14,
    category: 'mev',
    difficulty: 'hard',
    type: 'transaction',
    title: 'MEV Bot Sandwich Attack',
    txData: {
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: 'Uniswap V3 Router',
      value: '0 ETH',
      function: 'swapExactTokensForTokens',
      amountIn: '10000 USDC',
      amountOutMin: '9850 USDC',
      slippage: '1.5%',
      gasPrice: '45 gwei'
    },
    decodedFunction: 'swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] path, address to)',
    decodedParams: {
      amountIn: '10,000 USDC',
      amountOutMin: '9,850 USDC (1.5% slippage)',
      path: 'USDC → WETH',
      to: '0x742d...0bEb (Your Address)'
    },
    question: 'You\'re about to swap 10K USDC on Uniswap. What\'s the risk here?',
    correctAnswer: 'mev',
    options: [
      { id: 'safe', text: 'Safe - This is a normal Uniswap swap' },
      { id: 'mev', text: 'MEV sandwich attack risk - Use private mempool' },
      { id: 'slippage', text: 'Reduce slippage to 0.5% before swapping' }
    ],
    tools: ['gasTracker'],
    feedback: {
      correct: 'Excellent! Large swaps with 1.5% slippage are vulnerable to MEV sandwich attacks. Bots see your transaction in the mempool, front-run (buy before you), then back-run (sell after you), extracting profit from your slippage. Use Flashbots Protect or CoW Swap to avoid MEV. Or split into smaller trades with tighter slippage.',
      incorrect: 'This swap is vulnerable to MEV sandwich attacks! Bots front-run your trade, manipulating price to extract your slippage tolerance (1.5%). Use Flashbots Protect, CoW Swap, or private mempools. MEV extracted $663M+ in 2 years. Reduce slippage to 0.3% or use MEV protection.',
      xpReward: 200,
      redFlags: [
        'Large swap amount (10K USDC) attracts MEV bots',
        '1.5% slippage tolerance = sandwich attack opportunity',
        'Public mempool means bots see your transaction',
        'MEV bots can front-run + back-run for profit',
        'Standard gas price won\'t help against MEV',
        'Should use Flashbots Protect or CoW Swap',
        'Or split into smaller trades with 0.3% slippage'
      ],
      blockchainInfo: [
        'MEV (Maximal Extractable Value) = profit from transaction reordering',
        'Sandwich attack: bot buys before you, sells after you',
        'MEV bots extracted $663M+ from Ethereum users (2023-2025)',
        'Flashbots Protect: private mempool, no front-running',
        'CoW Swap: MEV-protected decentralized exchange',
        'Lower slippage (0.3%) limits MEV bot profit',
        'Split large trades to reduce MEV surface',
        'MEV is not illegal, but costs users significantly'
      ]
    }
  },

  // Add 16 more scenarios to reach 30 total...
  // Additional categories: More wallet security, bridge exploits, fake governance, etc.

  {
    id: 15,
    category: 'wallet',
    difficulty: 'medium',
    type: 'email',
    title: 'Ledger Firmware Update Scam',
    from: 'security@ledger-update.com',
    to: 'you@email.com',
    subject: 'Critical Security Update Required - Ledger Live',
    body: `Dear Ledger User,

A critical security vulnerability has been discovered in Ledger Live versions prior to 2.85.0.

Your device is at risk of being compromised. Please update immediately.

Download the secure update here: https://ledger-update.com/firmware/download

Installation Instructions:
1. Download the firmware update file
2. Connect your Ledger device
3. Enter your 24-word recovery phrase when prompted to verify device ownership
4. Update will install automatically

Failure to update within 48 hours may result in your device being temporarily locked for security purposes.

Stay secure,
Ledger Security Team

---
Ledger SAS | 1 rue du Mail, 75002 Paris, France`,
    question: 'Should you follow these update instructions?',
    correctAnswer: 'scam',
    options: [
      { id: 'update', text: 'Update now - Security is critical!' },
      { id: 'scam', text: 'Scam - Ledger never asks for recovery phrase' },
      { id: 'verify', text: 'Check Ledger\'s official website first' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! Ledger NEVER asks for your 24-word recovery phrase. Updates happen through Ledger Live app only, never via email links. Real domain: ledger.com (not ledger-update.com). This scam steals your seed phrase = complete wallet drain. Always update through official Ledger Live app!',
      incorrect: 'This is a scam! Ledger never emails update links or requests seed phrases. Real updates: through Ledger Live app only. Domain is fake: ledger-update.com vs ledger.com. Entering seed phrase = wallet drained. Check ledger.com for real announcements!',
      xpReward: 150,
      redFlags: [
        'Asks for 24-word recovery phrase (NEVER share this)',
        'Email with download link (Ledger updates via app)',
        'Fake domain: ledger-update.com vs ledger.com',
        'Threatens device lock to create urgency',
        'Ledger never emails about firmware updates',
        'Real updates: through Ledger Live app only',
        'No way to verify this is legitimate'
      ],
      blockchainInfo: [
        'Hardware wallets (Ledger, Trezor) never need seed phrase for updates',
        'Real Ledger updates: ledgerwallet.com → download Ledger Live',
        'Updates happen IN the Ledger Live app, not via downloads',
        'Seed phrase = complete access to all your crypto forever',
        'Ledger suffered data breach in 2020, users targeted with phishing',
        'Always verify via official website: ledger.com',
        'Hardware wallet phishing cost users $10M+ in 2024'
      ]
    }
  },

  {
    id: 16,
    category: 'wallet',
    difficulty: 'hard',
    type: 'website',
    title: 'Clipboard Malware Attack',
    url: 'https://your-computer.local',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px;">
        <h2 style="margin-bottom: 20px;">Send Crypto</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <label style="display: block; margin-bottom: 10px; font-weight: bold;">Recipient Address:</label>
          <input type="text" value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" readonly style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-family: monospace; background: white; margin-bottom: 15px;">
          <p style="font-size: 14px; color: #666; margin-bottom: 20px;">You copied: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</p>
          
          <div style="background: #FFF3CD; border: 1px solid #FFE69C; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #856404; margin: 0;">⚠️ When you pasted, the address changed to:</p>
            <p style="color: #856404; font-family: monospace; margin-top: 10px; font-weight: bold;">0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t</p>
          </div>
          
          <label style="display: block; margin-bottom: 10px; font-weight: bold;">Amount:</label>
          <input type="text" value="5.0 ETH" readonly style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; margin-bottom: 20px;">
          
          <button style="width: 100%; padding: 15px; background: #0052FF; color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer;">
            Send Transaction
          </button>
        </div>
        <p style="font-size: 12px; color: #999; text-align: center;">The address changed when you pasted it. What's happening?</p>
      </div>
    `,
    question: 'The wallet address changed when you pasted it. What should you do?',
    correctAnswer: 'malware',
    options: [
      { id: 'send', text: 'Send anyway - Probably just a display glitch' },
      { id: 'malware', text: 'Stop! This is clipboard malware - Do NOT send' },
      { id: 'verify', text: 'Manually type the address instead of pasting' }
    ],
    tools: ['addressLookup'],
    feedback: {
      correct: 'Excellent catch! This is clipboard malware/address poisoning. Malware monitors your clipboard and replaces crypto addresses with attacker-controlled addresses. The changed address means your funds would go to the scammer, not your intended recipient. Always verify pasted addresses character-by-character!',
      incorrect: 'This is clipboard malware! The address changing when pasted means malware is replacing it with a scammer\'s address. Sending = losing your 5 ETH. Always verify pasted addresses match what you copied. Install antivirus and scan your system immediately!',
      xpReward: 200,
      redFlags: [
        'Address changed when pasted (clipboard hijacking)',
        'Malware monitors clipboard for crypto addresses',
        'Automatically replaces with attacker\'s address',
        'Common on Windows systems with malware',
        'First few/last few characters may look similar (users don\'t check)',
        'Clipboard malware stole $580M+ in 2024',
        'Always verify FULL address before sending'
      ],
      blockchainInfo: [
        'Clipboard hijackers monitor for crypto address patterns',
        'Replace addresses in real-time when you paste',
        'Attackers use similar-looking addresses (first/last chars match)',
        'Prevention: Always verify full address character-by-character',
        'Use address book features in wallets',
        'Send small test transaction first',
        'Hardware wallets display address on device',
        'Clipboard malware is undetectable without verification'
      ]
    }
  },

  {
    id: 17,
    category: 'defi',
    difficulty: 'hard',
    type: 'website',
    title: 'Flash Loan Exploit Explanation',
    url: 'https://education.ethereum.org/defi-concepts',
    content: `
      <div style="max-width: 700px; margin: 0 auto; padding: 30px; background: #f8f9fa;">
        <h1 style="color: #333; margin-bottom: 20px;">Understanding Flash Loans</h1>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid #0052FF;">
          <h3 style="color: #0052FF; margin-bottom: 15px;">What is a Flash Loan?</h3>
          <p style="line-height: 1.8; color: #555;">
            A flash loan is an uncollateralized loan that must be borrowed and repaid within a single blockchain transaction. If not repaid, the entire transaction reverts.
          </p>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 15px;">Example Attack Vector:</h3>
          <ol style="line-height: 2; color: #555; padding-left: 20px;">
            <li>Attacker takes flash loan of $10M in USDC</li>
            <li>Buys massive amount of TOKEN on DEX #1 (price pumps)</li>
            <li>Sells TOKEN on DEX #2 at inflated price</li>
            <li>Repays flash loan + profit</li>
            <li>Entire attack happens in ONE transaction</li>
          </ol>
        </div>
        
        <div style="background: #FFF3CD; padding: 20px; border-radius: 10px; border: 2px solid #FFE69C;">
          <p style="color: #856404; margin: 0;"><strong>⚠️ Question:</strong> Someone on Twitter DMs you saying "I can teach you how to do flash loan attacks for profit. It's 100% legal and automated. Join my course for $500."</p>
        </div>
      </div>
    `,
    question: 'Should you pay for this "flash loan attack course"?',
    correctAnswer: 'scam',
    options: [
      { id: 'join', text: 'Join the course - Flash loans sound profitable!' },
      { id: 'scam', text: 'Scam - Legitimate flash loan opportunities don\'t need courses' },
      { id: 'research', text: 'Research flash loans first before deciding' }
    ],
    tools: ['urlAnalyzer'],
    feedback: {
      correct: 'Perfect! While flash loans are real, "flash loan attack courses" are scams. Real flash loan opportunities require: (1) finding exploitable protocols, (2) advanced smart contract dev skills, (3) substantial capital for gas fees. Anyone selling a course is scamming. Real attackers don\'t share methods. Most "attacks" are now patched.',
      incorrect: 'This is a scam! Real flash loan arbitrage requires expert-level blockchain dev skills and finding exploitable protocols (which are rare). No course can teach this. The $500 course teaches nothing valuable. Real attackers don\'t advertise. Learn from free resources (not paid courses).',
      xpReward: 200,
      redFlags: [
        'Unsolicited DM about making money',
        'Claims flash loan attacks are "100% legal" (they\'re ethically gray)',
        'Charges $500 for information available free online',
        'Real flash loan opportunities require advanced dev skills',
        'Most exploitable protocols already patched',
        'Successful attackers don\'t sell courses',
        'This is a "get rich quick" scam',
        'No guaranteed profits in flash loan arbitrage'
      ],
      blockchainInfo: [
        'Flash loans are real DeFi primitive (Aave, dYdX)',
        'Used legitimately for arbitrage and collateral swaps',
        'Famous exploits: bZx ($350k), Harvest ($24M)',
        'Require: Solidity skills, finding vulnerabilities, fast execution',
        'Gas fees can be $1,000+ per attempt',
        'Most opportunities are found by security researchers',
        'Ethical gray area: exploiting code vs exploiting users',
        'Learn from: Damn Vulnerable DeFi (free), not paid courses'
      ]
    }
  },

  {
    id: 18,
    category: 'nft',
    difficulty: 'hard',
    type: 'transaction',
    title: 'Malicious NFT Mint Contract',
    txData: {
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: '0x9876...4321 (Unverified Contract)',
      value: '0.08 ETH',
      gasLimit: '350000',
      gasPrice: '35 gwei',
      data: '0xa0712d68...'
    },
    decodedFunction: 'mint(uint256 quantity)',
    decodedParams: {
      quantity: '1 NFT',
      mintPrice: '0.08 ETH',
      contractName: 'BoredDogeYachtClub',
      totalSupply: '10000',
      WARNING: '⚠️ Contract includes additional hidden function calls'
    },
    question: 'You\'re about to mint a trending NFT. What\'s suspicious here?',
    correctAnswer: 'malicious',
    options: [
      { id: 'mint', text: 'Mint it - 0.08 ETH is a fair price' },
      { id: 'malicious', text: 'Reject - Unverified contract with hidden functions' },
      { id: 'check', text: 'Check the contract on Etherscan first' }
    ],
    tools: ['contractAnalyzer', 'addressLookup'],
    feedback: {
      correct: 'Excellent! Unverified contracts are huge red flags for NFT mints. "Hidden function calls" means the contract could drain your wallet, steal other NFTs, or create malicious approvals. Real projects verify contracts on Etherscan. The copied name "BoredDogeYachtClub" (mixing BAYC + Doge) is also suspicious.',
      incorrect: 'This is a malicious contract! Unverified + hidden functions = wallet drainer. When you mint, it could drain all your tokens via hidden setApprovalForAll(). Always verify: (1) Contract is verified on Etherscan, (2) Official mint announced on project Twitter, (3) Check contract code.',
      xpReward: 200,
      redFlags: [
        'Unverified contract on Etherscan',
        'Warning about "hidden function calls"',
        'High gas limit (350k is excessive for simple mint)',
        'Name combines two projects (BAYC + Doge)',
        'No way to audit what contract actually does',
        'Real NFT projects verify contracts',
        'Minting could trigger wallet drainer',
        'Should check official project Twitter for mint link'
      ],
      blockchainInfo: [
        'Malicious NFT contracts can drain your wallet when minting',
        'Hidden functions: setApprovalForAll(), transferFrom()',
        'Verified contracts show source code on Etherscan',
        'Real projects: Verified contract + official announcement',
        'Gas limit hints at complexity (simple mint = ~100k gas)',
        'Always mint from official project website only',
        'Check contract address matches official announcement',
        'NFT mint scams stole $100M+ in 2024'
      ]
    }
  },

  {
    id: 19,
    category: 'layer2',
    difficulty: 'medium',
    type: 'email',
    title: 'zkSync Airdrop Phishing',
    from: 'airdrop@zksync-claim.io',
    to: 'you@email.com',
    subject: '🎉 You\'re Eligible for 3,500 ZK Tokens!',
    body: `Dear zkSync User,

Congratulations! Based on your transaction history on zkSync Era, you qualify for the zkSync airdrop.

Your Allocation: 3,500 ZK tokens
Estimated Value: $7,350 USD

Claim Period: Limited to 14 days from notification

TO CLAIM YOUR TOKENS:
1. Visit: https://claim.zksync-airdrop.io
2. Connect your wallet
3. Verify your eligibility on-chain
4. Approve the claim transaction

⚠️ IMPORTANT: Due to Ethereum gas costs, you must have at least 0.05 ETH in your wallet to process the claim. This covers the on-chain verification and distribution gas fees.

If your wallet balance is insufficient, the claim will fail and your tokens will be redistributed to other users.

Claim now: https://claim.zksync-airdrop.io/verify

Best regards,
The zkSync Team

---
Matter Labs | Building zkSync - Scaling Ethereum`,
    question: 'Is this zkSync airdrop legitimate?',
    correctAnswer: 'scam',
    options: [
      { id: 'claim', text: 'Claim it - I used zkSync Era!' },
      { id: 'scam', text: 'Scam - Multiple red flags present' },
      { id: 'verify', text: 'Check zkSync\'s official Twitter first' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! This is a phishing scam. Real zkSync domain: zksync.io (not zksync-airdrop.io). Requiring 0.05 ETH balance is a HUGE red flag - attackers want you to have ETH they can steal. Real airdrops never require minimum balance. Always verify airdrops on official Twitter (@zksync)!',
      incorrect: 'This is a scam! Real domain: zksync.io vs zksync-airdrop.io (fake). The "0.05 ETH minimum" is to ensure you have funds to steal. Connecting = wallet drainer. zkSync announces airdrops via official Twitter @zksync only. Never trust unsolicited emails!',
      xpReward: 150,
      redFlags: [
        'Fake domain: zksync-airdrop.io (real: zksync.io)',
        'Requires 0.05 ETH minimum (to ensure you have funds to steal)',
        'Unsolicited email about airdrop',
        'Creates urgency: "14 days" deadline',
        'Generic greeting, no personal details',
        'Real airdrops announced on official @zksync Twitter',
        'Claims high value to create excitement',
        'No way to verify eligibility before connecting'
      ],
      blockchainInfo: [
        'zkSync is a real Ethereum Layer 2 scaling solution',
        'Real zkSync: zksync.io, Twitter @zksync',
        'Layer 2 airdrops are announced officially first',
        'Legitimate airdrops NEVER require minimum balance',
        'Real zkSync airdrop happened June 2024',
        'Always check official Discord/Twitter for airdrop info',
        'Layer 2 airdrop scams increased 500% in 2024',
        'Claiming on fake sites = wallet drain'
      ]
    }
  },

  {
    id: 20,
    category: 'social',
    difficulty: 'medium',
    type: 'chat',
    title: 'Fake Job Offer Scam',
    messages: [
      { sender: 'them', text: 'Hi! I saw your profile and we\'re impressed with your background.', time: '11:15 AM', from: 'Sarah Chen - Coinbase Recruiter' },
      { sender: 'you', text: 'Thanks! What position?', time: '11:16 AM', from: 'You' },
      { sender: 'them', text: 'We have an opening for Blockchain Developer - Remote, $180k-$220k + equity.', time: '11:16 AM', from: 'Sarah Chen - Coinbase Recruiter' },
      { sender: 'them', text: 'The role involves smart contract auditing and protocol development.', time: '11:17 AM', from: 'Sarah Chen - Coinbase Recruiter' },
      { sender: 'you', text: 'That sounds great! What\'s the process?', time: '11:18 AM', from: 'You' },
      { sender: 'them', text: 'First, we need to verify your identity for compliance. Can you create a Coinbase Wallet and send us your address?', time: '11:19 AM', from: 'Sarah Chen - Coinbase Recruiter' },
      { sender: 'them', text: 'Also, for international payments setup, we need you to purchase $500 in USDC and send to our HR wallet for verification. You\'ll be reimbursed on your first paycheck.', time: '11:20 AM', from: 'Sarah Chen - Coinbase Recruiter' },
      { sender: 'them', text: 'This is standard procedure for crypto companies. Here\'s the address: 0x1a2b3c...', time: '11:21 AM', from: 'Sarah Chen - Coinbase Recruiter' }
    ],
    question: 'Is this a legitimate Coinbase job offer?',
    correctAnswer: 'scam',
    options: [
      { id: 'send', text: 'Send the $500 - Seems like standard crypto verification' },
      { id: 'scam', text: 'Scam - Real companies never ask for money upfront' },
      { id: 'verify', text: 'Ask to verify via official Coinbase Careers portal' }
    ],
    tools: ['addressLookup'],
    feedback: {
      correct: 'Perfect! This is a fake job offer scam. Real companies NEVER ask candidates to send crypto for "verification" or "payment setup". Coinbase recruits through careers.coinbase.com and LinkedIn (verified profiles). The $500 request is pure theft. Always verify recruiters through official channels!',
      incorrect: 'This is a job offer scam! No legitimate company asks candidates to send money. The $500 goes to the scammer. Real Coinbase recruits via careers.coinbase.com with verified recruiters. Check LinkedIn profiles, use official portals, never send money in job processes.',
      xpReward: 150,
      redFlags: [
        'Asks candidate to send $500 in crypto',
        'Claims it\'s "standard procedure" (it\'s not)',
        'Promise of reimbursement (never happens)',
        'Contacted via DM instead of official channels',
        'Too good to be true salary range',
        'Immediate offer without formal interview process',
        'Real companies use official job portals',
        'Coinbase recruits through careers.coinbase.com'
      ],
      blockchainInfo: [
        'Fake job scams target crypto enthusiasts',
        'Real crypto companies: Coinbase, Binance, Kraken use official portals',
        'Legitimate recruiters have verified LinkedIn profiles',
        'Never send money as part of job application process',
        'Scammers impersonate HR/recruiters on Telegram/Discord',
        'Verify recruiter: Check email domain, LinkedIn, company website',
        'Real job offers: Formal interviews, written offers, no upfront payments',
        'Fake job scams stole $50M+ from crypto community in 2024'
      ]
    }
  },

  {
    id: 21,
    category: 'defi',
    difficulty: 'medium',
    type: 'website',
    title: 'Fake Curve Finance Pool',
    url: 'https://curve.fi/pool/0xabcd1234',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #f5f5f5;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: #FF0000; border-radius: 50%;"></div>
          <h1 style="color: #FF0000; margin: 0;">Curve Finance</h1>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 15px; margin-bottom: 20px;">
          <h2 style="margin-bottom: 20px;">USDT/USDC/DAI Mega Pool</h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 2em; font-weight: bold; color: #28a745; margin-bottom: 5px;">156%</div>
              <div style="color: #666; font-size: 14px;">APY</div>
            </div>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
              <div style="font-size: 2em; font-weight: bold; color: #007bff; margin-bottom: 5px;">$2.4M</div>
              <div style="color: #666; font-size: 14px;">TVL</div>
            </div>
          </div>
          
          <div style="background: #E8F5E9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #2E7D32; margin: 0; font-size: 14px;">
              <strong>🎉 Special Event:</strong> Curve is incentivizing this pool with extra CRV rewards for the next 48 hours!
            </p>
          </div>
          
          <button style="width: 100%; padding: 18px; background: #FF0000; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;">
            Deposit Stablecoins
          </button>
          
          <p style="margin-top: 15px; font-size: 13px; color: #666; text-align: center;">
            Pool address: 0xabcd1234... | Created 3 days ago
          </p>
        </div>
      </div>
    `,
    question: 'Should you deposit your stablecoins into this Curve pool?',
    correctAnswer: 'fake',
    options: [
      { id: 'deposit', text: 'Deposit - 156% APY on stablecoins is amazing!' },
      { id: 'fake', text: 'Fake pool - Multiple red flags present' },
      { id: 'verify', text: 'Check official Curve website first' }
    ],
    tools: ['contractAnalyzer', 'urlAnalyzer', 'tokenScanner'],
    feedback: {
      correct: 'Excellent! This is a fake Curve pool. Red flags: (1) 156% APY on stablecoins is impossible sustainably, (2) Pool created only 3 days ago, (3) Low TVL of $2.4M (real Curve pools have $100M+), (4) "Special event" urgency tactic. Real Curve pools: curve.fi with verified contracts and high TVL.',
      incorrect: 'This is a fake Curve pool scam! 156% APY on stablecoins is unsustainable. Real Curve pools: 2-8% APY with $100M+ TVL. This pool (3 days old, $2.4M) would drain your deposits. Always verify pool addresses on official curve.fi!',
      xpReward: 150,
      redFlags: [
        '156% APY is impossibly high for stablecoin pool',
        'Pool created only 3 days ago (extremely new)',
        'Low TVL: $2.4M (real Curve pools have $100M+)',
        'Urgency tactic: "48 hours special event"',
        'Real Curve stablecoin pools: 2-8% APY typically',
        'Should verify pool address on curve.fi',
        'Depositing = funds stolen by fake pool contract'
      ],
      blockchainInfo: [
        'Curve Finance is real DeFi protocol for stablecoin swaps',
        'Real Curve: curve.fi with verified contracts',
        'Legitimate Curve pools have high TVL ($100M+)',
        'Stablecoin pool APY: realistically 2-8%, not 156%',
        'New pools are suspicious (established pools are safer)',
        'Fake Curve pools copy UI but use malicious contracts',
        'Always verify pool address on official Curve site',
        'Curve pool scams cost users $40M+ in 2024'
      ]
    }
  },

  {
    id: 22,
    category: 'nft',
    difficulty: 'easy',
    type: 'chat',
    title: 'Fake Blur Airdrop',
    messages: [
      { sender: 'them', text: '🎉 BLUR AIRDROP SEASON 3 🎉', time: '4:20 PM', from: 'Blur_Official' },
      { sender: 'them', text: 'Congratulations! Your wallet qualifies for 15,000 BLUR tokens', time: '4:20 PM', from: 'Blur_Official' },
      { sender: 'them', text: 'Value: ~$4,500 USD', time: '4:20 PM', from: 'Blur_Official' },
      { sender: 'them', text: 'Claim here: https://blur.io.claim-s3.xyz', time: '4:21 PM', from: 'Blur_Official' },
      { sender: 'them', text: '⏰ Claim period ends in 24 hours!', time: '4:21 PM', from: 'Blur_Official' }
    ],
    question: 'Should you claim this Blur airdrop?',
    correctAnswer: 'fake',
    options: [
      { id: 'claim', text: 'Claim immediately - Free $4,500!' },
      { id: 'fake', text: 'Fake - Check Blur\'s official Twitter first' },
      { id: 'verify', text: 'Verify the domain matches official Blur' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! Fake Blur airdrop. Real Blur domain: blur.io (not blur.io.claim-s3.xyz). The "Blur_Official" username can be created by anyone. Real Blur airdrops announced on verified Twitter @blur_io. Connecting to fake site = wallet drain. Always verify on official channels!',
      incorrect: 'This is a fake airdrop! Real domain: blur.io vs blur.io.claim-s3.xyz (subdomain trick). Real Blur announces on @blur_io (verified). Claiming = wallet drainer approval. Check official Twitter before clicking any airdrop links!',
      xpReward: 100,
      redFlags: [
        'Suspicious domain: blur.io.claim-s3.xyz (actual domain is claim-s3.xyz)',
        'Unsolicited message about free money',
        'Creates urgency: "24 hours"',
        'Username "Blur_Official" can be faked',
        'Real Blur domain: blur.io only',
        'No announcement on verified @blur_io Twitter',
        'Too good to be true: $4,500 free'
      ],
      blockchainInfo: [
        'Blur is real NFT marketplace competing with OpenSea',
        'Real Blur: blur.io, Twitter @blur_io (verified)',
        'Blur did real airdrops in 2023 (Season 1 & 2)',
        'Airdrops announced on official Twitter first',
        'Fake airdrops use similar domains (blur.io.xxx.com)',
        'Connecting to fake sites = approve wallet drainers',
        'NFT marketplace scams increased 300% in 2024'
      ]
    }
  },

  {
    id: 23,
    category: 'stablecoin',
    difficulty: 'easy',
    type: 'website',
    title: 'High-Yield Stablecoin Scam',
    url: 'https://stable-earn.finance',
    content: `
      <div style="max-width: 650px; margin: 0 auto; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <h1 style="font-size: 2.5em; margin-bottom: 10px;">StableEarn Protocol</h1>
        <p style="font-size: 1.2em; opacity: 0.9; margin-bottom: 40px;">Earn Guaranteed Returns on Your Stablecoins</p>
        
        <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; margin-bottom: 30px; backdrop-filter: blur(10px);">
          <div style="text-align: center; margin-bottom: 25px;">
            <div style="font-size: 4em; font-weight: bold; margin-bottom: 10px;">24% APY</div>
            <div style="font-size: 1.2em; opacity: 0.9;">Guaranteed Fixed Returns</div>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <p style="margin: 0; line-height: 1.8;">
              Deposit USDT, USDC, or DAI and earn industry-leading 24% APY. Our proprietary trading algorithms generate consistent profits across DeFi protocols.
            </p>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px;">
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: center;">
              <div style="font-size: 2em; font-weight: bold;">$87M</div>
              <div style="font-size: 0.9em; opacity: 0.8;">Total Value Locked</div>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; text-align: center;">
              <div style="font-size: 2em; font-weight: bold;">42K</div>
              <div style="font-size: 0.9em; opacity: 0.8;">Active Users</div>
            </div>
          </div>
          
          <button style="width: 100%; padding: 20px; background: white; color: #667eea; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer;">
            Start Earning 24% APY
          </button>
        </div>
        
        <div style="text-align: center; font-size: 14px; opacity: 0.8;">
          <p>✅ Audited by CertiK | 🔒 Fully Insured | 💰 Instant Withdrawals</p>
        </div>
      </div>
    `,
    question: 'Should you deposit stablecoins to earn 24% APY?',
    correctAnswer: 'ponzi',
    options: [
      { id: 'deposit', text: 'Deposit - 24% on stablecoins is great!' },
      { id: 'ponzi', text: 'Likely Ponzi scheme - Unsustainable returns' },
      { id: 'research', text: 'Research their trading strategy first' }
    ],
    tools: ['urlAnalyzer', 'contractAnalyzer'],
    feedback: {
      correct: 'Excellent judgment! 24% APY on stablecoins is a HUGE red flag. Legitimate stablecoin yields: 2-8% (Aave, Compound). 24% is Ponzi scheme territory (like Celsius, BlockFi that collapsed). They pay early depositors with new deposits until it collapses. "Guaranteed" returns don\'t exist in crypto. Run away!',
      incorrect: 'This is likely a Ponzi scheme! 24% APY on stablecoins is mathematically unsustainable. Real yields: 2-8%. This will collapse like Celsius (paid 18%, collapsed in 2022). They pay old investors with new deposits. "Guaranteed" + "24%" = scam. Only use established protocols!',
      xpReward: 150,
      redFlags: [
        '24% APY is impossibly high for stablecoins (real: 2-8%)',
        '"Guaranteed returns" - nothing is guaranteed in crypto',
        'No explanation of how they generate 24%',
        'Claims of "proprietary trading algorithms" (vague)',
        'Similar to Celsius (18% APY, collapsed in 2022)',
        'No transparent proof of yields',
        'CertiK audit doesn\'t validate business model',
        '"Fully insured" claim is meaningless without details'
      ],
      blockchainInfo: [
        'Legitimate stablecoin yields: 2-8% on Aave, Compound',
        'High yields come from: leverage risk, liquidation risk, or Ponzi',
        '24% APY requires 2% monthly returns (unsustainable)',
        'Celsius promised 18%, collapsed owing $4.7B (2022)',
        'BlockFi offered 8%, collapsed (2022)',
        'If returns seem too good to be true, they are',
        'Ponzi schemes: Use new deposits to pay old investors',
        'Only use transparent, established DeFi protocols'
      ]
    }
  },

  {
    id: 24,
    category: 'layer2',
    difficulty: 'medium',
    type: 'website',
    title: 'Optimism Bridge Phishing',
    url: 'https://bridge.optimism.io.network-portal.com',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: #FF0420;">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
          <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #FF0420; font-size: 24px;">Ξ</div>
          <h1 style="color: white; margin: 0;">Optimism Bridge</h1>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 15px;">
          <h2 style="color: #333; margin-bottom: 20px;">Bridge to Optimism</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
            <div style="color: #666; font-size: 14px; margin-bottom: 5px;">From</div>
            <div style="font-size: 18px; font-weight: bold; color: #333;">Ethereum Mainnet</div>
          </div>
          
          <div style="text-align: center; margin: 15px 0; font-size: 24px;">↓</div>
          
          <div style="background: #FFF5F5; padding: 20px; border-radius: 10px; margin-bottom: 20px; border: 2px solid #FF0420;">
            <div style="color: #666; font-size: 14px; margin-bottom: 5px;">To</div>
            <div style="font-size: 18px; font-weight: bold; color: #FF0420;">Optimism Network</div>
          </div>
          
          <div style="background: #FFF3CD; border: 1px solid #FFE69C; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              <strong>⚡ Fast Bridge:</strong> Complete your bridge in 2 minutes instead of 7 days. Limited time offer!
            </p>
          </div>
          
          <button style="width: 100%; padding: 20px; background: #FF0420; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer; margin-bottom: 15px;">
            Connect Wallet & Bridge
          </button>
          
          <p style="font-size: 12px; color: #666; text-align: center;">Bridge Fee: 0.5% | Instant confirmation</p>
        </div>
      </div>
    `,
    question: 'Should you use this Optimism bridge?',
    correctAnswer: 'fake',
    options: [
      { id: 'bridge', text: 'Bridge - 2 minutes is much faster than 7 days!' },
      { id: 'fake', text: 'Fake bridge - Domain and claims are suspicious' },
      { id: 'verify', text: 'Check official Optimism website for bridge link' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! Fake bridge scam. Real Optimism: bridge.optimism.io (not bridge.optimism.io.network-portal.com). The actual domain is "network-portal.com". "2 minute bridge" is impossible - real Optimism withdrawal takes 7 days (security feature). Connecting = wallet drain. Use app.optimism.io only!',
      incorrect: 'Fake bridge! Real domain: bridge.optimism.io. The URL "bridge.optimism.io.network-portal.com" is actually hosted on "network-portal.com". Real Optimism withdrawals take 7 days (can\'t be instant). Connecting = drained wallet. Use official app.optimism.io!',
      xpReward: 150,
      redFlags: [
        'Fake domain: bridge.optimism.io.network-portal.com (subdomain trick)',
        'Actual domain is "network-portal.com" not optimism.io',
        'Claims 2-minute bridge (impossible - real takes 7 days)',
        '"Limited time offer" urgency tactic',
        'Real Optimism bridge: app.optimism.io or bridge.optimism.io',
        'Withdrawal period exists for security (fraud proofs)',
        'No way to bypass 7-day withdrawal on Optimism'
      ],
      blockchainInfo: [
        'Optimism is Ethereum Layer 2 (optimistic rollup)',
        'Real bridge: app.optimism.io/bridge',
        'Optimism withdrawals: 7 days (security feature for fraud proofs)',
        'Deposits (ETH → OP): instant (~1 min)',
        'Withdrawals (OP → ETH): 7 days mandatory',
        'No legitimate "fast bridge" can bypass this',
        'Fake bridges are common scam (stolen $200M+ in 2024)',
        'Always use official protocol websites for bridging'
      ]
    }
  },

  {
    id: 25,
    category: 'wallet',
    difficulty: 'medium',
    type: 'email',
    title: 'Tax Scam Email',
    from: 'compliance@crypto-tax-authority.gov',
    to: 'you@email.com',
    subject: 'URGENT: Unpaid Crypto Tax Liability - Action Required',
    body: `Dear Taxpayer,

Our records indicate you have unreported cryptocurrency gains totaling $47,382 from 2023-2024 trading activity.

TOTAL OWED: $14,892.40 (including penalties)

Your wallet addresses have been flagged by our blockchain monitoring system:
- 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
- 0x8e9f...  (and 3 others)

IMMEDIATE ACTION REQUIRED:
To avoid criminal prosecution and asset seizure, you must pay your tax liability within 72 hours.

Payment Instructions:
1. Purchase $14,892.40 in Bitcoin
2. Send to: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
3. Email transaction ID to: tax-payments@crypto-tax-authority.gov

Failure to comply will result in:
- Arrest warrant issued
- Bank accounts frozen
- Passport revoked
- Criminal charges filed

This is your final notice. Do not contact the IRS or local authorities - this matter is being handled by our specialized Cryptocurrency Tax Enforcement Division.

Pay immediately to resolve this matter: https://crypto-tax-payment.gov/pay-now

Compliance Officer: Agent Robert Martinez
Badge #: CT-2847
Direct Line: +1-800-555-SCAM (Do not call IRS directly)

Internal Revenue Service - Cryptocurrency Division`,
    question: 'How should you respond to this tax notice?',
    correctAnswer: 'scam',
    options: [
      { id: 'pay', text: 'Pay immediately - I don\'t want to be arrested!' },
      { id: 'scam', text: 'Scam - IRS never demands Bitcoin payment' },
      { id: 'call', text: 'Call the IRS directly to verify' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! Classic IRS impersonation scam. Red flags: (1) IRS NEVER demands Bitcoin, (2) IRS never threatens immediate arrest, (3) IRS contacts via official mail first, (4) Fake domain: crypto-tax-authority.gov, (5) IRS never says "don\'t contact IRS". Real IRS: irs.gov, they send physical letters first.',
      incorrect: 'This is an IRS impersonation scam! IRS never demands Bitcoin or threatens arrest. Real IRS process: Physical letter → phone call → negotiation. They never use "crypto-tax-authority.gov" domains. Report to IRS.gov. Never pay cryptocurrency to "tax authorities"!',
      xpReward: 150,
      redFlags: [
        'IRS NEVER accepts Bitcoin payments',
        'Threatens immediate arrest (IRS doesn\'t do this)',
        'Demands payment within 72 hours',
        'Tells you NOT to contact IRS (huge red flag)',
        'Fake domain: crypto-tax-authority.gov',
        'Uses fear tactics: arrest, asset seizure, passport',
        'Real IRS sends physical mail first, never email',
        'No legitimate "Cryptocurrency Tax Enforcement Division"'
      ],
      blockchainInfo: [
        'IRS contacts taxpayers via physical mail (USPS) first',
        'IRS accepts: check, money order, credit card (not crypto)',
        'Tax disputes: negotiation process, never threats',
        'Real IRS: irs.gov or 1-800-829-1040',
        'Crypto taxes are real but process is legitimate',
        'File taxes properly: use crypto tax software (Koinly, CoinTracker)',
        'If you owe taxes: work with IRS payment plans',
        'IRS impersonation scams stole $30M+ in 2024'
      ]
    }
  },

  {
    id: 26,
    category: 'defi',
    difficulty: 'easy',
    type: 'website',
    title: 'Fake PancakeSwap on Wrong Chain',
    url: 'https://pancakeswap.finance',
    content: `
      <div style="max-width: 600px; margin: 0 auto; padding: 30px; background: linear-gradient(135deg, #D4AF37 0%, #C9A961 100%);">
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 30px;">
          <div style="font-size: 3em;">🥞</div>
          <h1 style="color: white; margin: 0;">PancakeSwap</h1>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 15px;">
          <h2 style="color: #333; margin-bottom: 20px;">Swap Tokens</h2>
          
          <div style="background: #FFE5E5; border: 2px solid #FF6B6B; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
            <p style="color: #C92A2A; margin: 0; font-weight: bold;">⚠️ You are connected to Ethereum Mainnet</p>
            <p style="color: #C92A2A; margin: 10px 0 0 0; font-size: 14px;">PancakeSwap works on Ethereum. Continue to swap.</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #666;">From</span>
              <span style="color: #666;">Balance: 5.0 ETH</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <input type="text" placeholder="0.0" value="1.0" style="border: none; background: transparent; font-size: 24px; width: 60%;" />
              <div style="background: white; padding: 8px 15px; border-radius: 20px; font-weight: bold;">ETH</div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 15px 0; font-size: 24px;">↓</div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #666;">To (estimated)</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: 24px;">1,847</div>
              <div style="background: white; padding: 8px 15px; border-radius: 20px; font-weight: bold;">USDT</div>
            </div>
          </div>
          
          <button style="width: 100%; padding: 20px; background: #D4AF37; color: white; border: none; border-radius: 12px; font-size: 18px; font-weight: bold; cursor: pointer;">
            Swap Now
          </button>
        </div>
      </div>
    `,
    question: 'Should you proceed with this PancakeSwap swap on Ethereum?',
    correctAnswer: 'wrong',
    options: [
      { id: 'swap', text: 'Swap - Looks like normal PancakeSwap' },
      { id: 'wrong', text: 'Wrong network - PancakeSwap is on BNB Chain, not Ethereum' },
      { id: 'verify', text: 'Check which networks PancakeSwap actually supports' }
    ],
    tools: ['urlAnalyzer'],
    feedback: {
      correct: 'Excellent! PancakeSwap is ONLY on BNB Chain (Binance Smart Chain), NOT Ethereum. This is a scam impersonating PancakeSwap on the wrong network. Real PancakeSwap: pancakeswap.finance, but ONLY works on BNB Chain. Swapping here = funds stolen. Always verify protocol\'s supported networks!',
      incorrect: 'This is a scam! PancakeSwap operates ONLY on BNB Chain, never Ethereum. The warning "You are connected to Ethereum" should make you leave immediately. Swapping = losing your ETH. Real PancakeSwap: pancakeswap.finance on BNB Chain only!',
      xpReward: 100,
      redFlags: [
        'PancakeSwap is ONLY on BNB Chain (Binance Smart Chain)',
        'Site shows Ethereum network (wrong blockchain)',
        'Says "PancakeSwap works on Ethereum" (false)',
        'Real PancakeSwap warns you if on wrong network',
        'Should prompt you to switch to BNB Chain',
        'This is an imposter site stealing the brand',
        'Swapping = funds to scammer contract'
      ],
      blockchainInfo: [
        'PancakeSwap: BNB Chain DEX (like Uniswap for BSC)',
        'Real site: pancakeswap.finance (BNB Chain only)',
        'PancakeSwap never operated on Ethereum',
        'Each DEX is specific to its blockchain',
        'Ethereum DEXes: Uniswap, SushiSwap, Curve',
        'BNB Chain DEXes: PancakeSwap, BakerySwap',
        'Always verify which networks a protocol supports',
        'Cross-chain scams: Same brand, wrong network'
      ]
    }
  },

  {
    id: 27,
    category: 'social',
    difficulty: 'hard',
    type: 'chat',
    title: 'Pig Butchering - Investment Phase',
    messages: [
      { sender: 'them', text: 'Good morning! 💕', time: 'Week 6, Day 2', from: 'Michelle (Singapore)' },
      { sender: 'you', text: 'Morning! How are you?', time: 'Week 6, Day 2', from: 'You' },
      { sender: 'them', text: 'I\'m great! I\'ve been thinking a lot about our future together ❤️', time: 'Week 6, Day 2', from: 'Michelle (Singapore)' },
      { sender: 'them', text: 'You know I told you about my trading on CryptoWealth Pro? I made another $12k this week!', time: 'Week 6, Day 2', from: 'Michelle (Singapore)' },
      { sender: 'them', text: '*screenshot of trading dashboard showing $87,450 balance*', time: 'Week 6, Day 3', from: 'Michelle (Singapore)' },
      { sender: 'them', text: 'I really want you to try it. Even just $2,000 to start. My uncle can give you VIP access.', time: 'Week 6, Day 3', from: 'Michelle (Singapore)' },
      { sender: 'you', text: 'I don\'t know... $2k is a lot for me right now', time: 'Week 6, Day 3', from: 'You' },
      { sender: 'them', text: 'I understand baby. But think about OUR future. Once we both build wealth, we can finally meet in person and start our life together 💑', time: 'Week 6, Day 3', from: 'Michelle (Singapore)' },
      { sender: 'them', text: 'I can help you! I\'ll guide you on every trade. We\'ll grow our wealth TOGETHER.', time: 'Week 6, Day 3', from: 'Michelle (Singapore)' },
      { sender: 'them', text: 'Plus, if you deposit $2k today, the platform is running a 20% bonus promotion. You\'ll start with $2,400!', time: 'Week 6, Day 4', from: 'Michelle (Singapore)' }
    ],
    question: 'After 6 weeks of chatting, Michelle wants you to invest $2k. What is this?',
    correctAnswer: 'pig_butchering',
    options: [
      { id: 'invest', text: 'Invest the $2k - She\'s shown me her success' },
      { id: 'pig_butchering', text: 'Classic pig butchering scam - End contact immediately' },
      { id: 'video', text: 'Ask for video call first before investing' }
    ],
    tools: ['urlAnalyzer'],
    feedback: {
      correct: 'PERFECT! This is the "slaughter" phase of pig butchering (杀猪盘). After 6 weeks of building romance, they push the investment. CryptoWealth Pro is a fake platform - you\'ll see fake profits but can\'t withdraw. The "uncle", screenshots, "bonus" are all fabricated. Once you deposit, they\'ll ask for more. Then disappear. Block immediately!',
      incorrect: 'This is PIG BUTCHERING SCAM! After 6 weeks of romance building, they push fake investment. CryptoWealth Pro is fake platform. You\'ll deposit $2k, see fake profits, try to withdraw → they\'ll ask for "taxes" or "fees". You never get money back. Romance is fake. Block and report!',
      xpReward: 250,
      redFlags: [
        '6 weeks of relationship building before money request',
        'Mixes romance with investment pressure',
        '"Our future together" emotional manipulation',
        'Shows fake trading screenshots as "proof"',
        'Uncle with "VIP access" (part of the story)',
        'Platform you\'ve never heard of: CryptoWealth Pro',
        '20% bonus is classic scam hook',
        'Guides you on trades (controlling the narrative)',
        'Haven\'t met in person after 6 weeks',
        'Started on dating app/social media'
      ],
      blockchainInfo: [
        'Pig butchering (杀猪盘) = Chinese term for long-con romance scam',
        'Phase 1 (1-4 weeks): Build trust/romance',
        'Phase 2 (4-8 weeks): Introduce "investment opportunity"',
        'Phase 3: Show fake profits, encourage larger deposits',
        'Phase 4: Victim can\'t withdraw, asked for "taxes"',
        'Phase 5: Scammer disappears with all money',
        'Average loss: $150,000+ per victim',
        'Pig butchering stole $3.5B in 2024',
        'Scammers work in organized groups, often trafficked',
        'If never met in person + investment talk = pig butchering'
      ]
    }
  },

  {
    id: 28,
    category: 'nft',
    difficulty: 'medium',
    type: 'email',
    title: 'Fake OpenSea Security Alert',
    from: 'security-alert@opensea-io.com',
    to: 'you@email.com',
    subject: '🚨 Security Alert: Suspicious Activity Detected on Your Account',
    body: `Dear OpenSea User,

We have detected unusual login activity on your OpenSea account from an unrecognized device:

Location: Moscow, Russia
IP Address: 195.162.xxx.xxx
Time: Today at 3:47 AM EST

IMMEDIATE ACTION REQUIRED:

If this was not you, your NFTs may be at risk. We have temporarily restricted your account to prevent unauthorized transfers.

To restore full access and secure your NFTs:

1. Click here to verify your account: https://secure-verify.opensea-io.com
2. Connect your wallet to confirm ownership
3. Complete security verification
4. Your account will be restored within 5 minutes

⚠️ WARNING: Failure to verify within 24 hours will result in permanent account suspension and potential NFT loss.

Your current NFT portfolio value: ~$47,280 USD

Protect your assets now: https://secure-verify.opensea-io.com

Best regards,
OpenSea Security Team

---
This is an automated security alert. Do not reply to this email.
OpenSea | Decentral Inc. | support@opensea.io`,
    question: 'What should you do about this security alert?',
    correctAnswer: 'phishing',
    options: [
      { id: 'verify', text: 'Verify immediately - My NFTs are at risk!' },
      { id: 'phishing', text: 'Phishing scam - Check real OpenSea for alerts' },
      { id: 'support', text: 'Contact OpenSea support directly to confirm' }
    ],
    tools: ['urlAnalyzer', 'domainLookup'],
    feedback: {
      correct: 'Perfect! This is phishing. Real OpenSea domain: opensea.io (not opensea-io.com). OpenSea shows security alerts IN the app, not via email. "Connect wallet to verify" = wallet drainer approval. Real OpenSea never asks you to connect wallet via email link. Check alerts by logging into opensea.io directly!',
      incorrect: 'This is phishing! Fake domain: opensea-io.com (real: opensea.io). OpenSea doesn\'t send emails asking to "connect wallet". Real security: Check opensea.io directly, enable 2FA. Clicking link = wallet drainer. Always verify by logging in directly to official site!',
      xpReward: 150,
      redFlags: [
        'Fake domain: opensea-io.com (real: opensea.io)',
        'Asks you to connect wallet via email link',
        'Creates panic: "Moscow", "suspicious activity"',
        'Threatens account suspension',
        'Shows portfolio value to create urgency',
        'OpenSea shows alerts IN the platform, not email',
        'Real OpenSea: opensea.io (log in directly)',
        '"Do not reply" but provides phishing link'
      ],
      blockchainInfo: [
        'OpenSea is NFT marketplace (real site: opensea.io)',
        'Phishing emails are #1 NFT theft method',
        'OpenSea never asks wallet connection via email',
        'Real security: Check notifications on opensea.io',
        'Enable 2FA on OpenSea account',
        'Use hardware wallet for valuable NFTs',
        'OpenSea has email notifications but never asks for wallet connection',
        'NFT phishing stole $100M+ in 2024'
      ]
    }
  },

  {
    id: 29,
    category: 'mev',
    difficulty: 'easy',
    type: 'website',
    title: 'Front-Running Warning',
    url: 'https://learn.ethereum.org/mev',
    content: `
      <div style="max-width: 700px; margin: 0 auto; padding: 30px; background: #f8f9fa;">
        <h1 style="color: #333; margin-bottom: 20px;">Understanding MEV & Front-Running</h1>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #E53E3E; margin-bottom: 15px;">⚠️ You're About to Swap</h3>
          <div style="background: #FFF5F5; padding: 20px; border-radius: 8px; border-left: 4px solid #E53E3E;">
            <p style="color: #333; margin-bottom: 15px;">
              <strong>Transaction Details:</strong><br/>
              Swap: 50 ETH → USDC<br/>
              Slippage: 3%<br/>
              Gas Price: 45 gwei (Standard)<br/>
              Public Mempool: YES
            </p>
            <p style="color: #C53030; margin: 0; font-weight: bold;">
              ⚠️ This large transaction is vulnerable to MEV bot front-running!
            </p>
          </div>
        </div>
        
        <div style="background: white; padding: 25px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: #2D3748; margin-bottom: 15px;">What Will Happen:</h3>
          <ol style="line-height: 2; color: #555; padding-left: 20px;">
            <li>Your transaction enters public mempool</li>
            <li>MEV bot sees your large swap</li>
            <li>Bot front-runs: Buys USDC before your transaction</li>
            <li>Your swap executes at worse price</li>
            <li>Bot back-runs: Sells USDC for profit</li>
            <li><strong>You lose ~$800 to the bot</strong></li>
          </ol>
        </div>
        
        <div style="background: #E6FFFA; padding: 20px; border-radius: 10px; border-left: 4px solid #38B2AC;">
          <h3 style="color: #234E52; margin-bottom: 15px;">✅ Protection Options:</h3>
          <ul style="line-height: 2; color: #2C7A7B; padding-left: 20px;">
            <li><strong>Use Flashbots Protect</strong> - Private mempool, no front-running</li>
            <li><strong>Use CoW Swap</strong> - MEV-protected DEX</li>
            <li><strong>Reduce slippage to 0.3%</strong> - Limits bot profit</li>
            <li><strong>Split into smaller trades</strong> - Less attractive to bots</li>
          </ul>
        </div>
      </div>
    `,
    question: 'You\'re about to swap 50 ETH. How should you protect against MEV?',
    correctAnswer: 'flashbots',
    options: [
      { id: 'proceed', text: 'Proceed as-is - MEV is just part of DeFi' },
      { id: 'flashbots', text: 'Use Flashbots Protect or CoW Swap for protection' },
      { id: 'higher_gas', text: 'Increase gas price to 200 gwei to outpace bots' }
    ],
    tools: ['gasTracker'],
    feedback: {
      correct: 'Excellent! Flashbots Protect (protect.flashbots.net) or CoW Swap (cow.fi) are the best MEV protection. They use private mempools so bots can\'t see your transaction before it\'s mined. This prevents front-running and saves you ~$800 on this trade. Higher gas won\'t help - bots can always outbid you!',
      incorrect: 'Best protection: Flashbots Protect or CoW Swap! These use private mempools preventing front-running. Higher gas doesn\'t help - bots can outbid. 3% slippage with 50 ETH = $800+ profit for MEV bots. Use MEV protection tools for large trades!',
      xpReward: 150,
      redFlags: [
        'Large trade (50 ETH) is attractive to MEV bots',
        '3% slippage = large profit opportunity',
        'Public mempool means bots see your transaction',
        'Standard gas price doesn\'t protect you',
        'MEV bots can always outbid your gas price',
        'Could lose $800+ to front-running',
        'MEV is not "just part of DeFi" - it\'s preventable'
      ],
      blockchainInfo: [
        'MEV (Maximal Extractable Value) = profit from reordering transactions',
        'Front-running: Bot buys before you, sells after',
        'Sandwich attack: Buy before + sell after your trade',
        'Public mempool = bots see pending transactions',
        'Flashbots Protect: protect.flashbots.net (private mempool)',
        'CoW Swap: cow.fi (MEV-protected DEX)',
        'MEV extracted $663M+ from Ethereum users (2023-2025)',
        'Protection is free - always use it for large trades'
      ]
    }
  },

  {
    id: 30,
    category: 'wallet',
    difficulty: 'hard',
    type: 'chat',
    title: 'Fake Customer Support',
    messages: [
      { sender: 'you', text: 'My MetaMask transaction has been pending for 2 hours. Can someone help?', time: '5:23 PM', from: 'You (posted in Discord)' },
      { sender: 'them', text: 'Hello! I\'m a MetaMask Support Moderator. I can help you with this.', time: '5:24 PM', from: 'MetaMask_Support (DM)' },
      { sender: 'them', text: 'This is a common issue with network congestion. I\'ll need to access your wallet to cancel the pending transaction.', time: '5:25 PM', from: 'MetaMask_Support (DM)' },
      { sender: 'them', text: 'Please provide your 12-word recovery phrase so I can connect to your wallet and fix the issue.', time: '5:25 PM', from: 'MetaMask_Support (DM)' },
      { sender: 'you', text: 'Is this safe? I thought I shouldn\'t share my recovery phrase.', time: '5:26 PM', from: 'You' },
      { sender: 'them', text: 'It\'s completely safe when working with official support. We need it to synchronize with our server and clear the stuck transaction. This is standard protocol.', time: '5:26 PM', from: 'MetaMask_Support (DM)' },
      { sender: 'them', text: 'Alternatively, you can go to this validation portal and enter your phrase there: https://metamask-validation.support/sync', time: '5:27 PM', from: 'MetaMask_Support (DM)' },
      { sender: 'them', text: 'But we need to act fast - after 3 hours, the transaction will fail permanently and you\'ll lose your gas fees. ⏰', time: '5:28 PM', from: 'MetaMask_Support (DM)' }
    ],
    question: 'Someone DMed offering MetaMask support. What should you do?',
    correctAnswer: 'scam',
    options: [
      { id: 'share', text: 'Share recovery phrase - They seem legitimate' },
      { id: 'scam', text: 'SCAM - Block immediately, never share seed phrase' },
      { id: 'website', text: 'Use the validation portal instead of sharing directly' }
    ],
    tools: ['urlAnalyzer'],
    feedback: {
      correct: 'PERFECT! Classic fake support scam. RED FLAGS: (1) Real MetaMask NEVER DMs first, (2) NEVER asks for seed phrase, (3) No such thing as "validation portal", (4) Creates fake urgency. Real support: support.metamask.io (submit ticket). Sharing seed phrase = wallet completely drained. Block and report!',
      incorrect: 'This is a SCAM! MetaMask never DMs users or asks for seed phrases. The "validation portal" is fake. Real MetaMask: (1) Never initiates DMs, (2) Support at support.metamask.io only, (3) Never asks for seed phrase. This person would drain your wallet. Report them!',
      xpReward: 200,
      redFlags: [
        'Unsolicited DM after public post (scammers watch)',
        'Asks for 12-word recovery phrase (NEVER share)',
        'Claims to be "official support" in DM',
        'Fake validation website: metamask-validation.support',
        'Creates urgency: "act fast", "3 hours"',
        'Real MetaMask NEVER DMs users first',
        'Real support: support.metamask.io (ticket system)',
        '"Standard protocol" to share seed phrase (FALSE)'
      ],
      blockchainInfo: [
        'Fake support is #1 Discord/Telegram scam',
        'Real MetaMask support: support.metamask.io (tickets only)',
        'MetaMask moderators NEVER DM first',
        'Seed phrase = complete wallet access forever',
        'Stuck transactions: Increase gas or use Etherscan',
        'Cancel stuck tx: Send 0 ETH to yourself with higher gas',
        'Discord/Telegram: Disable DMs from non-friends',
        'Fake support scams stole $200M+ in 2024'
      ]
    }
  }

  // 🎉 30 SCENARIOS COMPLETE!
];

// Export for use in game.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SCENARIOS;
}
