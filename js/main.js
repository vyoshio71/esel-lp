document.addEventListener("DOMContentLoaded", () => {
  // =============================
  // SCROLL SUAVE
  // =============================
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

  // =============================
  // MÁSCARA TELEFONE
  // =============================
  function maskPhone(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  document.querySelectorAll(".phone-field").forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = maskPhone(e.target.value);
    });
  });

  // =============================
  // SUBMIT DOS FORMULÁRIOS (AJAX + conversão)
  // =============================
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const phone = form.querySelector(".phone-field")?.value || "";

      if (phone.length < 14) {
        alert("Informe um telefone válido.");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      const payload = {};
      new FormData(form).forEach((value, key) => {
        payload[key] = value;
      });

      fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          const ok = data && (data.success === true || data.success === "true");
          if (!ok) throw new Error("formsubmit_error");

          const successEl =
            form.parentElement.querySelector(".lead-form__success");
          form.hidden = true;
          if (successEl) {
            successEl.hidden = false;
            successEl.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        })
        .catch(() => {
          alert(
            "Não foi possível enviar agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp."
          );
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
        });
    });
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
