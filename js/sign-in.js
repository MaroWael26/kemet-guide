function updateError(id, msg) {
    if (msg === undefined) msg = '';
    var el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function showToast(id) {
    var t = document.getElementById(id);
    if (t) {
        t.classList.add('show');
        setTimeout(function() {
            t.classList.remove('show');
        }, 3000);
    }
}

function getUsers() {
    var users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveUser(user) {
    var currentUsers = getUsers();
    currentUsers.push(user);
    localStorage.setItem('users', JSON.stringify(currentUsers));
}

var loginForm = document.getElementById('loginForm');

if (loginForm) {
    var remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        document.getElementById('userName').value = remembered;
        document.getElementById('remember').checked = true;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateError('error-msg');

        var emailInput = document.getElementById('userName').value.trim().toLowerCase();
        var passInput = document.getElementById('userPass').value;
        var remember = document.getElementById('remember').checked;

        var allUsers = getUsers();
        var user = allUsers.find(function(u) {
            return u.email.toLowerCase() === emailInput;
        });

        if (!user) return updateError('error-msg', 'Email not found. Please register.');
        if (user.password !== passInput) return updateError('error-msg', 'Incorrect password.');

        if (remember) {
            localStorage.setItem('rememberedUser', emailInput);
        } else {
            localStorage.removeItem('rememberedUser');
        }

        localStorage.setItem('loggedInUser', JSON.stringify(user));
        showToast('toast');
        setTimeout(function() {
            location.href = 'index.html';
        }, 1500);
    });
}

var signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateError('error-msg');

        var data = {
            firstName: document.getElementById('user-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('user-email').value.trim().toLowerCase(),
            phone: document.getElementById('phone').value.trim(),
            password: document.getElementById('newPass').value,
            conf: document.getElementById('confPass').value
        };

        if (!data.email || !data.password) return updateError('error-msg', ' Fields are required.');
        if (data.password !== data.conf) return updateError('error-msg', 'Passwords do not match.');
        
        var existingUser = getUsers().find(function(u) {
            return u.email === data.email;
        });
        
        if (existingUser) return updateError('error-msg', ' This email is already registered.');
        if (data.password.length < 8) return updateError('error-msg', ' Password must be at least 8 characters long.');

        saveUser(data);
        showToast('toast');
        setTimeout(function() {
            location.href = 'logIn.html';
        }, 1500);
    });
}