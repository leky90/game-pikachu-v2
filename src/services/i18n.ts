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
          "The fastest is best": "The fastest is best",
          "The longest is best": "The longest is best",
          "Your score": "Your score",
          "Your time": "Your time",
          "Remaining time": "Remaining time",
          "Top players": "Top players",
          "Single player": "Single player",
          "Multi player": "Multi player",
          "Main menu": "Main menu",
          "Speed mode": "Speed mode",
          "Survival mode": "Survival mode",
          "Coming soon...": "Coming soon...",
          "Scroll down to play": "Scroll down to play",
          "Scroll down to chat": "Scroll down to chat",
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
          "Service is under maintenance": "Service is under maintenance",
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
          "Coming soon...": "Đang phát triển...",
          "Preparing resource...": "Đang chuẩn bị...",
          "Scroll down to play": "Lăn chuột xuống để chơi",
          "Scroll down to chat": "Lăn chuột xuống để nhắn tin",
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
          "Enter your message here...": "Nhập tin nhắn tại đây...",
          "Service is not available now.": "Dịch vụ hiện tại không khả dụng.",
          "Please try again": "Thử lại",
          "Chat slowly please": "Chat chậm lại bạn nhé",
          "Service is under maintenance": "Dịch vụ đang được bảo trì",
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
