<!-- including the config file to connect with the online database. -->
<?php 
include_once('includes/config/config.php');
?>	

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Campus of Tanks</title>
    <!-- Style Sheets -->
    <!-- Website Stylesheet. -->
    <link rel="stylesheet" type="text/css" href="StyleSheet.css" />
    <!-- bootstrap stylesheet. -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <!-- stylesheet for the fonts used. -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

</head>
<body>
    
    <div class="container">
        <div class="navbar">
            <nav class="navbar navbar-expand-md navbar-dark bg-dark">
                <div class="collapse navbar-collapse" id="Navbar">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="www.campusoftanks.nl">Campus of Tanks<span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div class="col-md-2 nopadding"></div>
        <div class="col-md-8 nopadding">
            <!-- username forum with the buttons to send it. -->
            <div class="username">
                <form id="myForm" method="post" action="includes/classes/playerClass.php">
                    <h2>Username:</h2><input type="text" id="userInput" name="userInput"/><br><br>
                    <input class="MyButton submit" name="submit" type="submit" value="Submit"/> <!--onclick="myFunction()"value="Submit"-->
                    <input class="MyButton" type="button" value="Back" onclick="window.location.href='index.html'" />
                </form>
            </div>
            <!-- saving the username here (stil need to fix the database) -->
            <script>
                function myFunction() {
                    document.getElementById("#").submit();
                }
            </script>

        </div>
        <div class="col-md-2 nopadding"></div>
    <!-- closing the main container here.-->    
    </div>
    
    <!-- loading scripts as last. this is so the website is more and faster responsive. -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</body>
</html>