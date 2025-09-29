// LeetCode Stats
async function fetchLeetCodeStats() {
    try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/sibin_01');
        const data = await response.json();
        updateLeetCodeDisplay(data);
    } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        handleLeetCodeError();
    }
}

function updateLeetCodeDisplay(data) {
    document.getElementById('leetcode-solved').textContent = data.totalSolved || '0';
    document.getElementById('leetcode-rate').textContent = (data.acceptanceRate || '0') + '%';
    document.getElementById('leetcode-easy').textContent = data.easySolved || '0';
    document.getElementById('leetcode-medium').textContent = data.mediumSolved || '0';
    document.getElementById('leetcode-hard').textContent = data.hardSolved || '0';
}

function handleLeetCodeError() {
    const errorText = 'Error loading';
    const elements = ['solved', 'rate', 'easy', 'medium', 'hard'];
    elements.forEach(id => {
        const el = document.getElementById(`leetcode-${id}`);
        if (el) el.textContent = errorText;
    });
}

// GFG Stats Management
const GFG_STATS_KEY = 'gfg_stats';

function getGFGStats() {
    const stats = localStorage.getItem(GFG_STATS_KEY);
    return stats ? JSON.parse(stats) : {
        problemsSolved: 150,
        codingScore: 300,
        lastUpdated: new Date().toISOString()
    };
}

function updateGFGStats(problemsSolved, codingScore) {
    if (!problemsSolved || !codingScore) return;
    
    const stats = {
        problemsSolved: parseInt(problemsSolved),
        codingScore: parseInt(codingScore),
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(GFG_STATS_KEY, JSON.stringify(stats));
    displayGFGStats();
}

function displayGFGStats() {
    const stats = getGFGStats();
    const solvedEl = document.getElementById('gfg-solved');
    const scoreEl = document.getElementById('gfg-score');
    const updatedEl = document.getElementById('gfg-last-updated');

    if (solvedEl) solvedEl.textContent = stats.problemsSolved;
    if (scoreEl) scoreEl.textContent = stats.codingScore;
    
    if (updatedEl) {
        const lastUpdated = new Date(stats.lastUpdated).toLocaleString();
        updatedEl.textContent = `Last updated: ${lastUpdated}`;
    }
}

function shouldRefreshGFGStats() {
    const stats = getGFGStats();
    if (!stats.lastUpdated) return true;
    
    const lastUpdate = new Date(stats.lastUpdated);
    const now = new Date();
    const hoursSinceUpdate = (now - lastUpdate) / (1000 * 60 * 60);
    
    return hoursSinceUpdate >= 24;
}

function autoRefreshGFGStats() {
    if (shouldRefreshGFGStats()) {
        const solvedEl = document.getElementById('gfg-solved');
        const scoreEl = document.getElementById('gfg-score');
        const updatedEl = document.getElementById('gfg-last-updated');
        
        if (solvedEl) solvedEl.textContent = 'Needs update';
        if (scoreEl) scoreEl.textContent = 'Needs update';
        if (updatedEl) updatedEl.textContent = 'Please update stats';
    }
}

// Manual update handler for GFG
window.updateGFGStatsHandler = function() {
    const currentStats = getGFGStats();
    const problemsSolved = prompt('Enter number of problems solved:', currentStats.problemsSolved);
    const codingScore = prompt('Enter coding score:', currentStats.codingScore);
    
    if (problemsSolved !== null && codingScore !== null) {
        updateGFGStats(problemsSolved, codingScore);
    }
};

// Initialize and Auto-refresh
function initializeStats() {
    fetchLeetCodeStats();
    displayGFGStats();
    
    // Set intervals for both LeetCode and GFG
    setInterval(fetchLeetCodeStats, 300000); // Every 5 minutes
    setInterval(autoRefreshGFGStats, 3600000); // Every hour
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeStats);