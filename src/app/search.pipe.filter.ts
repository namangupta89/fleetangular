import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "customFilter"
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(val => {
      console.log(val.email.toLocaleLowerCase());
      //console.log(val.email);
      let rVal =
        val.email.toLocaleLowerCase().includes(args) ||
        val.lastName.toLocaleLowerCase().includes(args);
      return rVal;
    });
  }
}
