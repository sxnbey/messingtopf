<?php
session_start();
// Check if someone logged or registered and if not then redirect him to register page
if(!isset($_SESSION['username'])){
  header("Location: ../index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="../css/main.css" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>messingtopf</title>
    <script>
      // the parameter to change between the chats and the friendlist. 1 = chats, 2 = friendlist
      let curPage = 2;
    </script>
    <script src="../js/library/jQuery.min.js"></script>
    <script src="../js/functions.js"></script>
    <script src="../js/main.js"></script>
  </head>
  <body>
    <!-- parent div for the 3 parts of the page. -->
    <div id="parent">
      <!-- the div for the chats/friendlist. -->
      <div id="chatsfl" class="child">
        <!-- just the header and a horizontal line. -->
        <h1 id="chatsflH1"></h1>

        <hr />

        <!-- the searchbar and submit button with another horizontal line. -->
        <div id="search">
          <input type="text" id="searchInput" placeholder="Name eingeben" />
          <button type="submit" id="searchSubmit">Suchen</button>
        </div>

        <hr />

        <!-- the div where the chats or the friends are listed. -->
        <div id="chatsflDiv"></div>

        <!-- the buttons to switch between chats and the friendlist. -->
        <div id="chatflSwitch">
          <button id="chatButton">📝</button>
          <button id="flButton">👥</button>
        </div>
      </div>

      <!-- the div for the stats. -->
      <div id="stats" class="child">
        <h1>stats</h1>
      </div>

      <!-- the div for the changelog. -->
      <div id="changelog" class="child">
        <h1>changelog</h1>
      </div>
    </div>
  </body>
</html>

<!-- Please keep in mind that all of this is still WIP. -->