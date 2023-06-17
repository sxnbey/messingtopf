<?php
    session_start();
?>
<form action="php/register.php" method="post">
    Username:<br>
    <input autocomplete="off" type="text" size="40" maxlength="50" name="username" required><br>
    Passwort:<br>
    <input autocomplete="off" type="password" size="40"  maxlength="50" name="password" required><br>
    Passwort wiederholen:<br>
    <input autocomplete="off" type="password" size="40" maxlength="50" name="password2" required><br><br>
    <input autocomplete="off" type="submit" value="Register!">
</form>
<?php
    if(isset($_SESSION["error"])){
        echo $_SESSION["error"];
    }
    session_unset();
?>
<br><a href="loginPage.php">You already have a Account. Login in-></a>
