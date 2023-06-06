// just example chats, users and messages to work with. will be replaced later with the real data.

let exampleUser = {
  username: "exampleName",
  online: true,
  unreadChats: [],
  friendList: [],
  chats: [],
  id: 1686048332310,
};
const exampleMsg = {
  content: "example message content",
  sentBy: exampleUser,
  read: false,
  id: 1686046981622,
};
let exampleChat = {
  users: [],
  messages: [exampleMsg],
  lastMsg: exampleMsg,
  undreadMessage: true,
  id: 1686049202912,
};
const exampleUser2 = {
  username: "exampleName2",
  unreadChats: [exampleChat],
  online: true,
  friendList: [exampleUser],
  chats: [exampleChat],
  id: 1686048332311,
};
exampleUser.friendList = [exampleUser2];
exampleUser.chats = [exampleChat];
exampleChat.users = [exampleUser, exampleUser2];
exampleChat.unreadChats = [exampleChat];

// declaration of the currently logged in user. will be replaced later with the real user.

const user = exampleUser;

// after this line, the main script starts.

document.addEventListener("DOMContentLoaded", function () {
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
});

// as you recommended me one day, i put all the functions in a seperate file to make it easier to view and understand the code.
// => ./js/functions.js
