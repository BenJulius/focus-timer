class SlotMachine {
    constructor(reels, rewardDisplay) {
        this.reels = reels;
        this.rewardDisplay = rewardDisplay;
        this.rewards = [];
        this.icons = ['👟', '🍎', '📺', '📱', '🧘', '💧', '✨', '🎉', '🔥'];
    }
    setRewards(rewardArray) {
        this.rewards = rewardArray;
    }
    spin() {
        if (this.rewards.length === 0) return;
        this.rewardDisplay.textContent = "ROLLING...";
        this.reels.forEach(reel => reel.classList.add('spinning'));
        
        let spinInterval = setInterval(() => {
            this.reels.forEach(reel => {
                reel.textContent = this.icons[Math.floor(Math.random() * this.icons.length)];
            });
        }, 100);

        setTimeout(() => {
            clearInterval(spinInterval);
            const winner = this.rewards[Math.floor(Math.random() * this.rewards.length)];
            
            this.reels.forEach(reel => {
                reel.classList.remove('spinning');
                reel.textContent = winner.icon;
            });
            this.rewardDisplay.textContent = winner.text.toUpperCase();
        }, 2000);
    }
    reset() {
        this.reels.forEach(reel => reel.textContent = '⚡');
        this.rewardDisplay.textContent = "READY";
    }
}