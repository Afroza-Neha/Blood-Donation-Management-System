
window.togglePassword = function(inputId, iconElement) {
  const input = document.getElementById(inputId);
  if (input.type === 'password') {
    input.type = 'text';
    iconElement.textContent = '🙈';
  } else {
    input.type = 'password';
    iconElement.textContent = '👁️';
  }
};

(function() {
  'use strict';

  function saveUser(user) {
    localStorage.setItem('bloodDonorUser', JSON.stringify(user));
  }

  function loadUser() {
    const raw = localStorage.getItem('bloodDonorUser');
    return raw ? JSON.parse(raw) : null;
  }

  function getFormattedDate(dateObj) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  }

  // ---------- LOGIN PAGE ----------
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    const forgotLink = document.getElementById('forgotLink');
    if (forgotLink) {
      forgotLink.addEventListener('click', function(e) {
        e.preventDefault();
        const emailPrompt = prompt("Please enter your email address to reset your password:");
        if (emailPrompt === null) return; 
        const email = emailPrompt.trim();
        if (email === "") { alert("❌ You must enter an email address."); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) { alert(`✅ Success! Reset link sent to: ${email}`); }
        else { alert(`❌ Error: "${email}" is invalid.`); }
      });
    }

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const loginMessage = document.getElementById('loginMessage');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === '') { loginMessage.textContent = '❌ Please enter your email'; return; }
      if (!emailRegex.test(email)) { loginMessage.textContent = '❌ Please enter a valid email address'; return; }
      if (password === '') { loginMessage.textContent = '❌ Please enter your password'; return; }

      const savedUser = loadUser();
      
      if (!savedUser) {
        loginMessage.textContent = '❌ No account found. Please sign up first.';
        return;
      }

      if (email === savedUser.email && password === savedUser.password) {
        loginMessage.style.color = '#2e7d32';
        loginMessage.textContent = '✅ Login successful! Redirecting...';
        
        // ⚠️ CHANGED HERE: Redirects to udashboard.html
        setTimeout(() => { window.location.href = 'udashboard.html'; }, 800);
        
      } else {
        loginMessage.style.color = '#b22222';
        loginMessage.textContent = '❌ Invalid email or password';
      }
    });
  }

  // ---------- SIGN UP PAGE ----------
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    const signupMessage = document.getElementById('signupMessage');
    const signupBtn = document.getElementById('signupBtn');

    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const fullname = document.getElementById('fullname').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value;
      const confirm = document.getElementById('confirmPassword').value;
      const bloodGroup = document.getElementById('bloodGroup').value;
      const phone = document.getElementById('phone').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^01[3-9]\d{8}$/; 
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

      if (fullname === '') { signupMessage.textContent = '❌ Please enter your name'; return; }
      if (fullname.length < 3) { signupMessage.textContent = '❌ Name must be at least 3 characters'; return; }
      if (email === '') { signupMessage.textContent = '❌ Please enter your email'; return; }
      if (!emailRegex.test(email)) { signupMessage.textContent = '❌ Please enter a valid email address'; return; }
      if (password === '') { signupMessage.textContent = '❌ Please enter your password'; return; }
      if (!passwordRegex.test(password)) { signupMessage.textContent = '❌ Password must have 6 chars, 1 letter, 1 number'; return; }
      if (confirm === '') { signupMessage.textContent = '❌ Please confirm your password'; return; }
      if (password !== confirm) { signupMessage.textContent = '❌ Passwords do not match'; return; }
      if (bloodGroup === '') { signupMessage.textContent = '❌ Please select your blood group'; return; }
      if (phone === '') { signupMessage.textContent = '❌ Please enter your number'; return; }
      if (!phoneRegex.test(phone)) { signupMessage.textContent = '❌ Invalid number (Must be 11 digits, start 013-019)'; return; }

      const user = {
        fullname: fullname,
        email: email,
        password: password, 
        bloodGroup: bloodGroup,
        phone: phone,
        available: true,
        joinDate: new Date().toISOString(),
        history: [] 
      };
      saveUser(user);

      signupMessage.style.color = '#2e7d32';
      signupMessage.textContent = '✅ Account created! Redirecting...';
      if(signupBtn) { signupBtn.disabled = true; signupBtn.textContent = 'Loading...'; }
      
      setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    });
  }

  // ---------- DASHBOARD PAGE (udashboard.html) ----------
  // Note: The class "dashboard-page" is used to detect the page. Make sure your udashboard.html has <body class="dashboard-page">
  const dashboardPage = document.querySelector('.dashboard-page');
  if (dashboardPage) {
    let user = loadUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }

    document.getElementById('donorName').textContent = user.fullname;
    document.getElementById('donorEmail').textContent = user.email;
    document.getElementById('bloodBadge').textContent = user.bloodGroup;
    document.getElementById('profileName').textContent = user.fullname;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileBlood').textContent = user.bloodGroup;
    document.getElementById('profilePhone').textContent = user.phone;

    if (user.joinDate) {
      const joinDateObj = new Date(user.joinDate);
      document.getElementById('memberSince').textContent = getFormattedDate(joinDateObj);
    } else {
      document.getElementById('memberSince').textContent = "Nov 2026";
    }

    const historyBody = document.getElementById('historyBody');
    const totalDonationsEl = document.getElementById('totalDonations');

    function renderHistory() {
      historyBody.innerHTML = '';
      if (!user.history) user.history = [];

      if (user.history.length === 0) {
        historyBody.innerHTML = `
          <tr>
            <td style="color: #888;">---</td>
            <td style="color: #888;">---</td>
            <td style="color: #888;">---</td>
          </tr>
        `;
        totalDonationsEl.textContent = '0';
      } else {
        user.history.forEach(function(record) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${record.date}</td>
            <td>${record.location}</td>
            <td>${record.units}</td>
          `;
          historyBody.appendChild(tr);
        });
        totalDonationsEl.textContent = user.history.length;
      }
    }
    renderHistory();

    const addDonationBtn = document.getElementById('addDonationBtn');
    if (addDonationBtn) {
      addDonationBtn.addEventListener('click', function() {
        const location = prompt("Enter donation location:", "City Hospital");
        if (!location) return;

        if (!user.history) user.history = [];

        const newRecord = {
          date: getFormattedDate(new Date()),
          location: location,
          units: 1
        };

        user.history.push(newRecord);
        saveUser(user);
        renderHistory();
      });
    }

    const toggle = document.getElementById('availabilityToggle');
    const availabilityText = document.getElementById('availabilityText');
    const statusMessage = document.getElementById('statusMessage');
    const statusIndicator = document.getElementById('statusIndicator');

    toggle.checked = user.available !== false;

    function updateUI(isAvailable) {
      availabilityText.textContent = isAvailable ? 'Available to donate' : 'Not available';
      statusMessage.textContent = isAvailable ? 'You are available to donate' : 'You are currently unavailable';
      const dot = statusIndicator.querySelector('.dot');
      if (dot) dot.className = 'dot ' + (isAvailable ? 'available' : 'unavailable');
    }
    
    updateUI(toggle.checked);

    toggle.addEventListener('change', function() {
      user.available = this.checked;
      saveUser(user);
      updateUI(user.available);
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }
  }
})();