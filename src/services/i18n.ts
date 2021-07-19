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
          "Congratulations!": "Congratulations!",
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
        },
      },
      vi: {
        translation: {
          English: "Tiếng Anh",
          Vietnamese: "Tiếng Việt",
          Back: "Trở lại",
          Replay: "Chơi lại",
          Language: "Ngôn ngữ",
          Level: "Cấp độ",
          "Congratulations!": "Xin chúc mừng!",
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
