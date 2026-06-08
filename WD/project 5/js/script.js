// NAVIGATION
var navLinks = [
    { text: "Home", href: "index.html" },
    { text: "Solo Release", href: "index.html#soloReleaseImages" },
    { text: "Artists", href: "index.html#artists" },
    { text: "Playlist", href: "index.html#playlist" }
];

var navbarNavList = document.getElementById("navbarNavList");

for (var i = 0; i < navLinks.length; i++) {
    navbarNavList.innerHTML += `
        <div class="nav-item">
            <a class="nav-link" href="` + navLinks[i].href + `" style="color: white; text-decoration: none; transition: text-shadow 0.3s ease;"
            onmouseover="this.style.color='#2c3e50'; this.style.textShadow='2px 2px 5px rgba(0, 0, 0, 0.3)';"
            onmouseout="this.style.color='white'; this.style.textShadow='none';">` + navLinks[i].text + `</a>
        </div>`;
}

// GALLERY for Members
var members = [
    { src: "member1.jpg", alt: "Jisoo", link: "#jisooMember" },
    { src: "member2.jpg", alt: "Jennie", link: "#jennieMember" },
    { src: "member3.jpg", alt: "Rosé", link: "#roseMember" },
    { src: "member4.jpg", alt: "Lisa", link: "#lisaMember" }
];

var memberImages = document.getElementById("memberImages");

for (var i = 0; i < members.length; i++) {
    memberImages.innerHTML += `
    <div class="col-12 col-sm-6 col-md-3 mb-4">
        <a href="` + members[i].link + `">
            <img src="images/` + members[i].src + `" alt="` + members[i].alt + `" class="img-fluid rounded shadow">
        </a>
    </div>`;
}

//GALLERY for Solo Releases
var soloReleases = [
    { src: "soloRelease1.jpg", alt: "Jisoo New Solo Release", link: "https://open.spotify.com/track/0bC7GKnxh9W9JIvJ6HVWxc?si=ca366715425d4473" },
    { src: "soloRelease2.jpg", alt: "Jennie New Solo Release", link: "https://open.spotify.com/track/2CspwnypzT7rcWI9RfsoSb?si=1514ff4b80e349e6" },
    { src: "soloRelease3.jpg", alt: "Rosé New Solo Release", link: "https://open.spotify.com/track/5vNRhkKd0yEAg8suGBpjeY?si=dcc1af5394b34e42" },
    { src: "soloRelease4.jpg", alt: "Lisa New Solo Release", link: "https://open.spotify.com/track/3yDRcs0Y4pPzkvMbUfeF9H?si=d33cb45eeffe4e75" }
];

var soloReleaseImages = document.getElementById("soloReleaseImages");

for (var i = 0; i < soloReleases.length; i++) {
    soloReleaseImages.innerHTML += `
    <div class="col-12 col-sm-6 col-md-3 mb-4">
        <a href="` + soloReleases[i].link + `" target="_blank">
            <img src="images/` + soloReleases[i].src + `" alt="` + soloReleases[i].alt + `" class="img-fluid rounded shadow">
        </a>
    </div>`;
}

