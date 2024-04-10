import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'formatTextPipe', standalone: true,})
export class FormatTextPipe implements PipeTransform {
  transform(value: string, format: string): string {
    if (!value) return '';
    return format === 'uppercase' ? value?.toString().toUpperCase() : value?.toString().toLowerCase();
  }
}
