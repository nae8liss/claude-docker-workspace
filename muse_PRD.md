# **Product Requirements Document (PRD)**

**Project Name:** Muse Chat Web App
**Goal:** A desktop-first web app for interacting with “Muses” — configurable in-character assistants that reply with narration and an in-depth response. The app should be usable and visible in the browser as soon as possible, with incremental improvements added in clear phases.

---

## **1. Overview**

Muse Chat provides a modern, clean interface for AI-powered conversations. The user interacts with a Muse, which always responds in two parts:

1. **Narration** — A short, italicized statement that is also played via Elevenlabs TTS.
2. **In-depth Response** — The main body of the answer, displayed in regular chat formatting.

The application emphasizes speed of iteration, seeing changes in the browser quickly, and avoiding wasted development effort on unseen backend work.

---

## **2. Key Technologies**

* **UI:** [Shadcn](https://ui.shadcn.com) for general UI
* **AI UI Elements:** Shadcn AI components (no re-implementation of existing ones)
* **LLM:** OpenRouter API via Vercel AI SDK
* **Narration:** Elevenlabs API (v3 beta model)
* **Persistence:** JSON (localStorage) for MVP; Supabase for final stage if everything works
* **Theme:** Dark/Light mode via Shadcn theme toggle

---

## **3. Core Requirements**

### **Muses**

* **Configurable attributes:**

  * Name
  * Title
  * Description
  * System prompt
  * Model & weights (from curated list)
  * Elevenlabs voice (from account owner’s voices only)
  * Narration length (short / medium / long — maps to char count limit)
  * Avatar (uploaded image, cropped for face/head)
* **Persistence:** Stored in local JSON (localStorage). Supabase integration in final stage if MVP successful.
* **Switching:** In MVP, switching Muses is done by editing config, not via in-app browser.

### **Conversation Flow**

* User input triggers both:

  1. **Elevenlabs API call** for narration
  2. **OpenRouter API call** for full response
* Narration text is received, displayed in italics, and played automatically.
* In-depth response streams into chat beneath narration.
* Mute toggle: Disables Elevenlabs API call but still shows narration text.
* No pause, replay, or seeking for narration.

### **UI/UX**

* Desktop-first layout, centered on screen.
* Font size control for chat content (not interface).
* Dark/Light mode toggle.
* Markdown rendering for in-depth responses (via Shadcn AI).
* Config panel for Muse editing.
* Immediate browser visibility with mock data in early phases.

### **Error Handling**

* Minimal but functional:

  * If Elevenlabs call fails → display narration text only.
  * If LLM call fails → show "Muse is unable to respond right now" placeholder.
* No advanced retries or logging (non-commercial use).

### **Performance & Latency**

* Narration starts playback once Elevenlabs audio is ready; in-depth text streams concurrently or after.
* Some wait between input and narration start is acceptable.
* Optional light voice caching later, but not over-engineered.

---

## **4. Development Phases**

### **Phase 1 — UI Skeleton & Mock Data (Day 1 Browser Visibility)**

**Goal:** See the app layout in the browser with fake Muse responses.

* Chat layout using Shadcn AI elements.
* Theme toggle (dark/light).
* Font size adjustment for chat content.
* Muse header with avatar placeholder, name, and title.
* Input box + send button.
* Mock narration (italic) and mock in-depth text displayed in response bubbles.

---

### **Phase 2 — Muse Config & JSON Persistence**

**Goal:** Create, edit, and save Muse configs locally.

* Config modal with fields for all Muse attributes (except Supabase).
* Avatar upload and simple cropping.
* Save/load from localStorage JSON.
* Auto-load last active Muse on app start.

---

### **Phase 3 — LLM Integration (Text Only)**

**Goal:** Replace mock responses with OpenRouter API calls.

* System prompt assembly from Muse config.
* Include narration character count instruction in each LLM call.
* Display narration italicized, then stream in-depth text.
* Fallback text if API fails.

---

### **Phase 4 — Elevenlabs Narration**

**Goal:** Add TTS narration playback.

* Use narration text from LLM to request audio from Elevenlabs (owner’s voices only).
* Autoplay audio on receipt; no controls except mute toggle.
* Skip TTS API call entirely if muted.
* Minimal loading indicator for narration.

---

### **Phase 5 — UX Polish & Light Feature Prep**

**Goal:** Improve usability and set stage for later tools.

* Markdown rendering in in-depth responses (Shadcn AI).
* Responsive design tweaks for smaller screens.
* Basic hooks/placeholders for future features (image commentary, search, .md creation).
* Optional light caching of frequent voices.

---

### **Future Phases (Post-MVP)**

* Muse switching in-app (multi-Muse library).
* Tool calling for image analysis and search.
* Muse temperament sliders, adult mode toggle.
* Search/filter in chat history.
* Supabase persistence.

---

This PRD keeps **day-one visible progress** as the top priority, with mock data letting you validate the look/feel before committing to API logic. Each phase is self-contained but builds on the last, so you can stop at any point with a working app.

---

## **5. Technology Stack & Usage Requirements**

The project **must** use the following stack **in this order of priority**. This ordering ensures that existing, well-tested components are leveraged first, and prevents unnecessary rebuilding of functionality that already exists.

---

### **1. Shadcn UI – General Components**

For **layout and non-AI-specific UI elements**, the app must use Shadcn UI components. Examples include:

* Buttons, modals, sliders, toggles, dropdowns, text inputs, theme switcher, tabs, and general layout containers.
* Dark/Light mode handling.
* Avatar display and image cropping UI.

**Important:**

* Do **not** custom-build basic UI elements unless they do not exist in Shadcn’s library.
* Follow Shadcn styling and design conventions for consistent look & feel.

---

### **2. Shadcn AI Elements – AI-Specific Components**

For **chat-related UI** and AI interaction elements, the app must use Shadcn’s AI-specific components. Examples include:

* Chat bubble layouts (user/assistant).
* Streaming text display.
* Markdown rendering for AI output.
* Typing/loading indicators for AI messages.

**Important:**

* Do **not** reimplement these from scratch.
* Any AI-driven UI must be built on top of these components where available.

---

### **3. Vercel AI SDK**

For **handling LLM calls, streaming, and AI conversation flow**, use the Vercel AI SDK.

* Streaming responses from OpenRouter.
* Handling of system prompts, message histories, and structured output.
* Direct integration with UI components from Shadcn AI elements where possible.

**Important:**

* Do **not** create custom fetch/streaming logic for LLM calls unless the Vercel AI SDK cannot support the required feature.
* SDK usage must be the default approach for sending/receiving LLM responses.

---

### **4. APIs**

* **LLM:** OpenRouter API (accessed via Vercel AI SDK).
* **TTS:** Elevenlabs v3 beta model (owner’s voices only, fetched via Elevenlabs API).
* **Storage (MVP):** LocalStorage with JSON persistence.
* **Storage (Final):** Supabase if MVP is successful.

---

**Emphasis:**
Any time a required feature is already available within **Shadcn UI**, **Shadcn AI Elements**, or **Vercel AI SDK**, it **must** be used as-is instead of building custom equivalents. Custom implementations are only allowed for features not present in these libraries.
