import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import useLocalStorage from "../hooks/useLocalStorage";
import gameSoundState from "../recoil/atoms/gameSoundState";
import i18n from "../services/i18n";

const SwitchLanguage = () => {
  const { t } = useTranslation();
  const { playOffSound } = useRecoilValue(gameSoundState);
  const [_, setStorageValue] = useLocalStorage("language", "vi");
  const changeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
    setStorageValue(lng);
    playOffSound && playOffSound();
  };

  return (
    <h5 className="select-language">
      {t("Language")}:{" "}
      <strong onClick={() => changeLanguage("en")}>{t("English")}</strong> -{" "}
      <strong onClick={() => changeLanguage("vi")}>{t("Vietnamese")}</strong>
    </h5>
  );
};

export default SwitchLanguage;
