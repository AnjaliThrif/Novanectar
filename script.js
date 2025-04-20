document.addEventListener('DOMContentLoaded', () => {
    const jobListingsSection = document.getElementById('job-listings');
    const jobListDiv = document.querySelector('.job-list');
    const jobDetailsSection = document.getElementById('job-details');
    const jobInfoDiv = document.getElementById('job-info');
    const applyButton = document.getElementById('apply-button');
    const applicantCountSpan = document.getElementById('applicant-number');
    const closeDetailsButton = document.getElementById('close-details');
    const postJobFormSection = document.getElementById('post-job-form');
    const postJobForm = document.getElementById('new-job-form');
    const findJobsLink = document.getElementById('find-jobs-link');
    const postJobLink = document.getElementById('post-job-link');
    const searchInput = document.getElementById('search-term');
    const locationFilter = document.getElementById('location-filter');
    const authSection = document.getElementById('auth-section');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const themeCheckbox = document.getElementById('theme-checkbox');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const rootElement = document.documentElement;

    if (loginButton && registerButton) {
        console.log('Login and Register buttons found!'); // ADD THIS LINE

        loginButton.addEventListener('click', () => {
            console.log('Login button clicked!'); // KEEP THIS
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            loginButton.classList.add('active');
            registerButton.classList.remove('active');
        });

        registerButton.addEventListener('click', () => {
            console.log('Register button clicked!'); // KEEP THIS
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            registerButton.classList.add('active');
            loginButton.classList.remove('active');
        });
    } else {
        console.log('Login or Register buttons not found!'); // ADD THIS LINE
    }
    let jobs = [
        { id: 1, title: 'Senior Software Engineer', company: 'Tech Innovations Inc.', location: 'Ahmedabad', description: 'Develop and maintain complex software applications. Lead a team of junior developers.', applicants: 18 },
        { id: 2, title: 'Digital Marketing Specialist', company: 'Global Marketing Solutions', location: 'Mumbai', description: 'Develop and execute digital marketing strategies across various channels.', applicants: 12 },
        { id: 3, title: 'Lead Data Scientist', company: 'Analytics Pro', location: 'Bangalore', description: 'Lead data analysis projects and build machine learning models.', applicants: 25 },
        { id: 4, title: 'Front-End Developer', company: 'Web Wizards Ltd.', location: 'Ahmedabad', description: 'Develop user interfaces using modern JavaScript frameworks.', applicants: 15 },
        { id: 5, title: 'UX/UI Designer', company: 'Creative Solutions Agency', location: 'Mumbai', description: 'Design intuitive and user-friendly interfaces for web and mobile applications.', applicants: 10 },
        { id: 6, title: 'Project Manager', company: 'Synergy Tech', location: 'Bangalore', description: 'Manage and coordinate IT projects from initiation to closure.', applicants: 20 },
        { id: 7, title: 'Content Writer', company: 'Next Publications', location: 'Chennai', description: 'Content writing for all the posts', applicants: 20 }
    ];

    function displayJobs(filteredJobs = jobs) {
        jobListDiv.innerHTML = '';
        if (filteredJobs.length === 0) {
            jobListDiv.innerHTML = '<p>No jobs found matching your criteria.</p>';
            return;
        }
        filteredJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h3>${job.title}</h3>
                <p><i class="fas fa-building"></i> ${job.company}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
            `;
            jobCard.addEventListener('click', () => showJobDetails(job.id));
            jobListDiv.appendChild(jobCard);
        });
    }

    function showJobDetails(jobId) {
        const job = jobs.find(j => j.id === jobId);
        if (job) {
            jobInfoDiv.innerHTML = `
                <h3>${job.title}</h3>
                <p><i class="fas fa-building"></i> Company: ${job.company}</p>
                <p><i class="fas fa-map-marker-alt"></i> Location: ${job.location}</p>
                <p><strong>Description:</strong></p>
                <p>${job.description}</p>
            `;
            applicantCountSpan.textContent = job.applicants;
            hideAllSections();
            jobDetailsSection.classList.remove('hidden');
        }
    }

    function hideAllSections() {
        jobListingsSection.classList.add('hidden');
        jobDetailsSection.classList.add('hidden');
        postJobFormSection.classList.add('hidden');
        authSection.classList.add('hidden');
        document.querySelectorAll('header nav a').forEach(link => link.classList.remove('active'));
    }

    function populateLocations() {
        const locations = [...new Set(jobs.map(job => job.location))];
        locations.forEach(location => {
            const option = document.createElement('option');
            option.value = location;
            option.textContent = location;
            locationFilter.appendChild(option);
        });
    }

    function filterJobs() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedLocation = locationFilter.value;

        const filteredJobs = jobs.filter(job => {
            const titleMatch = job.title.toLowerCase().includes(searchTerm);
            const locationMatch = selectedLocation === "" || job.location === selectedLocation;
            return titleMatch && locationMatch;
        });

        displayJobs(filteredJobs);
    }

    // Navigation
    findJobsLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        jobListingsSection.classList.remove('hidden');
        findJobsLink.classList.add('active');
    });

    postJobLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        postJobFormSection.classList.remove('hidden');
        postJobLink.classList.add('active');
    });

    const authLink = document.getElementById('auth-link');
    if (authLink) {
        authLink.addEventListener('click', (e) => {
            e.preventDefault();
            hideAllSections();
            authSection.classList.remove('hidden');
            authLink.classList.add('active');
        });
    }

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideAllSections();
        aboutSection.classList.remove('hidden');
        aboutLink.classList.add('active');
    });

    closeDetailsButton.addEventListener('click', () => {
        hideAllSections();
        jobListingsSection.classList.remove('hidden');
        findJobsLink.classList.add('active');
    });

        // Handle form submission
    aboutMeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value.trim();
        const headline = document.getElementById('headline').value.trim();
        const summary = document.getElementById('summary').value.trim();
        const skills = document.getElementById('skills').value.trim();
        const experience = document.getElementById('experience').value.trim();
        const education = document.getElementById('education').value.trim();

        if (!fullName || !headline || !summary || !skills || !experience || !education) {
            alert('Please fill in all the required fields: Full Name, Professional Headline, Summary, Skills, Experience, and Education.');
            return; // Stop the submission
        }

        const formData = {
            fullName: fullName,
            headline: headline,
            summary: summary,
            skills: skills,
            experience: experience,
            education: education,
            linkedin: document.getElementById('linkedin').value,
            website: document.getElementById('website').value
        };
        saveData(formData);
    });
    // Form Submissions (Simulated)
    if (postJobForm) {
        postJobForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const company = document.getElementById('company').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
            const newJob = {
                id: jobs.length + 1,
                title,
                company,
                location,
                description,
                applicants: 0
            };
            jobs.push(newJob);
            displayJobs();
            hideAllSections();
            jobListingsSection.classList.remove('hidden');
            findJobsLink.classList.add('active');
            alert('Job posted successfully!');
            postJobForm.reset();
            populateLocations(); // Update locations after posting
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            alert(`Logging in with: ${email}`); // Replace with actual authentication
            hideAllSections();
            jobListingsSection.classList.remove('hidden');
            findJobsLink.classList.add('active');
            loginForm.reset();
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            alert(`Registering with: ${email}`); // Replace with actual registration
            hideAllSections();
            jobListingsSection.classList.remove('hidden');
            findJobsLink.classList.add('active');
            registerForm.reset();
        });
    }

// 🌙 Theme switch with localStorage
if (themeCheckbox) {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark'); // Use document.documentElement
        themeCheckbox.checked = true;
    }

    themeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark'); // Use document.documentElement
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme'); // Use document.documentElement
            localStorage.setItem('theme', 'light');
        }
    });
}
// Filtering
searchInput.addEventListener('input', filterJobs);
locationFilter.addEventListener('change', filterJobs);

populateLocations();
displayJobs(); // Initial display of jobs
});