// ABOUT Members 
var aboutTheMembers = [
    {
        id: "jisooMember",
        class: "jisoo-member",
        imgSrc: "memberAbout1.png",
        imgAlt: "Jisoo Image",
        name: "JISOO",
        description: "Kim Jisoo, born on January 3, 1995, in Gunpo, Gyeonggi-do, South Korea, holds the pivotal position of Lead Vocalist and Visual in BLACKPINK. Known for her beautiful visuals and stunning vocals, Jisoo captivates fans with her presence both on and off stage. Her nicknames, Chi Choo and Jichu, reflect her playful and endearing personality. As a Capricorn, Jisoo brings a grounded and determined energy to her work. Her representative animal is a bunny 🐰, symbolizing her sweet and approachable nature."
    },
    {
        id: "jennieMember",
        class: "jennie-member",
        imgSrc: "memberAbout2.png",
        imgAlt: "Jennie Image",
        name: "JENNIE",
        description: "Kim Jennie, born on January 16, 1996, in Bundang, Seongnam, South Korea, is BLACKPINK’s Main Rapper and Lead Vocalist. Her exceptional rap skills and versatile vocal ability have made her one of the standout performers in the group. Fans often refer to her as NiNi or Jendeukie, and her incredible stage presence makes her an unforgettable member of BLACKPINK. As a Capricorn, Jennie exudes determination and ambition. Her representative animal is the bear 🐻, reflecting her strong yet lovable character."
    },
    {
        id: "roseMember",
        class: "rose-member",
        imgSrc: "memberAbout3.png",
        imgAlt: "Rosé Image",
        name: "ROSÉ",
        description: "Rosé, born Roseanne Park on February 11, 1997, in Auckland, New Zealand, serves as the Main Vocalist and Lead Dancer of BLACKPINK. Her distinctive voice and dynamic dance moves have earned her widespread acclaim. Known by the nicknames Rose, Rosie, and “Pasta,” Rosé's performances are marked by emotional depth and captivating artistry. As an Aquarius, she embodies creativity and individuality. Her representative animal, the squirrel 🐿️, reflects her energetic and lively spirit."
    },
    {
        id: "lisaMember",
        class: "lisa-member",
        imgSrc: "memberAbout4.png",
        imgAlt: "Lisa Image",
        name: "LISA",
        description: "Lalisa Manobal, born on March 27, 1997, in Buriram, Thailand, holds a unique role in BLACKPINK as the Main Dancer, Lead Rapper, Sub Vocalist, and the youngest member, or Maknae. Lisa’s incredible dancing and rap skills make her an essential part of the group, while her ability to sing also adds to her versatility. Known for her nicknames Lili, Lalice, Laliz, and Pokpak, Lisa brings an infectious energy to every performance. As an Aries, she is driven and passionate about her craft. Her representative animal is a chick 🐤, symbolizing her youthful and vibrant energy."
    }
];

var membersContainer = document.getElementById("membersContainer");

for (var i = 0; i < aboutTheMembers.length; i++) {
    membersContainer.innerHTML += `
        <div class="row ` + aboutTheMembers[i].class + `" id="` + aboutTheMembers[i].id + `">
            <div class="col-12 col-md-5">
                <div class="img-container-about-members">
                    <img src="images/` + aboutTheMembers[i].imgSrc + `" alt="` + aboutTheMembers[i].imgAlt + `" class="about-members-img">
                </div>
            </div>
            <div class="col-12 col-md-6">
                <h1 class="aboutMembers">` + aboutTheMembers[i].name + `</h1>
                <p class="about-description">` + aboutTheMembers[i].description + `</p>
            </div>
        </div>`;
}

// GALLERY for YOUTUBE PLAYLIST
var videoData = [
    { src: "https://www.youtube.com/embed/hZ_1c0hW_ZI?si=WPdIpLKWWt5LRhnt&controls=0&rel=0&disablekb=1" },
    { src: "https://www.youtube.com/embed/4hgm69uVCdQ?si=97G8rlKsSGfO2vDa&controls=0&rel=0&disablekb=1" },
    { src: "https://www.youtube.com/embed/EAysvmlhIBU?si=21a4cIga-87akBdw&controls=0&rel=0&disablekb=1" }
];

var videoGallery = document.getElementById("videoGallery");

for (var i = 0; i < videoData.length; i++) {
    videoGallery.innerHTML += `
        <div class='col-12 col-md-4 iframe-container'>
            <iframe src='` + videoData[i].src + `' title='YouTube video player' frameborder='0' 
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' 
            referrerpolicy='strict-origin-when-cross-origin' allowfullscreen></iframe>
        </div>`;
}