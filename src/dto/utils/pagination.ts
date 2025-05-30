import { Type } from "class-transformer";

export class Pagination {
    @Type(() => Number)
    page: number = 1;

    @Type(() => Number)
    size: number = 10;

    public getTotalPage(totalEntities: number) {
        return Math.ceil(totalEntities / this.size)
    }
}
