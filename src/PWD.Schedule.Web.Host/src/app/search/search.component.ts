import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryDto, ChapterDto, InstrumentServiceProxy, ExportExcelServiceProxy, ItemDto, ItemListDto, TopicDto, ItemResultDto } from '../../shared/service-proxies/service-proxies';
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
    qty: number = 0;
    total: number = 0;
    subName: string = "";
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

        this.sp.searchItemCode(this.code).subscribe((r: ItemResultDto[]) => {
            this.resultItems = r;
            this.showitem = new ItemDto();
 
            //console.log(r);
        }
            , (e) => abp.message.error(e)
        );
    }
    codeChange(): void {
        if (this.code.length < 3 || this.code.length>15) this.isSearch = true; else this.isSearch = false;
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
        if(select.category!=null) this.showcategory = select.category;

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
        if (!isNullOrUndefined(this.showitem.topic.description) && this.showitem.topic.description.length>1) toAdd.description += this.showitem.topic.description + "<br>";
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
