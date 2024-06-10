import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Status } from '../../tasks.memory.models';

@Injectable()
export class StatusPipe implements PipeTransform {
  readonly allowedStatus = [
    Status.OPEN,
    Status.OPEN.toLowerCase(),
    Status.IN_PROGRESS,
    Status.IN_PROGRESS.toLowerCase(),
    Status.DONE,
    Status.DONE.toLowerCase()
  ];
  transform(value: any, metadata: ArgumentMetadata) {
    console.log("Status Pipe");
    value = value.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`Status ${value} is not valid!`);
    }
    // console.log('metadata', metadata);
    return value;
  }
  private isValidStatus(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index !== -1;
  }
}
