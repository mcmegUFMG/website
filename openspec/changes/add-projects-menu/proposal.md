# Proposal

## Why

The MCMEG website needs to present two key high-impact research projects:
1. The approved Latin American TBI Network project (MCTI/CNPq 02/2026 - Pepe Mujica Program) for computational modeling, calibration, advanced dosimetry, and artificial intelligence in Total Body Irradiation.
2. The REMPTO project (Artificial Intelligence applied to Oncology) developed in collaboration between Instituto Mário Penna and MCMEG/UFMG, including a direct link to the histopathology image database.

Adding these projects increases visibility of active scientific initiatives, facilitates international collaboration across Latin America, and allows researchers and students to access project descriptions (in Portuguese and English) and open data repositories.

## What Changes

- Add a "Projects" navigation section in the site menu or dedicated project pages:
  - Page/tab for the Latin American TBI Network (Pepe Mujica Program - MCTI/CNPq 02/2026), presenting bilingual content (Portuguese and English) with project overview, participating countries/institutions (Argentina, Brazil, Chile, Mexico, Peru), methodologies (Monte Carlo, AI, TLDs, OSL, 3D printing of phantoms), and objectives.
  - Page/tab for REMPTO ("Inteligência Artificial aplicada à Oncologia"), presenting project description, collaboration with Instituto Mário Penna, and link to the open dataset at `https://rempto-ai.github.io/mcmegUFMG-rempto_database_histopatology/index.html`.
- Update navigation bars across all site pages (`index.html`, `about.html`, `researchers.html`, `book.html`, `course.html`, `internal-dosimetry.html`, `students.html`, `contact.html`).
- Ensure `site.js` and responsive mobile menus correctly reflect the updated navigation structure without breaking existing tabs.

## Capabilities

### New Capabilities
- `projects-showcase`: Displaying MCMEG's research projects, including the bilingual TBI Latin American Network and REMPTO AI in Oncology with links to open databases.

### Modified Capabilities
None.

## Impact
- Affected pages: `index.html`, `about.html`, `researchers.html`, `book.html`, `course.html`, `internal-dosimetry.html`, `students.html`, `contact.html`, and new project pages (`projects.html` or `project-tbi.html` & `project-rempto.html`).
- Affected scripts: `assets/site.js` and `assets/styles.css` (menu styles if dropdown or layout adjustments are required).
