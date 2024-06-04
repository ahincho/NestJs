import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class QueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(`Value: ${value.toString()}`);
    const age = parseInt(value.age.toString(), 10);
    if (isNaN(age)) {
      throw new HttpException('Age must be a number', HttpStatus.BAD_REQUEST);
    }
    return { ...value, age: age };
  }
}
