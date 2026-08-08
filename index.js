document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LOCAL STORAGE STATE SYNCHRONIZATION ---
  const defaultBanners = [
    { id: 1, title: "IEI building", subtitle: "Tripura State Centre Headquarters", image: "assets/iei_building.png", btnText: "View Facilities", btnUrl: "#", active: true, order: 1 },
    { id: 2, title: "The Institution of Engineers (India)", subtitle: "Tripura State Centre - A Century of Service to the Nation", image: "assets/seminar_hero.png", btnText: "Learn More", btnUrl: "#", active: true, order: 2 },
    { id: 3, title: "Technical Innovation & Professional Growth", subtitle: "Serving the Engineering Community", image: "assets/meeting1.png", btnText: "Read More", btnUrl: "#", active: true, order: 3 }
  ];

  const defaultEvents = [
    { id: 1, title: "Workshop on Green Building Technologies", date: "2026-09-05", type: "workshop" },
    { id: 2, title: "National Conference on Engineering Innovations", date: "2026-08-15", type: "seminar" },
    { id: 3, title: "Webinar on Smart Metering and Net Metering", date: "2026-07-17", type: "webinar" },
    { id: 4, title: "IEI Technical Webinar on ChatGPT- Opportunity and Challenges in Current Era", date: "2023-05-12", type: "webinar" },
    { id: 5, title: "Technical Meet in Industrial Sector and Seminar on Clean & Green Energy in Industrial Sector", date: "2023-05-04", type: "seminar" },
    { id: 6, title: "IEI Technical Webinar on \"5G and its applications\" on 29th April, 2023", date: "2023-04-21", type: "webinar" },
    { id: 7, title: "IEI Technical Webinar on \"Challenges and Opportunities of Sustainability in Production\"", date: "2023-03-27", type: "webinar" },
    { id: 8, title: "One Day Seminar on \"Recent Trends in Energy Conversion Technologies and Its Applications\"", date: "2023-03-14", type: "seminar" },
    { id: 9, title: "IEI Technical Webinar on \"Earthquake, A Decade long Mega-Disastrous Event: Lessons Learnt\"", date: "2023-03-09", type: "webinar" },
    { id: 10, title: "IEI Technical Webinar on \"Renewable Energy: Opportunities, Key Challenges and Potential\"", date: "2023-02-17", type: "webinar" }
  ];

  const defaultStatistics = [
    { id: 1, label: "Members", value: 5000, suffix: "+", status: "Active" },
    { id: 2, label: "Events Organized", value: 200, suffix: "+", status: "Active" },
    { id: 3, label: "Years of Excellence", value: 106, suffix: "+", status: "Active" },
    { id: 4, label: "Engineering Divisions", value: 15, suffix: "-", status: "Active" },
    { id: 5, label: "Years of Service", value: 50, suffix: "+", status: "Active" },
    { id: 6, label: "Engineering Disciplines", value: 15, suffix: "-", status: "Active" },
    { id: 7, label: "State Centres", value: 125, suffix: "+", status: "Active" },
    { id: 8, label: "Student Chapters", value: 500, suffix: "+", status: "Active" },
    { id: 9, label: "Overseas Chapters", value: 6, suffix: "-", status: "Active" }
  ];

  const defaultNewsletters = [
    { id: 1, title: "IEI Tripura Newsletter - April 2026", issue: "Vol. 5, Issue 4", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 2, title: "IEI Tripura Newsletter - May 2026", issue: "Vol. 5, Issue 5", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 3, title: "IEI, TSC Newsletter__October, 2022", issue: "IEI, TSC Newsletter__October, 2022", date: "08 Jul 2026", pdf: true, status: "Published" }
  ];

  // Retrieve states
  const activeBanners = (JSON.parse(localStorage.getItem('ieiBanners')) || defaultBanners).filter(b => b.active);
  const eventsList = JSON.parse(localStorage.getItem('ieiEvents')) || defaultEvents;
  const statsList = (JSON.parse(localStorage.getItem('ieiStatistics')) || defaultStatistics).filter(s => s.status === 'Active');
  const newsletterList = (JSON.parse(localStorage.getItem('ieiNewsletters')) || defaultNewsletters).filter(n => n.status === 'Published');


  // --- 2. MULTI-LANGUAGE TOGGLE ---
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang').toUpperCase();
      showToast(`Language switched to ${lang} (Demo Mode)`);
    });
  });

  // --- 3. DYNAMIC HERO SLIDER CAROUSEL ---
  const heroSlider = document.getElementById('heroSlider');
  const sliderHighlightsSidebar = document.querySelector('.slider-highlights-sidebar');
  const sliderIndicators = document.getElementById('sliderIndicators');
  let currentSlide = 0;
  let slideInterval;

  const renderHomeSlider = () => {
    if (!heroSlider) return;
    
    // Clear static templates
    heroSlider.innerHTML = '';
    if (sliderHighlightsSidebar) sliderHighlightsSidebar.innerHTML = '';
    if (sliderIndicators) sliderIndicators.innerHTML = '';

    if (activeBanners.length === 0) {
      heroSlider.innerHTML = `<div class="slide active"><div class="slide-background" style="background-color:#061d3f;"></div><div class="slide-content-container"><h3 class="slide-org-title">The Institution of Engineers</h3></div></div>`;
      return;
    }

    activeBanners.forEach((banner, i) => {
      // 1. Create Slide
      const slide = document.createElement('div');
      slide.className = `slide ${i === 0 ? 'active' : ''}`;
      
      // Separate seminar slide styling if title is specific
      const isSeminar = banner.title.toLowerCase().includes('seminar') || banner.title.toLowerCase().includes('institution of engineers');
      
      slide.innerHTML = `
        <div class="slide-background" style="background-image: url('${banner.image || 'assets/logo.jpg'}');"></div>
        <div class="slide-overlay"></div>
        <div class="slide-content-container">
          <div class="slide-info-left">
            <span class="slide-tag">EST. 1920</span>
            <h3 class="slide-org-title">${isSeminar ? 'The Institution of Engineers (India)' : banner.title}</h3>
            <p class="slide-org-subtitle">${isSeminar ? 'Tripura State Centre - A Century of Service to the Nation' : banner.subtitle}</p>
            
            <div class="slide-seminar-box">
              <div class="seminar-divider"></div>
              <h4 class="seminar-title">${isSeminar ? banner.title : banner.subtitle}</h4>
              <p class="seminar-author">Organised By The Institution of Engineers (India), Tripura State Centre</p>
              <div class="seminar-meta">
                <span class="meta-item"><i class="fa-solid fa-calendar-days"></i> 20th August, 2025</span>
                <span class="meta-item"><i class="fa-solid fa-location-dot"></i> VENUE: Seminar Hall, Agartala</span>
              </div>
            </div>
            
            <button class="btn btn-gold learn-more-btn" onclick="window.location.href='${banner.btnUrl}'">
              <span>${banner.btnText || 'Learn More'}</span> <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      `;
      heroSlider.appendChild(slide);

      // 2. Create Highlights Sidebar item
      if (sliderHighlightsSidebar) {
        const widget = document.createElement('div');
        widget.className = `highlight-widget ${i === 0 ? 'active' : ''}`;
        widget.setAttribute('data-slide', i);
        widget.innerHTML = `
          <span class="widget-tag">${i === 0 ? 'UP NEXT' : 'PREVIOUS'}</span>
          <h4 class="widget-title">${banner.title}</h4>
        `;
        widget.addEventListener('click', () => {
          showSlide(i);
          resetAutoplay();
        });
        sliderHighlightsSidebar.appendChild(widget);
      }

      // 3. Create Indicators Dot
      if (sliderIndicators) {
        const dot = document.createElement('span');
        dot.className = `indicator-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', i);
        dot.addEventListener('click', () => {
          showSlide(i);
          resetAutoplay();
        });
        sliderIndicators.appendChild(dot);
      }
    });
  };

  const showSlide = (index) => {
    const slides = document.querySelectorAll('.slide');
    const widgets = document.querySelectorAll('.highlight-widget');
    const dots = document.querySelectorAll('.indicator-dot');

    if (slides.length === 0) return;
    
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
    widgets.forEach((widget, i) => widget.classList.toggle('active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  // Bind Slider arrows
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

  const startAutoplay = () => {
    slideInterval = setInterval(nextSlide, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(slideInterval);
    startAutoplay();
  };

  const sliderSection = document.querySelector('.hero-slider-section');
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderSection.addEventListener('mouseleave', startAutoplay);
  }

  // Render and start carousel autoplay
  renderHomeSlider();
  startAutoplay();


  // --- 4. DYNAMIC ABOUT US STATS CARD ---
  const homeStatsGrid = document.querySelector('.stats-grid');
  const renderHomeStats = () => {
    if (!homeStatsGrid) return;
    homeStatsGrid.innerHTML = '';
    
    // Icon map for stats
    const iconMap = {
      "members": "fa-users",
      "centres": "fa-globe",
      "established": "fa-calendar-check",
      "disciplines": "fa-book"
    };

    // Grab top 4 stats
    const displayStats = statsList.slice(0, 4);
    
    displayStats.forEach(stat => {
      let iconClass = "fa-chart-pie";
      const key = stat.label.toLowerCase();
      if (key.includes('member')) iconClass = iconMap.members;
      else if (key.includes('centre')) iconClass = iconMap.centres;
      else if (key.includes('established') || key.includes('excellence')) iconClass = iconMap.established;
      else if (key.includes('discipline') || key.includes('division')) iconClass = iconMap.disciplines;

      const item = document.createElement('div');
      item.className = 'stat-item';
      item.innerHTML = `
        <div class="stat-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="stat-number">${stat.value}${stat.suffix !== '-' ? stat.suffix : ''}</div>
        <div class="stat-label">${stat.label.toUpperCase()}</div>
      `;
      homeStatsGrid.appendChild(item);
    });
  };
  
  renderHomeStats();

  // Bind Stats actions
  const statsTabBtns = document.querySelectorAll('.stats-action-btn');
  statsTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      showToast(`Viewing lists for all IEI Tripura ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    });
  });


  // --- 5. DYNAMIC EVENTS CALENDAR ---
  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  let currentCalDate = new Date(2026, 7, 1); // August 2026
  const currentMonthLabel = document.getElementById('currentMonth');
  const currentYearLabel = document.getElementById('currentYear');
  const calendarDaysContainer = document.getElementById('calendarDays');
  const eventsListContainer = document.getElementById('eventsList');

  // Convert raw list to grouping map: { "YYYY-MM": [ { day: X, title: "...", time: "...", venue: "..." } ] }
  const parseEventsDatabase = () => {
    const map = {};
    eventsList.forEach(e => {
      const parts = e.date.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1]; // Keep pad
        const day = parseInt(parts[2]);
        const key = `${year}-${month}`;
        
        if (!map[key]) map[key] = [];
        map[key].push({
          day,
          title: e.title,
          time: e.type === 'seminar' ? '10:00 AM' : (e.type === 'webinar' ? '03:00 PM' : '11:00 AM'),
          venue: e.type === 'webinar' ? 'Online Webinar' : 'Seminar Hall, Agartala'
        });
      }
    });
    return map;
  };

  const formattedEventsData = parseEventsDatabase();

  const generateCalendar = (date) => {
    if (!calendarDaysContainer) return;
    
    const year = date.getFullYear();
    const month = date.getMonth();

    if (currentMonthLabel) currentMonthLabel.innerText = monthNames[month];
    if (currentYearLabel) currentYearLabel.innerText = year;

    calendarDaysContainer.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthlyEvents = formattedEventsData[monthKey] || [];

    // Render padding days
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

      const dayHasEvent = monthlyEvents.some(event => event.day === i);
      if (dayHasEvent) {
        dayCell.classList.add('has-event');
      }

      dayCell.addEventListener('click', () => {
        document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
        dayCell.classList.add('selected');
        renderEventsForDay(year, month, i);
      });

      // Default select the first event day if active
      if (year === 2026 && month === 7 && i === 15) {
        dayCell.classList.add('selected');
      }

      calendarDaysContainer.appendChild(dayCell);
    }

    renderEventsForMonth(year, month);
  };

  const renderEventsForMonth = (year, month) => {
    if (!eventsListContainer) return;
    
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthlyEvents = formattedEventsData[monthKey] || [];

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
    const monthlyEvents = formattedEventsData[monthKey] || [];
    const dayEvents = monthlyEvents.filter(e => e.day === day);

    if (dayEvents.length === 0) {
      eventsListContainer.innerHTML = `
        <div class="no-events">No events on ${day} ${monthNames[month]} ${year}.</div>
        <button class="btn btn-primary" id="viewAllMonthEvents" style="margin-top: 1rem; font-size: 0.8rem; padding: 0.4rem 0.8rem; border-radius:4px;">
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

  // Bind Calendar arrows
  const prevMonthBtn = document.getElementById('prevMonth');
  const nextMonthBtn = document.getElementById('nextMonth');
  const prevYearBtn = document.getElementById('prevYear');
  const nextYearBtn = document.getElementById('nextYear');

  if (prevMonthBtn) prevMonthBtn.addEventListener('click', () => { currentCalDate.setMonth(currentCalDate.getMonth() - 1); generateCalendar(currentCalDate); });
  if (nextMonthBtn) nextMonthBtn.addEventListener('click', () => { currentCalDate.setMonth(currentCalDate.getMonth() + 1); generateCalendar(currentCalDate); });
  if (prevYearBtn) prevYearBtn.addEventListener('click', () => { currentCalDate.setFullYear(currentCalDate.getFullYear() - 1); generateCalendar(currentCalDate); });
  if (nextYearBtn) nextYearBtn.addEventListener('click', () => { currentCalDate.setFullYear(currentCalDate.getFullYear() + 1); generateCalendar(currentCalDate); });

  generateCalendar(currentCalDate);


  // --- 6. DYNAMIC NEWSLETTER BAR ---
  const renderHomeNewsletter = () => {
    const bar = document.querySelector('.newsletter-bar-gradient');
    if (!bar) return;

    if (newsletterList.length === 0) {
      bar.style.display = 'none';
      return;
    }

    // Grab latest newsletter (first in array)
    const latest = newsletterList[0];
    
    // Update contents
    const volumeTag = bar.querySelector('.newsletter-volume-tag');
    const heading = bar.querySelector('.newsletter-title-heading');
    const desc = bar.querySelector('.newsletter-description-text');

    if (volumeTag) volumeTag.innerText = latest.issue;
    if (heading) heading.innerText = latest.title;
    if (desc) desc.innerText = `Published on ${latest.date}. Available for download in secure PDF format.`;

    const dlBtn = document.getElementById('downloadNewsletterBtn');
    if (dlBtn) {
      dlBtn.replaceWith(dlBtn.cloneNode(true)); // remove old listeners
      document.getElementById('downloadNewsletterBtn').addEventListener('click', (e) => {
        e.preventDefault();
        showToast(`Downloading Newsletter: ${latest.title.replace(/\s+/g, '_')}.pdf`);
      });
    }
  };

  renderHomeNewsletter();


  // --- 7. SECURE SIGN IN MODAL & REDIRECTS ---
  const loginModal = document.getElementById('loginModal');
  const openLoginBtn = document.getElementById('openLoginBtn');
  const closeLoginBtn = document.getElementById('closeLoginBtn');

  const openModal = () => {
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    generateCaptcha();
    resetForm();
  };

  const closeModal = () => {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (openLoginBtn) openLoginBtn.addEventListener('click', openModal);
  if (closeLoginBtn) closeLoginBtn.addEventListener('click', closeModal);

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal && loginModal.classList.contains('active')) {
      closeModal();
    }
  });

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

  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const submitBtn = document.getElementById('submitBtn');

  const userWrapper = usernameInput ? usernameInput.closest('.input-wrapper') : null;
  const userSuccessIcon = userWrapper ? userWrapper.querySelector('.status-icon.success') : null;
  const userErrorIcon = userWrapper ? userWrapper.querySelector('.status-icon.error') : null;

  const passWrapper = passwordInput ? passwordInput.closest('.input-wrapper') : null;
  const passSuccessIcon = passWrapper ? passWrapper.querySelector('.status-icon.success') : null;
  const passErrorIcon = passWrapper ? passWrapper.querySelector('.status-icon.error') : null;

  const usernameChecklist = document.getElementById('usernameChecklist');
  const passwordChecklist = document.getElementById('passwordChecklist');

  let isUsernameValid = false;
  let isPasswordValid = false;

  if (usernameInput) {
    usernameInput.addEventListener('focus', () => usernameChecklist.classList.add('active'));
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
    passwordInput.addEventListener('focus', () => passwordChecklist.classList.add('active'));
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

  document.querySelectorAll('input[name="role"]').forEach(radio => {
    radio.addEventListener('change', () => validateForm());
  });

  const validateUsername = () => {
    if (!usernameInput) return;
    const val = usernameInput.value;
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
    isUsernameValid = Object.values(rules).every(r => r === true);
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
    isPasswordValid = Object.values(rules).every(r => r === true);
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
      if (item) item.className = `check-item ${isMet ? 'valid' : 'invalid'}`;
    }
  };

  const resetChecklistItems = (checklistElement) => {
    if (!checklistElement) return;
    checklistElement.querySelectorAll('.check-item').forEach(item => item.className = 'check-item');
  };

  const validateForm = () => {
    if (!submitBtn) return;
    const selectedRole = document.querySelector('input[name="role"]:checked');
    const hasRole = selectedRole !== null;
    const hasCaptchaInput = captchaInput ? captchaInput.value.trim().length > 0 : false;
    submitBtn.disabled = !(hasRole && isUsernameValid && isPasswordValid && hasCaptchaInput);
  };

  const resetForm = () => {
    if (!loginForm) return;
    loginForm.reset();
    isUsernameValid = false;
    isPasswordValid = false;
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
    submitBtn.disabled = true;
  };

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredCaptcha = captchaInput.value.trim();
      if (enteredCaptcha !== currentCaptcha) {
        captchaError.style.display = 'block';
        captchaInput.value = '';
        validateForm();
        return;
      }
      
      const selectedRole = document.querySelector('input[name="role"]:checked').value;
      
      if (selectedRole === 'admin') {
        closeModal();
        showToast("Access Granted: Redirecting to Admin Dashboard...");
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 1200);
      } else {
        const roleDisplayName = selectedRole.replace('_', ' ').toUpperCase();
        alert(`Successfully signed in to IEI Portal as ${roleDisplayName}!\n\nUser/Member ID: ${usernameInput.value}`);
        closeModal();
      }
    });
  }


  // --- 8. GENERAL HEADER ACTIONS & TOASTS ---
  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const q = prompt("Search IEI Tripura Portal:");
      if (q) showToast(`Searching database for: "${q}"`);
    });
  }

  const showToast = (message) => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.position = 'fixed';
      container.style.bottom = '2rem';
      container.style.right = '2rem';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '0.5rem';
      document.body.appendChild(container);
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
    container.appendChild(toast);
    toast.offsetHeight;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

});
