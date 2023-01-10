import { ApiProperty } from '@nestjs/swagger';

export class doctorParamQuery {
  @ApiProperty()
  param: string;
}

export class softDelReponse {
  @ApiProperty()
  generatedMaps: [];

  @ApiProperty()
  raw: [];

  @ApiProperty()
  affected: number;
}

export class badRequest {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
