# RailSync AI - Railway Automation System

## Overview
RailSync AI is an intelligent railway traffic management system with a modern single-page application (SPA) architecture. The system provides comprehensive railway automation capabilities including train scheduling, platform assignment, disruption recovery, passenger communication, interactive simulation, and system logging.

## Features

### 🚂 Core Modules
- **Train Scheduling**: MILP-based optimization with real-time conflict resolution
- **Platform Assignment**: Dynamic platform optimization considering passenger flow
- **Disruption Recovery**: Parallel scenario simulation and automatic recovery planning
- **Passenger Communication**: Multilingual announcements and real-time information
- **Interactive Simulation**: What-if scenario testing and impact analysis
- **System Logs**: Comprehensive audit trail and monitoring

### 🎯 Technical Features
- **Single Page Application (SPA)**: Client-side routing with hash-based navigation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live data visualization and status monitoring
- **Interactive Charts**: Plotly.js integration for data visualization
- **Modern UI/UX**: Clean, professional interface with smooth transitions

## Architecture

### Router System
The application uses a custom client-side router that provides:

- **Hash-based routing** (`#/route-name`)
- **Dynamic page loading** from separate HTML files
- **Navigation state management** with active link highlighting
- **Browser history support** (back/forward buttons)
- **Loading states** with visual feedback
- **Error handling** with fallback to dashboard

### Navigation
- **Desktop Navigation**: Horizontal navigation bar with icons
- **Mobile Navigation**: Dropdown select menu for smaller screens
- **Active State**: Visual indication of current page
- **Smooth Transitions**: CSS transitions for better UX

## Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- Local web server (for development)

### Installation
1. Clone or download the project files
2. Start a local web server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser

### Usage
1. **Dashboard**: Main overview with system status and module access
2. **Navigation**: Use the top navigation bar or mobile dropdown
3. **Routing**: All navigation uses client-side routing (no page reloads)
4. **Back/Forward**: Browser navigation works seamlessly

## File Structure
```
Railway Automation/
├── index.html              # Main SPA with router
├── train-scheduling.html   # Train scheduling module
├── platform-assignment.html # Platform assignment module
├── disruption-recovery.html # Disruption recovery module
├── passenger-communication.html # Communication module
├── interactive-simulation.html # Simulation module
├── system-logs.html       # System logs module
└── README.md              # This file
```

## Router API

### Routes
- `#/` or `#` - Dashboard (default)
- `#/train-scheduling` - Train Scheduling module
- `#/platform-assignment` - Platform Assignment module
- `#/disruption-recovery` - Disruption Recovery module
- `#/passenger-communication` - Passenger Communication module
- `#/interactive-simulation` - Interactive Simulation module
- `#/system-logs` - System Logs module

### Navigation Methods
```javascript
// Programmatic navigation
router.navigate('train-scheduling');

// Direct URL navigation
window.location.hash = '#/platform-assignment';
```

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

### Adding New Routes
1. Create a new HTML file (e.g., `new-module.html`)
2. Add route to the router configuration:
   ```javascript
   this.routes = {
       // ... existing routes
       'new-module': () => this.loadPage('new-module')
   };
   ```
3. Add navigation link to the header
4. Add initialization method if needed

### Customizing Pages
Each module page should follow the structure:
```html
<div class="max-w-6xl mx-auto py-8 px-6">
    <!-- Page content here -->
</div>
```

## Troubleshooting

### Common Issues
1. **Pages not loading**: Ensure you're running a local web server
2. **Charts not displaying**: Check Plotly.js CDN connection
3. **Icons not showing**: Verify Feather Icons CDN connection
4. **Routing not working**: Check browser console for JavaScript errors

### Debug Mode
Open browser developer tools and check the console for router logs and errors.

## License
This project is for demonstration purposes. Please ensure proper licensing for production use.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support
For issues and questions, please check the browser console for error messages and ensure all CDN resources are loading properly.
