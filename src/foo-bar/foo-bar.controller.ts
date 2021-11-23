import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FooBarService } from './foo-bar.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { FooBarSearchDTO } from './dto/foo-bar-search.dto';
import { FooBarBLL } from './bll/foo-bar.bll';
import { FooBarRelationDTO } from './dto/foo-bar-relation.dto';

@Controller('/v1/foo-bar')
export class FooBarController {
  constructor(
    private readonly fooBarService: FooBarService,
    private readonly fooBarBLL: FooBarBLL,
  ) {}

  @Post('/create/:view')
  create(
    @Param('view') view: string,
    @Body() fooBarDTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService
      .create(view, fooBarDTO.data)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('/relation/create')
  createFooBarRelation(
    @Body()
    fooBarRelationDTO: RequestDTO<FooBarRelationDTO>,
  ): Promise<ResponseDTO<FooBarRelationDTO>> {
    return this.fooBarService
      .createFooBarRelation(fooBarRelationDTO.data)
      .then((result) => {
        const response = new ResponseDTO<FooBarRelationDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/search/:view')
  @UsePipes(new ValidationPipe({ transform: true }))
  search(
    @Param('view') view: string,
    @Query() fooBarSearchDTO: FooBarSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.fooBarService
      .search(view, fooBarSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/get/:view/:id')
  get(
    @Param('view') view: string,
    @Param('id') id: string,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService
      .read(view, id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put('/update/:view')
  update(
    @Param('view') view: string,
    @Body() fooBarUpdateDTO: RequestDTO<any>,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService
      .update(view, fooBarUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/delete/:fooId/:barId')
  delete(
    @Param('fooId') fooId: string,
    @Param('barId') barId: string,
  ): Promise<ResponseDTO<any>> {
    return this.fooBarService
      .delete(fooId, barId)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooBarService.name);
        throw new BadRequestException(err.message);
      });
  }
}
