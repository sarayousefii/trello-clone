# Trello Clone

A simple Trello clone built with React/Next.js in 1 day for practicing and evaluating frontend skills.

---

## Demo

[Live Demo](#) <!-- optional: add your deployed link here -->

---

## Technologies Used

- **Next.js 15** + **TypeScript**  
- **SCSS** for styling (with variables, mixins, nesting, and partials)  
- **@dnd-kit** for drag & drop functionality  
- **Custom Hooks** and **useState** for state management  
- **localStorage** for data persistence  

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

## Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/sarayousefii/trello-clone.git
```

2.	Navigate into the project directory:
   ```bash
    cd trello-clone 
```

3.	Install dependencies:
   ```bash
    npm install
```

4.	Start the development server:
   ```bash
    npm run dev
```

5.	Open in browser:
   ```bash
    http://localhost:3000
```
---

### Notes

- All data is stored on the client side (no backend required)

- Focused on clean code, TypeScript type safety, and SCSS best practices

- UI/UX is based on the demo reference provided

- Drag & drop for lists and cards is fully functional

```
---

### Folder Structure
trello-clone/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── hooks/               # Custom hooks for state management
├── services/            # Initial data and utilities
├── styles/              # SCSS files (variables, mixins, partials)
├── types/               # TypeScript types
├── public/              # Static assets (icons, images)
├── package.json
└── README.md


```
### License
    This project is for learning and demonstration purposes.