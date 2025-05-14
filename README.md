# Weather-App

A simple weather application that fetches and displays current weather data for any city using a public weather API.
This project is a learning tool designed to demonstrate modern React and Next.js concepts through a practical application that fetches and displays weather data from the  API.

## Features

- Search for current weather by city name
- Displays 7 cards containing the weather conditions for current day and the next 7 days
-click each card to display max and min temperatures,wind speed 
- Responsive and user-friendly interface

## Project Structure

```
weather-app/
├── ApiClient/          # API client logic
├── app/                # Contains global CSS, layout, and page.jsx
├── components/         # Reusable components (e.g., WeatherCards)
├── images/             # Image assets
├── public/             # Static assets
├── utils/              # Utility functions
├── app/
│   ├── components/     # Reusable React components
│   ├── pages/          # Next.js pages
│   ├── styles/         # CSS or styled-components
│   ├── utils/          # Utility functions (e.g., API helpers)
│   └── App.js          # Main app component
├── .env                # Environment variables
├── package.json
└── README.md
tailwind.config.js
## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/emilystewart26/weather-app.git
cd weather-app
npm install
```

### Usage

1. Obtain an API key from https://api.open-meteo.com or your preferred weather API.
2. Create a `.env` file in the root directory and add your API key:
   ```
   REACT_APP_WEATHER_API_KEY= https://api.open-meteo.com
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Technologies Used
- Next js
- React
- Axios (for API requests)
- CSS/Styled Component

## Acknowledgements

- [Meteo open source weather API](https://api.open-meteo.com)
- [React](https://reactjs.org/)