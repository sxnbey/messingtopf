// a shorter version of the inbuilt get element by id function, it just saves a bit typing for me.

function getEl(input) {
  return document.getElementById(input);
}

// this function switches between the chats and the friendlist with a switch case.
// i made it scalable so it can switch between chats/friendlist on the page load with the change of a single parameter.
// the scalability makes it even easier to put a third "page" in there, for like group chats or whatever.

function flchatSwitch(useCurrentParam = false) {
  switch (curPage) {
    default:
      break;

    case 1:
      if (useCurrentParam) {
        buttonsChatList();
        chatList();
      } else {
        buttonsFriendlist();
        flList();

        curPage = 2;
      }
      break;

    case 2:
      if (useCurrentParam) {
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

// these 2 functions manipulate the html to display the chats/friendlist. i made it scalable too, so it can be used
// for multiple things without typing code 2 times.

function chatList(toList = user.chats, extraParagraph = false) {
  getEl("chatsflContent").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Chats";

  if (user.chats.length == 0)
    return (getEl("chatsflContent").innerHTML =
      "Du hast leider noch keine Chats. :(<br/><br/>Komm, fang an zu chatten!");

  if (extraParagraph)
    getEl(
      "chatsflContent"
    ).innerHTML += `<p class="extraParagraph">${extraParagraph}</p>`;

  toList.forEach((i) => {
    const oUser = i.users.filter((ii) => ii.id != user.id)[0];
    const lastAuthor = i.lastMessage.author;
    let chatTime = new Date(i.lastMessage.createdAt)
      .toLocaleTimeString()
      .split(":");
    chatTime.pop();
    chatTime = chatTime.join(":");

    if (Date.now() - i.lastMessage.createdAt > 1000 * 60 * 60 * 24)
      chatTime = new Date(i.lastMessage.createdAt).toLocaleDateString();

    getEl("chatsflContent").innerHTML += `
          <div id="${oUser.id}" class="chatsflElement chat" title="Chat mit ${
      oUser.username
    } öffnen" onclick="openChat(${oUser.id})"><p class="chatName"><b>${
      oUser.username
    }</b></p><div class="chatContent"><p class="chatMsg"><b>${
      lastAuthor.id == user.id ? "Du" : lastAuthor.username
    }:</b> ${
      i.lastMessage.content
    }</p><p class="chatDate">${chatTime}</p></div></div>`;
  });
}

function flList(toList = user.friendList, extraParagraph = false) {
  getEl("chatsflContent").innerHTML = "";
  getEl("chatsflH1").innerHTML = "Freundesliste";

  if (user.friendList.length == 0)
    return (getEl("chatsflContent").innerHTML =
      "Du hast leider noch keine Freunde. :(<br/><br/>Komm, füge jemanden als Freund hinzu!");

  if (extraParagraph)
    getEl(
      "chatsflContent"
    ).innerHTML += `<p class="extraParagraph">${extraParagraph}</p>`;

  toList.forEach((i) => {
    getEl("chatsflContent").innerHTML += `
          <div class="chatsflElement">
            <p>${i.username}</p>
          </div>`;
  });
}

// the function to add the value to the boxes on the statistic page.

function addStats(box) {
  getEl(box.id).innerHTML = box.value;
}

// the function to redirect to the chat.

function openChat(uid) {
  console.log(`https://messingtopf.senbey.net/chat?uid=${uid}`);
}

// search function.

function search() {
  const toSearch = getEl("searchInput").value.toLowerCase();
  let filteredUser;
  let whereSearch;

  if (!toSearch)
    return (getEl("chatsflContent").innerHTML =
      "Bitte gib etwas zum Suchen an! | <a onclick='flchatSwitch(true)'>🔙</a>");

  switch (curPage) {
    default:
      break;

    case 1:
      whereSearch = "chats";
      break;

    case 2:
      whereSearch = "friendList";
      break;
  }

  if (whereSearch == "chats")
    filteredUser = user.chats.filter((i) =>
      i.users.some((ii) => ii.username.toLowerCase().includes(toSearch))
    );
  else
    filteredUser = user.friendList.filter((i) =>
      i.username.toLowerCase().includes(toSearch)
    );

  if (filteredUser.length == 0)
    return (getEl("chatsflContent").innerHTML = `Es wurden keine ${
      whereSearch == "chats" ? "Chats" : "Freunde"
    } mit dem Namen "${toSearch}" gefunden. | <a onclick="flchatSwitch(true)">🔙</a>`);

  if (whereSearch == "chats")
    chatList(
      filteredUser,
      `Es wurde${filteredUser.length == 1 ? "" : "n"} ${
        filteredUser.length
      } Chat${
        filteredUser.length == 1 ? "" : "s"
      } gefunden! | <a onclick="flchatSwitch(true)">🔙</a>`
    );
  else
    flList(
      filteredUser,
      `Es wurde${filteredUser.length == 1 ? "" : "n"} ${
        filteredUser.length
      } Freund${
        filteredUser.length == 1 ? "" : "e"
      } gefunden! | <a onclick="flchatSwitch(true)">🔙</a>`
    );
}
