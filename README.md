# Books Finder

A simple and modern `React` web application to search and explore books using the `Open Library API`. Users can search books by title, browse results as cards, view detailed information, and navigate using pagination.

## Project Overview

**Book Finder** allows anyone to quickly find books by typing titles in the search box. The app fetches matching book data from the Open Library API and displays results in a clean card layout with cover images, titles, authors, and publication years. Clicking a card opens a modal with more detailed information. The app supports pagination to browse through multiple pages of results.

Designed with a responsive and pleasing UI, featuring a centered container, background image, and smooth modal transitions. The project is perfect for book lovers and developers learning React and API integration.

## Features

- Search for books by title
- View results in a responsive card grid
- Click cards to see detailed book info in modal popup
- Navigate pages with Previous and Next buttons
- Clean, modern UI with background image and smooth animations

## Getting Started

### Prerequisites

- `Node.js` (version 12 or above recommended)
- `npm` (comes with Node.js)

### Installation

1.  Clone the repository:
    ```text
    git clone [https://github.com/your-username/book-finder.git](https://github.com/your-username/book-finder.git)
    ```
2.  Navigate into the project folder:
    ```text
    cd book-finder
    ```
3.  Install dependencies:
    ```text
    npm install
    ```

### Running the App Locally

1.  Start the development server:
    ```text
    npm start
    ```
2.  Open `http://localhost:3000` in your browser to see the app running.

## Usage

1.  Type a book title in the search box.
2.  Browse the list of books displayed as cards.
3.  Click on any book card to open a detailed view.
4.  Use the “colse” button or click outside the modal to close details.
5.  Use “Previous” and “Next” buttons to navigate pages of results.

## Deployment

The app can easily be deployed to GitHub Pages, Netlify, Vercel, or any static site hosting platform.

### Deploying on GitHub Pages

1.  Install the `gh-pages` package:
    ```text
    npm install --save gh-pages
    ```
2.  In `package.json`, add:
    ```json
    "homepage": "[https://your-username.github.io/book-finder](https://your-username.github.io/book-finder)",
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d build"
    }
    ```
3.  Deploy with:
    ```text
    npm run deploy
    ```
4.  Visit the deployment URL to see your live app.

## Technologies Used

- React
- JavaScript (ES6+)
- Open Library API
- CSS (Flexbox and custom styles)

## Folder Structure

```text
book-finder/
├── public/
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── ...
├── package.json
└── README.md
