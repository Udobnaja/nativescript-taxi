import {Layout} from "tns-core-modules/ui/layouts/layout";
import {Label} from "ui/label";
import { TextField } from "ui/text-field";
import {LabelState} from "../shared/enums/floatLabel.enum";
import {Config} from "../modules/core/config";
const textFieldModule = require("ui/text-field");
import {AnimationCurve} from "ui/enums";

export class FloatLabelsUtil{
    constructor(private layout){}

    initTextFields(){
        let cLength = this.layout.getChildrenCount();

        for(let i = 0; i < cLength; i++){
            let child = this.layout.getChildAt(i);
            if (child instanceof TextField){
                this.initFloatingLabels(child);
                child.on(textFieldModule.TextField.blurEvent, () => {
                    this.setFloatingLabels(child, LabelState.blur);
                });
            }
        }
    }

    private setLabel(textField:TextField):Label{
        return this.layout.getChildAt(this.layout.getChildIndex(textField) - 1);
    }

    private animateLabel(label:Label, state:LabelState){
        label.animate({
            translate: { x: 0, y: Config.getLabelsSettings(state).translateY},
            duration: 200,
            curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
        });
    }

    private initFloatingLabels(textField:TextField){
        let label = this.setLabel(textField);
        let state = (!textField.text.length) ? LabelState.blur : LabelState.focus;

        label.fontSize = Config.getLabelsSettings(state).fontSize;

        this.animateLabel(label, state);
    }

    public setFloatingLabels(textField:TextField, state:LabelState){
        let label = this.setLabel(textField);

        textField.borderBottomColor = Config.getLabelsSettings(state).color;

        if (state === LabelState.error){
            // textField.text = '';
            label.color = Config.getLabelsSettings(state).color;
        } else {
            label.color = Config.getLabelsSettings(LabelState.default).color;
        }

        if(!textField.text.length){
            label.fontSize = Config.getLabelsSettings(state).fontSize;
            this.animateLabel(label, state);
        }
    }
}