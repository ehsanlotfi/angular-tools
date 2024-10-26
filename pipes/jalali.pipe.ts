import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jalali', standalone: true })
export class JalaliPipe implements PipeTransform
{
    transform(value: string): string
    {
        const date = new Date(value);
        if (isNaN(date.getTime()))
        {
            return 'Invalid Date';
        }

        return date.toLocaleString('fa-IR-u-nu-latn', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

    }
}
