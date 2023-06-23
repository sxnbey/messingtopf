let user = {};
let system = {
  pages: [
    { page: "chats", id: 1 },
    { page: "friendlist", id: 2 },
    { page: "add", id: 3 },
  ],
};

// declaration of the current page.

system.curPage = system.pages[0];

// the statistics, still hardcoded tho, will change later.

const stats = [];

// after this line, the main script starts.

document.addEventListener("DOMContentLoaded", async function () {
  // getting all the data

  await $.ajax({
    type: "POST",
    url: "api.php",
    success: function (result) {
      const data = JSON.parse(result);

      console.log(data);

      user.username = data.currentUser.username;
      user.status = data.currentUser.status;
      user.createdAt = data.currentUser.created_at;
      user.id = data.allUsersData.find(
        (i) => i.username == data.currentUser.username
      ).id;

      system.users = data.allUsersData;
      system.lastMessages = data.lastMessage;
      system.changelog = data.allChangelogs;

      stats.push(
        {
          id: "sentMessagesCount",
          value: data.currentUserSendMessages[0][0],
        },
        {
          id: "receivedMessagesCount",
          value: data.currentUserGetMessages[0][0],
        },
        { id: "friendCount", value: data.countOfYourFriends[0][0] },
        { id: "openChatCount", value: data.countOfOpenChats[0][0] },
        { id: "registeredUserCount", value: system.users.length },
        { id: "allSentMessagesCount", value: data.getAllSendedMessages[0][0] },
        { id: "onlineUserCount", value: data.getAllOnlineUsers[0][0] },
        { id: "pageViewCount", value: "/" }
      );

      createChatData(data.allChats);
      createFriendlistData(data.friendsIds);
    },
  });

  // declaration of everything that need to be in this block.

  const statBoxes = document.querySelectorAll(".box");

  // switches between the overviews, based on a given parameter on page load.
  // i have passed this function the parameter true, to tell the function that it has been called on page load, because i didnt
  // want to type most of the code 2 times. => see ./js/functions.js line 11.

  flchatSwitch();

  // adds an event listener to the buttons so the page changes to the friendlist/chats with a button press.

  ["chats", "friendlist", "add"].forEach((i) =>
    getEl(i).addEventListener("click", function (e) {
      flchatSwitch(e.target);
    })
  );

  // i use these array with objects from line 42 to put the value in the statistic boxes. => ./js/functions.js line 107

  stats.forEach((i) => addStats(i));

  // the content of the changelog.

  getEl("changelogContent").innerHTML =
    system.changelog.length == 0
      ? "Es ist aktuell nichts im Änderungsprotokoll vorhanden.<br/><br/>Schau zu einem anderen Zeitpunkt noch einmal vorbei."
      : system.changelog.join("<br/><br/>");

  // the hover animation for the boxes.

  statBoxes.forEach((i) => {
    i.addEventListener("mousemove", function (e) {
      const rect = i.getBoundingClientRect();

      i.style.transform = `perspective(500px) rotateX(${
        (-1 * (e.clientY - (rect.top + rect.height / 2))) / 5
      }deg) rotateY(${(e.clientX - (rect.left + rect.width / 2)) / 5}deg)`;
    });

    i.addEventListener("mouseout", function () {
      i.style.transform = "none";
    });
  });
});
