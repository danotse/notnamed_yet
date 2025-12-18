// Select all text steps
const steps = document.querySelectorAll(".step");
const diagramBox = document.querySelector(".diagram-column");
const packet = document.querySelector(".packet");
const statusText = document.querySelector("#status-text");
const hacker = document.querySelector("#hacker");


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove old active class from all steps
        steps.forEach((s) => s.classList.remove("active"));
        // Add active class to current step
        entry.target.classList.add("active");

        // 2. Trigger Diagram Updates based on Step Number
        const stepId = entry.target.dataset.step;
        updateDiagram(stepId);
      }
    });
  },
  { threshold: 0.5 }
); // Trigger when 50% of the text is visible

// Start watching
steps.forEach((step) => observer.observe(step));

// 3. The Logic Function
function updateDiagram(step) {
  // Reset visuals first
  diagramBox.className = "diagram-column";
  hacker.classList.add("hidden");
  statusText.style.color = "#4ade80"; // Reset to default color

  if (step === "1") {
    packet.style.left = "0%";
    packet.style.background = "#4ade80";
    statusText.innerText = "Status: Idle";
  }
  if (step === "2") {
    packet.style.left = "40%"; // Move to DNS
    packet.style.background = "#facc15";
    statusText.innerText = "Status: Looking up IP...";
  }
  if (step === "3") {
    packet.style.left = "100%"; // Reaches server
    packet.style.background = "#4ade80";
    statusText.innerText = "Status: 200 OK (Connected)";
  }
  if (step === "4") {
    packet.style.left = "50%";
    hacker.classList.remove("hidden"); // Show hacker
    diagramBox.classList.add("state-attack"); // Turn things red via CSS
    statusText.innerText = "Status: ⚠️ INTERCEPTED";
    statusText.style.color = "#fb7185";
  }
  if (step === "5") {
    packet.style.left = "100%";
    packet.style.background = "#fb7185";
    hacker.classList.remove("hidden");
    diagramBox.classList.add("state-attack");
    statusText.innerText = "Status: ⚠️ PHISHING ATTEMPT";
    statusText.style.color = "#fb7185";
  }
  if (step === "6") {
    packet.style.left = "100%";
    packet.style.background = "#fb7185";
    hacker.classList.remove("hidden");
    diagramBox.classList.add("state-attack");
    statusText.innerText = "Status: ⚠️ WEAK PASSWORD DETECTED";
    statusText.style.color = "#fb7185";
  }
  if (step === "7") {
    packet.style.left = "100%";
    packet.style.background = "#4ade80";
    hacker.classList.add("hidden");
    diagramBox.classList.remove("state-attack");
    statusText.innerText = "Status: 🔒 HTTPS ENCRYPTED";
    statusText.style.color = "#4ade80";
  }
}
