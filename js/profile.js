const themeToggle = document.getElementById('profile-theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-theme', this.checked);
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

const user = JSON.parse(localStorage.getItem('loggedInUser'));

if (user) {
    const full = user.firstName + ' ' + user.lastName;

    document.getElementById('profile-welcome-name').textContent = user.firstName;
    document.getElementById('profile-card-name').textContent = full;
    document.getElementById('profile-info-name').textContent = full;
    document.getElementById('profile-info-email').textContent = user.email;
    document.getElementById('profile-info-phone').textContent = user.phone;
    document.getElementById('profile-info-country').textContent = user.country || 'Egypt';

    document.querySelector('.profile-avatar').innerHTML =
        `<span>${user.firstName[0].toUpperCase()}</span>`;
}

document.getElementById('sign-out-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedInUser');
    location.href = 'logIn.html';
});