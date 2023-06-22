<?php
    session_start();
?>
<form action="php/login.php" method="post">
    Nutzername:<br>
    <input autocomplete="off" type="text" size="40" maxlength="50" name="username" required><br>
    Passwort:<br>
    <input autocomplete="off" type="password" size="40"  maxlength="50" name="password" required><br><br>
    <input autocomplete="off" type="submit" value="Einloggen">
</form>
<?php
    if(isset($_SESSION["error"])){
        echo $_SESSION["error"];
    }
    session_unset();
?>
<br><a href="index.php">Du hast keinen Account? Klicke hier, um dich zu registrieren.</a>