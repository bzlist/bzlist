import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: "verboseGameStyle"
})
export class VerboseGameStylePipe implements PipeTransform{
  transform(value: string, args?: any): string{
    switch(value){
      case "CTF":
        return "Capture The Flag";
      case "FFA":
        return "Free For All";
      case "OFFA":
        return "Open Free For All";
      case "Rabbit":
        break;
      default:
        break;
    }

    return value;
  }
}
