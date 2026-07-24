const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const form = document.querySelector(".form");
const formStatus = document.getElementById("form-status");
const attachRoot = document.getElementById("attach-root");
const processTabs = document.getElementById("process-tabs");
const processGrid = document.getElementById("process-grid");
const callbackModal = document.getElementById("callback-modal");
const callbackForm = document.getElementById("callback-form");
const callbackSuccess = document.getElementById("callback-success");
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_FILE_EXT = ["pdf", "docx", "png"];

const PHONE_COUNTRIES = [
  {
    code: "ru",
    name: "Россия",
    dial: "+7",
    flag: "assets/flag-ru.svg",
    mask: "(###) ###-##-##",
    digits: 10,
  },
  {
    code: "by",
    name: "Беларусь",
    dial: "+375",
    flag: "assets/flag-by.svg",
    mask: "(##) ###-##-##",
    digits: 9,
  },
  {
    code: "kz",
    name: "Казахстан",
    dial: "+7",
    flag: "assets/flag-kz.svg",
    mask: "(###) ###-##-##",
    digits: 10,
  },
  {
    code: "am",
    name: "Армения",
    dial: "+374",
    flag: "assets/flag-am.svg",
    mask: "## ######",
    digits: 8,
  },
  {
    code: "kg",
    name: "Кыргызстан",
    dial: "+996",
    flag: "assets/flag-kg.svg",
    mask: "(###) ##-##-##",
    digits: 9,
  },
  {
    code: "uz",
    name: "Узбекистан",
    dial: "+998",
    flag: "assets/flag-uz.svg",
    mask: "## ###-##-##",
    digits: 9,
  },
];

const CALL_TIMES = [
  "Любое",
  "09:00 – 11:00",
  "11:00 – 13:00",
  "13:00 – 15:00",
  "15:00 – 17:00",
  "17:00 – 19:00",
];

const PROCESS_DATA = {
  dev: [
    {
      icon: "assets/proc-bulb.svg",
      title: "Отправляете заявку",
      text: "Описываете задачу в свободной форме — идею, цель, наработки. Можно прислать бриф, ТЗ или просто написать пару строк.",
    },
    {
      icon: "assets/proc-search.svg",
      title: "Получаем, анализируем, оцениваем",
      text: "Разбираемся в задаче, оцениваем сложность и сроки исполнения, формулируем гипотезы и возможные подходы к решению.",
    },
    {
      icon: "assets/proc-pencil.svg",
      title: "Согласуем план и дорабатываем ТЗ",
      text: "Вместе рассматриваем подготовленный план работ. Составляем или дорабатываем техническое задание — фиксируем все детали.",
    },
    {
      icon: "assets/proc-code.svg",
      title: "Презентуем MVP-концепцию",
      text: "Показываем конкретный флоу и соответствие задумке до старта разработки. Всё прозрачно — без тумана и неожиданностей.",
    },
    {
      icon: "assets/proc-redo.svg",
      title: "Циклы согласований и правок",
      text: "Это нормально и заложено в процесс. Проводим демонстрации, собираем обратную связь, дорабатываем итеративно.",
    },
    {
      icon: "assets/proc-team.svg",
      title: "Презентация и командное тестирование",
      text: "Финальная демонстрация и совместное тестирование всех сценариев. Фиксируем и закрываем последние замечания.",
    },
    {
      icon: "assets/proc-rocket.svg",
      title: "Запускаем продукт — в прод!",
      text: "Выкатываем на боевой сервер, проводим обучение команды, сдаем доступы. Дальше — поддержка и совместное развитие.",
    },
  ],
  design: [
    {
      icon: "assets/proc-bulb.svg",
      title: "Отправляете описание задачи",
      text: "Рассказываете что нужно: редизайн, дизайн с нуля или по готовому ТЗ. Прикладываете референсы, бриф или просто идею.",
    },
    {
      icon: "assets/proc-task.svg",
      title: "Анализируем, формируем пул задач",
      text: "Изучаем задачу, делим на конкретные шаги. Определяем объём и подход — чтобы ничего не упустить с самого начала.",
    },
    {
      icon: "assets/proc-zoom.svg",
      title: "Изучаем конкурентов",
      text: "Проводим конкурентный анализ в вашей нише — смотрим, что работает, что нет, находим точки отстройки и сильные решения.",
    },
    {
      icon: "assets/proc-search-sq.svg",
      title: "Семантика и структура сайта",
      text: "Если дизайн с нуля — собираем базовую семантику запросов для проработки правильной структуры страниц и навигации.",
    },
    {
      icon: "assets/proc-widget.svg",
      title: "Прототип страниц и согласование",
      text: "Создаём прототипы ключевых страниц, прорабатываем UX-сценарии и согласовываем структуру с вами до перехода к визуалу.",
    },
    {
      icon: "assets/proc-palette.svg",
      title: "Разработка фирменного стиля",
      text: "Формируем визуальный язык сайта или LP: шрифтовые пары, цветовые палитры, стиль изображений и графических элементов.",
    },
    {
      icon: "assets/proc-rocket.svg",
      title: "Чистовой дизайн и контент",
      text: "Финальный дизайн всех страниц + создание контента: пишем тексты, обрабатываем или генерируем изображения.",
    },
  ],
  promo: [
    {
      icon: "assets/proc-bulb.svg",
      title: "Отправляете задачу",
      text: "Рассказываете о цели: рост органического трафика, запуск рекламы, комплексное продвижение или разовый аудит.",
    },
    {
      icon: "assets/proc-task.svg",
      title: "Аудит и согласование плана",
      text: "Проводим первичный аудит, оцениваем текущее состояние сайта и согласовываем план работ согласно итоговой цели.",
    },
    {
      icon: "assets/proc-heartrate.svg",
      title: "Комплексный аудит сайта",
      text: "Глубокий технический, SEO и контентный аудит. Анализируем скорость, структуру, семантику, ссылочный профиль и юзабилити.",
    },
    {
      icon: "assets/proc-wand.svg",
      title: "Оптимизация сайта, работа с семантикой",
      text: "По результатам аудита расставляем приоритеты: что даст быстрый результат, что требует системной работы, что критично.",
    },
    {
      icon: "assets/proc-megaphone.svg",
      title: "Запуск рекламы по выбранным каналам",
      text: "Оптимизируем сайт по техническим и SEO-параметрам, настраиваем и запускаем рекламу в согласованных каналах.",
    },
    {
      icon: "assets/proc-team.svg",
      title: "Отчёт по результатам",
      text: "Регулярно предоставляем понятные отчёты с ключевыми метриками за указанный период. Прозрачно, без лишних слов.",
    },
  ],
};

