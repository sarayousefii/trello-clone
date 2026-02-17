# Trello Clone

A simple Trello clone built with **Next.js 15 + TypeScript** in 1 day to practice and evaluate frontend engineering skills.

---

## Demo

[Live Demo](https://trello-clone-ls5gal5gs-sars-projects-2bdc65e3.vercel.app/) 

---

## Technologies Used

- **Next.js 15 (App Router)**
- **TypeScript**
- **SCSS** (variables, mixins, nesting, partials)
- **@dnd-kit** for drag & drop functionality
- **Custom Hooks**
- **useState** for state management
- **localStorage** for client-side data persistence

---

## Architecture Overview

- State is lifted to the **Board level** and passed down via props.
- Drag & drop logic is implemented using **@dnd-kit sortable contexts and sensors**.
- Data persistence is abstracted through a small **localStorage service layer**.
- Type definitions are centralized inside the `/types` directory.
- UI is component-driven and structured for reusability.

---

## Technical Decisions

- **localStorage instead of backend**  
  Chosen intentionally to keep the project focused on frontend logic and state handling.

- **@dnd-kit instead of HTML5 drag API**  
  Provides better control, accessibility, and flexibility for sortable lists and cards.

- **SCSS instead of utility-first CSS**  
  Used to demonstrate structured styling architecture, maintainability, and reusable design patterns.

- **TypeScript strict typing**  
  Used to ensure safer state updates and predictable drag-and-drop behavior.

---

## Features

### Board Management
- Editable board title
- Pre-populated demo board

### List Management
- Create, edit, and delete lists
- Horizontal drag & drop for lists

### Card Management
- Create and edit cards
- Vertical drag & drop inside lists
- Drag & drop between lists

### Comments Modal
- Add and view comments for each card in a modal

### Responsive Design
- Desktop layout fully supported
- Basic mobile responsiveness

### Data Persistence
- All data managed on the client
- Stored in localStorage

---

## Folder Structure

```
trello-clone/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── hooks/               # Custom hooks for state management
├── services/            # Data layer and utilities
├── styles/              # SCSS files (variables, mixins, partials)
├── types/               # TypeScript type definitions
├── public/              # Static assets
├── package.json
└── README.md
```

---

## Installation & Running Locally

1. Clone the repository:

```bash
git clone https://github.com/sarayousefii/trello-clone.git
```

2. Navigate into the project directory:

```bash
cd trello-clone
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open in browser:

```
http://localhost:3000
```

---

## Future Improvements

- Add backend integration (API routes or external API)
- Add authentication system
- Add drag animation improvements
- Add unit testing (Jest / React Testing Library)
- Improve mobile UX interactions

---

## Notes

- This project is focused on frontend architecture and state management.
- Built within a 1-day time constraint.
- Emphasis on clean code, reusability, and maintainable styling.

---

## License

This project is for learning and demonstration purposes.
