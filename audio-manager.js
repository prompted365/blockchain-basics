// Audio Manager - Sound Effects System
// Handles all audio playback with mute toggle

class AudioManager {
  constructor() {
    this.enabled = localStorage.getItem('audioEnabled') !== 'false';
    this.volume = 0.3;
    
    // Simple sound effects using Web Audio API
    // These create basic tones - in production, use actual sound files
    this.audioContext = null;
    
    // Initialize on first user interaction (browser requirement)
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.log('Web Audio API not supported');
      this.enabled = false;
    }
  }

  // Play success sound (correct answer)
  playSuccess() {
    if (!this.enabled) return;
    this.init();
    
    try {
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 523.25; // C5
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
      
      // Add second note for chord
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 659.25; // E5
      osc2.type = 'sine';
      gain2.gain.setValueAtTime(this.volume * 0.7, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.3);
      
    } catch (e) {
      console.log('Audio playback failed');
    }
  }

  // Play error sound (incorrect answer)
  playError() {
    if (!this.enabled) return;
    this.init();
    
    try {
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 200;
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
      
    } catch (e) {
      console.log('Audio playback failed');
    }
  }

  // Play click sound (button/tool click)
  playClick() {
    if (!this.enabled) return;
    this.init();
    
    try {
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(this.volume * 0.5, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
      
    } catch (e) {
      console.log('Audio playback failed');
    }
  }

  // Play achievement sound (level up, achievement unlock)
  playAchievement() {
    if (!this.enabled) return;
    this.init();
    
    try {
      const ctx = this.audioContext;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (major chord)
      
      notes.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        const startTime = ctx.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(this.volume * 0.6, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
      
    } catch (e) {
      console.log('Audio playback failed');
    }
  }

  // Play tool use sound
  playTool() {
    if (!this.enabled) return;
    this.init();
    
    try {
      const ctx = this.audioContext;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 440;
      oscillator.type = 'triangle';
      
      gainNode.gain.setValueAtTime(this.volume * 0.4, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
      
    } catch (e) {
      console.log('Audio playback failed');
    }
  }

  // Toggle audio on/off
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('audioEnabled', this.enabled);
    
    // Play a test sound if enabling
    if (this.enabled) {
      this.playClick();
    }
    
    return this.enabled;
  }

  // Check if audio is enabled
  isEnabled() {
    return this.enabled;
  }
}

// Create global audio manager instance
const audioManager = new AudioManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AudioManager, audioManager };
}
