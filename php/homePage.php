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
      let curPage = 1;
    </script>
    <script src="../js/library/jQuery.min.js"></script>
    <script src="../js/functions.js"></script>
    <script src="../js/main.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <!-- mainParent div for the 3 parts of the page. -->
    <div id="mainParent">
      <!-- the div for the left part. -->
      <div id="leftPage" class="child">
        <!-- just the header. -->
        <h1 id="leftPageH1"></h1>

        <!-- the searchbar and submit button. -->
        <div id="search">
          <input type="text" id="searchInput" placeholder="Name eingeben" />
          <button type="submit" onclick="search()">Suchen</button>
        </div>

        <!-- the div where the left content is listed. -->
        <div id="leftPageContent"></div>

        <!-- the buttons to switch between the left content. -->
        <div id="leftPageSwitch">
          <button id="chats" title="Auf die Chats umschalten">📝</button>
          <button id="friendlist" title="Auf die Freundesliste umschalten">
            👥
          </button>
          <button id="add" title="Freunde hinzufügen">➕</button>
        </div>
      </div>

      <!-- the div for the stats. -->
      <div id="stats" class="child">
        <h1>Messenger Statistiken</h1>

        <div id="statsContent" class="boxParent">
          <!-- every box with a statistic inside it. -->
          <div class="box">
            <p>
              Insgesamt von Dir gesendete Nachrichten:<br /><br /><span
                id="sentMessagesCount"
                >0</span
              >
            </p>
          </div>
          <div class="box">
            <p>
              Insgesamt erhaltene Nachrichten:<br /><br /><span
                id="receivedMessagesCount"
                >0</span
              >
            </p>
          </div>
          <div class="box">
            <p>
              Anzahl Deiner Freunde:<br /><br /><span id="friendCount">0</span>
            </p>
          </div>
          <div class="box">
            <p>
              Anzahl offener Chats:<br /><br /><span id="openChatCount">0</span>
            </p>
          </div>
          <div class="box">
            <p>
              Insgesamt registrierte Nutzer:<br /><br /><span
                id="registeredUserCount"
                >0</span
              >
            </p>
          </div>
          <div class="box">
            <p>
              Insgesamt gesendete Nachrichten:<br /><br /><span
                id="allSentMessagesCount"
                >0</span
              >
            </p>
          </div>
          <div class="box">
            <p>
              Aktuelle aktive Nutzer:<br /><br /><span id="onlineUserCount"
                >0</span
              >
            </p>
          </div>
          <div class="box">
            <p>
              Anzahl der Seitenaufrufe:<br /><br /><span id="pageViewCount"
                >0</span
              >
            </p>
          </div>
        </div>
      </div>

      <!-- the div for the changelog. -->
      <div id="changelog" class="child">
        <h1>Änderungsprotokoll</h1>

        <hr />
      </div>
    </div>

    <footer id="footer">
      <p>
        made with a bit of brain by
        <a href="https://senbey.net" target="_blank">senbey</a> and
        <a href="https://github.com/Czubik" target="_blank">Czubik</a>
      </p>
      <form action="logout.php" method="post">
        <input autocomplete="off" type="submit" value="Abmelden">
      </form>
    </footer>
  </body>
</html>

<!-- Please keep in mind that all of this is still WIP. -->
