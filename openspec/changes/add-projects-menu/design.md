# Design

## Context

The current MCMEG website is built with vanilla HTML5, CSS, and minimal JavaScript (`assets/site.js`).
The navigation bar is replicated across all HTML files. Currently, `site.js` contains a script that handles active navigation states and mobile hamburger toggling.

The user requested adding two tabs under a "Projects" menu:
1. **Approved Project: Latin American TBI Network (Pepe Mujica Program - MCTI/CNPq 02/2026)** with full content presented in both Portuguese and English.
2. **REMPTO Project: Artificial Intelligence applied to Oncology** with collaboration details (Instituto Mário Penna & MCMEG/UFMG) and link to the open histopathology database (`https://rempto-ai.github.io/mcmegUFMG-rempto_database_histopatology/index.html`).

## Goals / Non-Goals

**Goals:**
- Provide a clean, intuitive navigation experience for Projects without cluttering the horizontal header bar on desktop or mobile.
- Implement dedicated pages:
  - `project-tbi.html`: Complete documentation of the TBI Latin American Network in Portuguese and English.
  - `project-rempto.html`: Documentation of the REMPTO project with description and direct database access link.
  - `projects.html`: An overview page featuring both projects as tabs/cards for quick browsing.
- Support a dropdown menu for "Projects" in the main navigation bar across all pages:
  - Accessible via hover and click, keyboard-friendly.
  - Fully responsive on mobile with the hamburger menu.
- Update `assets/site.js` and `assets/styles.css` so navigation items (including `Researchers`, `Internal Dosimetry`, and `Projects`) are correctly rendered and styled.

**Non-Goals:**
- Implementing server-side databases or dynamic backend frameworks (site remains static on GitHub Pages).

## Decisions

### 1. Dedicated Pages vs Single Page with Hash Tabs
- **Decision**: Create `projects.html` as the project hub, alongside standalone pages `project-tbi.html` and `project-rempto.html`.
- **Rationale**: Standalone URLs allow direct sharing and deep-linking (e.g. for grant proposals, consortium members from Argentina, Chile, Mexico, Peru), while `projects.html` serves as a central showcase.

### 2. Navigation Bar: Dropdown Menu Component
- **Decision**: Introduce a `.nav-dropdown` pattern in CSS for the "Projects" item.
- **Structure**:
  ```html
  <div class="nav-dropdown">
    <a href="projects.html" class="nav-dropdown-toggle">Projects ▾</a>
    <div class="nav-dropdown-menu">
      <a href="project-tbi.html">TBI Latin American Network</a>
      <a href="project-rempto.html">REMPTO — AI in Oncology</a>
    </div>
  </div>
  ```
- **Rationale**: Keeps the header compact while clearly revealing the two requested project tabs.

### 3. Bilingual Content Presentation for TBI Project
- **Decision**: Provide the complete Portuguese text as specified by the user, followed by an accurate, high-standard academic English translation. Include clear visual language badges (`PT` / `EN`) or bilingual layout cards.

### 4. Updating `assets/site.js` Navigation Handler
- **Decision**: Update `site.js` so it enhances static nav links (active indicator, mobile toggle) without clobbering new nav items or dropdowns with hardcoded arrays.

## Risks / Trade-offs

- [Risk] Horizontal navbar overflowing on medium viewports (tablets / small laptops) due to many links.
  → *Mitigation*: Grouping projects under a dropdown reduces item count; adjust font size/gap in `@media` queries where appropriate.
