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
          English: "Tiếng Anh",
          Vietnamese: "Tiếng Việt",
          Back: "Quay về",
          Replay: "Chơi lại",
          Language: "Ngôn ngữ",
          Level: "Cấp độ",
          Welcome: "Chào bạn",
          Congratulations: "Xin chúc mừng",
          Submit: "Nhập",
          Out: "Thoát",
          Quit: "Thoát",
          Ready: "Sẵn sàng",
          Stop: "Dừng",
          You: "Bạn",
          Competitor: "Đối thủ",
          Join: "Tham gia",
          "Battle rule": "Luật chơi",
          "Active players": "Người chơi",
          "Active games": "Trận đấu",
          "Your points": "Điểm của bạn",
          "Competitor points": "Điểm đối thủ",
          "The fastest is best": "Hoàn thành càng sớm, thứ hạng càng cao",
          "The longest is best":
            "Kéo dài thời gian càng lâu, thứ hạng càng cao",
          "Your score": "Điểm số của bạn",
          "Your time": "Thời gian của bạn",
          "Remaining time": "Thời gian còn lại",
          "Top players": "Danh sách người chơi hàng đầu",
          "Single player": "Cá nhân",
          "Multi player": "Đối kháng",
          "Main menu": "Màn hình chính",
          "Speed mode": "Tốc độ",
          "Survival mode": "Sinh tồn",
          "Enter match ID": "Nhập ID trận đấu",
          "New game ID just created":
            "Trận đấu mới vừa được tạo ID - `{{gameId}}`",
          "Coming soon...": "Đang phát triển...",
          "Click to join": "Tham gia",
          "Preparing resource...": "Đang chuẩn bị...",
          "Scroll down to play": "Lăn chuột xuống để chơi",
          "Scroll down to chat": "Lăn chuột xuống để nhắn tin và tìm trận",
          "Please complete all levels as fast as you can":
            "Hãy hoàn thành tất cả cấp độ nhanh nhất có thể ",
          "Try your best not to run out of time as long as possible":
            "Cố gắng hết sức để không hết thời gian lâu nhất có thể",
          "Your time will increase when you match a pair of pokemon":
            "Thời gian của bạn sẽ tăng thêm khi chọn khớp một cặp pokemon",
          "Choosing the wrong pair will increase the time":
            "Chọn sai cặp sẽ bị tăng thêm thời gian",
          "Choosing the wrong pair will decrease the time":
            "Chọn sai cặp sẽ bị giảm thời gian",
          "Accept alphabet and digit only.":
            "Chỉ chấp nhận chữ cái, chữ số và kí tự trắng.",
          "Please enter your name": "Hãy nhập tên của bạn",
          "Enter your name here": "Nhập tên bạn tại đây",
          "Make your own ranking": "Tạo xếp hạng của bạn",
          "Make match": "Tạo trận đấu",
          "Find random match": "Tìm trận ngẫu nhiên",
          "Please enter the right match ID": "Hãy nhập đúng mã trận đấu",
          "Enter your message here...": "Nhập tin nhắn tại đây...",
          "Service is not available now.": "Dịch vụ hiện tại không khả dụng.",
          "Please try again": "Thử lại",
          "Chat slowly please": "Chat chậm lại bạn nhé",
          "Service is under maintenance": "Dịch vụ đang được bảo trì",
          "Welcome to pokemon game!":
            "Chào mừng bạn {{name}} đến với trò chơi pokemon!",
          "Have a good time playing the game.":
            "Chúc bạn {{name}} có một khoảng thời gian chơi thoải mái và vui vẻ.",
          "Sorry, I'm trying to connect our service again.":
            "Xin lỗi {{ name }}, Tôi đang cố gắng kết nối dịch vụ trở lại.",
          "Connect to service failed. Will try again in the next 5s. Please wait for it.":
            "Kết nối tới dịch vụ thất bại, sẽ thử lại trong 5s. Vui lòng chờ trong giây lát.",
          "(Help) You can click on a `Game ID` of others to join the match.":
            "(Hỗ trợ) Chào {{name}}, bạn có thể click vào `Game ID` của người khác để tham gia trận đấu.",
          "(Help) Please click on make match to create your own match!":
            "(Hỗ trợ) Chào {{name}}, Bạn hãy bấm nút `Tạo trận` để có thể bắt đầu trận đấu của mình!",
          "If your points are over competitor points 50 points. You are the winner and vice versa.":
            "Nếu điểm của bạn hơn đối thủ cạnh tranh 50 điểm. Bạn là người chiến thắng và ngược lại.",
          "Matched the wrong pair of pokemon, your points will be decreased":
            "Kết hợp sai cặp pokemon, điểm của bạn sẽ bị giảm {{point}} điểm.",
          "Matched pair of pokemon, your points will be increased":
            "Chọn cặp pokemon phù hợp, điểm của bạn sẽ được tăng lên {{point}} điểm",
          "Every time you level up, you will deal 1 of 2 effects `Freeze enemy` or `Give points to yourself`":
            "Mỗi khi tăng cấp bạn sẽ gây 1 trong 2 hiệu ứng `Đóng băng đối phương {{second}} giây` hoặc `Tăng {{point}} điểm cho bản thân`",
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
