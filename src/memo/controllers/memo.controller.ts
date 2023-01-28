import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';

import { ReqUser } from '@/common/decorators';
import { JwtGuard } from '@/common/guards';

import { MemoDto, MemoListDto } from '../dtos/memo.dto';

import { MemoService } from '../services';

@UseGuards(JwtGuard)
@Controller('memo')
export class MemoController {
    constructor(protected readonly memoService: MemoService) {}

    @Post()
    @SerializeOptions({ groups: ['detail'] })
    create(@Body() dto: MemoDto, @ReqUser() user: any) {
        return this.memoService.addMemo(dto, user.userId);
    }

    @Get()
    @SerializeOptions({ groups: ['all'] })
    findAll(@Query() dto: MemoListDto, @ReqUser() user: any) {
        return this.memoService.findAll(dto, user.userId);
    }

    @Get(':id')
    @SerializeOptions({ groups: ['detail'] })
    findOne(@Param('id') id: string) {
        return this.memoService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.memoService.delMemo(id);
    }
}
