const jobs = [
    { title: "Frontend Developer", company: "Tech Solutions", location: "Hyderabad" },
    { title: "Backend Developer", company: "CodeWorks", location: "Bangalore" },
    { title: "Full Stack Developer", company: "Innovate Pvt Ltd", location: "Chennai" },
    { title: "UI/UX Designer", company: "Creative Studio", location: "Mumbai" }
];

function displayJobs(filteredJobs) {
    const jobList = document.getElementById("jobList");
    jobList.innerHTML = "";

    filteredJobs.forEach(job => {
        const div = document.createElement("div");
        div.className = "job-card";
        div.innerHTML = `
            <h3>${job.title}</h3>
            <p><b>Company:</b> ${job.company}</p>
            <p><b>Location:</b> ${job.location}</p>
            <button onclick="applyJob('${job.title}')">Apply</button>
        `;
        jobList.appendChild(div);
    });
}

function searchJob() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchValue)
    );

    saveRecentSearch(searchValue);
    displayJobs(filtered);
}

function applyJob(title) {
    alert("Applied for " + title);
}

function saveRecentSearch(term) {
    if (!term) return;

    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    if (!searches.includes(term)) {
        searches.unshift(term);
    }

    searches = searches.slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(searches));

    displayRecentSearches();
}

function displayRecentSearches() {
    const list = document.getElementById("recentSearchList");
    list.innerHTML = "";

    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    searches.forEach(term => {
        const li = document.createElement("li");
        li.textContent = term;
        li.onclick = () => {
            document.getElementById("searchInput").value = term;
            searchJob();
        };
        list.appendChild(li);
    });
}

displayJobs(jobs);
displayRecentSearches();