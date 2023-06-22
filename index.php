<?php
    session_start();
?>
<form action="php/register.php" method="post">
    Nutzername:<br>
    <input autocomplete="off" type="text" size="40" maxlength="50" name="username" required><br>
    Passwort:<br>
    <input autocomplete="off" type="password" size="40"  maxlength="50" name="password" required><br>
    Passwort wiederholen:<br>
    <input autocomplete="off" type="password" size="40" maxlength="50" name="password2" required><br><br>
    <input autocomplete="off" type="submit" value="Registrieren">
</form>
<?php
    if(isset($_SESSION["error"])){
        echo $_SESSION["error"];
    }
    session_unset();
?>
<br><a href="loginPage.php">Du hast bereits einen Account? Klicke hier, um dich einzuloggen.</a>
