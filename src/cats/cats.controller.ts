import {
  Body,
  Controller,
  Get,
  // Header,
  // HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cats.dto';
import { CatsService } from './cats.service';
import { Cat } from 'src/cats/interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}

  // @Post()
  // @HttpCode(200)
  // @Header('Cache-Control', 'none')
  // create(): string {
  //   return 'This action adds new cats';
  // }
  @Get()
  findAll(@Req() request: Request): string {
    return `This action return all cats wild ${request}`;
  }
  @Get('docs')
  @Redirect('http://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      console.log(version);
      return { url: 'http://docs.nestjs.com/v5/' };
    }
  }
  //async 2way:
  @Get('findAll')
  async findAll2(): Promise<Cat[]> {
    return this.catService.findAll();
  }
  @Get()
  findAll3(): Observable<any[]> {
    return of([]);
  }
  @Get(':id')
  findOne(@Param('id') id: string): string {
    console.log(id);
    return `This action return a #${id} cat`;
  }
  //request payloads
  @Post()
  async create2(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
    return createCatDto;
  }
}
