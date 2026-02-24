AutoTrack Pro
Precision Task & Workflow Management for Performance Workshops

AutoTrack Pro is a responsive task management system designed specifically for high-performance automotive workshops. It provides structured task tracking, priority management, analytics visualization, and dark/light mode support — all within a clean, modern UI.

⸻

Project Overview:

AutoTrack Pro helps workshop managers:
    - Create and manage service tasks
	- Assign priority levels
	- Track task status (Pending / In Progress / Completed)
	- Filter and sort tasks
	- View analytics in real time
	- Persist data using browser LocalStorage
	- Toggle between Light and Dark Mode

The system is optimized for clarity, responsiveness, and professional presentation.

⸻

Tech Stack:

Frontend
	- HTML5
	- CSS3
	- Bootstrap 5.3
	- Bootstrap Icons
	- Google Fonts (Inter)

JavaScript
    - Vanilla JavaScript (ES6+)
	- Chart.js (for analytics visualization)
	- LocalStorage API (data persistence)

⸻

Project Structure:

AutoTrack-Pro/
│
├── index.html
├── tasks.html
├── services.html
├── about.html
├── contact.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── main.js
│   └── tasks.js
│
└── README.md

⸻

Core Features:

1. Task Management
	Add new tasks with:
	 - Name
	 - Due Date
	 - Priority (High / Medium / Low)
	 - Status (Pending / In Progress / Completed)
	 - Description
	 - Edit existing tasks
	 - Delete tasks
	 - Cycle through status using toggle button

⸻

2. Data Persistence

Tasks are stored in: localStorage

This ensures:
	- Data remains after page reload
	- No backend required
	- Fully client-side operation

⸻

3. Task Filtering & Sorting

Users can:
	Filter by:
	- All
	- Pending
    - Completed
	Sort by:
	- Due Date
	- Name
	- Priority (High → Low)

Sorting logic uses custom priority ordering:
  const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

⸻

4. Task Analytics (Chart.js)

The system generates a responsive Pie Chart displaying:
	- Pending tasks
	- In Progress tasks
	- Completed tasks

The chart updates dynamically whenever:
    - A task is added
	- A task is edited
	- A task is deleted
	- A task status changes

Chart configuration includes:
	- Responsive behavior
	- Dynamic legend color based on theme
	- Automatic chart re-rendering

⸻

5. Dark / Light Mode

The UI supports theme switching using a body class toggle:
body.dark-mode

Dark mode adjusts:
	- Background colors
	- Cards
	- Tables
	- Forms
	- Navbar
	- Footer
	- Badges
	- CTA sections
	- Chart legend text color

Design principle:
  Default = Light Mode
  body.dark-mode = Override Styles

⸻

6. Responsive Design

Built using Bootstrap 5 grid system.

Optimized for:
    - Desktop
	- Tablet
	- Mobile

Responsive elements:
	- Collapsible navbar
	- Task form grid layout
	- Table responsiveness
	- Centered analytics chart
	- Flexbox alignment

⸻

Design System:

  Color Palette:
    - Element - Color
    - Primary Accent - #c8102e
    - Dark Background - #111111
    - Card Dark - #1c1c1c
    - Light Background - #f8f9fa
    - Muted Text - #6c757d

Typography:
	- Inter (Google Font)
	- Clean, modern, technical aesthetic

⸻

Installation & Setup:

Option 1: Simple Local Use
	1.	Download or clone repository:
        git clone <repository-url>
    2.	Open index.html in your browser.

No build tools required.

⸻

Option 2: VS Code Live Server (Recommended and personally used)
	1.	Install Live Server extension
	2.	Right-click index.html
	3.	Select Open with Live Server

⸻

How the Task Flow Works
	1.	User submits form
	2.	Task object is created:
        {
            id,
            name,
            description,
            dueDate,
            priority,
            status
        }

	3.	Task saved to localStorage
	4.	UI re-renders:
	    - Table updated
	    - Summary cards updated
	    - Chart refreshed

⸻

Status Lifecycle:

    Status cycles as:
      Pending → In Progress → Completed → Pending

⸻

Performance Considerations:
	- Chart instance is destroyed before re-creation to prevent memory leaks.
	- Tasks are cloned before filtering/sorting to prevent mutation.
	- DOM elements are cached for performance.
	- Conditional form binding prevents errors when loading pages without task form.

⸻

Known Limitations:
	•	No backend integration
	•	No multi-user support
	•	No authentication system
	•	LocalStorage can be browser-specific
	•	No export functionality

⸻

Future Improvements:

Ideal enhancements to make it portfolio-level:
	- Export tasks to CSV
	- Search functionality
	- Drag & drop reordering
	- Dashboard analytics page
	- Backend API integration
	- User authentication
	- Role-based permissions
	- Persistent dark mode preference
	- Advanced filtering (by date range)

⸻

Conclusion:

AutoTrack Pro demonstrates:
	- Structured frontend architecture
	- Clean UI/UX design
	- State-driven rendering
    - Persistent client-side storage
	- Dynamic data visualization
	- Professional responsive layout

It serves as a strong foundation for a scalable workshop workflow management platform.