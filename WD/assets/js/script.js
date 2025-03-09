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

// PROJECTS showcase
var projects = [
    {
        link: "project%201/project1.html",
        preview: "assets/images/projectPreview1.png",
        hover: "assets/images/projectPreviewHover1.png",
        alt: "Project 1"
    },
    {
        link: "project%202/projectTwo.html",
        preview: "assets/images/projectPreview2.png",
        hover: "assets/images/projectPreviewHover2.png",
        alt: "Project 2"
    },
    {
        link: "project%203/index.html",
        preview: "assets/images/projectPreview3.png",
        hover: "assets/images/projectPreviewHover3.png",
        alt: "Project 3"
    },
    {
        link: "project%204/index.html",
        preview: "assets/images/projectPreview4.png",
        hover: "assets/images/projectPreviewHover4.png",
        alt: "Project 4"
    },
    {
        link: "project%205/index.html",
        preview: "assets/images/projectPreview5.png",
        hover: "assets/images/projectPreviewHover5.png",
        alt: "Project 5"
    },
    {
        link: "project%206/index.html",
        preview: "assets/images/projectPreview6.png",
        hover: "assets/images/projectPreviewHover6.png",
        alt: "Project 6"
    }
];

var projectsContainer = document.getElementById('projectsContainer');

for (var i = 0; i < projects.length; i++) {
    projectsContainer.innerHTML += `
        <div class='col-md-4 mb-4'>
            <a href=` + projects[i].link + ` target='_blank'>
                <div class='project-img-container'>
                    <img src=` + projects[i].preview + ` alt=` + projects[i].alt + ` class='img-fluid project-img'>
                    <img src=` + projects[i].hover + ` alt=` + projects[i].alt + `Hover' class='img-fluid project-hover-img'>
                </div>
            </a>
        </div>`;
}
