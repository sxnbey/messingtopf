// just example chats, users and messages to work with. will be replaced later with the real data.

let exampleUser = {
  username: "senbey",
  online: true,
  unreadChats: [],
  friendList: [],
  chats: [],

  createdAt: 1686116861929,
  id: 1,
};
const exampleMsg = {
  content: "Was geht bei dir?",
  author: exampleUser,
  read: false,
  deleted: false,
  edited: { date: Date.now(), contentBefore: "" },
  createdAt: 1670844864000,
  id: 1,
};
let exampleChat = {
  undreadMessages: [exampleMsg],
  users: [],
  messages: [exampleMsg],
  lastMessage: exampleMsg,
  id: 1,
};
const exampleUser2 = {
  username: "xXGamerXx",
  online: true,
  unreadChats: [exampleChat],
  friendList: [exampleUser],
  chats: [exampleChat],
  createdAt: 1686116861931,
  id: 2,
};
exampleUser.friendList = [exampleUser2];
exampleUser.chats = [exampleChat];
exampleChat.users = [exampleUser, exampleUser2];
exampleChat.unreadChats = [exampleChat];

// declaration of the user. has to be outside of a block to be global.

const user = exampleUser;

// after this line, the main script starts.

document.addEventListener("DOMContentLoaded", function () {
  // declaration of everything i need.

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

  // i make an array where are all the objects with the id and value of each box of the statistic page.
  // i use these objects to put the value in these boxes. => ./js/functions.js line 107

  [
    { id: "sentMessagesCount", value: 123 },
    { id: "receivedMessagesCount", value: 123 },
    { id: "friendCount", value: 123 },
    { id: "openChatCount", value: 123 },
    { id: "registeredUserCount", value: 123 },
    { id: "allSentMessagesCount", value: 123 },
    { id: "onlineUserCount", value: 123 },
    { id: "pageViewCount", value: 123 },
  ].forEach((i) => addStats(i));

  // the hover animation for the boxes.

  statBoxes.forEach((i) => {
    i.addEventListener("mousemove", function (e) {
      const rect = i.getBoundingClientRect();

      i.style.transform = `perspective(1000px) rotateX(${
        (e.clientY - (rect.top + rect.height / 2)) / 10
      }deg) rotateY(${(e.clientX - (rect.left + rect.width / 2)) / 10}deg)`;
    });

    i.addEventListener("mouseout", () => {
      i.style.transform = "none";
    });
  });
});

// as you recommended me one day, i put all the functions in a seperate file to make it easier to view and understand the code.
// => ./js/functions.js
