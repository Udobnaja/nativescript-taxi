import {Color} from "tns-core-modules/color";
import {LabelState} from "./enums/floatLabel.enum";
export class Config {
  static token = "";
  static APIURL = "https://dgorod.com/api/v1/";
  static messagePermissons = false;
  static ActionBarColor: Color = new Color("#1e88e5");
  static DefaultActionBarColor: Color = new Color("#332c2c2c");

  static TermOfUseLInk = "https://yandex.ru/legal/taxi_termsofuse/index.html";
  static PrivacyPolicyLink = "https://yandex.ru/legal/confidential/index.html";

  static getLabelsSettings(type) {
    let state;
    switch (type) {
      case  LabelState.focus:
        state = {
          fontSize: 12,
          translateY: -20,
          color: new Color("#ffc107")
        }
        break;
      case  LabelState.blur:
        state = {
          fontSize: 16,
          translateY: 0,
          color: new Color("#1e000000")
        }
        break;
      case LabelState.error:
        state = {
          color: new Color("#fe335b"),
          fontSize: 12,
          translateY: -20
        }
        break
      case LabelState.default:
        state = {
          color: new Color("#61000000")
        }
    }

    return state;
  }
}


