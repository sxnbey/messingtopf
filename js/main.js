// just example chats, users and messages to work with. will be replaced later with the real data.
const user = {};

$.ajax({
  type: "POST",
  url: "api.php",
  success: function (result) {
    const data = JSON.parse(result);
    console.log(data);
    // user.friends = data.friends;
    // user.chats = data.allChats;
    // user.status = data.currentUser.status;
    // user.username = data.currentUser.username;
  },
});

let exampleUser = {
  username: "senbey",
  online: true,
  friendlist: [],
  chats: [],
  createdAt: 1686116861929,
  id: 1,
};
const exampleMsg = {
  content: "Was geht bei dir?",
  author: user,
  read: false,
  deleted: false,
  createdAt: 1670844864000,
  id: 1,
};
let exampleChat = {
  users: [],
  messages: [exampleMsg],
  lastMessage: exampleMsg,
  id: 1,
};
const exampleUser2 = {
  username: "xXGamerXx",
  online: true,
  unreadChats: [exampleChat],
  friendlist: [user],
  chats: [exampleChat],
  createdAt: 1686116861931,
  id: 2,
};
const system = { users: [user, exampleUser2] };
user.friendlist = [exampleUser2];
user.chats = [exampleChat];
exampleChat.users = [user, exampleUser2];
exampleChat.unreadChats = [exampleChat];

const stats = [
  { id: "sentMessagesCount", value: 2.742 },
  { id: "receivedMessagesCount", value: 2.742 },
  { id: "friendCount", value: 2.742 },
  { id: "openChatCount", value: 2.742 },
  { id: "registeredUserCount", value: 2.742 },
  { id: "allSentMessagesCount", value: 2.742 },
  { id: "onlineUserCount", value: 2.742 },
  { id: "pageViewCount", value: 2.742 },
];

// after this line, the main script starts.

document.addEventListener("DOMContentLoaded", function () {
  // declaration of everything that need to be in this block.

  const statBoxes = document.querySelectorAll(".box");

  // switches between the friendlist and the chat overview, based on a given parameter on page load => see ./index.html line 10-11.
  // i have passed this function the parameter true, to tell the function that it has been called on page load, because i didnt
  // want to type most of the code 2 times. => see ./js/functions.js line 11.

  flchatSwitch(true);

  // adds an event listener to the chat and friendlist buttons so the page changes to the friendlist/chats with a button press.

  ["chatButton", "flButton"].forEach((i) =>
    getEl(i).addEventListener("click", function () {
      flchatSwitch();
    })
  );

  // i use these array with objects from line 45 to put the value in the statistic boxes. => ./js/functions.js line 107

  stats.forEach((i) => addStats(i));

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

// as you recommended me one day, i put all the functions in a seperate file to make it easier to view and understand the code.
// => ./js/functions.js
