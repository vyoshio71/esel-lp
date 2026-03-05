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
  // MÁSCARA CNPJ
  // =============================
  function maskCNPJ(value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }

  document.querySelectorAll(".cnpj-field").forEach((input) => {
    input.addEventListener("input", (e) => {
      e.target.value = maskCNPJ(e.target.value);
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
  // VALIDAÇÃO SIMPLES CNPJ
  // =============================
  function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    return true;
  }

  // =============================
  // SUBMIT DOS FORMULÁRIOS
  // =============================
  document.querySelectorAll(".lead-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      const cnpj = form.querySelector(".cnpj-field")?.value || "";
      const phone = form.querySelector(".phone-field")?.value || "";

      if (cnpj && !isValidCNPJ(cnpj)) {
        alert("Informe um CNPJ válido.");
        return;
      }

      if (phone.length < 15) {
        alert("Informe um telefone válido.");
        return;
      }
    });
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
