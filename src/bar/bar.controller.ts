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
import { BarDTO } from './dto/bar.dto';
import { BarService } from './bar.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { BarSearchDTO } from './dto/bar-search.dto';

@Controller('/v1/bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchBar(@Query() barSearchDTO: BarSearchDTO): Promise<ResponseDTO<any[]>> {
    return this.barService
      .search(barSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/get/:id')
  getBar(@Param('id') id: string): Promise<ResponseDTO<BarDTO>> {
    return this.barService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<BarDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('/create')
  createBar(@Body() barDTO: RequestDTO<BarDTO>): Promise<ResponseDTO<BarDTO>> {
    return this.barService
      .create(barDTO.data)
      .then((result) => {
        const response = new ResponseDTO<BarDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put('/update')
  updateBar(
    @Body() barUpdateDTO: RequestDTO<BarDTO>,
  ): Promise<ResponseDTO<BarDTO>> {
    return this.barService
      .update(barUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<BarDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/delete/:id')
  deleteBar(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.barService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, BarService.name);
        throw new BadRequestException(err.message);
      });
  }
}
