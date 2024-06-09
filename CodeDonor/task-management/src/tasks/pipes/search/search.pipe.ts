import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SearchPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("Search Pipe");
    return value;
  }
}
