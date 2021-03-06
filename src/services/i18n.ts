import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          English: "English",
          Vietnamese: "Vietnamese",
          Back: "Back",
          Replay: "Replay",
          Language: "Language",
          Level: "Level",
          Welcome: "Welcome",
          Congratulations: "Congratulations",
          Submit: "Submit",
          Out: "Out",
          Quit: "Quit",
          Ready: "Ready",
          Stop: "Stop",
          You: "You",
          Competitor: "Competitor",
          Join: "Join",
          "Battle rule": "Battle rule",
          "Your points": "Your points",
          "Competitor points": "Competitor points",
          "The fastest is best": "The fastest is best",
          "The longest is best": "The longest is best",
          "Your score": "Your score",
          "Your time": "Your time",
          "Remaining time": "Remaining time",
          "New game ID just created": "New game just created ID - `{{gameId}}`",
          "Top players": "Top players",
          "Single player": "Single player",
          "Multi player": "Multi player",
          "Main menu": "Main menu",
          "Speed mode": "Speed mode",
          "Survival mode": "Survival mode",
          "Enter match ID": "Enter match ID",
          "Click to join": "Click to join",
          "Coming soon...": "Coming soon...",
          "Scroll down to play": "Scroll down to play",
          "Scroll down to chat": "Scroll down to chat and find match",
          "Preparing resource...": "Preparing resource...",
          "Please complete all levels as fast as you can":
            "Please complete all levels as fast as you can",
          "Try your best not to run out of time as long as possible.":
            "Try your best not to run out of time as long as possible",
          "Your time will increase when you match a pair of pokemon":
            "Your time will increase when you match a pair of pokemon",
          "Choosing the wrong pair will increase the time":
            "Choosing the wrong pair will increase the time",
          "Choosing the wrong pair will decrease the time":
            "Choosing the wrong pair will decrease the time",
          "Accept alphabet and digit only.":
            "Accept alphabet, digits and space only.",
          "Please enter your name": "Please enter your name",
          "Enter your name here": "Enter your name here",
          "Make your own ranking": "Make your own ranking",
          "Make match": "Make match",
          "Find random match": "Find random match",
          "Enter your message here...": "Enter your message here...",
          "Service is not available now.": "Service is not available now.",
          "Please try again": "Please try again",
          "Chat slowly please": "Chat slowly please",
          "Please enter the right match ID": "Please enter the right match ID",
          "Service is under maintenance": "Service is under maintenance",
          "Welcome to pokemon game!": "Welcome {{name}} to pokemon game!",
          "Have a good time playing the game.":
            "Have a good time playing the game, {{name}}.",
          "Sorry, I'm trying to connect our service again.":
            "Sorry {{ name }}, I'm trying to connect our service again.",
          "Connect to service failed. Will try again in the next 5s. Please wait for it.":
            "Connect to service failed. Will try again in the next 5s. Please wait for it.",
          "(Help) You can click on a `Game ID` of others to join the match.":
            "(Help) Hi {{name}}, you can click on a `Game ID` of others to join the match.",
          "(Help) Please click on make match to create your own match!":
            "(Help) Hi {{name}}, you click on `Make match` button to create your own match!",
          "If your points are over competitor points 50 points. You are the winner and vice versa.":
            "If your points are over competitor points 50 points. You are the winner and vice versa.",
          "Matched the wrong pair of pokemon, your points will be decreased":
            "Matched the wrong pair of pokemon, your points will be decreased by {{point}} points.",
          "Matched pair of pokemon, your points will be increased":
            "Matched pair of pokemon, your points will be increased by {{point}} points.",
          "Every time you level up, you will deal 1 of 2 effects `Freeze enemy` or `Give points to yourself`":
            "Every time you level up, you will deal 1 of 2 effects `Freeze enemy {{second}} second` or `Give {{point}} points to yourself`",
        },
      },
      vi: {
        translation: {
          English: "Ti???ng Anh",
          Vietnamese: "Ti???ng Vi???t",
          Back: "Quay v???",
          Replay: "Ch??i l???i",
          Language: "Ng??n ng???",
          Level: "C???p ?????",
          Welcome: "Ch??o b???n",
          Congratulations: "Xin ch??c m???ng",
          Submit: "Nh???p",
          Out: "Tho??t",
          Quit: "Tho??t",
          Ready: "S???n s??ng",
          Stop: "D???ng",
          You: "B???n",
          Competitor: "?????i th???",
          Join: "Tham gia",
          "Battle rule": "Lu???t ch??i",
          "Active players": "Ng?????i ch??i",
          "Active games": "Tr???n ?????u",
          "Your points": "??i???m c???a b???n",
          "Competitor points": "??i???m ?????i th???",
          "The fastest is best": "Ho??n th??nh c??ng s???m, th??? h???ng c??ng cao",
          "The longest is best":
            "K??o d??i th???i gian c??ng l??u, th??? h???ng c??ng cao",
          "Your score": "??i???m s??? c???a b???n",
          "Your time": "Th???i gian c???a b???n",
          "Remaining time": "Th???i gian c??n l???i",
          "Top players": "Danh s??ch ng?????i ch??i h??ng ?????u",
          "Single player": "C?? nh??n",
          "Multi player": "?????i kh??ng",
          "Main menu": "M??n h??nh ch??nh",
          "Speed mode": "T???c ?????",
          "Survival mode": "Sinh t???n",
          "Enter match ID": "Nh???p ID tr???n ?????u",
          "New game ID just created":
            "Tr???n ?????u m???i v???a ???????c t???o ID - `{{gameId}}`",
          "Coming soon...": "??ang ph??t tri???n...",
          "Click to join": "Tham gia",
          "Preparing resource...": "??ang chu???n b???...",
          "Scroll down to play": "L??n chu???t xu???ng ????? ch??i",
          "Scroll down to chat": "L??n chu???t xu???ng ????? nh???n tin v?? t??m tr???n",
          "Please complete all levels as fast as you can":
            "H??y ho??n th??nh t???t c??? c???p ????? nhanh nh???t c?? th??? ",
          "Try your best not to run out of time as long as possible":
            "C??? g???ng h???t s???c ????? kh??ng h???t th???i gian l??u nh???t c?? th???",
          "Your time will increase when you match a pair of pokemon":
            "Th???i gian c???a b???n s??? t??ng th??m khi ch???n kh???p m???t c???p pokemon",
          "Choosing the wrong pair will increase the time":
            "Ch???n sai c???p s??? b??? t??ng th??m th???i gian",
          "Choosing the wrong pair will decrease the time":
            "Ch???n sai c???p s??? b??? gi???m th???i gian",
          "Accept alphabet and digit only.":
            "Ch??? ch???p nh???n ch??? c??i, ch??? s??? v?? k?? t??? tr???ng.",
          "Please enter your name": "H??y nh???p t??n c???a b???n",
          "Enter your name here": "Nh???p t??n b???n t???i ????y",
          "Make your own ranking": "T???o x???p h???ng c???a b???n",
          "Make match": "T???o tr???n ?????u",
          "Find random match": "T??m tr???n ng???u nhi??n",
          "Please enter the right match ID": "H??y nh???p ????ng m?? tr???n ?????u",
          "Enter your message here...": "Nh???p tin nh???n t???i ????y...",
          "Service is not available now.": "D???ch v??? hi???n t???i kh??ng kh??? d???ng.",
          "Please try again": "Th??? l???i",
          "Chat slowly please": "Chat ch???m l???i b???n nh??",
          "Service is under maintenance": "D???ch v??? ??ang ???????c b???o tr??",
          "Welcome to pokemon game!":
            "Ch??o m???ng b???n {{name}} ?????n v???i tr?? ch??i pokemon!",
          "Have a good time playing the game.":
            "Ch??c b???n {{name}} c?? m???t kho???ng th???i gian ch??i tho???i m??i v?? vui v???.",
          "Sorry, I'm trying to connect our service again.":
            "Xin l???i {{ name }}, T??i ??ang c??? g???ng k???t n???i d???ch v??? tr??? l???i.",
          "Connect to service failed. Will try again in the next 5s. Please wait for it.":
            "K???t n???i t???i d???ch v??? th???t b???i, s??? th??? l???i trong 5s. Vui l??ng ch??? trong gi??y l??t.",
          "(Help) You can click on a `Game ID` of others to join the match.":
            "(H??? tr???) Ch??o {{name}}, b???n c?? th??? click v??o `Game ID` c???a ng?????i kh??c ????? tham gia tr???n ?????u.",
          "(Help) Please click on make match to create your own match!":
            "(H??? tr???) Ch??o {{name}}, B???n h??y b???m n??t `T???o tr???n` ????? c?? th??? b???t ?????u tr???n ?????u c???a m??nh!",
          "If your points are over competitor points 50 points. You are the winner and vice versa.":
            "N???u ??i???m c???a b???n h??n ?????i th??? c???nh tranh 50 ??i???m. B???n l?? ng?????i chi???n th???ng v?? ng?????c l???i.",
          "Matched the wrong pair of pokemon, your points will be decreased":
            "K???t h???p sai c???p pokemon, ??i???m c???a b???n s??? b??? gi???m {{point}} ??i???m.",
          "Matched pair of pokemon, your points will be increased":
            "Ch???n c???p pokemon ph?? h???p, ??i???m c???a b???n s??? ???????c t??ng l??n {{point}} ??i???m",
          "Every time you level up, you will deal 1 of 2 effects `Freeze enemy` or `Give points to yourself`":
            "M???i khi t??ng c???p b???n s??? g??y 1 trong 2 hi???u ???ng `????ng b??ng ?????i ph????ng {{second}} gi??y` ho???c `T??ng {{point}} ??i???m cho b???n th??n`",
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
