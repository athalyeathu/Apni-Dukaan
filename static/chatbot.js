// 🧠 Chatbot toggle & logic
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.createElement("div");
  toggleBtn.id = "chatbot-toggle";
  toggleBtn.innerHTML = `<i class="fas fa-comment-dots"></i>`;

  const chatBox = document.createElement("div");
  chatBox.id = "chatbot-box";
  chatBox.innerHTML = `
    <div class="chat-header">
      <span>Apni Dukaan Assistant 🤖</span>
      <button id="close-chat">&times;</button>
    </div>
    <div id="chat-messages"></div>
    <div class="chat-input">
      <input type="text" id="user-input" placeholder="Ask me anything..." />
      <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
    </div>`;

  document.body.appendChild(toggleBtn);
  document.body.appendChild(chatBox);

  const closeBtn = chatBox.querySelector("#close-chat");
  const sendBtn = chatBox.querySelector("#send-btn");
  const input = chatBox.querySelector("#user-input");
  const messages = chatBox.querySelector("#chat-messages");

  toggleBtn.addEventListener("click", () => (chatBox.style.display = "flex"));
  closeBtn.addEventListener("click", () => (chatBox.style.display = "none"));
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    appendMessage("user", text);
    input.value = "";
    setTimeout(() => respond(text), 600);
  }

  function appendMessage(sender, text) {
    const div = document.createElement("div");
    div.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // --- Simple Bot Responses ---
  function respond(query) {
    const q = query.toLowerCase();
    let response;

    if (q.includes("order") || q.includes("track"))
      response = "📦 You can track your order from the 'My Orders' section after login.";
    else if (q.includes("payment") || q.includes("pay"))
      response = "💳 We support Razorpay, UPI, Credit/Debit Cards, and Wallets.";
    else if (q.includes("delivery") || q.includes("ship"))
      response = "🚚 Delivery usually takes 3-5 business days depending on your location.";
    else if (q.includes("offer") || q.includes("discount"))
      response = "🎉 Check our latest deals under the 'Offers' page!";
    else if (q.includes("contact") || q.includes("help"))
      response = "📞 You can reach us anytime through the 'Contact Us' page.";
    else if (q.includes("faq"))
      response = "❓ Visit the FAQ page for common questions and answers.";
    else if (q.includes("category") || q.includes("product"))
      response = "🛍️ Browse products under 'Category' in the navigation bar.";
    else response = "🤖 I'm still learning! Try asking about delivery, payment, or offers.";

    appendMessage("bot", response);
  }
});
