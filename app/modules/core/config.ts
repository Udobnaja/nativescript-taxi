import {Color} from "tns-core-modules/color";
import {LabelState} from "../../shared/enums/floatLabel.enum";
// static token = "";
// static messagePermissons = false;
export class Config {
  static APIURL:string = "https://dgorod.com/api/v1/";

  static ActionBarColor:Color = new Color("#1e88e5");
  static DefaultActionBarColor:Color = new Color("#332c2c2c");

  static TermOfUseLInk:string = "https://dgorod.com/terms-of-use.html";
  static PrivacyPolicyLink:string = "https://dgorod.com/privacy-policy.html";

  static bicLength:number = 9;
  static bnkCorrLength:number = 20;

  static messages = {
    "schedule": {
      "1-5": "Вывод денег осуществляется с 1 по 5 число месяца, попробуйте изменить дату.",
      "1-5_15-20": "Вывод денег осуществляется с 1 по 5 и с 15 по 20 число месяца, попробуйте изменить дату.",
      "daily": "",
      "every_fri": "Вывод денег осуществляется каждую пятницу месяца, попробуйте изменить дату.",
      "every_mon_every_thu": "Вывод денег осуществляется каждый понедельник и четверг месяца, попробуйте изменить дату.",
      "every_thu": "Вывод денег осуществляется каждый четверг месяца, попробуйте изменить дату.",
      "no_payment": "В данный момент мы не осуществляем вывод денег.",
      "weekly": "",
      "default": "Вывод денег недоступен в выбранный день, попробуйте изменить дату."
    },
    "error": {
      "title": "Ошибка",
      "body": {
        "restart": "Попробуйте перезапустить приложение.",
        "user-not-found": "Такого пользователя не существует.",
        "bic-length": `Длина БИК должна быть равна ${Config.bicLength} символам`,
        "bic-type": "Поле Бик может содержать только цифры",
        "bic-not-found": "Бик с таким номером не зарегистрирован",
        "bnk-corr-length": `Длина Номер счёта должна быть равна ${Config.bnkCorrLength} символам`,
        "bnk-corr-type": "Поле Номер счёта может содержать только цифры",
        "fio-type": "Поле должно содержать только буквы",
        "fio-length": "Поле обязательно к заполнению"
      }
    },
    "button":{
      "ok": "OK"
    }
  };

  static maxNextMonth:number = 3;

  static getLabelsSettings(type:LabelState){
    let state;
    switch (type) {
      case  LabelState.focus:
        state = {
          fontSize: 12,
          translateY: -20,
          color: new Color("#ffc107")
        };
        break;
      case  LabelState.blur:
        state = {
          fontSize: 16,
          translateY: 0,
          color: new Color("#1e000000")
        };
        break;
      case LabelState.error:
        state = {
          color: new Color("#fe335b"),
          fontSize: 12,
          translateY: -20
        };
        break;
      case LabelState.default:
        state = {
          color: new Color("#61000000")
        }
    }

    return state;
  };
}