let phoneCountryCode = "ru";
let callbackPhoneCountryCode = "ru";
let selectedCallTime = "";
let attachState = "idle";

function closeMobileNav() {
  if (nav) {
    nav.classList.remove("is-open");
  }
}

function setFormStatus(text, type) {
  if (!formStatus) {
    return;
  }
  formStatus.textContent = text;
  formStatus.className = "form__status" + (type ? " form__status--" + type : "");
}

function onNavLinkClick() {
  closeMobileNav();
}

function onBurgerClick() {
  if (nav) {
    nav.classList.toggle("is-open");
  }
}

function findCountry(code) {
  return PHONE_COUNTRIES.find((item) => item.code === code) || PHONE_COUNTRIES[0];
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function applyPhoneMask(digits, mask) {
  let result = "";
  let digitIndex = 0;
  for (let i = 0; i < mask.length; i += 1) {
    if (digitIndex >= digits.length) {
      break;
    }
    if (mask[i] === "#") {
      result += digits[digitIndex];
      digitIndex += 1;
    } else {
      result += mask[i];
    }
  }
  return result;
}

function formatPhoneValue(raw, country) {
  let digits = onlyDigits(raw);
  const dialDigits = onlyDigits(country.dial);
  if (digits.startsWith(dialDigits)) {
    digits = digits.slice(dialDigits.length);
  }
  if (country.code === "ru" && digits.startsWith("8") && digits.length === 11) {
    digits = digits.slice(1);
  }
  digits = digits.slice(0, country.digits);
  const local = applyPhoneMask(digits, country.mask);
  if (!local) {
    return country.dial + " ";
  }
  return country.dial + " " + local;
}

function isPhoneComplete(value, country) {
  return onlyDigits(value).length >= onlyDigits(country.dial).length + country.digits;
}

function phonePlaceholder(country) {
  return country.dial + " " + country.mask.replace(/#/g, "_");
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return bytes + " B";
  }
  if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + " KB";
  }
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function getFileExtension(name) {
  const parts = String(name || "").split(".");
  return parts.length > 1 ? parts.pop().toLowerCase() : "";
}

function getProcessIconPoints(col) {
  const gridRect = processGrid.getBoundingClientRect();
  return [...col.querySelectorAll(".process-step")].map((step) => {
    const icon = step.querySelector(".process-step__icon");
    const iconRect = icon.getBoundingClientRect();
    const stepRect = step.getBoundingClientRect();
    return {
      x: iconRect.left + iconRect.width / 2 - gridRect.left,
      y: iconRect.top + iconRect.height / 2 - gridRect.top,
      top: iconRect.top - gridRect.top,
      bottom: iconRect.bottom - gridRect.top,
      stepBottom: stepRect.bottom - gridRect.top,
    };
  });
}

function appendProcessSegments(pathParts, points) {
  for (let i = 0; i < points.length - 1; i += 1) {
    const from = points[i];
    const to = points[i + 1];
    pathParts.push(`M ${from.x} ${from.bottom} L ${to.x} ${to.top}`);
  }
}

function appendProcessBridge(pathParts, lastLeft, firstRight, underY) {
  const startX = lastLeft.x;
  const startY = lastLeft.bottom;
  const endX = firstRight.x;
  const endY = firstRight.y;
  const gutterX = endX - 40;
  const radius = 8;
  const r = Math.min(
    radius,
    Math.max(2, (underY - startY) / 2),
    Math.max(2, (gutterX - startX) / 2),
    Math.max(2, (underY - endY) / 2),
    Math.max(2, (endX - gutterX) / 2)
  );

  pathParts.push(
    [
      `M ${startX} ${startY}`,
      `L ${startX} ${underY - r}`,
      `A ${r} ${r} 0 0 0 ${startX + r} ${underY}`,
      `L ${gutterX - r} ${underY}`,
      `A ${r} ${r} 0 0 0 ${gutterX} ${underY - r}`,
      `L ${gutterX} ${endY + r}`,
      `A ${r} ${r} 0 0 1 ${gutterX + r} ${endY}`,
      `L ${endX} ${endY}`,
    ].join(" ")
  );
}

function updateProcessPath() {
  if (!processGrid) {
    return;
  }

  const cols = [...processGrid.querySelectorAll(".process__col")];
  let svg = processGrid.querySelector(".process__path");
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("process__path");
    svg.setAttribute("aria-hidden", "true");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    line.classList.add("process__path-line");
    svg.appendChild(line);
    processGrid.insertBefore(svg, processGrid.firstChild);
  }

  const line = svg.querySelector(".process__path-line");
  const width = processGrid.clientWidth;
  let height = processGrid.clientHeight;

  const left = cols[0] ? getProcessIconPoints(cols[0]) : [];
  const right = cols[1] ? getProcessIconPoints(cols[1]) : [];

  if (!left.length) {
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    line.setAttribute("d", "");
    return;
  }

  const stacked =
    !right.length || right[0].y >= left[left.length - 1].bottom - 2;

  const pathParts = [];

  if (stacked) {
    appendProcessSegments(pathParts, left.concat(right));
  } else {
    appendProcessSegments(pathParts, left);
    const lastLeft = left[left.length - 1];
    const firstRight = right[0];
    const underY = lastLeft.stepBottom + 28;
    height = Math.max(height, underY + 2);
    appendProcessBridge(pathParts, lastLeft, firstRight, underY);
    appendProcessSegments(pathParts, right);
  }

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  line.setAttribute("d", pathParts.join(" "));
}

