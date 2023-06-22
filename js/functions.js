// a shorter version of the inbuilt get element by id function, it just saves a bit typing for me.

function getEl(input) {
  return document.getElementById(input);
}

// this function switches between the pages.
// the scalability makes it even easier to put a 4th page in there, for like group chats or whatever.

function flchatSwitch(target = false) {
  const lists = {
    1: { toList: user.chats },
    2: { toList: user.friendlist },
    3: { toList: [] },
  };

  if (!target) target = getEl(system.curPage.page);

  let buttons = system.pages.filter((i) => i.id != target.id);
  buttons.forEach((i) => (getEl(i.page).disabled = false));

  target.disabled = true;

  system.curPage = system.pages.find((i) => i.page == target.id);

  list(system.curPage.page, lists[system.curPage.id].toList);
}

// this function manipulates the html to display the pages. i made it scalable too, so it can be used
// for multiple things without typing code 2 times.

function list(param, toList, extraParagraph = false) {
  const obj = {
    chats: {
      makeList: function () {
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

          getEl("leftPageContent").innerHTML += `
          <div id="${oUser.id}" class="leftPageElement chat" title="Chat mit ${
            oUser.username
          } öffnen" onclick="openChat(${i.id})"><p class="chatName"><b>${
            oUser.username
          }</b></p><div class="chatContent"><p class="chatMsg"><b>${
            lastAuthor.id == user.id ? "Du" : lastAuthor.username
          }:</b> ${
            i.lastMessage.content
          }</p><p class="chatDate">${chatTime}</p></div></div>`;
        });
      },
      h1: "Chats",
      none: "Du hast leider noch keine Chats. :(<br/><br/>Komm, fang an zu chatten!",
      listCheck: user.chats,
    },
    friendlist: {
      makeList: function () {
        toList.forEach((i) => {
          getEl("leftPageContent").innerHTML += `
          <div class="leftPageElement">
            <p>${i.username}</p>
          </div>`;
        });
      },
      h1: "Freundesliste",
      none: "Du hast leider noch keine Freunde. :(<br/><br/>Komm, füge jemanden als Freund hinzu!",
      listCheck: user.friendlist,
    },
    add: {
      makeList: function () {
        toList.forEach((i) => {
          getEl("leftPageContent").innerHTML += `
          <div class="leftPageElement">
            <p>${i.username}</p>
          </div>`;
        });
      },
      h1: "Nutzer hinzufügen",
      none: null,
      listCheck: null,
    },
  };

  getEl("leftPageContent").innerHTML = "";
  getEl("leftPageH1").innerHTML = obj[param].h1;

  if (obj[param].listCheck == 0)
    return (getEl("leftPageContent").innerHTML = obj[param].none);

  if (extraParagraph)
    getEl(
      "leftPageContent"
    ).innerHTML += `<p class="extraParagraph">${extraParagraph}</p>`;

  obj[param].makeList();
}

// the function to add the value to the boxes on the statistic page.

function addStats(box) {
  getEl(box.id).innerHTML = box.value;
}

// the function to redirect to the chat.

function openChat(chatid) {
  console.log(`https://messingtopf.senbey.net/chat?chatid=${chatid}`);
}

// the function to search for users.

function search() {
  const filters = {
    1: {
      filter: function () {
        return user.chats.filter((i) =>
          i.users.some((ii) => ii.username.toLowerCase().includes(toSearch))
        );
      },
    },
    2: {
      filter: function () {
        return user.friendlist.filter((i) =>
          i.username.toLowerCase().includes(toSearch)
        );
      },
    },
    3: {
      filter: function () {
        return system.users.filter(
          (i) => i.username.toLowerCase() == toSearch && i.id != user.id
        );
      },
    },
  };
  const toSearch = getEl("searchInput").value.toLowerCase();
  let filteredUser = filters[system.curPage.id].filter();

  if (!toSearch)
    return (getEl(
      "leftPageContent"
    ).innerHTML = `Bitte gib etwas zum Suchen an! | ${backButton()}`);

  if (toSearch.toLowerCase() == user.username.toLowerCase())
    return (getEl(
      "leftPageContent"
    ).innerHTML = `Du kannst nicht nach dir selbst suchen! | ${backButton()}`);

  if (filteredUser.length == 0)
    return (getEl("leftPageContent").innerHTML = `Es wurden kein${
      filteredUser.length == 1 ? "" : "e"
    } ${createText()} mit dem Namen "${toSearch}" gefunden. | ${backButton()}`);

  list(
    system.curPage.page,
    filteredUser,
    `Es wurde${filteredUser.length == 1 ? "" : "n"} ${
      filteredUser.length
    } ${createText()} gefunden! | ${backButton()}`
  );

  function createText() {
    return system.curPage.page == "chats"
      ? `Chat${filteredUser.length == 1 ? "" : "s"}`
      : system.curPage.page == "add"
      ? "Nutzer"
      : `Freund${filteredUser.length == 1 ? "" : "e"}`;
  }

  function backButton() {
    return "<a onclick='flchatSwitch()'>🔙</a>";
  }
}

// the functions to create all the data of the user.

function createChatData(chats) {
  user.chats = [];

  chats.forEach((i) => {
    const lastMessage = system.lastMessages.find((ii) => i.id == ii.chat_id);

    user.chats.push({
      users: [user, system.users.find((ii) => ii.id == i.user_id)],
      id: i.id,
      lastMessage: {
        id: system.lastMessages.find((ii) => i.id == ii.chat_id),
        deleted: lastMessage.deleted == "N" ? false : true,
        read: lastMessage.seen == "no" ? false : true,
        createdAt: lastMessage.send_at * 1000,
        content: lastMessage.message,
        author: system.users.find((ii) => ii.id == lastMessage.send_by_user_id),
      },
    });
  });
}

function createFriendlistData(friends) {
  user.friendlist = [];

  friends.forEach((i) =>
    user.friendlist.push(system.users.find((ii) => i.user_id == ii.id))
  );
}
