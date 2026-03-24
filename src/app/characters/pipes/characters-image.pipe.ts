import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrlImage = environment.baseUrlImage;

@Pipe({
    name: 'characterImage'
})

export class CharacterImagePipe implements PipeTransform {
    transform(value: string | string[]): string {

        if ( typeof value === 'string' && value.startsWith('http')) {
            return value;
        }

        if (typeof value === 'string') {
            return `${baseUrlImage}/characters/${value}`;
        }

        const image = value.at(0);

        if (!image) {
            return './assets/images/no-image.jpg';
        }

        if (image.startsWith('http')) {
            return image;
        }
        
        return `${ baseUrlImage }/characters/${ image }`
    }
}