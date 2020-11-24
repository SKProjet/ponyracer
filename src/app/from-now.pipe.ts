import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  // date-fns avec sa fonction formatDistanceToNowStrict(date, { addSuffix: true })
  // Comme le paramètre date doit être une date,
  // il nous faudra parser la chaîne de caractères
  // que nous avons avec une autre fonction de date-fns : parseISO()

  // Puis modifiez le pipe pour qu’il génère une chaîne de caractères
  // à partir de l’instant reçu grâce à parseISO(instant) et
  // formatDistanceToNowStrict(date, { addSuffix: true })


  // => Deviens_un_Ninja_avec_Angular.pdf partie #pipes

  transform(value: string): string {
    const date = parseISO(value);
    return formatDistanceToNowStrict(date, { addSuffix: true });
  }

}
