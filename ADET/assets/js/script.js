// NAVIGATION
var navLinks = [
    { text: "Home", href: "../index.html" },
    { text: "About", href: "../index.html#aboutMe" },
    { text: "Projects", href: "../index.html#projects" },
    { text: "Contact", href: "../index.html#contact" }
];

var navbarNavList = document.getElementById("navbarNavList");

for (var i = 0; i < navLinks.length; i++) {
    navbarNavList.innerHTML += `
        <div class="nav-item">
            <a class="nav-link" href="` + navLinks[i].href + `" style="color: white; text-decoration: none; transition: text-shadow 0.3s ease;"
            onmouseover="this.style.color='#f1c40f'; this.style.textShadow='2px 2px 5px rgba(0, 0, 0, 0.5)';"
            onmouseout="this.style.color='white'; this.style.textShadow='none';">` + navLinks[i].text + `</a>
        </div>`;
}

// Coming Soon - PROJECTS showcase
var projects = [
    {
        preview: "assets/images/projectPreviewComingSoon.png",
        hover: "assets/images/projectPreviewComingSoon.png",
        alt: "Project3"
    },
    {
        preview: "assets/images/projectPreviewComingSoon.png",
        hover: "assets/images/projectPreviewComingSoon.png",
        alt: "Project4"
    },
    {
        preview: "assets/images/projectPreviewComingSoon.png",
        hover: "assets/images/projectPreviewComingSoon.png",
        alt: "Project5"
    },
    {
        preview: "assets/images/projectPreviewComingSoon.png",
        hover: "assets/images/projectPreviewComingSoon.png",
        alt: "Project6"
    }
];

var projectsContainer = document.getElementById('projectsContainer');

for (var i = 0; i < projects.length; i++) {
    projectsContainer.innerHTML += `
        <div class='col-md-4 mb-4'>
            <div class='cs-project-img-container'>
                <img src=` + projects[i].preview + ` class='img-fluid project-img'>
            </div>
        </div>`;
}
