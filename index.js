document.addEventListener('DOMContentLoaded', () => {

  // --- Modal Open/Close Controls ---
  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.getElementById('openLoginBtn');
  const closeLoginBtn = document.getElementById('closeLoginBtn');

  const openModal = () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    generateCaptcha(); // Generate a new captcha each time modal opens
    resetForm();
  };

  const closeModal = () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openLoginBtn.addEventListener('click', openModal);
  closeLoginBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the blurred overlay background
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeModal();
    }
  });

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal.classList.contains('active')) {
      closeModal();
    }
  });


  // --- Password Show/Hide Toggle ---
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const toggleIcon = togglePasswordBtn.querySelector('i');

  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.className = 'fa-solid fa-eye-slash';
    } else {
      passwordInput.type = 'password';
      toggleIcon.className = 'fa-solid fa-eye';
    }
  });


  // --- Alphanumeric Captcha Generation & Verification ---
  const captchaBox = document.getElementById('captchaBox');
  const refreshCaptchaBtn = document.getElementById('refreshCaptchaBtn');
  const captchaInput = document.getElementById('captchaInput');
  const captchaError = document.getElementById('captchaError');
  let currentCaptcha = '';

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    captchaBox.innerText = captcha;
    captchaInput.value = '';
    captchaError.style.display = 'none';
    validateForm();
  };

  refreshCaptchaBtn.addEventListener('click', generateCaptcha);


  // --- Custom Video Player Play-on-Click ---
  const videoPoster = document.querySelector('.video-poster');
  const introVideo = document.getElementById('introVideo');

  if (videoPoster && introVideo) {
    videoPoster.addEventListener('click', () => {
      videoPoster.style.display = 'none';
      introVideo.style.display = 'block';
      introVideo.play();
    });
  }


  // --- Form Validation Checklists & State Control ---
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const submitBtn = document.getElementById('submitBtn');

  // Input wrapper status icons
  const userWrapper = usernameInput.closest('.input-wrapper');
  const userSuccessIcon = userWrapper.querySelector('.status-icon.success');
  const userErrorIcon = userWrapper.querySelector('.status-icon.error');

  const passWrapper = passwordInput.closest('.input-wrapper');
  const passSuccessIcon = passWrapper.querySelector('.status-icon.success');
  const passErrorIcon = passWrapper.querySelector('.status-icon.error');

  // Checklists
  const usernameChecklist = document.getElementById('usernameChecklist');
  const passwordChecklist = document.getElementById('passwordChecklist');

  // Validation States
  let isUsernameValid = false;
  let isPasswordValid = false;

  // Show checklists on focus
  usernameInput.addEventListener('focus', () => {
    usernameChecklist.classList.add('active');
  });

  passwordInput.addEventListener('focus', () => {
    passwordChecklist.classList.add('active');
  });

  // Hide checklist on blur only if the field is valid or empty
  usernameInput.addEventListener('blur', () => {
    if (usernameInput.value.length === 0 || isUsernameValid) {
      usernameChecklist.classList.remove('active');
    }
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value.length === 0 || isPasswordValid) {
      passwordChecklist.classList.remove('active');
    }
  });

  // Radio button role changes
  const roleRadios = document.querySelectorAll('name="role"');
  document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', () => {
      validateForm();
    });
  });

  // Event listeners for input changes
  usernameInput.addEventListener('input', () => {
    validateUsername();
    validateForm();
  });

  passwordInput.addEventListener('input', () => {
    validatePassword();
    validateForm();
  });

  captchaInput.addEventListener('input', () => {
    captchaError.style.display = 'none';
    validateForm();
  });


  // --- Validation Helper Functions ---

  const validateUsername = () => {
    const val = usernameInput.value;
    
    // If empty, clean state
    if (val.length === 0) {
      isUsernameValid = false;
      userSuccessIcon.style.display = 'none';
      userErrorIcon.style.display = 'none';
      resetChecklistItems(usernameChecklist);
      return;
    }

    const rules = {
      length: val.length >= 8 && val.length <= 15,
      uppercase: /[A-Z]/.test(val),
      special: /[\W_]/.test(val),
      nospaces: !/\s/.test(val)
    };

    updateChecklistUI(usernameChecklist, rules);

    isUsernameValid = Object.values(rules).every(rule => rule === true);

    if (isUsernameValid) {
      userSuccessIcon.style.display = 'block';
      userErrorIcon.style.display = 'none';
      usernameInput.style.borderColor = 'var(--success)';
    } else {
      userSuccessIcon.style.display = 'none';
      userErrorIcon.style.display = 'block';
      usernameInput.style.borderColor = 'var(--error)';
    }
  };

  const validatePassword = () => {
    const val = passwordInput.value;

    // If empty, clean state
    if (val.length === 0) {
      isPasswordValid = false;
      passSuccessIcon.style.display = 'none';
      passErrorIcon.style.display = 'none';
      resetChecklistItems(passwordChecklist);
      return;
    }

    const rules = {
      length: val.length >= 8 && val.length <= 15,
      uppercase: /[A-Z]/.test(val),
      lowercase: /[a-z]/.test(val),
      number: /[0-9]/.test(val),
      special: /[\W_]/.test(val),
      nospaces: !/\s/.test(val)
    };

    updateChecklistUI(passwordChecklist, rules);

    isPasswordValid = Object.values(rules).every(rule => rule === true);

    if (isPasswordValid) {
      passSuccessIcon.style.display = 'block';
      passErrorIcon.style.display = 'none';
      passwordInput.style.borderColor = 'var(--success)';
    } else {
      passSuccessIcon.style.display = 'none';
      passErrorIcon.style.display = 'block';
      passwordInput.style.borderColor = 'var(--error)';
    }
  };

  const updateChecklistUI = (checklistElement, rules) => {
    for (const [ruleName, isMet] of Object.entries(rules)) {
      const item = checklistElement.querySelector(`[data-rule="${ruleName}"]`);
      if (item) {
        if (isMet) {
          item.className = 'check-item valid';
        } else {
          item.className = 'check-item invalid';
        }
      }
    }
  };

  const resetChecklistItems = (checklistElement) => {
    checklistElement.querySelectorAll('.check-item').forEach(item => {
      item.className = 'check-item';
    });
  };

  // Enable button only if Role selected, Username valid, Password valid, and Captcha input entered
  const validateForm = () => {
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const hasRole = selectedRole !== null;
    const hasCaptchaInput = captchaInput.value.trim().length > 0;

    const isValid = hasRole && isUsernameValid && isPasswordValid && hasCaptchaInput;
    submitBtn.disabled = !isValid;
  };

  // Reset form status on modal open
  const resetForm = () => {
    loginForm.reset();
    isUsernameValid = false;
    isPasswordValid = false;
    
    // Clear icons & border styles
    userSuccessIcon.style.display = 'none';
    userErrorIcon.style.display = 'none';
    usernameInput.style.borderColor = '';
    usernameChecklist.classList.remove('active');
    resetChecklistItems(usernameChecklist);

    passSuccessIcon.style.display = 'none';
    passErrorIcon.style.display = 'none';
    passwordInput.style.borderColor = '';
    passwordChecklist.classList.remove('active');
    resetChecklistItems(passwordChecklist);
    
    if (passwordInput.type === 'text') {
      passwordInput.type = 'password';
      toggleIcon.className = 'fa-solid fa-eye';
    }

    captchaError.style.display = 'none';
    submitBtn.disabled = true;
  };


  // --- Form Submit and Captcha Validation ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredCaptcha = captchaInput.value.trim();
    if (enteredCaptcha !== currentCaptcha) {
      captchaError.style.display = 'block';
      captchaInput.value = '';
      validateForm(); // Disable submit again
      return;
    }

    // Success login mock
    const selectedRole = document.querySelector('input[name="role"]:checked').value;
    alert(`Successfully signed in as ${selectedRole.replace('_', ' ').toUpperCase()}!\n\nUsername: ${usernameInput.value}`);
    closeModal();
  });


  // --- Press Release & Tab Links Notification (for demo) ---
  const pressBtn = document.querySelector('.btn-press');
  if (pressBtn) {
    pressBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Press Release: Opening external link for PIBDoc/BHAVYA Scheme Details.');
    });
  }

  document.querySelectorAll('.tab-link').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const tabName = tab.innerText.trim();
      alert(`Demo Mode: Navigating to ${tabName} document.`);
    });
  });

});
