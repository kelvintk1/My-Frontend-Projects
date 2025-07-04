const searchInput = document.getElementById('search-input');
const fetchButton = document.getElementById('fetch-button');
const repoInfo = document.getElementById('repo-info');
const repoName = document.getElementById('repo-name');
const repoDescription = document.getElementById('repo-description');
const repoUrl = document.getElementById('repo-url');

let refreshButton = null;
let lastLanguage = '';

function setLoadingState() {
    repoInfo.innerHTML = '<p>Loading...</p>';
    repoInfo.style.display = 'block';
}

function setErrorState(message) {
    repoInfo.innerHTML = `<p style="color:red;">${message}</p>`;
    repoInfo.style.display = 'block';
    removeRefreshButton();
}

function setEmptyState() {
    repoInfo.innerHTML = '<p>No repositories found for this language.</p>';
    repoInfo.style.display = 'block';
    removeRefreshButton();
}

function displayRepoInfo(repo) {
    repoInfo.innerHTML = `
        <div class="repo-title">${repo.name}</div>
        <div class="repo-desc">${repo.description || 'No description available.'}</div>
        <div class="repo-meta">
            <span><i class="fa-solid fa-code"></i> ${repo.language || 'N/A'}</span>
            <span><i class="fa-solid fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
            <span><i class="fa-solid fa-exclamation-circle"></i> ${repo.open_issues_count}</span>
        </div>
        <a class="repo-link" href="${repo.html_url}" target="_blank">${repo.html_url}</a>
    `;
    repoInfo.classList.add('show');
    repoInfo.style.display = 'flex';
    showRefreshButton();
}

function showRefreshButton() {
    if (!refreshButton) {
        refreshButton = document.createElement('button');
        refreshButton.textContent = 'Refresh';
        refreshButton.id = 'refresh-button';
        refreshButton.style.marginTop = '10px';
        refreshButton.addEventListener('click', () => {
            if (lastLanguage) {
                fetchRandomRepo(lastLanguage);
            }
        });
        repoInfo.appendChild(refreshButton);
    }
}

function removeRefreshButton() {
    if (refreshButton && refreshButton.parentNode) {
        refreshButton.parentNode.removeChild(refreshButton);
        refreshButton = null;
    }
}

fetchButton.addEventListener('click', () => {
    const language = searchInput.value;
    if (!language) {
        alert('Please select a programming language.');
        return;
    }
    lastLanguage = language;
    fetchRandomRepo(language);
});

async function fetchRandomRepo(language) {
    setLoadingState();
    removeRefreshButton();
    try {
        // GitHub API: max 100 results per page
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${encodeURIComponent(language)}&sort=stars&order=desc&per_page=100`);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const randomRepo = data.items[randomIndex];
            displayRepoInfo(randomRepo);
        } else {
            setEmptyState();
        }
    } catch (error) {
        setErrorState('Error fetching repository. Please try again later.');
        console.error('Error fetching repository:', error);
    }
}

// Hide repo info on load
repoInfo.style.display = 'none';
