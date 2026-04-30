/**
 * DATA STORAGE HELPERS
 * comments: Retrieves and saves the arcade state to LocalStorage.
 */
function getData() {
    return JSON.parse(localStorage.getItem("userData")) || { users: {}, currentUser: null };
}

function saveData(data) {
    localStorage.setItem("userData", JSON.stringify(data));
}

/**
 * PAGE NAVIGATION
 * comments: Controls which section is visible to the user.
 */
function showSection(id) {
    document.querySelectorAll('.page-content').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    if (id === 'profile-section') renderProfile();
    if (id === 'leaderboard-section') renderLeaderboard();
}

/**
 * AUTHENTICATION (JOIN BUTTON)
 * comments: Logic for logging in and signing up.
 */
function signUp() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    let data = getData();

    if(data.users[u]) return alert("User already exists!");
    data.users[u] = { password: p, scores: {} };
    data.currentUser = u;
    saveData(data);
    alert("Welcome " + u);
    showSection('home-section');
}

function login() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    let data = getData();

    if(data.users[u] && data.users[u].password === p) {
        data.currentUser = u;
        saveData(data);
        alert("Logged in!");
        showSection('home-section');
    } else {
        alert("Invalid Credentials");
    }
}

function logout() {
    let data = getData();
    data.currentUser = null;
    saveData(data);
    showSection('home-section');
}

/**
 * PROFILE & LEADERBOARD RENDERING
 * comments: Generates HTML for high scores and history.
 */
function renderProfile() {
    let data = getData();
    let container = document.getElementById('profile-display');
    if(!data.currentUser) {
        container.innerHTML = "<h3>Please login to see your profile</h3>";
        return;
    }

    let user = data.users[data.currentUser];
    let scoreDisplay = "<h4>Your Game Stats:</h4>";
    for(let g in user.scores) {
        scoreDisplay += `<p><strong>${g}:</strong> High: ${user.scores[g].highScore} | History: [${user.scores[g].scores.join(', ')}]</p>`;
    }

    container.innerHTML = `
        <h3>User: ${data.currentUser}</h3>
        <p>Password: ••••••••</p>
        <hr>
        ${scoreDisplay || "<p>No games played yet.</p>"}
    `;
}

function renderLeaderboard() {
    let data = getData();
    let container = document.getElementById('leaderboard-display');
    let games = ["Snake Game 2.0", "Tic Tac Toe", "Whack a Mole"];
    let html = "";

    games.forEach(g => {
        let scores = [];
        for(let u in data.users) {
            if(data.users[u].scores[g]) {
                scores.push({ name: u, score: data.users[u].scores[g].highScore });
            }
        }
        scores.sort((a,b) => b.score - a.score);
        html += `<h4>${g} Top Scores</h4>`;
        scores.slice(0, 5).forEach((s, i) => {
            html += `<p>${i+1}. ${s.name} - ${s.score}</p>`;
        });
        html += "<hr>";
    });
    container.innerHTML = html || "No scores recorded yet.";
}

// Initial Carousel Interaction (Your Original JS)
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        console.log("Card selected: " + card.querySelector('h3, h2').innerText);
    });
});