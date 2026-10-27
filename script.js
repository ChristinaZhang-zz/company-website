document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');
    
    const hamburgerBtn = document.createElement('button');
    hamburgerBtn.innerHTML = '☰';
    hamburgerBtn.style.cssText = 'background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-primary); display: none;';
    nav.insertBefore(hamburgerBtn, navList);

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleScreenSize(e) {
        if (e.matches) {
            hamburgerBtn.style.display = 'block';
            navList.style.display = 'none';
            navList.style.flexDirection = 'column';
            navList.style.padding = '1rem 0';
        } else {
            hamburgerBtn.style.display = 'none';
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
        }
    }
    handleScreenSize(mediaQuery);
    mediaQuery.addEventListener('change', handleScreenSize);

    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = navList.style.display === 'flex';
        navList.style.display = isExpanded ? 'none' : 'flex';
        hamburgerBtn.innerHTML = isExpanded ? '☰' : '✕';
    });

    // --- Dark Mode Toggle ---
    const darkModeBtn = document.querySelector('.btn-dark-mode');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeBtn.innerHTML = isDark ? '☀️' : '🌙';
    });

    // --- CTA Interactivity ---
    document.querySelectorAll('.btn-cta, .btn-nav').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`Welcome to Miracle Journal!\n\nPreparing your sensory-friendly tracking environment. Your 14-day trial will start now.`);
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (window.innerWidth <= 768) {
                    navList.style.display = 'none';
                    hamburgerBtn.innerHTML = '☰';
                }
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Chart.js: Line Chart (Daily Energy Flow) ---
    const ctxLine = document.getElementById('energyLineChart');
    if (ctxLine) {
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
                datasets: [{
                    label: 'Energy Level (1-5)',
                    data: [2, 4, 5, 2, 3, 4],
                    borderColor: '#2E7D32',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1B5E20'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { min: 1, max: 5 } }
            }
        });
    }

    // --- Chart.js: Bar Chart (Tag Impact) ---
    const ctxBar = document.getElementById('impactBarChart');
    if (ctxBar) {
        new Chart(ctxBar, {
            type: 'bar',
            data: {
                labels: ['Deep Work', 'Meetings', 'Nature Walk', 'Social Media'],
                datasets: [{
                    label: 'Energy Impact',
                    data: [1.5, -2.0, 2.5, -1.0],
                    backgroundColor: (context) => {
                        const value = context.dataset.data[context.dataIndex];
                        return value > 0 ? '#4CAF50' : '#8D998E';
                    },
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } }
            }
        });
    }

    // --- Interactive Energy Calendar Generation ---
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        calendarGrid.innerHTML = ''; // Clear out the grid
        
        // 1. Render Weekday Headers
        const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // 2. Set up month details (Using October 2026 as the demo)
        // October 1, 2026 falls on a Thursday (Index 4, where Sunday is 0)
        const firstDayIndex = 4; 
        const daysInMonth = 31;

        // 3. Add empty blank spaces for the days of the week before the 1st
        for(let i = 0; i < firstDayIndex; i++) {
            const blank = document.createElement('div');
            blank.classList.add('calendar-blank');
            calendarGrid.appendChild(blank);
        }

        // 4. Generate the actual days (1 to 31)
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-day');
            day.textContent = i;
            
            // Randomly assign some initial energy states for visual appeal
            if (i % 4 === 0) day.classList.add('energy-high');
            else if (i % 7 === 0) day.classList.add('energy-low');
            else if (i % 3 === 0) day.classList.add('energy-med');

            // 5. Add click event to cycle through energy levels interactively
            day.addEventListener('click', function() {
                if (this.classList.contains('energy-low')) {
                    this.classList.replace('energy-low', 'energy-med');
                } else if (this.classList.contains('energy-med')) {
                    this.classList.replace('energy-med', 'energy-high');
                } else if (this.classList.contains('energy-high')) {
                    this.classList.remove('energy-high'); // Clear it
                } else {
                    this.classList.add('energy-low'); // Start the cycle
                }
            });
            calendarGrid.appendChild(day);
        }
    }
});