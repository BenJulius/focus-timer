const setupScreen = document.getElementById('setup-screen');
const timerScreen = document.getElementById('timer-screen');
const hoursInput = document.getElementById('hours-input');
const minutesInput = document.getElementById('minutes-input');
const secondsInput = document.getElementById('seconds-input');
const saveBtn = document.getElementById('save-btn');
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const restartBtn = document.getElementById('restart-btn');
const setupBtn = document.getElementById('setup-btn');
const customCheck = document.getElementById('custom-check');
const customEmoji = document.getElementById('custom-emoji');
const emojiPicker = document.getElementById('emoji-picker');
const emojis = emojiPicker.querySelectorAll('span');
const customInput = document.getElementById('custom-input');
const rewardDisplay = document.getElementById('reward-display');

const reelElements = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];

const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    
    if (h !== '00') {
        return `${h}:${m}:${s}`;
    }
    return `${m}:${s}`;
};

const slots = new SlotMachine(reelElements, rewardDisplay);

const timer = new PomodoroTimer(
    (sec) => { timeDisplay.textContent = formatTime(sec); },
    () => { slots.spin(); }
);

const standardRewardToIcon = {
    'WALK': '👟',
    'SNACK': '🍎',
    'TV EPISODE': '📺',
    'SOCIAL MEDIA': '📱',
    'STRETCH': '🧘',
    'HYDRATE': '💧'
};

customEmoji.addEventListener('click', () => {
    emojiPicker.classList.toggle('hidden');
});

emojis.forEach(emoji => {
    emoji.addEventListener('click', (e) => {
        customEmoji.value = e.target.textContent;
        emojiPicker.classList.add('hidden');
    });
});

document.addEventListener('click', (e) => {
    if (!customEmoji.contains(e.target) && !emojiPicker.contains(e.target)) {
        emojiPicker.classList.add('hidden');
    }
});

saveBtn.addEventListener('click', () => {
    const h = parseInt(hoursInput.value, 10) || 0;
    const m = parseInt(minutesInput.value, 10) || 0;
    const s = parseInt(secondsInput.value, 10) || 0;
    
    const totalSeconds = (h * 3600) + (m * 60) + s;
    
    const checkboxes = document.querySelectorAll('.check-btn input[type="checkbox"]');
    let rewardsList = [];
    
    checkboxes.forEach(box => {
        if (box.checked) {
            rewardsList.push({
                text: box.value,
                icon: standardRewardToIcon[box.value]
            });
        }
    });

    if (customCheck.checked && customInput.value.trim().length > 0) {
        rewardsList.push({
            text: customInput.value.trim(),
            icon: customEmoji.value
        });
    }

    if (totalSeconds > 0 && rewardsList.length > 0) {
        timer.setDuration(totalSeconds);
        slots.setRewards(rewardsList);
        slots.reset();
        setupScreen.classList.add('hidden');
        timerScreen.classList.remove('hidden');
    }
});

startBtn.addEventListener('click', () => timer.start());
pauseBtn.addEventListener('click', () => timer.pause());
restartBtn.addEventListener('click', () => {
    timer.reset();
    slots.reset();
});
setupBtn.addEventListener('click', () => {
    timer.pause();
    timerScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
});