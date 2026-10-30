# Spec Delta

## Purpose

Enables the MCMEG website to showcase research projects, specifically the Latin American TBI Network (Pepe Mujica Program) and the REMPTO AI Oncology project, with bilingual descriptions and external repository links.

## ADDED Requirements

### Requirement: Latin American TBI Network Project Showcase
The website SHALL provide a dedicated project view for the Latin American TBI Network (MCTI/CNPq 02/2026 - Programa Pepe Mujica) with complete descriptions in both Portuguese and English.

#### Scenario: User visits the TBI project section
- **WHEN** a user navigates to the TBI Network project section
- **THEN** the system displays the call reference (MCTI/CNPq Nº 02/2026 - Faixa A), the program acronym (Programa Pepe Mujica), the full title, and the abstract in Portuguese followed by English, detailing the collaboration across Argentina, Brazil, Chile, Mexico, and Peru.

### Requirement: REMPTO AI in Oncology Project Showcase
The website SHALL provide a dedicated project view for the REMPTO project ("Inteligência Artificial aplicada à Oncologia") in collaboration with Instituto Mário Penna, with project details and a direct link to the histopathology database.

#### Scenario: User visits the REMPTO project section
- **WHEN** a user navigates to the REMPTO project section
- **THEN** the system displays the project title, institutional collaboration details (Instituto Mário Penna and MCMEG/UFMG), project description, and an accessible link button to `https://rempto-ai.github.io/mcmegUFMG-rempto_database_histopatology/index.html`.

### Requirement: Projects Menu Navigation Integration
The website navigation menu SHALL include accessible entry points for both projects on all site pages.

#### Scenario: User navigates across website pages
- **WHEN** a user opens any page of the MCMEG website
- **THEN** the navigation bar displays the projects menu/tabs, allowing seamless switching between projects and existing sections.
