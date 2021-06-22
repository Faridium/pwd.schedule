import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { isNullOrUndefined } from 'util';
import { CategoryDto, ChapterDto, InstrumentServiceProxy, ExportExcelServiceProxy, ItemDto, ItemListDto, TopicDto, HttpResponseMessage, EstimateProjectDto, EstimateComponentDto, EstimateItemDto, EstimateBlockDto, EstimateDimensionDto, ItemResultDto } from '../../shared/service-proxies/service-proxies';

@Component({
  selector: 'app-estimate-item',
  templateUrl: './estimate-item.component.html',
})
export class EstimateItemComponent implements OnInit {

    constructor(public sp: InstrumentServiceProxy) { }

    item: number = 0;
    code: string = "";
    isSearch: boolean = true;
    showitem: ItemDto = new ItemDto();
    topic: TopicDto = new TopicDto();
    resultItems: ItemResultDto[] = [];
    category: number = 0;
    parentcategory: number = 0;
    //category: CategoryDto = new CategoryDto();
    //parentcategory: CategoryDto = new CategoryDto();
    subcategory: CategoryDto = new CategoryDto();
    showcategory: CategoryDto = new CategoryDto();
    showsubcategory: CategoryDto = new CategoryDto();
    showtopic: TopicDto = new TopicDto();
    chapter: ChapterDto = new ChapterDto();
    showchapter: ChapterDto = new ChapterDto();
    chapters: ChapterDto[] = [];
    topics: TopicDto[] = [];
    items: ItemDto[] = [];
    categories: CategoryDto[] = [];
    cshow: CategoryDto[] = [];
    parentcshow: CategoryDto[] = [];
    list: ItemListDto[] = [];

    project: EstimateProjectDto = new EstimateProjectDto();
    component: EstimateComponentDto = new EstimateComponentDto();
    eitem: EstimateItemDto = new EstimateItemDto();
    block: EstimateBlockDto = new EstimateBlockDto();
    dimension: EstimateDimensionDto = new EstimateDimensionDto();

    qty: number = 0;
    total: number = 0;
    subName: string = "";
    type: number = 1;
    ngOnInit(): void {
        this.sp.getChapters()
            .subscribe((r: ChapterDto[]) => {
                this.chapters = r;
                this.topic = undefined;
                //this.item = undefined;
                //console.log(this.chapters);
            });

    }

    search(): void {

        this.sp.searchItemCode(this.code, this.type).subscribe((r: ItemResultDto[]) => {
            this.resultItems = r;
            this.showitem = new ItemDto();
            //console.log(r);
        }
            , (e) => abp.message.error(e)
        );
    }
    codeChange(): void {
        if (this.code.length < 3 || this.code.length > 15) this.isSearch = true; else this.isSearch = false;
    }

    changeItem(e) {
        if (e.target.value == 0) { this.showitem = new ItemDto(); return; }
        var select = this.resultItems.filter(i => i.id == e.target.value)[0];
        this.showitem = new ItemDto();
        this.showitem.name = select.name;
        this.showitem.description = select.description;
        this.showitem.rate = select.rate;
        this.showitem.code = select.code;
        this.showitem.unit = select.unit;
        this.showitem.topic = select.topic;
        if (select.category != null) this.showcategory = select.category;

        console.log(this.showitem);
        this.qty = 0;
    }

    addItem() { abp.message.success("23445");}
    addItemValue() { }
    myBlock() {
       


    }
}