function scheduleProcessPathUpdate() {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(updateProcessPath);
  });
}

function renderProcessSteps(tabKey) {
  if (!processGrid) {
    return;
  }
  const steps = PROCESS_DATA[tabKey] || PROCESS_DATA.dev;
  const mid = Math.floor(steps.length / 2);
  const columns = [steps.slice(0, mid), steps.slice(mid)];
  processGrid.innerHTML = columns
    .map((col) => {
      const items = col
        .map(
          (step) =>
            `<article class="process-step">
              <div class="process-step__icon">
                <img src="${step.icon}" alt="" />
              </div>
              <div>
                <h3>${step.title}</h3>
                <p>${step.text}</p>
              </div>
            </article>`
        )
        .join("");
      return `<div class="process__col">${items}</div>`;
    })
    .join("");
  scheduleProcessPathUpdate();
}

function initProcessTabsScrollHint() {
  if (!processTabs) {
    return;
  }

  const wrap = processTabs.closest(".process-tabs-wrap");
  if (!wrap) {
    return;
  }

  let startScrollLeft = 0;
  let armed = false;

  function isMobileTabs() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  function updateScrollable() {
    if (!isMobileTabs()) {
      wrap.classList.remove("is-scrollable");
      return;
    }
    const maxScroll = processTabs.scrollWidth - processTabs.clientWidth;
    const canScroll = maxScroll > 4;
    const atEnd = processTabs.scrollLeft >= maxScroll - 4;
    wrap.classList.toggle("is-scrollable", canScroll && !atEnd);
  }

  function dismissHint() {
    wrap.classList.add("is-hint-done");
    updateScrollable();
  }

  function arm() {
    if (armed) {
      return;
    }
    armed = true;
    startScrollLeft = processTabs.scrollLeft;
    updateScrollable();
  }

  updateScrollable();

  processTabs.addEventListener(
    "scroll",
    () => {
      updateScrollable();
      if (!armed) {
        startScrollLeft = processTabs.scrollLeft;
        return;
      }
      if (Math.abs(processTabs.scrollLeft - startScrollLeft) > 24) {
        dismissHint();
      }
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    startScrollLeft = processTabs.scrollLeft;
    updateScrollable();
  });

  window.setTimeout(arm, 400);

  if (typeof IntersectionObserver !== "undefined") {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            arm();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(wrap);
  }

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => {
      updateScrollable();
    });
    observer.observe(processTabs);
  }
}

