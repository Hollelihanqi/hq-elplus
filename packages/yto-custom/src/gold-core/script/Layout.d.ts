import { IPoint } from './DefineInterface';
export default class Layout {
    private __data;
    private __max;
    private __dataSource;
    private __pointList;
    private __denominator;
    private __height;
    constructor(data: IPoint[], denominator: number, screenHeight: number);
    get pointList(): IPoint[];
    set pointList(value: IPoint[]);
    get data(): IPoint[];
    get areaHeight(): number;
    get containerStyle(): any;
    itemStyle({ row, column }: IPoint): {
        'grid-row': string;
        'grid-column': string;
    } | {
        'grid-row'?: undefined;
        'grid-column'?: undefined;
    };
    include({ start, end }: any, value: number): boolean;
    includePoint({ row, column }: IPoint): boolean;
    mergeArea(): void;
    orderArea(): void;
    parseAllArea(): void;
    removeMarkArea(): void;
    crossVerify(target: any, { start, end }: any): boolean;
    crossArea({ row, column }: IPoint): boolean;
    /**
     * 点位向上移动， 每次减 1
     * @param {Object} param
     */
    extendPointUpAndPush({ row, column }: IPoint): void;
    /**
     * 点位向左移动， 每次减 1
     * @param {Object} param
     */
    extendPointLeftAndPush({ row, column }: IPoint): void;
    /**
     * 点位解析
     */
    parsePoint(): void;
    parseArea(item: any): any;
}
