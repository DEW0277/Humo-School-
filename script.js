/**
 * HUMO SCHOOL — INTERACTIVE SCRIPT
 * Manages stage switching, dynamic tuition calculator, modal dialogs,
 * FAQ accordion, form validation, and feedback notifications.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. STAGE TABS SYSTEM (Dasturlar bo'limi)
     ------------------------------------------------------------------------ */
  const stagesData = {
    preschool: {
      tag: "MAKTABGA TAYYORLOV • 5–6 YOSH",
      title: "Maktabga qiziqish va ijtimoiy ko'nikmalarni shakllantirish",
      desc: "O'yin orqali mantiqiy fikrlash, harflar va sonlar bilan tanishuv, nozik motorika mashqlari hamda ingliz tili asoslari. Bolalarga majburlashsiz, qiziqarli tarzda o'qish va yozish muhabbati singdiriladi.",
      features: [
        { label: "Haftalik rejim", val: "08:30 – 17:00 (Kichik guruhlar, maksimal 14 bola)" },
        { label: "Asosiy fanlar", val: "Savodxonlik, Mental arifmetika, Ingliz tili (Oxford Kids), Ijodiyot va loyihalar" },
        { label: "Qo'shimcha", val: "Suzish mashg'ulotlari, shaxmat, gimnastika, logoped va bolalar psixologi nazorati" }
      ],
      img: "assets/images/primary-class.jpg",
      badge: "Sinfda maks. 14 nafar tarbiyalanuvchi",
      gradeKey: "0-sinf"
    },
    primary: {
      tag: "CAMBRIDGE PRIMARY • 1–4 SINFLAR",
      title: "Poydevor bilimlari, qiziquvchanlik va chet tillari",
      desc: "Cambridge Primary xalqaro o'quv rejasi asosida fan, matematika va ingliz tili chuqur o'rgatiladi. Har bir o'quvchida mustaqil tadqiqot qilish, savol berish va kitobxonlik madaniyati shakllantiriladi.",
      features: [
        { label: "Haftalik rejim", val: "08:30 – 17:30 (Uy vazifalari maktabda mentor bilan bajariladi)" },
        { label: "Xalqaro fanlar", val: "Cambridge Math, Cambridge Science, Global English (Native speakers)" },
        { label: "Ijodiy & Sport", val: "Robototexnika, Shaxmat, Suzish, Basketbol, Teatr va notiqlik studiyasi" }
      ],
      img: "assets/images/hero-main.jpg",
      badge: "Sinfda maks. 16 nafar o'quvchi",
      gradeKey: "1-4 sinf"
    },
    middle: {
      tag: "CAMBRIDGE LOWER SECONDARY • 5–9 SINFLAR",
      title: "Chuqurlashtirilgan fanlar, STEM va tahliliy tafakkur",
      desc: "Murakkab fanlararo loyihalar, Cambridge Checkpoint va IGCSE imtihonlariga tizimli tayyorgarlik. O'quvchilar ilmiy laboratoriyalarda tajribalar o'tkazib, nazariyani amaliyotda qo'llashni o'rganadilar.",
      features: [
        { label: "Haftalik rejim", val: "08:30 – 17:30 (Ilmiy seminarlar va laboratoriya amaliyotlari)" },
        { label: "Yo'nalishlar", val: "Fizika, Kimyo, Biologiya, IT & Python, Olimpiada matematikasi, Debat klubi" },
        { label: "Imtihonlar", val: "Cambridge Checkpoint, xalqaro olimpiadalar va IGCSE dastlabki bosqichlari" }
      ],
      img: "assets/images/stem-lab.jpg",
      badge: "Zamonaviy ilmiy laboratoriyalar",
      gradeKey: "5-9 sinf"
    },
    high: {
      tag: "CAMBRIDGE A-LEVEL & PRE-UNI • 10–11 SINFLAR",
      title: "Global universitetlarga grant asosida kirish traektoriyasi",
      desc: "Dunyoning nufuzli TOP-100 universitetlariga kirishga tayyorgarlik. IELTS 7.5+, SAT, College Counseling va shaxsiy portfolio yaratish bo'yicha professional mentorlar ko'magi.",
      features: [
        { label: "Haftalik rejim", val: "08:30 – 17:30 (Individual akademik traektoriya va konsalting)" },
        { label: "Maxsus kurslar", val: "SAT Verbal & Math, IELTS Intensive, Academic Writing, Biznes & Startap asoslari" },
        { label: "Universitetlarga qabul", val: "AQSh, Buyuk Britaniya, Yevropa va Singapur universitetlariga grant hujjat topshirish" }
      ],
      img: "assets/images/campus-arch.jpg",
      badge: "100% Universitetga kirish kafolati",
      gradeKey: "10-11 sinf"
    }
  };

  const stageTabs = document.querySelectorAll('.pill-tab');
  const stageTag = document.getElementById('stage-tag');
  const stageTitle = document.getElementById('stage-title');
  const stageDesc = document.getElementById('stage-desc');
  const stageFeatures = document.getElementById('stage-features');
  const stageImg = document.getElementById('stage-image');
  const stageDisplay = document.getElementById('stage-display');

  stageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stageTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const stageKey = tab.getAttribute('data-stage');
      const data = stagesData[stageKey];

      if (data && stageDisplay) {
        // Subtle transition fade
        stageDisplay.style.opacity = '0.4';
        setTimeout(() => {
          stageTag.textContent = data.tag;
          stageTitle.textContent = data.title;
          stageDesc.textContent = data.desc;
          stageImg.src = data.img;
          stageImg.alt = data.title;

          const badgeEl = stageDisplay.querySelector('.badge-accent');
          if (badgeEl) badgeEl.textContent = data.badge;

          // Render features list
          stageFeatures.innerHTML = data.features.map(f => `
            <div class="feature-item">
              <strong>${f.label}:</strong> ${f.val}
            </div>
          `).join('');

          const stageActionBtn = stageDisplay.querySelector('.open-enrollment-modal');
          if (stageActionBtn) {
            stageActionBtn.setAttribute('data-pref-grade', data.gradeKey);
          }

          stageDisplay.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* ------------------------------------------------------------------------
     2. INTERACTIVE TUITION & DISCOUNT CALCULATOR
     ------------------------------------------------------------------------ */
  const gradeSelect = document.getElementById('calc-grade');
  const childrenRadios = document.querySelectorAll('input[name="calc-children"]');
  const periodRadios = document.querySelectorAll('input[name="calc-period"]');
  const transportCheckbox = document.getElementById('calc-transport');
  const totalDisplay = document.getElementById('calc-total-display');
  const periodDisplay = document.getElementById('calc-period-display');
  const discountDisplay = document.getElementById('calc-discount-display');

  function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
  }

  function calculateTuition() {
    if (!gradeSelect) return;

    const baseMonthlyPrice = parseInt(gradeSelect.value, 10);
    let childrenCount = 1;
    childrenRadios.forEach(radio => {
      if (radio.checked) childrenCount = parseInt(radio.value, 10);
    });

    let paymentPeriod = 'monthly';
    periodRadios.forEach(radio => {
      if (radio.checked) paymentPeriod = radio.value;
    });

    const hasTransport = transportCheckbox && transportCheckbox.checked;
    const transportMonthly = hasTransport ? 900000 : 0;

    // Sibling discount
    let siblingDiscountPercent = 0;
    if (childrenCount === 2) siblingDiscountPercent = 0.10; // 10%
    if (childrenCount >= 3) siblingDiscountPercent = 0.15; // 15%

    // Calculate monthly fee per child and total
    const discountedMonthlyPerChild = baseMonthlyPrice * (1 - siblingDiscountPercent);
    const totalMonthlyTuition = (discountedMonthlyPerChild + transportMonthly) * childrenCount;

    if (paymentPeriod === 'monthly') {
      totalDisplay.textContent = formatMoney(Math.round(totalMonthlyTuition));
      periodDisplay.textContent = `Har oy to'lanadi (${childrenCount} nafar farzand uchun)`;

      if (siblingDiscountPercent > 0) {
        const monthlySavings = (baseMonthlyPrice * siblingDiscountPercent) * childrenCount;
        discountDisplay.style.display = 'block';
        discountDisplay.textContent = `Oila chegirmasi tejamkorligi: ${formatMoney(Math.round(monthlySavings))} / oy`;
      } else {
        discountDisplay.style.display = 'none';
      }
    } else {
      // Annual payment with additional 10% discount on 10-month academic year
      const fullAnnualWithoutDiscount = (baseMonthlyPrice + transportMonthly) * childrenCount * 10;
      const annualBaseTuition = (discountedMonthlyPerChild * 10 * 0.90) * childrenCount; // 10% annual bonus
      const annualTransport = (transportMonthly * 10) * childrenCount;
      const finalAnnual = annualBaseTuition + annualTransport;
      const totalSavings = fullAnnualWithoutDiscount - finalAnnual;

      totalDisplay.textContent = formatMoney(Math.round(finalAnnual));
      periodDisplay.textContent = `1 yillik to'liq o'quv yili uchun (${childrenCount} nafar farzand)`;

      discountDisplay.style.display = 'block';
      discountDisplay.textContent = `Yillik to'liq chegirma va tejamkorlik: ${formatMoney(Math.round(totalSavings))}`;
    }
  }

  if (gradeSelect) {
    gradeSelect.addEventListener('change', calculateTuition);
    childrenRadios.forEach(r => r.addEventListener('change', calculateTuition));
    periodRadios.forEach(r => r.addEventListener('change', calculateTuition));
    if (transportCheckbox) transportCheckbox.addEventListener('change', calculateTuition);
    calculateTuition();
  }

  /* ------------------------------------------------------------------------
     3. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

      // Close other items for neat accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAns = otherItem.querySelector('.faq-answer');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAns.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        questionBtn.setAttribute('aria-expanded', 'false');
        answerDiv.style.maxHeight = null;
      } else {
        questionBtn.setAttribute('aria-expanded', 'true');
        answerDiv.style.maxHeight = answerDiv.scrollHeight + 'px';
      }
    });
  });

  /* ------------------------------------------------------------------------
     4. MODAL DIALOGS (Enrollment & Campus Tour)
     ------------------------------------------------------------------------ */
  const enrollmentModal = document.getElementById('enrollment-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalGradeSelect = document.getElementById('modal-grade');
  const modalTitle = document.getElementById('modal-title');
  const openModalBtns = document.querySelectorAll('.open-enrollment-modal');

  function openEnrollmentModal(prefilledGrade = null, modalType = 'enroll') {
    if (!enrollmentModal) return;
    
    if (modalType === 'tour') {
      modalTitle.textContent = "Kampus bo'ylab ekskursiyaga yozilish";
    } else {
      modalTitle.textContent = "Maktabga qabul arizasi";
    }

    if (prefilledGrade && modalGradeSelect) {
      modalGradeSelect.value = prefilledGrade;
    }

    enrollmentModal.classList.add('active');
    enrollmentModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeEnrollmentModal() {
    if (!enrollmentModal) return;
    enrollmentModal.classList.remove('active');
    enrollmentModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefGrade = btn.getAttribute('data-pref-grade');
      const modalType = btn.getAttribute('data-modal-type') || 'enroll';
      openEnrollmentModal(prefGrade, modalType);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEnrollmentModal);
  }

  if (enrollmentModal) {
    enrollmentModal.addEventListener('click', (e) => {
      if (e.target === enrollmentModal) {
        closeEnrollmentModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. TEACHER DETAIL MODALS
     ------------------------------------------------------------------------ */
  const teacherDetails = {
    kamila: {
      name: "Kamila Rahimova, PhD",
      role: "Akademik direktor & Ta'lim koordinatori",
      img: "assets/images/teacher-director.jpg",
      bio: "Kamila Rahimova Oksford universitetida Ta'lim menejmenti bo'yicha falsafa doktori darajasini olgan. 18 yildan ortiq vaqt mobaynida xalqaro maktablarda akademik dasturlarni boshqargan.",
      achievements: [
        "Cambridge Assessment International Education rasmiy sertifikati egasi",
        "12 ta muvaffaqiyatli ta'lim islohoti loyihasi rahbari",
        "O'zbekistonda zamonaviy inklyuziv ta'lim dasturi muallifi"
      ]
    },
    david: {
      name: "David Chen, MA",
      role: "Cambridge IGCSE & Science koordinatori",
      img: "assets/images/teacher-mentor.jpg",
      bio: "David Chen Londondagi UCL universitetini tamomlagan, Buyuk Britaniya va Singapurning yetakchi IB va Cambridge kollejlarida 10 yil faoliyat yuritgan.",
      achievements: [
        "Native English Speaker, C2 Level sertifikatlangan instruktor",
        "O'quvchilarining 94% Cambridge IGCSE da A* va A baholariga ega",
        "Ilmiy tadqiqotlar va yosh kashfiyotchilar to'garagi rahbari"
      ]
    },
    sarvar: {
      name: "Sarvar Rustamov",
      role: "Olimpiada Matematikasi & Algoritmlar ustozi",
      img: "",
      initials: "SR",
      bio: "O'zbekiston Milliy universiteti matematika fakulteti bitiruvchisi. 12 yillik tajribaga ega murabbiy, o'nlab respublika va xalqaro olimpiada g'oliblarini tarbiyalagan.",
      achievements: [
        "Xalqaro matematika olimpiadasi (IMO) terma jamoasi murabbiyi",
        "50 dan ortiq medalli o'quvchilar ustozi",
        "Mantiqiy fikrlash va algoritmik metodika muallifi"
      ]
    },
    malika: {
      name: "Malika Alimova",
      role: "Bosh psixolog & Emotsional rivojlanish mutaxassisi",
      img: "",
      initials: "MA",
      bio: "Sankt-Peterburg Davlat Universiteti bitiruvchisi. Bolalar va o'smirlar neyropsixologiyasi bo'yicha 11 yillik amaliy tajribaga ega sertifikatlangan mutaxassis.",
      achievements: [
        "Bolalarning maktabga qulay moslashuvi (Adaptation Protocol) muallifi",
        "Ota-onalar va o'qituvchilar uchun seminar-treninglar moderatori",
        "Emotsional intellekt (EQ) rivojlantirish dasturi koordinatori"
      ]
    }
  };

  const teacherModal = document.getElementById('teacher-modal');
  const teacherModalClose = document.getElementById('teacher-modal-close');
  const teacherModalContent = document.getElementById('teacher-modal-content');
  const openTeacherBtns = document.querySelectorAll('.open-teacher-modal');

  openTeacherBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.person-card');
      const teacherKey = card ? card.getAttribute('data-teacher') : null;
      const data = teacherDetails[teacherKey];

      if (data && teacherModalContent && teacherModal) {
        teacherModalContent.innerHTML = `
          <div style="display: flex; gap: 24px; align-items: center; margin-bottom: 20px; flex-wrap: wrap;">
            ${data.img ? `
              <img src="${data.img}" alt="${data.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
            ` : `
              <div style="width: 100px; height: 100px; border-radius: 50%; background: #4a4741; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 28px; font-family: 'Newsreader', serif;">
                ${data.initials}
              </div>
            `}
            <div>
              <span class="eyebrow-label" style="margin-bottom: 4px;">USTOZ HAQIDA</span>
              <h3 style="font-family: var(--font-display); font-size: 1.6rem; color: var(--colors-ink); margin-bottom: 4px;">${data.name}</h3>
              <p style="font-size: 0.9rem; color: var(--colors-ash); font-weight: 500;">${data.role}</p>
            </div>
          </div>
          <p style="font-size: 0.95rem; color: var(--colors-stone); line-height: 1.65; margin-bottom: 18px;">${data.bio}</p>
          <div style="border-top: 1px solid var(--colors-hairline); padding-top: 16px;">
            <h4 style="font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; color: var(--colors-ink);">Yutuqlar va ixtisoslik:</h4>
            <ul style="display: flex; flex-direction: column; gap: 8px;">
              ${data.achievements.map(a => `
                <li style="font-size: 0.875rem; color: var(--colors-stone); display: flex; gap: 8px;">
                  <span style="color: var(--colors-forest); font-weight: bold;">✓</span>
                  <span>${a}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        `;

        teacherModal.classList.add('active');
        teacherModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (teacherModalClose) {
    teacherModalClose.addEventListener('click', () => {
      teacherModal.classList.remove('active');
      teacherModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  }

  if (teacherModal) {
    teacherModal.addEventListener('click', (e) => {
      if (e.target === teacherModal) {
        teacherModal.classList.remove('active');
        teacherModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     6. FORM VALIDATION & NOTIFICATION TOAST
     ------------------------------------------------------------------------ */
  const admissionForm = document.getElementById('admission-form');
  const modalForm = document.getElementById('modal-form');
  const toastEl = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message, isSuccess = true) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.style.backgroundColor = isSuccess ? 'var(--colors-forest)' : 'var(--colors-clay)';
    toastEl.classList.add('show');

    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 4500);
  }

  function validateUzPhone(phone) {
    const cleaned = phone.replace(/[\s\(\)\-\+]/g, '');
    return cleaned.length >= 9;
  }

  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const parentNameInput = document.getElementById('parent-name');
      const phoneInput = document.getElementById('phone-number');
      const targetGradeSelect = document.getElementById('target-grade');
      const errorParentName = document.getElementById('error-parent-name');
      const errorPhone = document.getElementById('error-phone-number');
      const errorTargetGrade = document.getElementById('error-target-grade');

      // Clear errors
      [parentNameInput, phoneInput, targetGradeSelect].forEach(el => el.classList.remove('is-invalid'));
      [errorParentName, errorPhone, errorTargetGrade].forEach(el => el.textContent = '');

      if (!parentNameInput.value.trim()) {
        parentNameInput.classList.add('is-invalid');
        errorParentName.textContent = "Iltimos, ismingizni kiriting.";
        isValid = false;
      }

      if (!phoneInput.value.trim() || !validateUzPhone(phoneInput.value)) {
        phoneInput.classList.add('is-invalid');
        errorPhone.textContent = "To'g'ri telefon raqamini kiriting (masalan: +998 90 123 45 67).";
        isValid = false;
      }

      if (!targetGradeSelect.value) {
        targetGradeSelect.classList.add('is-invalid');
        errorTargetGrade.textContent = "Iltimos, farzandingiz sinfini tanlang.";
        isValid = false;
      }

      if (isValid) {
        const submitBtn = document.getElementById('submit-application-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = "Yuborilmoqda...";

        setTimeout(() => {
          showToast(`Rahmat, ${parentNameInput.value.trim()}! Arizangiz qabul qilindi. Mutaxassisimiz 15 daqiqada siz bilan bog'lanadi.`);
          admissionForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = "Arizani jo'natish →";
        }, 800);
      }
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('modal-parent-name').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();

      if (!parentName || !validateUzPhone(phone)) {
        showToast("Iltimos, barcha maydonlarni to'g'ri to'ldiring.", false);
        return;
      }

      const submitBtn = document.getElementById('modal-submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = "Qabul qilinmoqda...";

      setTimeout(() => {
        closeEnrollmentModal();
        showToast(`Rahmat, ${parentName}! Qabul komissiyasi siz bilan tez orada bog'lanadi.`);
        modalForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Qabulga yozilish →";
      }, 700);
    });
  }

  /* ------------------------------------------------------------------------
     7. NEWSLETTER SUBSCRIPTION
     ------------------------------------------------------------------------ */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterFeedback = document.getElementById('newsletter-feedback');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      if (input && input.value.includes('@')) {
        newsletterFeedback.style.color = 'var(--colors-gold-pale)';
        newsletterFeedback.textContent = "✓ Muvaffaqiyatli obuna bo'ldingiz!";
        input.value = '';
        setTimeout(() => {
          newsletterFeedback.textContent = '';
        }, 4000);
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. MOBILE NAVIGATION TOGGLE
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('active');
      });
    });
  }

  // Keyboard accessibility: ESC key closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEnrollmentModal();
      if (teacherModal) {
        teacherModal.classList.remove('active');
        teacherModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }
  });

});
