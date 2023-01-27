import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginateDto {
    @Type(() => Number)
    @IsOptional({ always: true })
    @IsInt()
    @Min(1)
    page?: number = 1;

    @Type(() => Number)
    @IsOptional({ always: true })
    @IsInt()
    @Min(1)
    @Max(100)
    pageSize?: number = 10;
}
