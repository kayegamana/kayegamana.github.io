<?php
$page = "allNews";

if (isset($_GET['page'])) {
    $page = $_GET['page'];
    switch ($page) {
        case "playstation":
            $page = "playstation";
            break;
        case "xbox":
            $page = "xbox";
            break;
        case "nintendo":
            $page = "nintendo";
            break;
        case "allNews":
            $page = "allNews";
            break;

        case "gamingNewsArticle1":
            $page = "gamingNewsArticle1";
            break;
        case "gamingNewsArticle2":
            $page = "gamingNewsArticle2";
            break;
        case "gamingNewsArticle3":
            $page = "gamingNewsArticle3";
            break;

        default:
            header("Location: ?page=allNews");
            break;
    }
} else {
    header("Location: ?page=allNews");
}

?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>XP Zone</title>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="icon" href="images/icon.png" type="image/png">

    <style>
        .nav-item:hover {
            background-color: rgb(54, 54, 54) !important;
            color: white !important;
            cursor: pointer;
        }

        .nav-item:hover i {
            color: white !important;
        }

        .nav-item.active {
            background-color: rgba(5, 51, 126, 0.81) !important;
            color: white !important;
        }

        .news-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .news-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .news-card:hover {
            background-color: rgb(241, 248, 255);
        }
    </style>
</head>

<body style="font-family: 'Montserrat', sans-serif;">
    <nav class="navbar p-2 mb-4" style="background-color: #05347e;">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="images/icon.png" style="height: 7vh;">
                <span class="h1 mt-2 ms-3" style="font-weight: 900; color: white;"> XP Zone</span>
            </a>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row mb-4 m-auto">
            <div class="col-2 col-sm-2 col-md-2 col-lg-2 mt-2">
                <div class="card shadow d-flex flex-column"
                    style="width: auto; height: 82vh; background-color: #f8f9fa;">
                    <ul class="list-group list-group-flush d-flex flex-column flex-grow-1">
                        <a href="?page=allNews" class="text-decoration-none">
                            <li
                                class="list-group-item nav-item d-flex align-items-center px-2 py-1 px-md-3 py-md-2 <?php echo ($page == 'allNews' ? 'active' : ''); ?>">
                                <i class="bi bi-newspaper fs-6 fs-md-4"></i>
                                <span class="d-none d-md-inline ms-2">All News</span>
                            </li>
                        </a>
                        <a href="?page=playstation" class="text-decoration-none">
                            <li
                                class="list-group-item nav-item d-flex align-items-center px-2 py-1 px-md-3 py-md-2 <?php echo ($page == 'playstation' ? 'active' : ''); ?>">
                                <i class="bi bi-playstation fs-6 fs-md-4"></i>
                                <span class="d-none d-md-inline ms-2">Playstation</span>
                            </li>
                        </a>
                        <a href="?page=xbox" class="text-decoration-none">
                            <li
                                class="list-group-item nav-item d-flex align-items-center px-2 py-1 px-md-3 py-md-2 <?php echo ($page == 'xbox' ? 'active' : ''); ?>">
                                <i class="bi bi-xbox fs-6 fs-md-4"></i>
                                <span class="d-none d-md-inline ms-2">Xbox</span>
                            </li>
                        </a>
                        <a href="?page=nintendo" class="text-decoration-none">
                            <li
                                class="list-group-item nav-item d-flex align-items-center px-2 py-1 px-md-3 py-md-2 <?php echo ($page == 'nintendo' ? 'active' : ''); ?>">
                                <i class="bi bi-nintendo-switch fs-6 fs-md-4"></i>
                                <span class="d-none d-md-inline ms-2">Nintendo</span>
                            </li>
                        </a>

                        <div class="mt-auto">
                            <li class="list-group-item d-flex align-items-center px-2 py-1 px-md-3 py-md-2">
                                <i class="bi bi-person-circle fs-6 fs-md-4"></i>
                                <span class="d-none d-md-inline ms-2">John Doe</span>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="col-10 mt-2">
                <div class="main card shadow"
                    style="width: auto; height: 82vh; background-color: #f8f9fa; overflow-y: auto;">
                    <?php include("shared/" . $page . ".php"); ?>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq"
        crossorigin="anonymous"></script>
</body>

</html>