// a shorter version of the inbuilt get element by id function, it just saves a bit typing for me.

function getEl(input) {
  return document.getElementById(input);
}

// this function switches between the chats and the friendlist with a switch case.
// i made it scalable so it can switch between chats/friendlist on the page load with the change of a single parameter.
// the scalability makes it even easier to put a third "page" in there, for like group chats or whatever.

function flchatSwitch(onload = false) {
  switch (curPage) {
    default:
      break;

    case 1:
      if (onload) {
        buttonsChatList();
        chatList();
      } else {
        buttonsFriendlist();
        flList();

        curPage = 2;
      }
      break;

    case 2:
      if (onload) {
        buttonsFriendlist();
        flList();
      } else {
        buttonsChatList();
        chatList();

        curPage = 1;
      }
      break;
  }
}

// these 2 functions manipulate the buttons so youre able to switch between the friendlist and the chats.

function buttonsChatList() {
  getEl("flButton").disabled = false;
  getEl("chatButton").disabled = true;
}

function buttonsFriendlist() {
  getEl("chatButton").disabled = false;
  getEl("flButton").disabled = true;
}

// these 2 functions manipulate the html to display the chats/friendlist.

function chatList() {
  getEl("chatsflDiv").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Chats";

  user.chats.forEach((i) => {
    getEl("chatsflDiv").innerHTML += `
          <div id="${i.users.filter((ii) => ii.id != user.id)[0].id}">
            ${
              i.users.filter((ii) => ii.id != user.id)[0].username +
              " | " +
              i.lastMsg.content
            }
            <hr />
          </div>`;
  });
}

function flList() {
  getEl("chatsflDiv").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Freundesliste";

  user.chats.forEach((i) => {
    getEl("chatsflDiv").innerHTML += `
          <div id="${i.users.filter((ii) => ii.id != user.id)[0].id}">
            ${i.users.filter((ii) => ii.id != user.id)[0].username}
            <hr />
          </div>`;
  });
}
