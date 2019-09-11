import {Directive} from "@angular/core";
import {NG_VALIDATORS, Validator, FormControl} from "@angular/forms";

@Directive({
    selector: "[requireFile]",
    providers: [
        { provide: NG_VALIDATORS, useExisting: FileInputValidator, multi: true },
    ]
})
export class FileInputValidator implements Validator {
    static validate(c: FormControl): {[key: string]: any} {
        return c.value == null || c.value.length == 0 ? { "required" : true} : null;
    }

    validate(c: FormControl): {[key: string]: any} {
        return FileInputValidator.validate(c);
    }
}