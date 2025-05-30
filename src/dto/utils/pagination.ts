import { Type } from "class-transformer";
import { Min } from "class-validator";

export class Pagination {
    @Min(1, { message: "Minimum page is 1" })
    @Type(() => Number)
    page: number = 1;

    @Min(1, { message: "Minimum size is 1" })
    @Type(() => Number)
    size: number = 10;

    public getTotalPage(totalEntities: number) {
        return Math.ceil(totalEntities / this.size);
    }
}
