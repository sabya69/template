document.addEventListener('DOMContentLoaded', () => {

  // --- Multi-Language Toggle Simulation ---
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang').toUpperCase();
      showToast(`Language switched to ${lang} (Demo Mode)`);
    });
  });

  // --- Dropdown Menu Accessibility/Interactivity ---
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dd => {
    const link = dd.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        dd.classList.toggle('active-mobile');
      }
    });
  });

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

  if (openLoginBtn) openLoginBtn.addEventListener('click', openModal);
  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeModal);

  // Close modal when clicking on the overlay background
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
  const toggleIcon = togglePasswordBtn ? togglePasswordBtn.querySelector('i') : null;

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.className = 'fa-solid fa-eye-slash';
      } else {
        passwordInput.type = 'password';
        toggleIcon.className = 'fa-solid fa-eye';
      }
    });
  }

  // --- Alphanumeric Captcha Generation & Verification ---
  const captchaBox = document.getElementById('captchaBox');
  const refreshCaptchaBtn = document.getElementById('refreshCaptchaBtn');
  const captchaInput = document.getElementById('captchaInput');
  const captchaError = document.getElementById('captchaError');
  let currentCaptcha = '';

  const generateCaptcha = () => {
    if (!captchaBox) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    captchaBox.innerText = captcha;
    if (captchaInput) captchaInput.value = '';
    if (captchaError) captchaError.style.display = 'none';
    validateForm();
  };

  if (refreshCaptchaBtn) refreshCaptchaBtn.addEventListener('click', generateCaptcha);

  // --- Hero Slider Logic ---
  const slides = document.querySelectorAll('.slide');
  const widgets = document.querySelectorAll('.highlight-widget');
  const dots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const sliderSection = document.querySelector('.hero-slider-section');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (index) => {
    if (slides.length === 0) return;
    
    // Normalize index
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Update active slide class
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    // Update highlights sidebar widgets
    widgets.forEach((widget, i) => {
      widget.classList.toggle('active', i === currentSlide);
    });

    // Update indicators dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  };

  const nextSlide = () => {
    showSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    showSlide(currentSlide - 1);
  };

  // Slider buttons listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

  // Sidebar highlights widgets click
  widgets.forEach(widget => {
    widget.addEventListener('click', () => {
      const targetIndex = parseInt(widget.getAttribute('data-slide'));
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Dots click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide'));
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Autoplay function
  const startAutoplay = () => {
    slideInterval = setInterval(nextSlide, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(slideInterval);
    startAutoplay();
  };

  // Pause on hover
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderSection.addEventListener('mouseleave', startAutoplay);
  }

  // Start slideshow autoplay
  startAutoplay();


  // --- Events Calendar Database & Render Logic ---
  const eventsData = {
    "2026-07": [
      { day: 10, title: "Special General Body Meeting", time: "02:00 PM", venue: "Seminar Hall, Agartala" },
      { day: 22, title: "Workshop on AutoCAD in Civil Engineering", time: "11:00 AM", venue: "Computer Lab" }
    ],
    "2026-08": [
      { day: 8, title: "IEI Foundation Day Celebrations", time: "10:30 AM", venue: "Main Auditorium, Agartala" },
      { day: 15, title: "Independence Day Flag Hoisting & Special Speech", time: "08:00 AM", venue: "IEI Premises" },
      { day: 20, title: "Seminar: How to develop the existing Small Industrial scenario in Tripura", time: "10:00 AM", venue: "Seminar Hall, Agartala" },
      { day: 28, title: "Technical Lecture on Smart Grid & Microgrid Systems", time: "03:00 PM", venue: "Seminar Hall" }
    ],
    "2026-09": [
      { day: 15, title: "59th Engineers' Day National Seminar & Awards", time: "09:30 AM", venue: "Conference Hall, Agartala" },
      { day: 25, title: "All Tripura Quiz Competition for Students", time: "02:00 PM", venue: "Main Exhibition Hall" }
    ]
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  let currentCalDate = new Date(2026, 7, 1); // August 2026 (0-indexed 7)
  const currentMonthLabel = document.getElementById('currentMonth');
  const currentYearLabel = document.getElementById('currentYear');
  const calendarDaysContainer = document.getElementById('calendarDays');
  const eventsListContainer = document.getElementById('eventsList');

  const generateCalendar = (date) => {
    if (!calendarDaysContainer) return;
    
    const year = date.getFullYear();
    const month = date.getMonth();

    if (currentMonthLabel) currentMonthLabel.innerText = monthNames[month];
    if (currentYearLabel) currentYearLabel.innerText = year;

    calendarDaysContainer.innerHTML = '';

    // First day of current month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Last day of current month
    const lastDay = new Date(year, month + 1, 0).getDate();
    // Last day of prev month
    const prevLastDay = new Date(year, month, 0).getDate();

    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthlyEvents = eventsData[monthKey] || [];

    // Render padding days from previous month
    for (let x = firstDayIndex; x > 0; x--) {
      const dayCell = document.createElement('div');
      dayCell.className = 'cal-day-cell other-month';
      dayCell.innerText = prevLastDay - x + 1;
      calendarDaysContainer.appendChild(dayCell);
    }

    // Render active month days
    for (let i = 1; i <= lastDay; i++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'cal-day-cell';
      dayCell.innerText = i;

      // Check if this day has events
      const dayHasEvent = monthlyEvents.some(event => event.day === i);
      if (dayHasEvent) {
        dayCell.classList.add('has-event');
      }

      // Add click handler
      dayCell.addEventListener('click', () => {
        document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
        dayCell.classList.add('selected');
        renderEventsForDay(year, month, i);
      });

      // Default select 20th if August 2026 to show slider event
      if (year === 2026 && month === 7 && i === 20) {
        dayCell.classList.add('selected');
      }

      calendarDaysContainer.appendChild(dayCell);
    }

    // Initial render of events for the current active month
    renderEventsForMonth(year, month);
  };

  const renderEventsForMonth = (year, month) => {
    if (!eventsListContainer) return;
    
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthlyEvents = eventsData[monthKey] || [];

    if (monthlyEvents.length === 0) {
      eventsListContainer.innerHTML = `<div class="no-events">No events scheduled for ${monthNames[month]} ${year}.</div>`;
      return;
    }

    eventsListContainer.innerHTML = '';
    monthlyEvents.forEach(event => {
      const card = createEventCard(event, month, year);
      eventsListContainer.appendChild(card);
    });
  };

  const renderEventsForDay = (year, month, day) => {
    if (!eventsListContainer) return;

    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthlyEvents = eventsData[monthKey] || [];
    const dayEvents = monthlyEvents.filter(e => e.day === day);

    if (dayEvents.length === 0) {
      eventsListContainer.innerHTML = `
        <div class="no-events">No events on ${day} ${monthNames[month]} ${year}.</div>
        <button class="btn btn-primary" id="viewAllMonthEvents" style="margin-top: 1rem; font-size: 0.8rem; padding: 0.4rem 0.8rem;">
          View All ${monthNames[month]} Events
        </button>
      `;
      document.getElementById('viewAllMonthEvents').addEventListener('click', () => {
        document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
        renderEventsForMonth(year, month);
      });
      return;
    }

    eventsListContainer.innerHTML = '';
    dayEvents.forEach(event => {
      const card = createEventCard(event, month, year);
      eventsListContainer.appendChild(card);
    });
  };

  const createEventCard = (event, month, year) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <span class="event-card-date">${event.day} ${monthNames[month].slice(0, 3)} ${year}</span>
      <h5 class="event-card-title">${event.title}</h5>
      <div class="event-card-meta">
        <span><i class="fa-solid fa-clock"></i> ${event.time}</span>
        <span><i class="fa-solid fa-location-dot"></i> ${event.venue}</span>
      </div>
    `;
    return card;
  };

  // Calendar Controls Action Listeners
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const prevYearBtn = document.getElementById('prevYear');
  const nextYearBtn = document.getElementById('nextYear');

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() - 1);
      generateCalendar(currentCalDate);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      currentCalDate.setMonth(currentCalDate.getMonth() + 1);
      generateCalendar(currentCalDate);
    });
  }

  if (prevYearBtn) {
    prevYearBtn.addEventListener('click', () => {
      currentCalDate.setFullYear(currentCalDate.getFullYear() - 1);
      generateCalendar(currentCalDate);
    });
  }

  if (nextYearBtn) {
    nextYearBtn.addEventListener('click', () => {
      currentCalDate.setFullYear(currentCalDate.getFullYear() + 1);
      generateCalendar(currentCalDate);
    });
  }

  // Populate calendar on load
  generateCalendar(currentCalDate);


  // --- Form Validation Checklists & State Control ---
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const submitBtn = document.getElementById('submitBtn');

  // Input wrapper status icons
  const userWrapper = usernameInput ? usernameInput.closest('.input-wrapper') : null;
  const userSuccessIcon = userWrapper ? userWrapper.querySelector('.status-icon.success') : null;
  const userErrorIcon = userWrapper ? userWrapper.querySelector('.status-icon.error') : null;

  const passWrapper = passwordInput ? passwordInput.closest('.input-wrapper') : null;
  const passSuccessIcon = passWrapper ? passWrapper.querySelector('.status-icon.success') : null;
  const passErrorIcon = passWrapper ? passWrapper.querySelector('.status-icon.error') : null;

  // Checklists
  const usernameChecklist = document.getElementById('usernameChecklist');
  const passwordChecklist = document.getElementById('passwordChecklist');

  // Validation States
  let isUsernameValid = false;
  let isPasswordValid = false;

  if (usernameInput) {
    // Show checklists on focus
    usernameInput.addEventListener('focus', () => {
      usernameChecklist.classList.add('active');
    });

    // Hide checklist on blur only if the field is valid or empty
    usernameInput.addEventListener('blur', () => {
      if (usernameInput.value.length === 0 || isUsernameValid) {
        usernameChecklist.classList.remove('active');
      }
    });

    usernameInput.addEventListener('input', () => {
      validateUsername();
      validateForm();
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('focus', () => {
      passwordChecklist.classList.add('active');
    });

    passwordInput.addEventListener('blur', () => {
      if (passwordInput.value.length === 0 || isPasswordValid) {
        passwordChecklist.classList.remove('active');
      }
    });

    passwordInput.addEventListener('input', () => {
      validatePassword();
      validateForm();
    });
  }

  if (captchaInput) {
    captchaInput.addEventListener('input', () => {
      captchaError.style.display = 'none';
      validateForm();
    });
  }

  // Radio button role changes
  document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', () => {
      validateForm();
    });
  });

  // --- Validation Helper Functions ---
  const validateUsername = () => {
    if (!usernameInput) return;
    const val = usernameInput.value;
    
    // If empty, clean state
    if (val.length === 0) {
      isUsernameValid = false;
      if (userSuccessIcon) userSuccessIcon.style.display = 'none';
      if (userErrorIcon) userErrorIcon.style.display = 'none';
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
      if (userSuccessIcon) userSuccessIcon.style.display = 'block';
      if (userErrorIcon) userErrorIcon.style.display = 'none';
      usernameInput.style.borderColor = 'var(--success)';
    } else {
      if (userSuccessIcon) userSuccessIcon.style.display = 'none';
      if (userErrorIcon) userErrorIcon.style.display = 'block';
      usernameInput.style.borderColor = 'var(--error)';
    }
  };

  const validatePassword = () => {
    if (!passwordInput) return;
    const val = passwordInput.value;

    // If empty, clean state
    if (val.length === 0) {
      isPasswordValid = false;
      if (passSuccessIcon) passSuccessIcon.style.display = 'none';
      if (passErrorIcon) passErrorIcon.style.display = 'none';
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
      if (passSuccessIcon) passSuccessIcon.style.display = 'block';
      if (passErrorIcon) passErrorIcon.style.display = 'none';
      passwordInput.style.borderColor = 'var(--success)';
    } else {
      if (passSuccessIcon) passSuccessIcon.style.display = 'none';
      if (passErrorIcon) passErrorIcon.style.display = 'block';
      passwordInput.style.borderColor = 'var(--error)';
    }
  };

  const updateChecklistUI = (checklistElement, rules) => {
    if (!checklistElement) return;
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
    if (!checklistElement) return;
    checklistElement.querySelectorAll('.check-item').forEach(item => {
      item.className = 'check-item';
    });
  };

  // Enable button only if Role selected, Username valid, Password valid, and Captcha input entered
  const validateForm = () => {
    if (!submitBtn) return;
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const hasRole = selectedRole !== null;
    const hasCaptchaInput = captchaInput ? captchaInput.value.trim().length > 0 : false;

    const isValid = hasRole && isUsernameValid && isPasswordValid && hasCaptchaInput;
    submitBtn.disabled = !isValid;
  };

  // Reset form status on modal open
  const resetForm = () => {
    if (!loginForm) return;
    loginForm.reset();
    isUsernameValid = false;
    isPasswordValid = false;
    
    // Clear icons & border styles
    if (userSuccessIcon) userSuccessIcon.style.display = 'none';
    if (userErrorIcon) userErrorIcon.style.display = 'none';
    if (usernameInput) {
      usernameInput.style.borderColor = '';
      usernameChecklist.classList.remove('active');
    }
    resetChecklistItems(usernameChecklist);

    if (passSuccessIcon) passSuccessIcon.style.display = 'none';
    if (passErrorIcon) passErrorIcon.style.display = 'none';
    if (passwordInput) {
      passwordInput.style.borderColor = '';
      passwordChecklist.classList.remove('active');
      if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        if (toggleIcon) toggleIcon.className = 'fa-solid fa-eye';
      }
    }
    resetChecklistItems(passwordChecklist);
    
    if (captchaError) captchaError.style.display = 'none';
    if (submitBtn) submitBtn.disabled = true;
  };

  // Form Submit and Captcha Validation
  if (loginForm) {
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
      const roleDisplayName = selectedRole.replace('_', ' ').toUpperCase();
      alert(`Successfully signed in to IEI Portal as ${roleDisplayName}!\n\nUser/Member ID: ${usernameInput.value}`);
      closeModal();
    });
  }


  // --- Stats tab button click actions ---
  const statsTabBtns = document.querySelectorAll('.stats-action-btn');
  statsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      showToast(`Viewing lists for all IEI Tripura ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    });
  });

  // --- Newsletter Download Action ---
  const downloadBtn = document.getElementById('downloadNewsletterBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("Downloading Newsletter: IEI_Tripura_Newsletter_April_2026.pdf (1.2 MB)");
    });
  }

  // --- Header Search Action ---
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const searchQuery = prompt("Search IEI Tripura Portal:");
      if (searchQuery) {
        showToast(`Searching database for: "${searchQuery}"`);
      }
    });
  }


  // --- Toast/Notification Alert helper ---
  const showToast = (message) => {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '2rem';
      toastContainer.style.right = '2rem';
      toastContainer.style.zIndex = '9999';
      toastContainer.style.display = 'flex';
      toastContainer.style.flexDirection = 'column';
      toastContainer.style.gap = '0.5rem';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.style.backgroundColor = 'var(--primary)';
    toast.style.color = 'var(--white)';
    toast.style.padding = '0.75rem 1.5rem';
    toast.style.borderRadius = 'var(--radius-md)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.borderLeft = '4px solid var(--accent)';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.fontSize = '0.85rem';
    toast.style.fontWeight = '600';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';

    toast.innerText = message;
    toastContainer.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    // Show toast
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    // Remove toast after 3.5 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  };

});
