// NAVIGATION
var navLinks = [
    { text: "Home", href: "index.html" },
    { text: "About", href: "#aboutMe" },
    { text: "Projects", href: "#projects" },
    { text: "Contact", href: "#contact" }
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
        preview: "images/projectPreview1.png",
        hover: "images/projectPreviewHover1.png",
        alt: "Project 1"
    },
    {
        link: "project%202/projectTwo.html",
        preview: "images/projectPreview2.png",
        hover: "images/projectPreviewHover2.png",
        alt: "Project 2"
    },
    {
        link: "project%203/index.html",
        preview: "images/projectPreview3.png",
        hover: "images/projectPreviewHover3.png",
        alt: "Project 3"
    },
    {
        link: "project%204/index.html",
        preview: "images/projectPreview4.png",
        hover: "images/projectPreviewHover4.png",
        alt: "Project 4"
    },
    {
        link: "project%205/index.html",
        preview: "images/projectPreview5.png",
        hover: "images/projectPreviewHover5.png",
        alt: "Project 5"
    },
    {
        link: "project%206/index.html",
        preview: "images/projectPreview6.png",
        hover: "images/projectPreviewHover6.png",
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

//CONTACTS images and links
var contactInfo = [
    {
        href: "https://www.facebook.com/KayeC5214",
        imgSrc: "images/contactIcon1.png",
        alt: "Contact Info 1",
        title: "Facebook"
    },
    {
        href: "mailto:kayecgamana@gmail.com",
        imgSrc: "images/contactIcon2.png",
        alt: "Contact Info 2",
        title: "Gmail"
    },
    {
        href: "https://github.com/kayegamana",
        imgSrc: "images/contactIcon3.png",
        alt: "Contact Info 3",
        title: "Github"
    },
    {
        href: "https://www.instagram.com/kaychieeeeee",
        imgSrc: "images/contactIcon4.png",
        alt: "Contact Info 4",
        title: "Instagram"
    }
];

var contactInfoContainer = document.getElementById('contactInfoContainer');

for (var i = 0; i < contactInfo.length; i++) {
    contactInfoContainer.innerHTML += `
        <a href=` + contactInfo[i].href + ` target="_blank" title=` + contactInfo[i].title + `>
            <img src=` + contactInfo[i].imgSrc + ` alt=` + contactInfo[i].alt + `>
        </a>`;
}