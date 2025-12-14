// Sæt datostart til idag og blocker weekender
const dateInput = document.getElementById("appointmentDate");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

dateInput.addEventListener("input", function () {
  const day = new Date(this.value).getDay();
  if (day === 0 || day === 6) {
    alert("Jeg har desværre lukket i weekenden. Vælg venligst en hverdag.");
    this.value = "";
  }
});

// Marker valgte kategorier
document.addEventListener("change", function (e) {
  const category = e.target.closest(".category");

  if (!category) return;

  // fjern markering fra andre service-kategorier, hvis der vælges en ny service
  if (e.target.name === "service") {
    document.querySelectorAll(".services-fieldset .category").forEach((cat) => cat.removeAttribute("data-selected"));
  }

  category.setAttribute("data-selected", "true");
});

// Form submission
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const service = this.querySelector('input[name="service"]:checked').value;
  const extra = this.querySelectorAll('input[name="extra"]:checked');
  const extraLine = extra.length ? `<p><strong>Extras:</strong> ${[...extra].map((e) => e.value).join(", ")}</p>` : "";
  const dateObj = new Date(this.appointmentDate.value + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
        <p><strong>Service:</strong> ${service}</p>
        ${extraLine}
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${this.appointmentTime.value}</p>
        <p><strong>Phone:</strong> ${this.phone.value}</p>
    `;

  const confirmationBox = document.getElementById("confirmationBox");
  document.getElementById("confirmationDetails").innerHTML = html;
  confirmationBox.classList.remove("hidden");
  confirmationBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