function onProcessTabClick(event) {
  const button = event.target.closest("[data-process-tab]");
  if (!button || !processTabs) {
    return;
  }
  const tabKey = button.getAttribute("data-process-tab");
  processTabs.querySelectorAll("[data-process-tab]").forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
  renderProcessSteps(tabKey);
}

function buildCountryMenu(menuEl, currentCode, onPick) {
  if (!menuEl) {
    return;
  }
  menuEl.innerHTML = PHONE_COUNTRIES.map((country) => {
    const selected = country.code === currentCode ? " is-selected" : "";
    return `<button type="button" class="phone-country__option${selected}" data-country="${country.code}" role="option">
      <img src="${country.flag}" alt="" width="24" height="18" />
      <span>${country.name}</span>
      <span class="phone-country__dial">${country.dial}</span>
    </button>`;
  }).join("");
  menuEl.querySelectorAll("[data-country]").forEach((btn) => {
    btn.addEventListener("click", () => {
      onPick(btn.getAttribute("data-country"));
    });
  });
}

function syncPhoneField(rootId, countryCode, keepDigits) {
  const root = document.getElementById(rootId);
  if (!root) {
    return;
  }
  const country = findCountry(countryCode);
  const flagImg = root.querySelector("[data-phone-flag]");
  const input = root.querySelector("input[type='tel']");
  const dialHint = root.querySelector("[data-phone-dial]");
  if (flagImg) {
    flagImg.src = country.flag;
    flagImg.alt = country.name;
  }
  if (dialHint) {
    dialHint.textContent = country.dial;
  }
  if (input) {
    const digits = keepDigits ? onlyDigits(input.value) : "";
    input.placeholder = phonePlaceholder(country);
    input.value = digits ? formatPhoneValue(digits, country) : "";
    input.dataset.country = country.code;
  }
}

