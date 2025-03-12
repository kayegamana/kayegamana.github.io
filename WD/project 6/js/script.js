// GALLERY FOR OTHER CHRACTERS
var characterPics = [
    "character4.png", "character5.png", "character6.png",
    "character7.png", "character8.png", "character9.png",
    "character10.png", "character11.png", "character12.png",
    "character13.png", "character14.png", "character15.png"
];

var characterContainer = document.getElementById("characterContainer");

for (var i = 0; i < characterPics.length; i++) {
    characterContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-3 mb-4">
            <img src="images/` + characterPics[i] + `" alt="Other Character Image ` + (i + 1) + `" class="img-fluid rounded shadow" id="character` + i + `">
        </div>`;
}

// GALLERY FOR GAMES
var marioGamePics = [
    "marioGame1.png", "marioGame2.png", "marioGame3.png",
    "marioGame4.png", "marioGame5.png", "marioGame6.png"
];
var marioGameLinks = [
    "https://www.nintendo.com/us/store/products/new-super-mario-bros-u-deluxe-switch/",
    "https://www.nintendo.com/us/store/products/mario-plus-rabbids-kingdom-battle-switch/",
    "https://www.nintendo.com/us/store/products/super-mario-party-jamboree-switch/",
    "https://www.nintendo.com/us/store/products/mario-party-superstars-switch/",
    "https://www.nintendo.com/us/store/products/mario-kart-8-deluxe-switch/",
    "https://www.nintendo.com/us/store/products/super-mario-odyssey-switch/"
];

var marioGamesContainer = document.getElementById("marioGamesContainer");

for (var i = 0; i < marioGamePics.length; i++) {
    marioGamesContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <a href="` + marioGameLinks[i] + `" target="_blank">
                <img src="images/` + marioGamePics[i] + `" alt="Mario Game Image ` + (i + 1) + `" class="img-fluid rounded shadow-sm mario-games-img" style="border: 4px solid black;">
            </a>
        </div>`;
}

//GALLERY FOR VIDEOS
var videoLinks = [
    "https://www.youtube.com/embed/-Ux0ZqdQLa8?si=FfFSRWG-6kFApVgd",
    "https://www.youtube.com/embed/5pduSNPnpS4?si=DakjnGz0lP3Q_T8D",
    "https://www.youtube.com/embed/-P7obXHM3EQ?si=xbtcwxW0sFz0_cnJ",
    "https://www.youtube.com/embed/zju4gITxkm0?si=IbbkWUYnQ8Z_1buq",
    "https://www.youtube.com/embed/e_kuPoLw9Wc?si=MdZW5Ej13nZk2-Eu",
    "https://www.youtube.com/embed/0r5PJx7rlds?si=dmObkpDNSjXdR7CQ"
];

var videoContainer = document.getElementById("videosContainer");

for (var i = 0; i < videoLinks.length; i++) {
    videoContainer.innerHTML += `
        <div class="col-12 col-md-4 iframe-container" style="height: 27vh; padding-bottom: 2vh;">
            <iframe src="` + videoLinks[i] + `" title="YouTube video player" frameborder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen 
            style="width: 100%; height: 100%; border: 4px solid white;"></iframe>
        </div>`;
}

//GALLERY FOR OTHER INFORMATION
var learnMoreInfo = [
    {
        url: "https://www.nintendo.com/us/",
        imgSrc: "images/learnMorePicture1.png",
        altText: "Learn More - Official Nintendo Site",
        caption: "Official Nintendo Site"
    },
    {
        url: "https://www.nintendo.com/us/store/characters/mario/?srsltid=AfmBOopgKvz5be5h33tD1Q7XT2CDh1fIwvRh7etw9g_WkjP8I475kfm9",
        imgSrc: "images/learnMorePicture2.png",
        altText: "Learn More - Super Mario Merchandise",
        caption: "Official Super Mario Merchandise"
    },
    {
        url: "https://www.nintendo.com/jp/character/mario/en/index.html",
        imgSrc: "images/learnMorePicture3.png",
        altText: "Learn More - Mario Portal Website",
        caption: "Mario Portal Website"
    },
    {
        url: "https://www.nintendo.com/jp/smbmovie/index.html",
        imgSrc: "images/learnMorePicture4.png",
        altText: "Learn More - Super Mario Movie",
        caption: "Super Mario Movie"
    }
];

var learnMoreContainer = document.getElementById("learnMoreContainer");

for (var i = 0; i < learnMoreInfo.length; i++) {
    learnMoreContainer.innerHTML += `
        <div class="col-12 col-sm-6 col-md-3 mb-4">
            <a href="` + learnMoreInfo[i].url + `" target="_blank">
                <img src="` + learnMoreInfo[i].imgSrc + `" alt="` + learnMoreInfo[i].altText + `" class="img-fluid rounded shadow-sm learn-more-img">
            </a>
            <p class="text-center mt-3" style="color: white;">` + learnMoreInfo[i].caption + `</p>
        </div>`;
}