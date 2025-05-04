var products = [
  {
    "category": "Fruits",
    "image": "imgs/productCategory1.png",
    "contents": [
      {
        "name": "Green Apple",
        "code": "GRNAPPL",
        "image": "imgs/fruits/fruit1.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 494 },
          { "name": "3KG", "code": "W-3KG", "price": 1406 },
          { "name": "5KG", "code": "W-5KG", "price": 2220 }
        ]
      },
      {
        "name": "Red Fuji Apple",
        "code": "RDFJAPPL",
        "image": "imgs/fruits/fruit2.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 317 },
          { "name": "3KG", "code": "W-3KG", "price": 903 },
          { "name": "5KG", "code": "W-5KG", "price": 1425 }
        ]
      },
      {
        "name": "Premium Avocado",
        "code": "PAVCD",
        "image": "imgs/fruits/fruit3.jpg",
        "available": false,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 1500 },
          { "name": "3KG", "code": "W-3KG", "price": 4275 },
          { "name": "5KG", "code": "W-5KG", "price": 6750 }
        ]
      },
      {
        "name": "Banana Lacatan",
        "code": "BNNLCT",
        "image": "imgs/fruits/fruit4.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 164 },
          { "name": "3KG", "code": "W-3KG", "price": 466 },
          { "name": "5KG", "code": "W-5KG", "price": 734 }
        ]
      },
      {
        "name": "Banana Latundan",
        "code": "BNNLTND",
        "image": "imgs/fruits/fruit5.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 77 },
          { "name": "3KG", "code": "W-3KG", "price": 219 },
          { "name": "5KG", "code": "W-5KG", "price": 345 }
        ]
      },
      {
        "name": "Banana Saba",
        "code": "BNNSB",
        "image": "imgs/fruits/fruit6.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 100 },
          { "name": "3KG", "code": "W-3KG", "price": 283 },
          { "name": "5KG", "code": "W-5KG", "price": 447 }
        ]
      },
      {
        "name": "Dragonfruit",
        "code": "DRGNFRT",
        "image": "imgs/fruits/fruit7.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 659 },
          { "name": "3KG", "code": "W-3KG", "price": 1875 },
          { "name": "5KG", "code": "W-5KG", "price": 2965 }
        ]
      },
      {
        "name": "Durian",
        "code": "DRN",
        "image": "imgs/fruits/fruit8.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 500 },
          { "name": "3KG", "code": "W-3KG", "price": 1022 },
          { "name": "5KG", "code": "W-5KG", "price": 1611 }
        ]
      },
      {
        "name": "Green Muscat Grapes",
        "code": "GRNMGPS",
        "image": "imgs/fruits/fruit9.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 845 },
          { "name": "3KG", "code": "W-3KG", "price": 2404 },
          { "name": "5KG", "code": "W-5KG", "price": 3803 }
        ]
      },
      {
        "name": "Guyabano",
        "code": "GYBA",
        "image": "imgs/fruits/fruit10.jpg",
        "available": false,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 229 },
          { "name": "3KG", "code": "W-3KG", "price": 655 },
          { "name": "5KG", "code": "W-5KG", "price": 1032 }
        ]
      },
      {
        "name": "Lemon",
        "code": "LEM",
        "image": "imgs/fruits/fruit11.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 317 },
          { "name": "3KG", "code": "W-3KG", "price": 903 },
          { "name": "5KG", "code": "W-5KG", "price": 1425 }
        ]
      },
      {
        "name": "Mango Green Large",
        "code": "MNGGRNL",
        "image": "imgs/fruits/fruit12.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 288 },
          { "name": "3KG", "code": "W-3KG", "price": 818 },
          { "name": "5KG", "code": "W-5KG", "price": 1294 }
        ]
      },
      {
        "name": "Mango Ripe Large",
        "code": "MNGRPL",
        "image": "imgs/fruits/fruit13.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 288 },
          { "name": "3KG", "code": "W-3KG", "price": 818 },
          { "name": "5KG", "code": "W-5KG", "price": 1294 }
        ]
      },
      {
        "name": "Orange Medium-Large",
        "code": "ORNGML",
        "image": "imgs/fruits/fruit14.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 310 },
          { "name": "3KG", "code": "W-3KG", "price": 884 },
          { "name": "5KG", "code": "W-5KG", "price": 1395 }
        ]
      },
      {
        "name": "Pineapple Premium",
        "code": "PNPLEP",
        "image": "imgs/fruits/fruit15.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 138 },
          { "name": "3KG", "code": "W-3KG", "price": 392 },
          { "name": "5KG", "code": "W-5KG", "price": 619 }
        ]
      },
      {
        "name": "Watermelon Seedless",
        "code": "WTMLNSDL",
        "image": "imgs/fruits/fruit16.jpg",
        "available": true,
        "weights": [
          { "name": "1KG", "code": "W-1KG", "price": 132 },
          { "name": "3KG", "code": "W-3KG", "price": 378 },
          { "name": "5KG", "code": "W-5KG", "price": 595 }
        ]
      }
    ]
  },

  {
    "category": "Vegetables",
    "image": "imgs/productCategory2.png",
    "contents": [
      {
        "name": "Ampalaya Long",
        "code": "AMPLYL",
        "image": "imgs/vegetables/vegetable1.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 83 },
          { "name": "500G", "code": "W-500G", "price": 165 },
          { "name": "1KG", "code": "W-1KG", "price": 297 }
        ]
      },
      {
        "name": "Baguio Beans",
        "code": "BGIOBN",
        "image": "imgs/vegetables/vegetable2.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 99 },
          { "name": "500G", "code": "W-500G", "price": 188 },
          { "name": "1KG", "code": "W-1KG", "price": 356 }
        ]
      },
      {
        "name": "Bell Pepper Green",
        "code": "BLLPGRN",
        "image": "imgs/vegetables/vegetable3.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 139 },
          { "name": "500G", "code": "W-500G", "price": 264 },
          { "name": "1KG", "code": "W-1KG", "price": 500 }
        ]
      },
      {
        "name": "Bell Pepper Red",
        "code": "BLLPRD",
        "image": "imgs/vegetables/vegetable4.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 199 },
          { "name": "500G", "code": "W-500G", "price": 378 },
          { "name": "1KG", "code": "W-1KG", "price": 716 }
        ]
      },
      {
        "name": "Calamansi",
        "code": "CLMS",
        "image": "imgs/vegetables/vegetable5.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 45 },
          { "name": "500G", "code": "W-500G", "price": 86 },
          { "name": "1KG", "code": "W-1KG", "price": 162 }
        ]
      },
      {
        "name": "Camote Violet",
        "code": "CMTVLT",
        "image": "imgs/vegetables/vegetable6.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 50 },
          { "name": "500G", "code": "W-500G", "price": 99 },
          { "name": "1KG", "code": "W-1KG", "price": 178 }
        ]
      },
      {
        "name": "Capsicum Yellow",
        "code": "CPSMYLLW",
        "image": "imgs/vegetables/vegetable7.jpg",
        "available": false,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 265 },
          { "name": "500G", "code": "W-500G", "price": 504 },
          { "name": "1KG", "code": "W-1KG", "price": 954 }
        ]
      },
      {
        "name": "Carrot",
        "code": "CRRT",
        "image": "imgs/vegetables/vegetable8.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 80 },
          { "name": "500G", "code": "W-500G", "price": 159 },
          { "name": "1KG", "code": "W-1KG", "price": 286 }
        ]
      },
      {
        "name": "Cucumber Regular",
        "code": "CCMBRR",
        "image": "imgs/vegetables/vegetable9.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 68 },
          { "name": "500G", "code": "W-500G", "price": 135 },
          { "name": "1KG", "code": "W-1KG", "price": 243 }
        ]
      },
      {
        "name": "Eggplant Regular",
        "code": "EPLNTR",
        "image": "imgs/vegetables/vegetable10.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 80 },
          { "name": "500G", "code": "W-500G", "price": 159 },
          { "name": "1KG", "code": "W-1KG", "price": 286 }
        ]
      },
      {
        "name": "Gabi Sigang",
        "code": "GBSG",
        "image": "imgs/vegetables/vegetable11.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 65 },
          { "name": "500G", "code": "W-500G", "price": 124 },
          { "name": "1KG", "code": "W-1KG", "price": 234 }
        ]
      },
      {
        "name": "Garlic",
        "code": "GRLC",
        "image": "imgs/vegetables/vegetable12.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 65 },
          { "name": "500G", "code": "W-500G", "price": 124 },
          { "name": "1KG", "code": "W-1KG", "price": 234 }
        ]
      },
      {
        "name": "Ginger",
        "code": "GNGR",
        "image": "imgs/vegetables/vegetable13.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 99 },
          { "name": "500G", "code": "W-500G", "price": 188 },
          { "name": "1KG", "code": "W-1KG", "price": 356 }
        ]
      },
      {
        "name": "Lettuce Green Ice",
        "code": "LTCGRNI",
        "image": "imgs/vegetables/vegetable14.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 138 },
          { "name": "500G", "code": "W-500G", "price": 275 },
          { "name": "1KG", "code": "W-1KG", "price": 495 }
        ]
      },
      {
        "name": "Onion Red",
        "code": "ONNRD",
        "image": "imgs/vegetables/vegetable15.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 49 },
          { "name": "500G", "code": "W-500G", "price": 93 },
          { "name": "1KG", "code": "W-1KG", "price": 176 }
        ]
      },
      {
        "name": "Pechay Tagalog",
        "code": "PHYTGLG",
        "image": "imgs/vegetables/vegetable16.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 65 },
          { "name": "500G", "code": "W-500G", "price": 124 },
          { "name": "1KG", "code": "W-1KG", "price": 234 }
        ]
      },
      {
        "name": "Sayote",
        "code": "SYT",
        "image": "imgs/vegetables/vegetable17.jpg",
        "available": true,
        "weights": [
          { "name": "250G", "code": "W-250G", "price": 38 },
          { "name": "500G", "code": "W-500G", "price": 75 },
          { "name": "1KG", "code": "W-1KG", "price": 135 }
        ]
      },
      {
        "name": "Sili Labuyo",
        "code": "SLLBY",
        "image": "imgs/vegetables/vegetable18.jpg",
        "available": true,
        "weights": [
          { "name": "100G", "code": "W-100G", "price": 238 },
          { "name": "200G", "code": "W-200G", "price": 451 },
          { "name": "1KG", "code": "W-1KG", "price": 855 }
        ]
      }
    ]
  },

  {
    "category": "Seafood",
    "image": "imgs/productCategory3.png",
    "contents": [
      {
        "name": "Alumahan",
        "code": "ALMHN",
        "image": "imgs/seafoods/seafood1.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 375 },
          { "name": "1KG", "code": "W-1KG", "price": 713 },
          { "name": "3KG", "code": "W-3KG", "price": 2025 }
        ]
      },
      {
        "name": "Bangus Dagupan",
        "code": "BNGDGP",
        "image": "imgs/seafoods/seafood2.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 178 },
          { "name": "1KG", "code": "W-1KG", "price": 338 },
          { "name": "3KG", "code": "W-3KG", "price": 959 }
        ]
      },
      {
        "name": "Hasa Hasa",
        "code": "HSHS",
        "image": "imgs/seafoods/seafood3.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 345 },
          { "name": "1KG", "code": "W-1KG", "price": 656 },
          { "name": "3KG", "code": "W-3KG", "price": 1863 }
        ]
      },
      {
        "name": "Hito",
        "code": "HTO",
        "image": "imgs/seafoods/seafood4.jpg",
        "available": false,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 118 },
          { "name": "1KG", "code": "W-1KG", "price": 224 },
          { "name": "3KG", "code": "W-3KG", "price": 635 }
        ]
      },
      {
        "name": "Salay Ginto",
        "code": "SLYGNT",
        "image": "imgs/seafoods/seafood5.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 285 },
          { "name": "1KG", "code": "W-1KG", "price": 542 },
          { "name": "3KG", "code": "W-3KG", "price": 1539 }
        ]
      },
      {
        "name": "Salmon Belly Strips",
        "code": "SLNBSTRP",
        "image": "imgs/seafoods/seafood6.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 275 },
          { "name": "1KG", "code": "W-1KG", "price": 523 },
          { "name": "3KG", "code": "W-3KG", "price": 1485 }
        ]
      },
      {
        "name": "Samaral",
        "code": "SMRL",
        "image": "imgs/seafoods/seafood7.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 375 },
          { "name": "1KG", "code": "W-1KG", "price": 713 },
          { "name": "3KG", "code": "W-3KG", "price": 2025 }
        ]
      },
      {
        "name": "Sapsap Premium",
        "code": "SPSPP",
        "image": "imgs/seafoods/seafood8.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 445 },
          { "name": "1KG", "code": "W-1KG", "price": 846 },
          { "name": "3KG", "code": "W-3KG", "price": 2403 }
        ]
      },
      {
        "name": "Shrimp Small",
        "code": "SHMRPS",
        "image": "imgs/seafoods/seafood9.jpg",
        "available": false,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 425 },
          { "name": "1KG", "code": "W-1KG", "price": 807 },
          { "name": "3KG", "code": "W-3KG", "price": 2295 }
        ]
      },
      {
        "name": "Tahong Medium",
        "code": "THGM",
        "image": "imgs/seafoods/seafood10.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 120 },
          { "name": "1KG", "code": "W-1KG", "price": 227 },
          { "name": "3KG", "code": "W-3KG", "price": 647 }
        ]
      },
      {
        "name": "Talakitok Oblong",
        "code": "TLKTKO",
        "image": "imgs/seafoods/seafood11.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 393 },
          { "name": "1KG", "code": "W-1KG", "price": 746 },
          { "name": "3KG", "code": "W-3KG", "price": 2123 }
        ]
      },
      {
        "name": "Tawilis",
        "code": "TWLS",
        "image": "imgs/seafoods/seafood12.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 165 },
          { "name": "1KG", "code": "W-1KG", "price": 314 },
          { "name": "3KG", "code": "W-3KG", "price": 891 }
        ]
      },
      {
        "name": "Tilapia",
        "code": "TILP",
        "image": "imgs/seafoods/seafood13.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 113 },
          { "name": "1KG", "code": "W-1KG", "price": 214 },
          { "name": "3KG", "code": "W-3KG", "price": 608 }
        ]
      },
      {
        "name": "Squid Medium",
        "code": "SQDMD",
        "image": "imgs/seafoods/seafood14.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 373 },
          { "name": "1KG", "code": "W-1KG", "price": 708 },
          { "name": "3KG", "code": "W-3KG", "price": 2010 }
        ]
      },
      {
        "name": "Yellow Fin",
        "code": "YLLWFN",
        "image": "imgs/seafoods/seafood15.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 313 },
          { "name": "1KG", "code": "W-1KG", "price": 594 },
          { "name": "3KG", "code": "W-3KG", "price": 1688 }
        ]
      }
    ]
  },
  {
    "category": "Meat",
    "image": "imgs/productCategory4.png",
    "contents": [
      {
        "name": "Beef Brisket Cubes",
        "code": "BFBRTCB",
        "image": "imgs/meats/meat1.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 325 },
          { "name": "1KG", "code": "W-1KG", "price": 618 },
          { "name": "3KG", "code": "W-3KG", "price": 878 }
        ]
      },
      {
        "name": "Beef Buto Buto",
        "code": "BFBTBT",
        "image": "imgs/meats/meat2.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 265 },
          { "name": "1KG", "code": "W-1KG", "price": 504 },
          { "name": "3KG", "code": "W-3KG", "price": 716 }
        ]
      },
      {
        "name": "Beef Ribeye",
        "code": "BFRBY",
        "image": "imgs/meats/meat3.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 398 },
          { "name": "1KG", "code": "W-1KG", "price": 756 },
          { "name": "3KG", "code": "W-3KG", "price": 2145 }
        ]
      },
      {
        "name": "Beef Sirloin Strips",
        "code": "BFSRNSTRP",
        "image": "imgs/meats/meat4.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 365 },
          { "name": "1KG", "code": "W-1KG", "price": 694 },
          { "name": "3KG", "code": "W-3KG", "price": 986 }
        ]
      },
      {
        "name": "Chicken Breast",
        "code": "CHCKBRST",
        "image": "imgs/meats/meat5.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 148 },
          { "name": "1KG", "code": "W-1KG", "price": 280 },
          { "name": "3KG", "code": "W-3KG", "price": 797 }
        ]
      },
      {
        "name": "Chicken Drumstick",
        "code": "CHCKDRMST",
        "image": "imgs/meats/meat6.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 148 },
          { "name": "1KG", "code": "W-1KG", "price": 280 },
          { "name": "3KG", "code": "W-3KG", "price": 797 }
        ]
      },
      {
        "name": "Chicken Quarter Cut",
        "code": "CHCKQTCT",
        "image": "imgs/meats/meat7.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 148 },
          { "name": "1KG", "code": "W-1KG", "price": 280 },
          { "name": "3KG", "code": "W-3KG", "price": 797 }
        ]
      },
      {
        "name": "Chicken Wings",
        "code": "CHCKWNGS",
        "image": "imgs/meats/meat8.jpg",
        "available": false,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 148 },
          { "name": "1KG", "code": "W-1KG", "price": 280 },
          { "name": "3KG", "code": "W-3KG", "price": 797 }
        ]
      },
      {
        "name": "Pork Chop",
        "code": "PRKCHP",
        "image": "imgs/meats/meat9.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 275 },
          { "name": "1KG", "code": "W-1KG", "price": 523 },
          { "name": "3KG", "code": "W-3KG", "price": 743 }
        ]
      },
      {
        "name": "Pork Front Pata Sliced",
        "code": "PRKFPSLC",
        "image": "imgs/meats/meat10.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 268 },
          { "name": "1KG", "code": "W-1KG", "price": 508 },
          { "name": "3KG", "code": "W-3KG", "price": 1442 }
        ]
      },
      {
        "name": "Pork Liempo Slices",
        "code": "PRKLSLC",
        "image": "imgs/meats/meat11.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 279 },
          { "name": "1KG", "code": "W-1KG", "price": 530 },
          { "name": "3KG", "code": "W-3KG", "price": 753 }
        ]
      },
      {
        "name": "Pork Tenderloin Cubes",
        "code": "PRKTCBS",
        "image": "imgs/meats/meat12.jpg",
        "available": true,
        "weights": [
          { "name": "500G", "code": "W-500G", "price": 295 },
          { "name": "1KG", "code": "W-1KG", "price": 560 },
          { "name": "3KG", "code": "W-3KG", "price": 797 }
        ]
      }
    ]
  }
]