function onPhoneInput(event) {
  const input = event.target;
  const root = input.closest("[data-phone-root]");
  if (!root) {
    return;
  }
  const isCallback = root.id === "callback-phone";
  const code = isCallback ? callbackPhoneCountryCode : phoneCountryCode;
  const country = findCountry(code);
  const caretEnd = input.selectionStart === input.value.length;
  input.value = formatPhoneValue(input.value, country);
  if (caretEnd) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

const floatingMenuHosts = new WeakMap();

function mountFloatingMenu(menu, anchorEl, options) {
  if (!menu || !anchorEl) {
    return;
  }
  const settings = options || {};
  if (!floatingMenuHosts.has(menu)) {
    floatingMenuHosts.set(menu, {
      parent: menu.parentElement,
      next: menu.nextSibling,
    });
  }
  if (menu.parentElement !== document.body) {
    document.body.appendChild(menu);
  }
  menu.classList.add("is-floating");
  menu.hidden = false;
  positionFloatingMenu(menu, anchorEl, settings);
}

function positionFloatingMenu(menu, anchorEl, options) {
  const settings = options || {};
  const rect = anchorEl.getBoundingClientRect();
  const gap = 6;
  const minWidth = settings.minWidth || rect.width;
  const width = Math.max(rect.width, minWidth);
  let left = rect.left;
  if (left + width > window.innerWidth - 8) {
    left = Math.max(8, window.innerWidth - width - 8);
  }
  menu.style.position = "fixed";
  menu.style.left = `${Math.round(left)}px`;
  menu.style.width = `${Math.round(width)}px`;
  menu.style.right = "auto";
  menu.style.zIndex = "3000";

  const menuHeight = Math.min(
    settings.maxHeight || 280,
    menu.scrollHeight || 280
  );
  const spaceBelow = window.innerHeight - rect.bottom - gap;
  const spaceAbove = rect.top - gap;
  const openUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;

  if (openUp) {
    menu.style.top = "auto";
    menu.style.bottom = `${Math.round(window.innerHeight - rect.top + gap)}px`;
    menu.style.maxHeight = `${Math.round(Math.min(280, Math.max(120, spaceAbove - 8)))}px`;
  } else {
    menu.style.bottom = "auto";
    menu.style.top = `${Math.round(rect.bottom + gap)}px`;
    menu.style.maxHeight = `${Math.round(Math.min(280, Math.max(120, spaceBelow - 8)))}px`;
  }
}

function unmountFloatingMenu(menu) {
  if (!menu) {
    return;
  }
  const host = floatingMenuHosts.get(menu);
  menu.classList.remove("is-floating");
  menu.style.position = "";
  menu.style.left = "";
  menu.style.width = "";
  menu.style.right = "";
  menu.style.top = "";
  menu.style.bottom = "";
  menu.style.maxHeight = "";
  menu.style.zIndex = "";
  if (!host || !host.parent) {
    return;
  }
  if (menu.parentElement === host.parent) {
    return;
  }
  if (host.next && host.next.parentNode === host.parent) {
    host.parent.insertBefore(menu, host.next);
  } else {
    host.parent.appendChild(menu);
  }
}

function closeAllCountryMenus() {
  document.querySelectorAll(".phone-country").forEach((el) => {
    el.classList.remove("is-open");
  });
  document.querySelectorAll(".phone-country__menu").forEach((menu) => {
    unmountFloatingMenu(menu);
    menu.hidden = true;
  });
}

function findHostedMenu(wrap, selector) {
  const local = wrap.querySelector(selector);
  if (local) {
    return local;
  }
  return [...document.querySelectorAll(selector)].find((menu) => {
    const host = floatingMenuHosts.get(menu);
    return Boolean(host && host.parent && (host.parent === wrap || wrap.contains(host.parent)));
  });
}

function onCountryToggle(event) {
  const toggle = event.target.closest("[data-country-toggle]");
  if (!toggle) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  const wrap = toggle.closest(".phone-country");
  if (!wrap) {
    return;
  }
  const menu = findHostedMenu(wrap, ".phone-country__menu");
  const willOpen = !wrap.classList.contains("is-open");
  closeAllCountryMenus();
  closeTimeMenu();
  if (willOpen && menu) {
    wrap.classList.add("is-open");
    mountFloatingMenu(menu, toggle, { minWidth: 220 });
  }
}

function setContactCountry(code) {
  phoneCountryCode = code;
  syncPhoneField("contact-phone", code, true);
  buildCountryMenu(document.getElementById("contact-country-menu"), code, setContactCountry);
  closeAllCountryMenus();
}

function setCallbackCountry(code) {
  callbackPhoneCountryCode = code;
  syncPhoneField("callback-phone", code, true);
  buildCountryMenu(
    document.getElementById("callback-country-menu"),
    code,
    setCallbackCountry
  );
  closeAllCountryMenus();
}

function setAttachIdle() {
  attachState = "idle";
  if (!attachRoot) {
    return;
  }
  attachRoot.dataset.state = "idle";
  attachRoot.innerHTML = `
    <label class="btn btn--attach attach-trigger">
      <img class="attach-trigger__icon" src="assets/icon-paperclip.svg" alt="" width="24" height="24" />
      <img class="attach-trigger__icon attach-trigger__icon--pressed" src="assets/icon-paperclip-dark.svg" alt="" width="24" height="24" />
      ПРИКРЕПИТЬ ФАЙЛ
      <input class="visually-hidden" id="file-input" type="file" name="file" accept=".pdf,.docx,.png,application/pdf,image/png" />
    </label>
    <div>
      <p class="form__attach-hint">
        Сюда можно прикрепить бриф, ТЗ или любой другой документ<br />
        Форматы: PDF, DOCX, PNG, весом до 20 МБ
      </p>
    </div>`;
  const input = document.getElementById("file-input");
  if (input) {
    input.addEventListener("change", onFileChange);
  }
}

function setAttachLoading(file) {
  attachState = "loading";
  if (!attachRoot) {
    return;
  }
  attachRoot.dataset.state = "loading";
  attachRoot.innerHTML = `
    <div class="attach-card attach-card--loading" aria-live="polite">
      <div class="attach-card__row">
        <img class="attach-card__loader" src="assets/icon-loader.svg" alt="" width="16" height="16" />
        <span class="attach-card__name">${file.name}</span>
        <span class="attach-card__pct" id="attach-pct">0%</span>
      </div>
      <div class="attach-card__bar"><span id="attach-bar" style="width:0%"></span></div>
    </div>`;
}

function setAttachUploaded(file) {
  attachState = "uploaded";
  if (!attachRoot) {
    return;
  }
  attachRoot.dataset.state = "uploaded";
  attachRoot.innerHTML = `
    <div class="attach-card attach-card--uploaded">
      <div class="attach-card__meta">
        <div class="attach-card__icon-wrap">
          <img src="assets/icon-file-text-dark.svg" alt="" width="18" height="18" />
        </div>
        <div>
          <p class="attach-card__name">${file.name}</p>
          <p class="attach-card__size">${formatFileSize(file.size)}</p>
        </div>
      </div>
      <button type="button" class="attach-card__remove" id="attach-remove" aria-label="Удалить файл">
        <img src="assets/icon-attach-x.svg" alt="" width="24" height="24" />
      </button>
    </div>
    <input class="visually-hidden" id="file-input" type="file" name="file" accept=".pdf,.docx,.png,application/pdf,image/png" />`;
  const removeBtn = document.getElementById("attach-remove");
  if (removeBtn) {
    removeBtn.addEventListener("click", onAttachRemove);
  }
  const input = document.getElementById("file-input");
  if (input) {
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
  }
}

function setAttachError(fileName, message) {
  attachState = "error";
  if (!attachRoot) {
    return;
  }
  attachRoot.dataset.state = "error";
  attachRoot.innerHTML = `
    <div class="attach-card attach-card--error">
      <button type="button" class="attach-card__remove" id="attach-remove" aria-label="Закрыть">
        <img src="assets/icon-attach-x-light.svg" alt="" width="24" height="24" />
      </button>
      <div class="attach-card__row">
        <img src="assets/icon-alert.svg" alt="" width="16" height="16" />
        <span class="attach-card__name">${fileName}</span>
      </div>
      <p class="attach-card__error">${message}</p>
      <button type="button" class="attach-card__retry" id="attach-retry">Загрузить другой файл</button>
    </div>
    <input class="visually-hidden" id="file-input" type="file" name="file" accept=".pdf,.docx,.png,application/pdf,image/png" />`;
  const removeBtn = document.getElementById("attach-remove");
  const retryBtn = document.getElementById("attach-retry");
  const input = document.getElementById("file-input");
  if (removeBtn) {
    removeBtn.addEventListener("click", onAttachRemove);
  }
  if (retryBtn && input) {
    retryBtn.addEventListener("click", () => input.click());
  }
  if (input) {
    input.addEventListener("change", onFileChange);
  }
}

function onAttachRemove() {
  setAttachIdle();
}

function onFileChange(event) {
  const input = event.target;
  const file = input.files && input.files[0];
  if (!file) {
    setAttachIdle();
    return;
  }
  const ext = getFileExtension(file.name);
  if (!ALLOWED_FILE_EXT.includes(ext)) {
    setAttachError(file.name, "Допустимы только PDF, DOCX, PNG");
    return;
  }
  if (file.size > MAX_FILE_BYTES) {
    setAttachError(file.name, "Превышен лимит размера (max 20MB)");
    return;
  }
  setAttachLoading(file);
  const pctEl = document.getElementById("attach-pct");
  const barEl = document.getElementById("attach-bar");
  let progress = 0;
  const timer = window.setInterval(() => {
    progress += 20;
    if (pctEl) {
      pctEl.textContent = Math.min(progress, 100) + "%";
    }
    if (barEl) {
      barEl.style.width = Math.min(progress, 100) + "%";
    }
    if (progress >= 100) {
      window.clearInterval(timer);
      setAttachUploaded(file);
    }
  }, 80);
}

async function onFormSubmit(event) {
  event.preventDefault();
  if (!form) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  const submitDefaultLabel = "Отправить";
  const phoneInput = form.querySelector("#phone");
  const country = findCountry(phoneCountryCode);
  if (phoneInput && !isPhoneComplete(phoneInput.value, country)) {
    setFormStatus("Введите корректный номер телефона", "error");
    return;
  }

  setFormStatus("Отправляем…", "pending");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.remove("is-success");
    submitBtn.textContent = submitDefaultLabel;
  }

  try {
    const response = await fetch("send.php", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    let payload = {};
    try {
      payload = await response.json();
    } catch (parseError) {
      payload = {};
    }

    if (!response.ok || !payload.ok) {
      setFormStatus(payload.error || "Ошибка отправки. Попробуйте ещё раз.", "error");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = submitDefaultLabel;
      }
      return;
    }

    form.reset();
    phoneCountryCode = "ru";
    syncPhoneField("contact-phone", "ru", false);
    setAttachIdle();
    setFormStatus(payload.message || "Заявка отправлена.", "success");
    if (submitBtn) {
      submitBtn.classList.add("is-success");
      submitBtn.textContent = "ОТПРАВЛЕНО!";
      submitBtn.disabled = true;
    }
  } catch (error) {
    setFormStatus("Сеть недоступна. Напишите на info@sniper-search.ru", "error");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = submitDefaultLabel;
      submitBtn.classList.remove("is-success");
    }
  }
}

