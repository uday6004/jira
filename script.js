// Mock Data
const activities = [
    { id: 1, type: 'status', user: 'JD', name: 'John Doe', action: 'moved', ticket: 'DEV-101', from: 'In Progress', to: 'Done', time: '2 mins ago' },
    { id: 2, type: 'comment', user: 'AS', name: 'Anna Smith', action: 'commented on', ticket: 'DEV-104', text: 'Looks good, merging now!', time: '15 mins ago' },
    { id: 3, type: 'status', user: 'RK', name: 'Ryan K.', action: 'created', ticket: 'DEV-109', from: null, to: 'To Do', time: '1 hour ago' }
];

const activityList = document.getElementById('activity-list');

// Function to render the cards
function renderActivities(filter = 'all') {
    activityList.innerHTML = '';
    
    const filtered = filter === 'all' 
        ? activities 
        : activities.filter(a => a.type === filter);

    filtered.forEach(act => {
        const card = document.createElement('div');
        card.className = 'activity-card';
        
        let detailHtml = act.type === 'status' 
            ? `transitioned <span class="status-badge">${act.to}</span>`
            : `said: "<em>${act.text}</em>"`;

        card.innerHTML = `
            <div class="avatar">${act.user}</div>
            <div class="content">
                <strong>${act.name}</strong> ${act.action} 
                <a href="#" class="ticket-id">${act.ticket}</a>
                <p>${detailHtml}</p>
                <small style="color: #6B778C">${act.time}</small>
            </div>
        `;
        activityList.appendChild(card);
    });

    document.getElementById('activity-count').innerText = `Showing ${filtered.length} updates`;
}

// Event Listeners for Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
        renderActivities(e.target.dataset.type);
    });
});

// Initial Render
renderActivities();
