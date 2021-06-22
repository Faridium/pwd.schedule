import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryDto, ChapterDto, InstrumentServiceProxy, ExportExcelServiceProxy, ItemDto, ItemListDto, TopicDto, ItemResultDto, EstimateItemDto, EstimateBlockDto, EstimateProjectDto, EstimateComponentDto, EstimateDimensionDto } from '../../shared/service-proxies/service-proxies';
import { AppConsts } from '../../shared/AppConsts';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(public sp: InstrumentServiceProxy, public dl: ExportExcelServiceProxy) { }
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

    addItem() {
        //console.log(item);
        //SL. No.	SH	CE’s Sch. Page No.	Item
        //No.Description of Items	Quantity	Rate	Amount
        var par = this.categories.filter(c => c.id == this.showcategory.parentId)[0];
        var sub = this.showcategory;
        var toAdd = new ItemListDto();
        toAdd.no = this.list.length + 1,
            toAdd.chapter = this.showitem.topic.chapter.id.toString();
        toAdd.page = this.showitem.topic.page;
        toAdd.code = this.showitem.code;
        toAdd.description = this.showitem.topic.name + "<br>";
        if (!isNullOrUndefined(this.showitem.topic.description) && this.showitem.topic.description.length > 1) toAdd.description += this.showitem.topic.description + "<br>";
        if (!isNullOrUndefined(par)) toAdd.description += par.name + "<br>";
        if (!isNullOrUndefined(sub)) toAdd.description += sub.name + "<br>";
        toAdd.description += this.showitem.name + "<br>";
        if (!isNullOrUndefined(this.showitem.description)) toAdd.description += this.showitem.description + "<br>";
        toAdd.category = this.showcategory.name;
        toAdd.quantity = +this.qty;
        toAdd.rate = this.showitem.rate;
        toAdd.amount = this.showitem.rate * this.qty;
        this.list.push(toAdd);
        this.qty = 0;
        console.log(this.list);
        this.total = _.sumBy(this.list, l => l.amount);
        this.showitem = new ItemDto();
    }
    addItemDescription() {
        //console.log(item);
        //SL. No.	SH	CE’s Sch. Page No.	Item
        //No.Description of Items	Quantity	Rate	Amount
        var par = this.categories.filter(c => c.id == this.category)[0];
        var sub = this.categories.filter(c => c.id == this.parentcategory)[0];
        var toAdd = new ItemListDto();
        toAdd.no = this.list.length + 1,
            toAdd.chapter = this.showchapter.id.toString();
        toAdd.page = this.showtopic.page;
        toAdd.code = this.showitem.code;
        toAdd.description = this.showtopic.name + "<br>";
        if (!isNullOrUndefined(this.showtopic.description)) toAdd.description += this.showtopic.description + "<br>";
        if (!isNullOrUndefined(par)) toAdd.description += par.name + "<br>";
        if (!isNullOrUndefined(sub)) toAdd.description += sub.name + "<br>";
        toAdd.description += this.showitem.name + "<br>";
        if (!isNullOrUndefined(this.showitem.description)) toAdd.description += this.showitem.description + "<br>";
        toAdd.category = this.showcategory.name;
        toAdd.quantity = +this.qty;
        toAdd.rate = this.showitem.rate;
        toAdd.amount = this.showitem.rate * this.qty;
        this.list.push(toAdd);
        this.qty = 0;
        console.log(this.list);
        this.total = _.sumBy(this.list, l => l.amount);
    }
    addItemValue() {
        //console.log(item);
        //SL. No.	SH	CE’s Sch. Page No.	Item
        //No.Description of Items	Quantity	Rate	Amount
        var par = this.categories.filter(c => c.id == this.category)[0];
        var sub = this.categories.filter(c => c.id == this.parentcategory)[0];
        var toAdd = new ItemListDto();
        toAdd.no = this.list.length + 1,
            toAdd.chapter = this.showchapter.id.toString();
        toAdd.page = this.showtopic.page;
        toAdd.code = this.showitem.code;
        //toAdd.description = this.showtopic.name + "<br>";
        //if (!isNullOrUndefined(this.showtopic.description)) toAdd.description += this.showtopic.description + "<br>";
        //if (!isNullOrUndefined(par)) toAdd.description += par.name + "<br>";
        //if (!isNullOrUndefined(sub)) toAdd.description += sub.name + "<br>";
        toAdd.description = this.showitem.name + "<br>";
        //if (!isNullOrUndefined(this.showitem.description)) toAdd.description += this.showitem.description + "<br>";
        toAdd.category = this.showcategory.name;
        toAdd.quantity = +this.qty;
        toAdd.rate = this.showitem.rate;
        toAdd.amount = this.showitem.rate * this.qty;
        this.list.push(toAdd);
        this.qty = 0;
        console.log(this.list);
        this.total = _.sumBy(this.list, l => l.amount);
    }

    addEstimateItem() {
        var item = new EstimateItemDto();
        item.code = this.showitem.code;
        item.description = this.showitem.description;
        item.rate = this.showitem.rate;
    }

    addEstimateBlock() {
        var block = new EstimateBlockDto();
        block.refNo = Math.floor(Math.random() * (9999 - 1000) + 1000);

    }
    addDimensionToItem(itemNo: number, d: EstimateDimensionDto) {
        var item = this.findItem(itemNo);
        if (item.blocks.length == 0 || isNullOrUndefined(item.blocks)) {
            var block = new EstimateBlockDto();
            block.refNo = Math.floor(Math.random() * (9999 - 1000) + 1000);
            block.dimensions = [];
            block.dimensions.push(d);
            item.blocks = [];
            item.blocks.push(block);
        }
        else {
            item.blocks[0].dimensions.push(d);
        }
        this.recalculate();
    }

    addDimensionToBlock(blockNo: number, d: EstimateDimensionDto) {
        var block = this.findBlock(blockNo);
        block.dimensions.push(d);
        this.recalculate();
    }

    addEmptyBlockToItem(itemNo: number) {
        var item = this.findItem(itemNo);
        item.blocks.push(new EstimateBlockDto());
    }

    addChildBlock(blockNo: number, child: EstimateBlockDto) {
        var block = this.findBlock(blockNo);
        child.parentId = block.refNo;
        var item = this.findItem(block.itemId);
        item.blocks.push(child);
        this.recalculate();
    }


    recalculate() {
        //recalculate all values and totals
    }

    myBlock() {
        var block1 = this.findBlock(2345);
        block1.code = "1234";
        block1.dimensions = [];
        var d1 = new EstimateDimensionDto();
        d1.totalQuantity = 5;
        var d2 = new EstimateDimensionDto();
        d2.totalQuantity = 15;
        var d3 = new EstimateDimensionDto();
        d3.totalQuantity = 54;
        block1.dimensions.push(d1);
        block1.dimensions.push(d2);
        block1.dimensions.push(d3);

        this.recalculateBlock(99);
        //console.log(block1.qurantity);
        //console.log(block1.totalValue);


    }

    calc(i: EstimateItemDto) {
        var bList = i.blocks;
        var siblings = bList.filter(b => b.parentId == 0);
        siblings.forEach(s => {
            if (bList.some(x => x.parentId == s.refNo)) {
                var children = bList.filter(x => x.parentId == s.refNo);
                if (s.isValue) children.forEach(c => s.totalValue += this.getValue(c));
                else {
                    children.forEach(c => {
                    var qty = this.getQty(c);
                    if (c.isDeduction) s.qurantity -= qty; else s.qurantity += qty;
                    });
                    s.totalValue = s.qurantity * s.rate;
                }
            }
        });
        
    }

    getValue(b: EstimateBlockDto): number { return b.rate*this.getQty(b);   }
    getQty(b: EstimateBlockDto): number {return _.sumBy( b.dimensions, x=>x.totalQuantity); }

    abc() {

        var b1 = new EstimateBlockDto();
        var b2 = new EstimateBlockDto();
        var b3 = new EstimateBlockDto();
        var b4 = new EstimateBlockDto();
        var i1 = new EstimateItemDto();
        b2.parentId = b1.refNo;
        b3.parentId = b1.refNo;
        b4.parentId = b1.refNo;
        i1.blocks.push(b1);
        i1.blocks.push(b2);
        i1.blocks.push(b3);
        i1.blocks.push(b4);

        var children = i1.blocks.filter(b => b.parentId = b1.refNo);
        children.forEach(c => {
            var rate = b1.rate;
            if (c.rate > 0) rate = c.rate;
            c.qurantity = _.sumBy(c.dimensions, x => x.totalQuantity);
            
        });
        
    }

    recalculateBlock(blockNo: number) {

        var block1 = new EstimateBlockDto();
        block1.code = "1234";
        block1.rate = 444;
        block1.dimensions = [];
        var d1 = new EstimateDimensionDto();
        d1.totalQuantity = 5;
        var d2 = new EstimateDimensionDto();
        d2.totalQuantity = 15;
        var d3 = new EstimateDimensionDto();
        d3.totalQuantity = 54;
        block1.dimensions.push(d1);
        block1.dimensions.push(d2);
        block1.dimensions.push(d3);        
        block1.qurantity = block1.totalValue = 0


        var block2 = new EstimateBlockDto();
        block2.code = "b2";
        block2.rate = 444;
        block2.refNo = 99;

        var block3 = new EstimateBlockDto();
        block3.code = "b3";
        block3.parentId = 99;
        block3.rate = 22;
        block3.dimensions = [];
        var d1 = new EstimateDimensionDto();
        d1.totalQuantity = 35;
        var d2 = new EstimateDimensionDto();
        d2.totalQuantity = 16;
        var d3 = new EstimateDimensionDto();
        d3.totalQuantity = 44;
        block3.dimensions.push(d1);
        block3.dimensions.push(d2);
        block3.dimensions.push(d3);

        var block4 = new EstimateBlockDto();
        block4.code = "b4";
        block4.parentId = 99;
        block4.rate = 25;
        block4.dimensions = [];
        var d1 = new EstimateDimensionDto();
        d1.totalQuantity = 5;
        var d2 = new EstimateDimensionDto();
        d2.totalQuantity = 15;
        var d3 = new EstimateDimensionDto();
        d3.totalQuantity = 54;
        block4.dimensions.push(d1);
        block4.dimensions.push(d2);
        block4.dimensions.push(d3);
        block2.qurantity = block2.totalValue = 0

        var item = new EstimateItemDto();
        item.id = 1;
        item.blocks = [];
        item.blocks.push(block2);
        item.blocks.push(block3);
        item.blocks.push(block4);

        var block = block2; //new EstimateBlockDto(block1);
        var children: EstimateBlockDto[] = [];
        //if (block.itemId > 0) item = this.findItem(block.itemId);
        if (item.id > 0) children = item.blocks.filter(i => i.parentId == blockNo);

        if (children.length > 0) {
            children.forEach(c => {
                c.qurantity = _.sumBy(c.dimensions, x => x.totalQuantity);
                if (c.isValue) c.totalValue = c.qurantity * c.rate;
                if (c.isDeduction) {
                    block.qurantity -= c.qurantity;
                    block.totalValue -= c.totalValue;
                }
                else {
                    block.qurantity += c.qurantity;
                    block.totalValue += c.totalValue;
                }
            });
        }
        else {
            var qty = _.sumBy(block.dimensions, x => x.totalQuantity);
            if (block.isDeduction) {
                block.qurantity -= qty;
                block.totalValue -= qty * block.rate;
            }
            else {
                block.qurantity = block.qurantity+qty;
                block.totalValue = block.totalValue +qty * block.rate;
            }
        }

        console.log(block.qurantity);
        console.log(block.totalValue);

    }

    recalculateBlockx(blcokNo: number) {
        var block = this.findBlock(blcokNo);
        var item = new EstimateItemDto();
        var children: EstimateBlockDto[] = [];
        if (block.itemId > 0) this.findItem(block.itemId);
        if (item.id > 0) children = item.blocks.filter(i => i.parentId == block.refNo);
        children.forEach(s => {
            s.qurantity = _.sumBy(s.dimensions, x => x.totalQuantity);
            if (s.isValue) s.totalValue = s.qurantity * s.rate;
            if (s.isDeduction) {
                block.qurantity -= s.qurantity;
                block.totalValue -= s.totalValue;
            }
            else {
                block.qurantity += s.qurantity;
                block.totalValue += s.totalValue;
            }
        });
    }

    findBlock(blcokNo: number) { return new EstimateBlockDto(); }
    findItem(itemNo: number) { return new EstimateItemDto(); }


    dlFile() {
        console.log(AppConsts.remoteServiceBaseUrl);
        this.dl.download(this.list).subscribe((x) => {
            window.open(AppConsts.remoteServiceBaseUrl + "/assets/" + x);
            abp.message.success("File downloaded successfully");
        });



    }
    remove(no: number): void {
        //var no = 1;
        this.list = _.remove(this.list, function (n) {
            return n.no != no;
        });
    }
    //https://stackoverflow.com/questions/48864518/how-to-correctly-download-files-to-angular-from-asp-net-core/48864842
}