function openCallbackModal(event) {
  if (event) {
    event.preventDefault();
  }
  if (!callbackModal) {
    return;
  }
  callbackModal.hidden = false;
  document.body.classList.add("is-modal-open");
  showCallbackFormView();
  const firstInput = callbackModal.querySelector("#callback-name");
  if (firstInput) {
    firstInput.focus();
  }
}

function closeCallbackModal() {
  if (!callbackModal) {
    return;
  }
  callbackModal.hidden = true;
  document.body.classList.remove("is-modal-open");
  closeAllCountryMenus();
  closeTimeMenu();
  resetCallbackForm();
}

function showCallbackFormView() {
  if (callbackForm) {
    callbackForm.hidden = false;
  }
  if (callbackSuccess) {
    callbackSuccess.hidden = true;
  }
  clearCallbackErrors();
}

function showCallbackSuccessView() {
  if (callbackForm) {
    callbackForm.hidden = true;
  }
  if (callbackSuccess) {
    callbackSuccess.hidden = false;
  }
}

function clearCallbackErrors() {
  if (!callbackForm) {
    return;
  }
  callbackForm.querySelectorAll(".modal-field").forEach((field) => {
    field.classList.remove("is-error");
  });
  callbackForm.querySelectorAll(".modal-field__error").forEach((el) => {
    el.textContent = "";
  });
}

function setCallbackFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) {
    return;
  }
  field.classList.add("is-error");
  const errorEl = field.querySelector(".modal-field__error");
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function closeTimeMenu() {
  const menu = document.getElementById("callback-time-menu");
  const trigger = document.getElementById("callback-time-trigger");
  if (menu) {
    unmountFloatingMenu(menu);
    menu.hidden = true;
  }
  if (trigger) {
    trigger.setAttribute("aria-expanded", "false");
  }
}

function renderTimeMenu() {
  const menu = document.getElementById("callback-time-menu");
  if (!menu) {
    return;
  }
  menu.innerHTML = CALL_TIMES.map((time) => {
    const selected = time === selectedCallTime ? " is-selected" : "";
    return `<button type="button" class="modal-select__option${selected}" data-time="${time}" role="option">${time}</button>`;
  }).join("");
  menu.querySelectorAll("[data-time]").forEach((btn) => {
    btn.addEventListener("click", onTimeOptionClick);
  });
}

function onTimeOptionClick(event) {
  const btn = event.currentTarget;
  selectedCallTime = btn.getAttribute("data-time") || "";
  const valueEl = document.getElementById("callback-time-value");
  const hidden = document.getElementById("callback-time");
  if (valueEl) {
    valueEl.textContent = selectedCallTime;
    valueEl.classList.add("is-filled");
  }
  if (hidden) {
    hidden.value = selectedCallTime;
  }
  closeTimeMenu();
  renderTimeMenu();
}

function onTimeTriggerClick(event) {
  event.preventDefault();
  event.stopPropagation();
  const menu = document.getElementById("callback-time-menu");
  const trigger = document.getElementById("callback-time-trigger");
  if (!menu || !trigger) {
    return;
  }
  const willOpen = menu.hidden;
  closeAllCountryMenus();
  closeTimeMenu();
  if (willOpen) {
    trigger.setAttribute("aria-expanded", "true");
    mountFloatingMenu(menu, trigger, {
      minWidth: trigger.getBoundingClientRect().width,
    });
  }
}

function resetCallbackForm() {
  selectedCallTime = "";
  callbackPhoneCountryCode = "ru";
  if (callbackForm) {
    callbackForm.reset();
  }
  const valueEl = document.getElementById("callback-time-value");
  const hidden = document.getElementById("callback-time");
  if (valueEl) {
    valueEl.textContent = "Выберите время";
    valueEl.classList.remove("is-filled");
  }
  if (hidden) {
    hidden.value = "";
  }
  syncPhoneField("callback-phone", "ru", false);
  clearCallbackErrors();
  renderTimeMenu();
  showCallbackFormView();
}

