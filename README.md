# AI Safety Incident Dashboard

This is a React.js-based web application designed to monitor and analyze AI safety-related incidents. The dashboard provides visual insights into the incidents based on severity, timelines, popular tags, and other safety aspects. It also allows users to report new incidents and search through existing reports.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- Node.js (version 14 or above)
- npm (Node Package Manager)

Download Node.js and npm from [https://nodejs.org/](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/ai-safety-incident-dashboard.git
   ```

2. Navigate into the project directory:

   ```bash
   cd ai-safety-incident-dashboard
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Running the Application Locally

Start the development server:

```bash
npm start
```

The app will open automatically in your browser at:  
[http://localhost:3000](http://localhost:3000)

Any code changes will reload the page automatically.

### Building the Application

To create a production-ready build:

```bash
npm run build
```

This will create an optimized build in the `build/` folder.

---

## Technology Stack

- **Frontend Framework**: React.js
- **Language**: JavaScript
- **Styling**: CSS (and optionally any UI libraries like Tailwind CSS / Material-UI if used)

---

## Features

- **Severity Distribution**: Visual representation of incidents based on their severity.
- **Incidents Over Time**: Timeline graph showing incident trends.
- **Top Tags**: Highlights the most frequently used tags in reported incidents.
- **Safety Insight**: Provides summaries and insights based on incident data.
- **Incident Reporting**: Users can submit new incident reports through a simple form.
- **Incident Search**: Search functionality to filter incidents based on keywords.
- **Incident Filtering**: View and filter the list of reported incidents dynamically.

---

## Design Decisions

- Used React.js for component-based and scalable architecture.
- Organized dashboard into separate pages for better user navigation and performance.
- Implemented dynamic filtering to enhance user experience while browsing incidents.

## Challenges Faced

- Managing and synchronizing the filtering of incidents without reloading the page.
- Structuring the dashboard data in a way that remains efficient and scalable as more incidents are added.
- Ensuring responsiveness across different screen sizes and devices.

---

## Learn More

You can learn more about React.js from the [official React documentation](https://reactjs.org/).
