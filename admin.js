// IEI Tripura State Centre - Admin Panel Logic

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. STATE INITIALIZATION ---
  const defaultBanners = [
    { id: 1, title: "IEI building", subtitle: "Tripura State Centre Headquarters", image: "assets/iei_building.png", btnText: "View Facilities", btnUrl: "#", active: true, order: 1, date: "August - September 2026", time: "", place: "IEI Building, Agartala" },
    { id: 2, title: "The Institution of Engineers (India)", subtitle: "Tripura State Centre - A Century of Service to the Nation", image: "assets/seminar_hero.png", btnText: "Learn More", btnUrl: "#", active: true, order: 2, date: "20th August, 2025", time: "", place: "Seminar Hall, Agartala" },
    { id: 3, title: "Technical Innovation & Professional Growth", subtitle: "Serving the Engineering Community", image: "assets/meeting1.png", btnText: "Read More", btnUrl: "#", active: true, order: 3, date: "Upcoming Session", time: "", place: "Conference Room, Agartala" }
  ];

  const defaultNews = [
    { id: 1, title: "Workshop on Green Building Technologies", category: "workshop", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 2, title: "National Conference on Engineering Innovations", category: "seminar", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 3, title: "Webinar on Smart Metering and Net Metering", category: "webinar", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 4, title: "IEI Tripura Organizes Technical Talk on Sustainable Infrastructure", category: "news", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 5, title: "World Environment Day Celebration at IEI Tripura", category: "news", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 6, title: "Seminar on \"Robotics and Automation: Shaping the Future of Engineering\"", category: "news", date: "08 Jul 2026", pdf: false, status: "Published" },
    { id: 7, title: "6th M.L. Dasgupta Memorial Lecture on 18.08.2023", category: "news", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 8, title: "77th Independence Day", category: "event", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 9, title: "IEI News", category: "news", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 10, title: "National Thermal Engineer Day on 24.07.2023", category: "news", date: "08 Jul 2026", pdf: true, status: "Published" }
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

  const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCc+PGNpcmNsZSBjeD0nMTInIGN5PScxMicgcj0nMTInIGZpbGw9JyNlNWU3ZWInLz48Y2lyY2xlIGN4PScxMicgY3k9JzkuNScgcj0nMy41JyBmaWxsPScjOWNhM2FmJy8+PHBhdGggZD0nTTEyIDE0LjVjLTMuNSAwLTUuMiAyLTUuNSAzLjVoMTFjLS4zLTEuNS0yLTMuNS01LTMuNXonIGZpbGw9JyM5Y2EzYWYnLz48L3N2Zz4=';

  const defaultMembers = [
    { id: 1, name: "Er. Paramananda Sarkar Banerjee", designation: "Chairman", department: "Electrical Engineering", status: "Active", image: "assets/1.jpg", email: "p.s.banerjee@iei-tripura.org" },
    { id: 2, name: "Er. B.K. Roy", designation: "Chairman", department: "IEI Tripura State Centre", status: "Active", image: defaultAvatar, email: "bkroy@iei-tripura.org" },
    { id: 3, name: "Er. Partha Pratim Datta", designation: "Vice Chairman", department: "Electrical Engineering", status: "Active", image: defaultAvatar, email: "ppdatta@iei-tripura.org" },
    { id: 4, name: "Er. S. Debbarma", designation: "Vice Chairman", department: "IEI Tripura State Centre", status: "Active", image: defaultAvatar, email: "sdebbarma@iei-tripura.org" },
    { id: 5, name: "Er. Ananta Ram Debbarma", designation: "Honorary Secretary", department: "Mechanical Engineering", status: "Active", image: defaultAvatar, email: "ardebbarma@iei-tripura.org" },
    { id: 6, name: "Er. A.K. Gupta", designation: "Honorary Secretary", department: "IEI Tripura State Centre", status: "Active", image: defaultAvatar, email: "akgupta@iei-tripura.org" },
    { id: 7, name: "Er. Pradip Kumar Dey", designation: "Honorary Treasurer", department: "Computer Science", status: "Active", image: defaultAvatar, email: "pkdey@iei-tripura.org" },
    { id: 8, name: "Er. P. Saha", designation: "Honorary Treasurer", department: "IEI Tripura State Centre", status: "Active", image: defaultAvatar, email: "psaha@iei-tripura.org" },
    { id: 9, name: "Er. Bishwajit Debbarma", designation: "Executive Member", department: "Civil Engineering", status: "Active", image: defaultAvatar, email: "bdebbarma@iei-tripura.org" },
    { id: 10, name: "Er. R. Chakraborty", designation: "Executive Committee Member", department: "Civil Engineering Division", status: "Active", image: defaultAvatar, email: "rchakraborty@iei-tripura.org" },
    { id: 11, name: "Er. Somenath Bhowmik", designation: "Executive Member", department: "Electrical Engineering", status: "Active", image: defaultAvatar, email: "sbhowmik@iei-tripura.org" },
    { id: 12, name: "Er. M. Das", designation: "Executive Committee Member", department: "Electrical Engineering Division", status: "Active", image: defaultAvatar, email: "mdas@iei-tripura.org" },
    { id: 13, name: "Er. Ratan Kumar Das", designation: "Executive Member", department: "Mechanical Engineering", status: "Active", image: defaultAvatar, email: "rkdas@iei-tripura.org" },
    { id: 14, name: "Er. Subrata Bhowmik", designation: "Executive Member", department: "Production Engineering", status: "Active", image: defaultAvatar, email: "subrata.b@iei-tripura.org" },
    { id: 15, name: "Er. Arun Kumar Nath", designation: "Executive Member", department: "Chemical Engineering", status: "Active", image: defaultAvatar, email: "aknath@iei-tripura.org" }
  ];

  const defaultNewsletters = [
    { id: 1, title: "IEI Tripura Newsletter - April 2026", issue: "Vol. 5, Issue 4", date: "08 Jul 2026", pdf: true, status: "Published", fileUrl: "assets/IEI-TSC-Newsletter__April-2021.pdf" },
    { id: 2, title: "IEI Tripura Newsletter - May 2026", issue: "Vol. 5, Issue 5", date: "08 Jul 2026", pdf: true, status: "Published", fileUrl: "assets/IEI-TSC-Newsletter__April-2021.pdf" },
    { id: 3, title: "IEI, TSC Newsletter__October, 2022", issue: "IEI, TSC Newsletter__October, 2022", date: "08 Jul 2026", pdf: true, status: "Published", fileUrl: "assets/IEI-TSC-Newsletter__April-2021.pdf" },
    { id: 4, title: "IEI, TSC Newsletter__October, 2021", issue: "IEI, TSC Newsletter__October, 2021", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 5, title: "\\nlEI, TSC Newsletter__October, 2020", issue: "\\nlEI, TSC Newsletter__October, 2020.pdf", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 6, title: "IEI, TSC Newsletter__July, 2022", issue: "IEI, TSC Newsletter__July, 2022", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 7, title: "IEI, TSC Newsletter__July, 2021", issue: "IEI, TSC Newsletter__July, 2021", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 8, title: "IEI, TSC Newsletter__July, 2020", issue: "IEI, TSC Newsletter__July, 2020", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 9, title: "IEI TSC Newsletter__January, 2023", issue: "IEI TSC Newsletter__January, 2023", date: "08 Jul 2026", pdf: true, status: "Published" },
    { id: 10, title: "IEI TSC Newsletter__January, 2022", issue: "IEI TSC Newsletter__January, 2022", date: "08 Jul 2026", pdf: true, status: "Published" }
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

  // Gallery images list (10 default starter images)
  const defaultGallery = [
    { id: 1, title: "Inaugural Ceremony", category: "Inaugurations", image: "assets/meeting1.png" },
    { id: 2, title: "State Seminar Session", category: "Seminars", image: "assets/meeting2.png" },
    { id: 3, title: "Committee Briefing Meeting", category: "Events", image: "assets/meeting3.png" },
    { id: 4, title: "World Engineering Day Event", category: "World Engineering Day", image: "assets/meeting4.png" },
    { id: 5, title: "IEI Bhawan Front view", category: "IEI Bhawan", image: "assets/iei_building.png" },
    { id: 6, title: "Technical Lecture Series", category: "Technical Talks", image: "assets/meeting1.png" },
    { id: 7, title: "Yoga Day Celebration", category: "International Yoga Day", image: "assets/meeting2.png" },
    { id: 8, title: "World Environment Day Tree Planting", category: "World Environment Day", image: "assets/meeting3.png" },
    { id: 9, title: "58th Engineers Day Celebration", category: "Celebrations", image: "assets/meeting4.png" },
    { id: 10, title: "Memorial Lecture event", category: "Memorial Lectures", image: "assets/meeting1.png" }
  ];

  const defaultNotices = [
    { id: 1, title: "Important Notice regarding Membership Fees Revision", date: "01 Jul 2026", status: "Active", fileUrl: "" }
  ];

  // Load from local storage or set defaults
  const newslettersFromStorage = JSON.parse(localStorage.getItem('ieiNewsletters'));
  if (newslettersFromStorage && newslettersFromStorage.length > 0 && !newslettersFromStorage[0].fileUrl) {
    localStorage.removeItem('ieiNewsletters'); // reset stale cache
  }

  const bannersFromStorage = JSON.parse(localStorage.getItem('ieiBanners'));
  if (bannersFromStorage && bannersFromStorage.length > 0 && bannersFromStorage[0].date === undefined) {
    localStorage.removeItem('ieiBanners'); // reset stale cache
  }

  let state = {
    banners: JSON.parse(localStorage.getItem('ieiBanners')) || defaultBanners,
    news: JSON.parse(localStorage.getItem('ieiNews')) || defaultNews,
    events: JSON.parse(localStorage.getItem('ieiEvents')) || defaultEvents,
    members: (JSON.parse(localStorage.getItem('ieiMembers')) || defaultMembers).map(m => {
      let img = m.image || defaultAvatar;
      if (m.id === 1 && (!m.image || m.image.startsWith('data:'))) {
        img = 'assets/1.jpg';
      }
      return {
        ...m,
        image: img,
        email: m.email || (m.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@iei-tripura.org')
      };
    }),
    newsletters: JSON.parse(localStorage.getItem('ieiNewsletters')) || defaultNewsletters,
    statistics: JSON.parse(localStorage.getItem('ieiStatistics')) || defaultStatistics,
    gallery: JSON.parse(localStorage.getItem('ieiGallery')) || defaultGallery,
    notices: JSON.parse(localStorage.getItem('ieiNotices')) || defaultNotices
  };

  const saveState = () => {
    localStorage.setItem('ieiBanners', JSON.stringify(state.banners));
    localStorage.setItem('ieiNews', JSON.stringify(state.news));
    localStorage.setItem('ieiEvents', JSON.stringify(state.events));
    localStorage.setItem('ieiMembers', JSON.stringify(state.members));
    localStorage.setItem('ieiNewsletters', JSON.stringify(state.newsletters));
    localStorage.setItem('ieiStatistics', JSON.stringify(state.statistics));
    localStorage.setItem('ieiGallery', JSON.stringify(state.gallery));
    localStorage.setItem('ieiNotices', JSON.stringify(state.notices));
    updateDashboardCounts();
  };

  // Initialize storage if empty
  if (!localStorage.getItem('ieiBanners') || !localStorage.getItem('ieiNotices')) {
    saveState();
  }


  // --- 2. NAVIGATION & TAB SWITCHING ---
  const menuItems = document.querySelectorAll('.menu-item[data-tab]');
  const tabViews = document.querySelectorAll('.tab-view');
  const pageTitleLabel = document.getElementById('pageTitleLabel');

  const switchTab = (tabId) => {
    menuItems.forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    tabViews.forEach(view => {
      view.classList.toggle('active', view.id === `view-${tabId}`);
    });

    // Format Page Title
    const titleMap = {
      dashboard: "Admin Dashboard",
      banners: "Hero Banners",
      news: "News Manager",
      events: "Events Scheduler",
      members: "Committee Members Registry",
      newsletters: "Newsletters Manager",
      notices: "Notices Board",
      gallery: "Media Gallery",
      statistics: "Statistics Dashboard",
      inquiries: "User Inquiries",
      settings: "System Settings"
    };
    pageTitleLabel.innerText = titleMap[tabId] || "Admin Panel";

    // Refresh view data
    renderViewData(tabId);
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Overview Cards tab links
  document.querySelectorAll('.overview-card').forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target-tab');
      switchTab(target);
    });
  });


  // --- 3. DYNAMIC RENDERING BY TAB VIEWS ---
  const renderViewData = (tabId) => {
    switch (tabId) {
      case 'dashboard':
        updateDashboardCounts();
        break;
      case 'banners':
        renderBannersList();
        break;
      case 'news':
        renderNewsTable();
        break;
      case 'events':
        renderEventsTable();
        break;
      case 'members':
        renderMembersTable();
        break;
      case 'newsletters':
        renderNewslettersTable();
        break;
      case 'gallery':
        renderGalleryGrid();
        break;
      case 'statistics':
        renderStatisticsTable();
        break;
      case 'notices':
        renderNoticesTable();
        break;
    }
  };

  // Dashboard Stats update
  const updateDashboardCounts = () => {
    document.getElementById('dashCountBanners').innerText = state.banners.length;
    document.getElementById('dashCountNews').innerText = state.news.length;
    document.getElementById('dashCountEvents').innerText = state.events.length;
    document.getElementById('dashCountMembers').innerText = state.members.length;
  };

  // 3a. Render Hero Banners List (Double column)
  const bannersListContainer = document.getElementById('bannersListContainer');
  const bannerForm = document.getElementById('bannerForm');
  const bannerFormTitle = document.getElementById('bannerFormTitle');
  const bannerEditId = document.getElementById('bannerEditId');
  const bannerSubmitBtn = document.getElementById('bannerSubmitBtn');

  const renderBannersList = () => {
    if (!bannersListContainer) return;
    bannersListContainer.innerHTML = '';
    
    // Sort by order
    const sortedBanners = [...state.banners].sort((a,b) => a.order - b.order);

    sortedBanners.forEach(banner => {
      const row = document.createElement('div');
      row.className = 'banner-row-item';
      row.innerHTML = `
        <div class="banner-item-left">
          <i class="fa-solid fa-ellipsis-vertical drag-handle"></i>
          <img src="${banner.image || 'assets/logo.jpg'}" alt="Thumb" class="banner-thumbnail">
          <div class="banner-text-info">
            <span class="banner-item-title">${banner.title}</span>
            <span class="banner-item-subtitle">${banner.subtitle || ''}</span>
          </div>
        </div>
        <div class="banner-item-actions">
          <button class="action-btn view-btn" title="Toggle Active"><i class="fa-solid ${banner.active ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
          <button class="action-btn edit-btn" onclick="editBanner(${banner.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteBanner(${banner.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      
      // Bind toggle active status
      row.querySelector('.view-btn').addEventListener('click', () => {
        banner.active = !banner.active;
        saveState();
        renderBannersList();
      });

      bannersListContainer.appendChild(row);
    });
  };

  // Add/Edit Banner Form Submit
  if (bannerForm) {
    bannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const idVal = bannerEditId.value;
      const title = document.getElementById('bannerTitle').value.trim();
      const subtitle = document.getElementById('bannerSubtitle').value.trim();
      const imageUrl = document.getElementById('bannerImageUrl').value.trim() || 'assets/logo.jpg';
      const date = document.getElementById('bannerDate').value.trim();
      const time = document.getElementById('bannerTime').value.trim();
      const place = document.getElementById('bannerPlace').value.trim();
      const btnText = document.getElementById('bannerBtnText').value.trim() || 'Learn More';
      const btnUrl = document.getElementById('bannerBtnUrl').value.trim() || '#';
      const order = parseInt(document.getElementById('bannerOrder').value) || 0;
      const active = document.getElementById('bannerActive').checked;

      if (idVal) {
        // Edit Mode
        const bannerIndex = state.banners.findIndex(b => b.id === parseInt(idVal));
        if (bannerIndex > -1) {
          state.banners[bannerIndex] = { ...state.banners[bannerIndex], title, subtitle, image: imageUrl, date, time, place, btnText, btnUrl, order, active };
        }
      } else {
        // Create Mode
        const newId = state.banners.length > 0 ? Math.max(...state.banners.map(b => b.id)) + 1 : 1;
        state.banners.push({ id: newId, title, subtitle, image: imageUrl, date, time, place, btnText, btnUrl, order, active });
      }

      saveState();
      renderBannersList();
      bannerForm.reset();
      bannerFormTitle.innerText = "Add Banner";
      bannerEditId.value = '';
      bannerSubmitBtn.innerText = "Create";
      if (document.getElementById('bannerUploadBtn')) {
        document.getElementById('bannerUploadBtn').innerText = "Upload Image";
      }
      
      // Reset image preview
      const previewWrapper = document.getElementById('bannerImagePreviewWrapper');
      const previewImg = document.getElementById('bannerImagePreview');
      if (previewWrapper) previewWrapper.style.display = 'none';
      if (previewImg) previewImg.src = '';
    });
  }

  // Global functions attached to window for click handlers
  window.editBanner = (id) => {
    const banner = state.banners.find(b => b.id === id);
    if (!banner) return;
    
    bannerEditId.value = banner.id;
    document.getElementById('bannerTitle').value = banner.title;
    document.getElementById('bannerSubtitle').value = banner.subtitle || '';
    document.getElementById('bannerImageUrl').value = banner.image;
    document.getElementById('bannerDate').value = banner.date || '';
    document.getElementById('bannerTime').value = banner.time || '';
    document.getElementById('bannerPlace').value = banner.place || '';
    document.getElementById('bannerBtnText').value = banner.btnText || 'Learn More';
    document.getElementById('bannerBtnUrl').value = banner.btnUrl || '#';
    document.getElementById('bannerOrder').value = banner.order || 0;
    document.getElementById('bannerActive').checked = banner.active;
    
    // Load image preview
    const previewWrapper = document.getElementById('bannerImagePreviewWrapper');
    const previewImg = document.getElementById('bannerImagePreview');
    if (previewWrapper && previewImg) {
      if (banner.image) {
        previewImg.src = banner.image;
        previewWrapper.style.display = 'block';
      } else {
        previewWrapper.style.display = 'none';
        previewImg.src = '';
      }
    }
    
    bannerFormTitle.innerText = "Edit Banner";
    bannerSubmitBtn.innerText = "Save Changes";
  };

  window.deleteBanner = (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      state.banners = state.banners.filter(b => b.id !== id);
      saveState();
      renderBannersList();
    }
  };


  // --- 4. CRUD GENERAL TABLE LISTS (News, Events, Members, Newsletters, Stats) ---
  const crudModal = document.getElementById('crudModal');
  const closeCrudModalBtn = document.getElementById('closeCrudModalBtn');
  const crudForm = document.getElementById('crudForm');
  const crudItemType = document.getElementById('crudItemType');
  const crudEditId = document.getElementById('crudEditId');
  const modalFormFields = document.getElementById('modalFormFields');
  const crudModalTitle = document.getElementById('crudModalTitle');

  const openCrudModal = (type, editId = null) => {
    crudItemType.value = type;
    crudEditId.value = editId || '';
    crudModalTitle.innerText = editId ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    
    generateModalFields(type, editId);
    crudModal.classList.add('active');

    // Attach dynamic listeners for members upload
    if (type === 'members') {
      const memberUploadBtn = document.getElementById('memberUploadBtn');
      const memberFileInput = document.getElementById('memberFileInput');
      const memberImageInput = document.getElementById('member_image');
      const memberUploadContainer = document.getElementById('memberUploadContainer');

      if (memberUploadBtn && memberFileInput) {
        // Prevent duplicate listener registration
        const newUploadBtn = memberUploadBtn.cloneNode(true);
        memberUploadBtn.parentNode.replaceChild(newUploadBtn, memberUploadBtn);
        
        newUploadBtn.addEventListener('click', () => {
          memberFileInput.click();
        });

        if (memberUploadContainer) {
          const newContainer = memberUploadContainer.cloneNode(true);
          memberUploadContainer.parentNode.replaceChild(newContainer, memberUploadContainer);
          // retrieve file input from new container
          const freshFileInput = newContainer.querySelector('#memberFileInput');
          const freshImageInput = document.getElementById('member_image');
          const freshUploadBtn = newContainer.querySelector('#memberUploadBtn');
          
          newContainer.addEventListener('click', (e) => {
            if (e.target !== freshFileInput && e.target !== freshUploadBtn) {
              freshFileInput.click();
            }
          });

          freshFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (freshImageInput) {
                  freshImageInput.value = event.target.result;
                }
                freshUploadBtn.innerText = `Uploaded: ${file.name.slice(0, 15)}...`;
              };
              reader.readAsDataURL(file);
            }
          });
        }
      }
    }
    else if (type === 'gallery') {
      const galleryUploadBtn = document.getElementById('galleryUploadBtn');
      const galleryFileInput = document.getElementById('galleryFileInput');
      const galleryImageInput = document.getElementById('gal_image');
      const galleryUploadContainer = document.getElementById('galleryUploadContainer');

      if (galleryUploadBtn && galleryFileInput) {
        // Prevent duplicate listener registration
        const newUploadBtn = galleryUploadBtn.cloneNode(true);
        galleryUploadBtn.parentNode.replaceChild(newUploadBtn, galleryUploadBtn);
        
        newUploadBtn.addEventListener('click', () => {
          galleryFileInput.click();
        });

        if (galleryUploadContainer) {
          const newContainer = galleryUploadContainer.cloneNode(true);
          galleryUploadContainer.parentNode.replaceChild(newContainer, galleryUploadContainer);
          // retrieve file input from new container
          const freshFileInput = newContainer.querySelector('#galleryFileInput');
          const freshImageInput = document.getElementById('gal_image');
          const freshUploadBtn = newContainer.querySelector('#galleryUploadBtn');
          
          newContainer.addEventListener('click', (e) => {
            if (e.target !== freshFileInput && e.target !== freshUploadBtn) {
              freshFileInput.click();
            }
          });

          freshFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (event) => {
                if (freshImageInput) {
                  freshImageInput.value = event.target.result;
                }
                freshUploadBtn.innerText = `Uploaded: ${file.name.slice(0, 15)}...`;
              };
              reader.readAsDataURL(file);
            }
          });
        }
      }
    }
    else if (type === 'newsletters') {
      const uploadBtn = document.getElementById('newsletterUploadBtn');
      const fileInput = document.getElementById('newsletterFileInput');
      const fileUrlInput = document.getElementById('nl_fileUrl');
      const container = document.getElementById('newsletterUploadContainer');

      if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => {
          fileInput.click();
        });
        if (container) {
          container.addEventListener('click', (e) => {
            if (e.target !== fileInput && e.target !== uploadBtn) {
              fileInput.click();
            }
          });
        }
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (fileUrlInput) {
                fileUrlInput.value = event.target.result;
              }
              uploadBtn.innerText = `Uploaded: ${file.name.slice(0, 15)}...`;
            };
            reader.readAsDataURL(file);
          }
        });
      }
    }
    else if (type === 'notices') {
      const uploadBtn = document.getElementById('noticeUploadBtn');
      const fileInput = document.getElementById('noticeFileInput');
      const fileUrlInput = document.getElementById('notice_fileUrl');
      const container = document.getElementById('noticeUploadContainer');

      if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', () => {
          fileInput.click();
        });
        if (container) {
          container.addEventListener('click', (e) => {
            if (e.target !== fileInput && e.target !== uploadBtn) {
              fileInput.click();
            }
          });
        }
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (fileUrlInput) {
                fileUrlInput.value = event.target.result;
              }
              uploadBtn.innerText = `Uploaded: ${file.name.slice(0, 15)}...`;
            };
            reader.readAsDataURL(file);
          }
        });
      }
    }
  };

  const closeCrudModal = () => {
    crudModal.classList.remove('active');
    crudForm.reset();
  };

  if (closeCrudModalBtn) closeCrudModalBtn.addEventListener('click', closeCrudModal);

  // Generate HTML fields inside modal
  const generateModalFields = (type, editId) => {
    modalFormFields.innerHTML = '';
    let item = null;
    
    if (editId) {
      const idNum = parseInt(editId);
      item = state[type].find(x => x.id === idNum);
    }

    if (type === 'news') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="news_title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="news_category">
            <option value="news" ${item && item.category === 'news' ? 'selected' : ''}>news</option>
            <option value="workshop" ${item && item.category === 'workshop' ? 'selected' : ''}>workshop</option>
            <option value="seminar" ${item && item.category === 'seminar' ? 'selected' : ''}>seminar</option>
            <option value="webinar" ${item && item.category === 'webinar' ? 'selected' : ''}>webinar</option>
            <option value="event" ${item && item.category === 'event' ? 'selected' : ''}>event</option>
          </select>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="text" id="news_date" value="${item ? item.date : '08 Jul 2026'}" required>
        </div>
        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" id="news_pdf" ${item && item.pdf ? 'checked' : ''}>
            <span>PDF Available</span>
          </label>
        </div>
      `;
    } 
    
    else if (type === 'events') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="event_title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="date" id="event_date" value="${item ? item.date : '2026-08-20'}" required>
        </div>
        <div class="form-group">
          <label>Type</label>
          <select id="event_type">
            <option value="seminar" ${item && item.type === 'seminar' ? 'selected' : ''}>seminar</option>
            <option value="workshop" ${item && item.type === 'workshop' ? 'selected' : ''}>workshop</option>
            <option value="webinar" ${item && item.type === 'webinar' ? 'selected' : ''}>webinar</option>
          </select>
        </div>
      `;
    } 
    
    else if (type === 'members') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Name</label>
          <input type="text" id="member_name" value="${item ? item.name : ''}" required>
        </div>
        <div class="form-group">
          <label>Designation</label>
          <input type="text" id="member_designation" value="${item ? item.designation : ''}" placeholder="e.g. Chairman, Vice Chairman, Executive Member" required>
        </div>
        <div class="form-group">
          <label>Department / Division</label>
          <input type="text" id="member_department" value="${item ? item.department : ''}" placeholder="e.g. Electrical Engineering" required>
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input type="email" id="member_email" value="${item ? (item.email || '') : ''}" placeholder="e.g. member@iei-tripura.org">
        </div>
        <div class="form-group">
          <label>Profile Photo</label>
          <div class="file-upload-container" id="memberUploadContainer">
            <i class="fa-solid fa-upload"></i>
            <button type="button" class="upload-dummy-btn" id="memberUploadBtn">${item && item.image && !item.image.startsWith('data:') ? 'Change Photo' : 'Upload Photo'}</button>
            <input type="file" id="memberFileInput" style="display: none;" accept="image/*">
          </div>
          <input type="text" id="member_image" value="${item ? (item.image || '') : ''}" placeholder="Or enter Image URL">
        </div>
      `;
    } 
    
    else if (type === 'newsletters') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="nl_title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-group">
          <label>Issue Vol / Month</label>
          <input type="text" id="nl_issue" value="${item ? item.issue : ''}" placeholder="e.g. Vol. 5, Issue 4" required>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="text" id="nl_date" value="${item ? item.date : '08 Jul 2026'}" required>
        </div>
        <div class="form-group">
          <label>Newsletter PDF Upload (Optional)</label>
          <div class="file-upload-container" id="newsletterUploadContainer">
            <i class="fa-solid fa-file-pdf" style="color: #ef4444; font-size: 1.25rem;"></i>
            <button type="button" class="upload-dummy-btn" id="newsletterUploadBtn">${item && item.fileUrl ? 'Change PDF' : 'Upload PDF'}</button>
            <input type="file" id="newsletterFileInput" style="display: none;" accept="application/pdf">
          </div>
          <input type="text" id="nl_fileUrl" value="${item ? (item.fileUrl || '') : ''}" placeholder="Or enter PDF URL">
        </div>
      `;
    }
    
    else if (type === 'notices') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Notice Title</label>
          <input type="text" id="notice_title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-group">
          <label>Date</label>
          <input type="text" id="notice_date" value="${item ? item.date : '08 Jul 2026'}" required>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select id="notice_status">
            <option value="Active" ${item && item.status === 'Active' ? 'selected' : ''}>Active</option>
            <option value="Draft" ${item && item.status === 'Draft' ? 'selected' : ''}>Draft</option>
          </select>
        </div>
        <div class="form-group">
          <label>Notice PDF Upload (Optional)</label>
          <div class="file-upload-container" id="noticeUploadContainer">
            <i class="fa-solid fa-file-pdf" style="color: #ef4444; font-size: 1.25rem;"></i>
            <button type="button" class="upload-dummy-btn" id="noticeUploadBtn">${item && item.fileUrl ? 'Change PDF' : 'Upload PDF'}</button>
            <input type="file" id="noticeFileInput" style="display: none;" accept="application/pdf">
          </div>
          <input type="text" id="notice_fileUrl" value="${item ? (item.fileUrl || '') : ''}" placeholder="Or enter PDF URL">
        </div>
      `;
    }

    else if (type === 'statistics') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Label</label>
          <input type="text" id="stat_label" value="${item ? item.label : ''}" required>
        </div>
        <div class="form-group">
          <label>Value</label>
          <input type="number" id="stat_value" value="${item ? item.value : ''}" required>
        </div>
        <div class="form-group">
          <label>Suffix</label>
          <input type="text" id="stat_suffix" value="${item ? item.suffix : '+'}" placeholder="e.g. +, -" required>
        </div>
      `;
    }

    else if (type === 'gallery') {
      modalFormFields.innerHTML = `
        <div class="form-group">
          <label>Title</label>
          <input type="text" id="gal_title" value="${item ? item.title : ''}" required>
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="gal_category">
            <option value="General" ${item && item.category === 'General' ? 'selected' : ''}>General</option>
            <option value="Inaugurations" ${item && item.category === 'Inaugurations' ? 'selected' : ''}>Inaugurations</option>
            <option value="Seminars" ${item && item.category === 'Seminars' ? 'selected' : ''}>Seminars</option>
            <option value="Events" ${item && item.category === 'Events' ? 'selected' : ''}>Events</option>
            <option value="Technical Talks" ${item && item.category === 'Technical Talks' ? 'selected' : ''}>Technical Talks</option>
            <option value="Memorial Lectures" ${item && item.category === 'Memorial Lectures' ? 'selected' : ''}>Memorial Lectures</option>
            <option value="Workshops" ${item && item.category === 'Workshops' ? 'selected' : ''}>Workshops</option>
          </select>
        </div>
        <div class="form-group">
          <label>Image Upload</label>
          <div class="file-upload-container" id="galleryUploadContainer">
            <i class="fa-solid fa-upload"></i>
            <button type="button" class="upload-dummy-btn" id="galleryUploadBtn">${item && item.image && !item.image.startsWith('data:') ? 'Change Image' : 'Upload Image'}</button>
            <input type="file" id="galleryFileInput" style="display: none;" accept="image/*">
          </div>
          <input type="text" id="gal_image" value="${item ? item.image : 'assets/logo.jpg'}" placeholder="Or enter Image URL" required>
        </div>
      `;
    }
  };

  // Submit trigger for General CRUD Form
  if (crudForm) {
    crudForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const type = crudItemType.value;
      const editId = crudEditId.value;
      let newItemObj = {};

      if (type === 'news') {
        newItemObj = {
          title: document.getElementById('news_title').value.trim(),
          category: document.getElementById('news_category').value,
          date: document.getElementById('news_date').value.trim(),
          pdf: document.getElementById('news_pdf').checked,
          status: "Published"
        };
      } 
      
      else if (type === 'events') {
        newItemObj = {
          title: document.getElementById('event_title').value.trim(),
          date: document.getElementById('event_date').value,
          type: document.getElementById('event_type').value
        };
      } 
      
      else if (type === 'members') {
        newItemObj = {
          name: document.getElementById('member_name').value.trim(),
          designation: document.getElementById('member_designation').value.trim(),
          department: document.getElementById('member_department').value.trim(),
          image: document.getElementById('member_image').value.trim() || defaultAvatar,
          email: document.getElementById('member_email').value.trim() || (document.getElementById('member_name').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '') + '@iei-tripura.org'),
          status: "Active"
        };
      } 
      
      else if (type === 'newsletters') {
        newItemObj = {
          title: document.getElementById('nl_title').value.trim(),
          issue: document.getElementById('nl_issue').value.trim(),
          date: document.getElementById('nl_date').value.trim(),
          pdf: true,
          status: "Published",
          fileUrl: document.getElementById('nl_fileUrl').value.trim() || "assets/IEI-TSC-Newsletter__April-2021.pdf"
        };
      }
      
      else if (type === 'notices') {
        newItemObj = {
          title: document.getElementById('notice_title').value.trim(),
          date: document.getElementById('notice_date').value.trim(),
          status: document.getElementById('notice_status').value,
          fileUrl: document.getElementById('notice_fileUrl').value.trim()
        };
      }

      else if (type === 'statistics') {
        newItemObj = {
          label: document.getElementById('stat_label').value.trim(),
          value: parseInt(document.getElementById('stat_value').value) || 0,
          suffix: document.getElementById('stat_suffix').value.trim() || '+',
          status: "Active"
        };
      }

      else if (type === 'gallery') {
        newItemObj = {
          title: document.getElementById('gal_title').value.trim(),
          category: document.getElementById('gal_category').value,
          image: document.getElementById('gal_image').value.trim() || 'assets/logo.jpg'
        };
      }

      if (editId) {
        // Edit Mode
        const idNum = parseInt(editId);
        const index = state[type].findIndex(x => x.id === idNum);
        if (index > -1) {
          state[type][index] = { ...state[type][index], ...newItemObj };
        }
      } else {
        // Create Mode
        const newId = state[type].length > 0 ? Math.max(...state[type].map(x => x.id)) + 1 : 1;
        state[type].push({ id: newId, ...newItemObj });
      }

      saveState();
      closeCrudModal();
      renderViewData(type);
    });
  }


  // --- 4a. Rendering Tables (News, Events, Members, Newsletters, Stats) ---
  
  // Render News Table
  const renderNewsTable = () => {
    const tableBody = document.getElementById('newsTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.news.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${item.title}</td>
        <td><span class="status-pill category-blue">${item.category}</span></td>
        <td>${item.date}</td>
        <td>${item.pdf ? '<span class="pdf-icon-yes"><i class="fa-solid fa-file-pdf"></i> Yes</span>' : '-'}</td>
        <td><span class="status-pill published">${item.status}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('news', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('news', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Render Events Table
  const renderEventsTable = () => {
    const tableBody = document.getElementById('eventsTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.events.forEach(item => {
      const tr = document.createElement('tr');
      
      // Formatting date nicely
      const dateParts = item.date.split('-');
      let dateString = item.date;
      if (dateParts.length === 3) {
        const monthNamesAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const year = dateParts[0];
        const monthIndex = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        dateString = `${String(day).padStart(2, '0')} ${monthNamesAbbr[monthIndex]} ${year}`;
      }

      tr.innerHTML = `
        <td style="font-weight: 700;">${item.title}</td>
        <td>${dateString}</td>
        <td><span class="status-pill category-blue">${item.type}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('events', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('events', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Render Committee Members Table
  const renderMembersTable = () => {
    const tableBody = document.getElementById('membersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.members.forEach(item => {
      const tr = document.createElement('tr');
      const emailVal = item.email || (item.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '@iei-tripura.org');
      tr.innerHTML = `
        <td><img src="${item.image || defaultAvatar}" alt="Photo" class="member-thumbnail" onerror="this.onerror=null; this.src='${defaultAvatar}';"></td>
        <td style="font-weight: 700;">${item.name}</td>
        <td style="font-weight: 600;">${item.designation}</td>
        <td>${item.department}</td>
        <td style="color: var(--blue-active); font-weight: 500;">${emailVal}</td>
        <td><span class="status-pill published">${item.status}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('members', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('members', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Render Newsletters Table
  const renderNewslettersTable = () => {
    const tableBody = document.getElementById('newslettersTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.newsletters.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${item.title}</td>
        <td style="font-weight: 600; color:var(--primary);">${item.issue}</td>
        <td>${item.date}</td>
        <td>${item.pdf ? '<span class="pdf-icon-yes"><i class="fa-solid fa-file-pdf"></i> Yes</span>' : '-'}</td>
        <td><span class="status-pill published">${item.status}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('newsletters', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('newsletters', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Render Statistics Dashboard
  const renderStatisticsTable = () => {
    const tableBody = document.getElementById('statisticsTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.statistics.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${item.label}</td>
        <td style="font-weight: 800; color:var(--primary); font-size:1rem;">${item.value}</td>
        <td style="font-weight: 700; color:var(--accent);">${item.suffix}</td>
        <td><span class="status-pill published">${item.status}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('statistics', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('statistics', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Render Notices Table
  const renderNoticesTable = () => {
    const tableBody = document.getElementById('noticesTableBody');
    if (!tableBody) return;
    tableBody.innerHTML = '';

    state.notices.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 700;">${item.title}</td>
        <td>${item.date}</td>
        <td><span class="status-pill ${item.status === 'Active' ? 'published' : 'draft'}">${item.status}</span></td>
        <td>
          <button class="action-btn edit-btn" onclick="openCrudItem('notices', ${item.id})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="action-btn delete-btn" onclick="deleteCrudItem('notices', ${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  };

  // Bind edit/delete triggers globally
  window.openCrudItem = (type, id) => {
    openCrudModal(type, id);
  };

  window.deleteCrudItem = (type, id) => {
    if (confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      state[type] = state[type].filter(x => x.id !== id);
      saveState();
      renderViewData(type);
    }
  };


  // --- 5. GALLERY VIEW MANAGEMENT ---
  const galleryFilterTabs = document.getElementById('galleryFilterTabs');
  const galleryAdminGrid = document.getElementById('galleryAdminGrid');
  const galleryCountTitle = document.getElementById('galleryCountTitle');
  let activeGalleryFilter = 'All';

  const renderGalleryGrid = () => {
    if (!galleryAdminGrid) return;
    galleryAdminGrid.innerHTML = '';
    
    // Gallery Title Images Count
    if (galleryCountTitle) {
      galleryCountTitle.innerText = `Gallery (${state.gallery.length} images)`;
    }

    // Render filter buttons (dynamic based on categories present)
    renderGalleryFilters();

    const filteredImages = activeGalleryFilter === 'All' 
      ? state.gallery 
      : state.gallery.filter(img => img.category === activeGalleryFilter);

    if (filteredImages.length === 0) {
      galleryAdminGrid.innerHTML = `<div class="no-events" style="grid-column: span 5; padding: 3rem;">No media images found under filter category: ${activeGalleryFilter}.</div>`;
      return;
    }

    filteredImages.forEach(img => {
      const card = document.createElement('div');
      card.className = 'gallery-item-card';
      card.innerHTML = `
        <img src="${img.image || 'assets/logo.jpg'}" alt="${img.title}">
        <div class="gallery-card-overlay">
          <button class="gallery-overlay-btn edit" onclick="openCrudItem('gallery', ${img.id})">Edit</button>
          <button class="gallery-overlay-btn delete" onclick="deleteCrudItem('gallery', ${img.id})">Delete</button>
        </div>
      `;
      galleryAdminGrid.appendChild(card);
    });
  };

  const renderGalleryFilters = () => {
    if (!galleryFilterTabs) return;
    
    // Unique list of categories in the gallery database
    const categories = ['All', ...new Set(state.gallery.map(img => img.category))];
    galleryFilterTabs.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `filter-tab-btn ${cat === activeGalleryFilter ? 'active' : ''}`;
      
      // Count items in category
      const count = cat === 'All' ? state.gallery.length : state.gallery.filter(i => i.category === cat).length;
      btn.innerText = `${cat} (${count})`;
      
      btn.addEventListener('click', () => {
        activeGalleryFilter = cat;
        renderGalleryGrid();
      });

      galleryFilterTabs.appendChild(btn);
    });
  };


  // --- 6. ATTACH GENERAL ADD BUTTON EVENTS ---
  const bindAddButton = (btnId, type) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', () => {
        openCrudModal(type);
      });
    }
  };

  bindAddButton('addNewNewsBtn', 'news');
  bindAddButton('addNewEventBtn', 'events');
  bindAddButton('addNewMemberBtn', 'members');
  bindAddButton('addNewNewsletterBtn', 'newsletters');
  bindAddButton('addNewImageBtn', 'gallery');
  bindAddButton('addNewStatBtn', 'statistics');
  bindAddButton('addNewNoticeBtn', 'notices');

  // Dashboard action shortcuts
  document.querySelectorAll('.quick-act-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action');
      if (action === 'add-banner') {
        switchTab('banners');
        document.getElementById('bannerTitle').focus();
      } else if (action === 'add-news') {
        openCrudModal('news');
      } else if (action === 'add-event') {
        openCrudModal('events');
      } else if (action === 'add-member') {
        openCrudModal('members');
      }
    });
  });

  // --- 6b. FILE UPLOAD & PREVIEW HANDLER FOR BANNERS ---
  const bannerUploadBtn = document.getElementById('bannerUploadBtn');
  const bannerFileInput = document.getElementById('bannerFileInput');
  const bannerImageUrl = document.getElementById('bannerImageUrl');
  const bannerImagePreviewWrapper = document.getElementById('bannerImagePreviewWrapper');
  const bannerImagePreview = document.getElementById('bannerImagePreview');

  const updateBannerPreview = (src) => {
    if (bannerImagePreview && bannerImagePreviewWrapper) {
      if (src) {
        bannerImagePreview.src = src;
        bannerImagePreviewWrapper.style.display = 'block';
      } else {
        bannerImagePreview.src = '';
        bannerImagePreviewWrapper.style.display = 'none';
      }
    }
  };

  if (bannerUploadBtn && bannerFileInput) {
    bannerUploadBtn.addEventListener('click', () => {
      bannerFileInput.click();
    });

    const uploadContainer = document.querySelector('.file-upload-container');
    if (uploadContainer) {
      uploadContainer.addEventListener('click', (e) => {
        if (e.target !== bannerFileInput && e.target !== bannerUploadBtn) {
          bannerFileInput.click();
        }
      });
    }

    bannerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (bannerImageUrl) {
            bannerImageUrl.value = event.target.result; // Set base64 string
          }
          bannerUploadBtn.innerText = `Uploaded: ${file.name.slice(0, 15)}...`;
          updateBannerPreview(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (bannerImageUrl) {
    const handleUrlInput = () => {
      updateBannerPreview(bannerImageUrl.value.trim());
    };
    bannerImageUrl.addEventListener('input', handleUrlInput);
    bannerImageUrl.addEventListener('change', handleUrlInput);
  }


  // --- 7. LOGOUT REDIRECT ---
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to log out of the Admin Panel?")) {
        window.location.href = 'index.html';
      }
    });
  }

  // Set default view on load
  switchTab('dashboard');

});