function validateCallbackForm() {
  clearCallbackErrors();
  let valid = true;
  const nameInput = document.getElementById("callback-name");
  const phoneInput = document.getElementById("callback-phone-input");
  const country = findCountry(callbackPhoneCountryCode);

  if (!nameInput || nameInput.value.trim() === "") {
    setCallbackFieldError("callback-field-name", "Введите ваше имя");
    valid = false;
  }
  if (!phoneInput || !isPhoneComplete(phoneInput.value, country)) {
    setCallbackFieldError("callback-field-phone", "Введите корректный номер телефона");
    valid = false;
  }
  if (!selectedCallTime) {
    setCallbackFieldError("callback-field-time", "Выберите удобное время");
    valid = false;
  }
  return valid;
}

async function onCallbackSubmit(event) {
  event.preventDefault();
  if (!callbackForm) {
    return;
  }
  if (!validateCallbackForm()) {
    return;
  }

  const submitBtn = callbackForm.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
  }

  try {
    const response = await fetch("send.php", {
      method: "POST",
      body: new FormData(callbackForm),
      headers: {
        Accept: "application/json",
      },
    });
    let payload = {};
    try {
      payload = await response.json();
    } catch (parseError) {
      payload = {};
    }
    if (!response.ok || !payload.ok) {
      setCallbackFieldError(
        "callback-field-name",
        payload.error || "Ошибка отправки. Попробуйте ещё раз."
      );
      return;
    }
    showCallbackSuccessView();
  } catch (error) {
    setCallbackFieldError("callback-field-name", "Сеть недоступна. Попробуйте позже.");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
}

function onDocumentClick(event) {
  if (
    !event.target.closest(".phone-country") &&
    !event.target.closest(".phone-country__menu")
  ) {
    closeAllCountryMenus();
  }
  if (
    !event.target.closest(".modal-select") &&
    !event.target.closest(".modal-select__menu")
  ) {
    closeTimeMenu();
  }
}

function onDocumentKeydown(event) {
  if (event.key === "Escape") {
    closeCallbackModal();
    closeAllCountryMenus();
    closeTimeMenu();
  }
}

function onModalBackdropClick(event) {
  if (event.target === callbackModal) {
    closeCallbackModal();
  }
}

if (burger) {
  burger.addEventListener("click", onBurgerClick);
}

if (nav) {
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", onNavLinkClick);
  });
}

if (processTabs) {
  processTabs.addEventListener("click", onProcessTabClick);
  renderProcessSteps("dev");
  initProcessTabsScrollHint();
}

if (processGrid) {
  window.addEventListener("resize", scheduleProcessPathUpdate);
  if (typeof ResizeObserver !== "undefined") {
    const processResizeObserver = new ResizeObserver(scheduleProcessPathUpdate);
    processResizeObserver.observe(processGrid);
  }
}

document.querySelectorAll("[data-open-callback]").forEach((el) => {
  el.addEventListener("click", openCallbackModal);
});

document.querySelectorAll("[data-close-callback]").forEach((el) => {
  el.addEventListener("click", closeCallbackModal);
});

if (callbackModal) {
  callbackModal.addEventListener("click", onModalBackdropClick);
}

if (callbackForm) {
  callbackForm.addEventListener("submit", onCallbackSubmit);
}

const timeTrigger = document.getElementById("callback-time-trigger");
if (timeTrigger) {
  timeTrigger.addEventListener("click", onTimeTriggerClick);
}

document.querySelectorAll("[data-phone-root] input[type='tel']").forEach((input) => {
  input.addEventListener("input", onPhoneInput);
});

document.querySelectorAll("[data-country-toggle]").forEach((btn) => {
  btn.addEventListener("click", onCountryToggle);
});

buildCountryMenu(document.getElementById("contact-country-menu"), phoneCountryCode, setContactCountry);
buildCountryMenu(
  document.getElementById("callback-country-menu"),
  callbackPhoneCountryCode,
  setCallbackCountry
);
syncPhoneField("contact-phone", phoneCountryCode, false);
syncPhoneField("callback-phone", callbackPhoneCountryCode, false);
renderTimeMenu();
setAttachIdle();

if (form) {
  form.addEventListener("submit", onFormSubmit);
}

document.addEventListener("click", onDocumentClick);
document.addEventListener("keydown", onDocumentKeydown);
window.addEventListener("resize", () => {
  closeAllCountryMenus();
  closeTimeMenu();
});
if (callbackModal) {
  callbackModal.addEventListener(
    "scroll",
    () => {
      closeAllCountryMenus();
      closeTimeMenu();
    },
    { passive: true }
  );
}

const successClose = document.getElementById("callback-success-close");
if (successClose) {
  successClose.addEventListener("click", closeCallbackModal);
}
