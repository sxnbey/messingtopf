// just example chats, users and messages to work with. will be replaced later with the real data.
$.ajax({
  type: "POST",
  url: "api.php",
  success: function (result) {
    var jsonData = JSON.parse(result);
    console.log(jsonData);

    let exampleUser = {
      username: "exampleName",
      online: true,
      friendList: [],
      chats: [],
      id: 1686048332310,
    };
    const exampleMsg = {
      content: "example message content",
      sentBy: exampleUser,
      id: 1686046981622,
    };
    let exampleChat = {
      users: [],
      messages: [exampleMsg],
      lastMsg: exampleMsg,
      id: 1686049202912,
    };
    const exampleUser2 = {
      username: "exampleName2",
      online: true,
      friendList: [exampleUser],
      chats: [exampleChat],
      id: 1686048332311,
    };
    exampleUser.friendList = [exampleUser2];
    exampleUser.chats = [exampleChat];
    exampleChat.users = [exampleUser, exampleUser2];

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
  }
}) 

// as you recommended me one day, i put all the functions in a seperate file to make it easier to view and understand the code.
// => ./js/functions.js   