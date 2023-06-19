// a shorter version of the inbuilt get element by id function, it just saves a bit typing for me.

function getEl(input) {
  return document.getElementById(input);
}

// this function switches between the pages with a switch case.
// i made it scalable so it can switch between chats/friendlist on the page load with the change of a single parameter.
// the scalability makes it even easier to put a third "page" in there, for like group chats or whatever.

function flchatSwitch(useCurrentParam = false) {
  switch (curPage) {
    default:
      break;

    case 1:
      if (useCurrentParam) {
        getEl("flButton").disabled = false;
        getEl("chatButton").disabled = true;

        list("chats", user.chats);
      } else {
        buttons();
        list("friendlist", user.friendlist);

        curPage = 2;
      }
      break;

    case 2:
      if (useCurrentParam) {
        getEl("chatButton").disabled = false;
        getEl("flButton").disabled = true;

        list("friendlist", user.friendlist);
      } else {
        buttons();
        list("chats", user.chats);

        curPage = 1;
      }
      break;
  }
}

// this function toggles the buttons so youre able to switch between the pages.

function buttons() {
  getEl("flButton").disabled = !getEl("flButton").disabled;
  getEl("chatButton").disabled = !getEl("chatButton").disabled;
}

// this function manipulates the html to display the chats/friendlist/user. i made it scalable too, so it can be used
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
      h1: "Freundeliste",
      none: "Du hast leider noch keine Freunde. :(<br/><br/>Komm, füge jemanden als Freund hinzu!",
      listCheck: user.friendlist,
    },
    user: {
      makeList: null,
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

// the function to search for users/chats.

function search() {
  const toSearch = getEl("searchInput").value.toLowerCase();
  let filteredUser;
  let whereSearch;

  if (!toSearch)
    return (getEl("leftPageContent").innerHTML =
      "Bitte gib etwas zum Suchen an! | <a onclick='flchatSwitch(true)'>🔙</a>");

  switch (curPage) {
    default:
      break;

    case 1:
      whereSearch = "chats";

      filteredUser = user.chats.filter((i) =>
        i.users.some((ii) => ii.username.toLowerCase().includes(toSearch))
      );
      break;

    case 2:
      whereSearch = "friendlist";

      filteredUser = user.friendlist.filter((i) =>
        i.username.toLowerCase().includes(toSearch)
      );

      break;

    case 3:
      whereSearch = "user";
      break;
  }

  if (filteredUser.length == 0)
    return (getEl("leftPageContent").innerHTML = `Es wurden kein${
      filteredUser.length == 1 ? "" : "e"
    } ${createText()} mit dem Namen "${toSearch}" gefunden. | <a onclick="flchatSwitch(true)">🔙</a>`);

  execute();

  // the functions to create the text and call the functions to change the page.

  function execute() {
    const text = `Es wurde${filteredUser.length == 1 ? "" : "n"} ${
      filteredUser.length
    } ${createText()} gefunden! | <a onclick="flchatSwitch(true)">🔙</a>`;

    switch (whereSearch) {
      default:
        break;

      case "chats":
        list("chats", filteredUser, text);
        break;

      case "friendlist":
        list("friendlist", filteredUser, text);
        break;

      case "user":
        list("user", filteredUser, text);
        break;
    }
  }

  function createText() {
    return whereSearch == "chats"
      ? `Chat${filteredUser.length == 1 ? "" : "s"}`
      : whereSearch == "user"
      ? "Nutzer"
      : `Freund${filteredUser.length == 1 ? "" : "e"}`;
  }
}
