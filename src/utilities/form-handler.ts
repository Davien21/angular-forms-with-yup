import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as Yup from 'yup';

// Type alias for any object
type AnyObject = { [key: string]: any };

// Type alias for form controls
export type YupFormControls<T> = { [P in keyof T]: FormControl<T[P]> };

export class FormHandler {
  // Generate form controls for the provided fields
  static controls<T extends AnyObject>(
    formFields: T
  ): FormGroup<YupFormControls<T>> {
    const formControls: YupFormControls<T> = {} as YupFormControls<T>;
    for (const [key, value] of Object.entries(formFields)) {
      formControls[key as keyof T] = new FormControl(value);
    }
    return new FormGroup(formControls);
  }

  // Validate a form group using the provided Yup schema
  static validate<T extends Yup.AnyObject>(
    schema: Yup.ObjectSchema<T>
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      if (!(group instanceof FormGroup)) return null;

      try {
        schema.validateSync(group.value, { abortEarly: false });
        return null;
      } catch (error) {
        if (!(error instanceof Yup.ValidationError)) throw error;
        
        const errorObjects = error.inner;
        let filteredErrors: Yup.ValidationError[] = [];
        errorObjects.forEach((obj: Yup.ValidationError) => {
          const isExisting = filteredErrors.some((x) => obj.path === x.path);
          if (!isExisting) return filteredErrors.push(obj);

          filteredErrors = filteredErrors.map((item) => {
            if (item.path === obj.path) item.errors.push(obj.message);
            return item;
          });
          return;
        });
        const errors: ValidationErrors = {};
        filteredErrors.forEach((item: Yup.ValidationError) => {
          if (!item.path) return;
          const formControl = group.get(item.path);
          if (!formControl) return;
          formControl.setErrors({ errors: item.errors[0] });
          errors[item.path] = item.errors[0];
        });
        return errors;
      }
    };
  }
}
