// Reddit Multi-Lane Client JavaScript

// --- State ---
const laneContainer = document.getElementById('lane-container');
const addImage = document.getElementById('add-image');

let lanes = JSON.parse(localStorage.getItem('redditLanes') || '["javascript"]');

// --- Lane Rendering ---
function renderLanes() {
    laneContainer.innerHTML = '';
    lanes.forEach(subreddit => {
        const lane = document.createElement('div');
        lane.className = 'lanes';
        lane.innerHTML = `
            <div class="lane-header">
                <h2 class="lane-title">/r/${subreddit}</h2>
                <button class="close-btn" data-subreddit="${subreddit}" title="Remove lane">&times;</button>
            </div>
            <div class="post-container" id="posts-${subreddit}">Loading...</div>
        `;
        laneContainer.appendChild(lane);
        fetchPosts(subreddit);
    });

    // Add event listeners for close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.onclick = function() {
            const sub = this.getAttribute('data-subreddit');
            lanes = lanes.filter(lane => lane !== sub);
            localStorage.setItem('redditLanes', JSON.stringify(lanes));
            renderLanes();
        };
    });
}

// --- Fetch Posts ---
async function fetchPosts(subreddit) {
    const postsDiv = document.getElementById('posts-' + subreddit);
    postsDiv.innerHTML = 'Loading...';
    try {
        const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=5`);
        if (!res.ok) throw new Error('Subreddit not found');
        const data = await res.json();
        const posts = data.data.children;
        if (!posts.length) {
            postsDiv.innerHTML = 'No posts found.';
            return;
        }
        postsDiv.innerHTML = posts.map(post => `
            <div class="post">
                <strong>${post.data.title}</strong>
                <div>by ${post.data.author} | &#94; ${post.data.ups}</div>
            </div>
        `).join('');
    } catch (e) {
        postsDiv.innerHTML = `<span style="color:red;">Error: ${e.message}</span>`;
    }
}

// Add lane on clicking the add image
addImage.onclick = async () => {
    const name = prompt("Enter subreddit name (without /r/):");
    if (name && !lanes.includes(name)) {
        // Check if subreddit exists before adding
        try {
            const res = await fetch(`https://www.reddit.com/r/${name}/about.json`);
            if (!res.ok) throw new Error();
            lanes.push(name);
            localStorage.setItem('redditLanes', JSON.stringify(lanes));
            renderLanes();
        } catch {
            alert("Subreddit not found. Please enter a valid subreddit name.");
        }
    }
};

// --- Initial Render ---
renderLanes();

