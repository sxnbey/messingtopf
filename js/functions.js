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
  getEl("chatsflContent").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Chats";

  if (user.chats.length == 0)
    return (getEl("chatsflContent").innerHTML =
      "Du hast leider keine Chats. :(<br/><br/>Komm, fang an zu chatten!");

  user.chats.forEach((i) => {
    let chatTime = new Date(i.lastMessage.createdAt)
      .toLocaleTimeString()
      .split(":");
    chatTime.pop();
    chatTime = chatTime.join(":");

    if (Date.now() - i.lastMessage.createdAt > 1000 * 60 * 60 * 24)
      chatTime = new Date(i.lastMessage.createdAt).toLocaleDateString();

    getEl("chatsflContent").innerHTML += `
          <div id="${
            i.users.filter((ii) => ii.id != user.id)[0].id
          }" class="chatsflElement"><p class="chatName"><b>${
      i.users.filter((ii) => ii.id != user.id)[0].username
    }</b></p><div class="chatContent"><p class="chatMsg"><b>${
      i.lastMessage.author.id == user.id ? "Du" : i.lastMessage.author.username
    }:</b> ${
      i.lastMessage.content
    }</p><p class="chatDate">${chatTime}</p></div></div>`;
  });
}

function flList() {
  getEl("chatsflContent").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Freundesliste";

  if (user.friendList.length == 0)
    return (getEl("chatsflContent").innerHTML =
      "Du hast leider keine Chats. :(<br/><br/>Komm, fang an zu chatten!");

  user.chats.forEach((i) => {
    getEl("chatsflContent").innerHTML += `
          <div id="${
            i.users.filter((ii) => ii.id != user.id)[0].id
          }" class="chatsflElement">
            <p>${i.users.filter((ii) => ii.id != user.id)[0].username}</p>
          </div>`;
  });
}

//  the function to add the value to the boxes on the statistic page.

function addStats(obj) {
  getEl(obj.id).innerHTML = obj.value;
}
