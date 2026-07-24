const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const form = document.querySelector(".form");
const formStatus = document.getElementById("form-status");
const fileInput = form ? form.querySelector('input[type="file"]') : null;
const fileNameEl = document.getElementById("file-name");

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

function onFileChange() {
  if (!fileInput || !fileNameEl) {
    return;
  }
  const file = fileInput.files && fileInput.files[0];
  fileNameEl.textContent = file ? file.name : "";
}

async function onFormSubmit(event) {
  event.preventDefault();
  if (!form) {
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  setFormStatus("Отправляем…", "pending");
  if (submitBtn) {
    submitBtn.disabled = true;
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
      return;
    }

    form.reset();
    if (fileNameEl) {
      fileNameEl.textContent = "";
    }
    setFormStatus(payload.message || "Заявка отправлена.", "success");
  } catch (error) {
    setFormStatus("Сеть недоступна. Напишите на info@sniper-search.ru", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
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

if (fileInput) {
  fileInput.addEventListener("change", onFileChange);
}

if (form) {
  form.addEventListener("submit", onFormSubmit);
}
