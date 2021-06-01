import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CategoryDto, ChapterDto, InstrumentServiceProxy, ExportExcelServiceProxy, ItemDto, ItemListDto, TopicDto, HttpResponseMessage } from '../../shared/service-proxies/service-proxies';

import { HttpClient, HttpHandler, HttpResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { AppConsts } from '../../shared/AppConsts';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

    constructor(public sp: InstrumentServiceProxy, public dl: ExportExcelServiceProxy, private http: HttpClient) { }
    type: number= 2;
    item: number=0;
    showitem: ItemDto = new ItemDto();
    topic: TopicDto = new TopicDto();
    category: number=0;
    parentcategory: number=0;
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
    changeType(e) {
        this.sp.getChapters()
            .subscribe((r: ChapterDto[]) => {
                this.chapters = r.filter(x=>x.type==e);
                this.topic = undefined;
            });
    }
    changeChapter(e) {
        console.log(e.target.value);
        this.sp.getTopics(e.target.value).subscribe((r: TopicDto[]) => {
            this.showchapter = this.chapters.filter(i => i.id == e.target.value)[0];
            this.topics = r;
            this.topic = undefined;
            this.topics.forEach(t => { if (t.code) { t.code = t.code.padEnd(8, ' ') } else t.code = "        " })
            //console.log(this.item)
        })
    }
    changeTopic(e) {
        console.log(e.target.value);
        this.sp.getItems(e.target.value).subscribe((r: ItemDto[]) => {
            this.sp.getCategories().subscribe((r: CategoryDto[]) => {
                this.categories = r;
                this.cshow = this.parentcshow = [];
                this.items.forEach(i => {

                    if (this.categories.some(c => c.id == i.categoryId))
                        this.cshow.push(this.categories.filter(c => c.id == i.categoryId)[0]);
                });
                this.parentcshow = [];
                this.cshow = _.uniq(this.cshow);
                if (this.cshow.length > 0) this.cshow.forEach(c => { if (c.parentId > 0) { this.parentcshow.push(this.categories.filter(x => x.id == c.parentId)[0]); } });
                this.parentcshow = _.uniq(this.parentcshow);
                console.log(this.cshow);
                console.log(this.parentcshow);
                if (this.parentcshow.length > 0) this.subName = "Sub Category"; else this.subName = "Category";

            });
            this.items = r;
            this.showtopic = this.topics.filter(i => i.id == e.target.value)[0];
        })
    }
    changeCategory(e) {
        this.sp.getItems(this.showtopic.id).subscribe((r: ItemDto[]) => {
            this.items = r;
            //e.target.value
            var list= this.categories.filter(c => c.parentId == e.target.value);
            var clist = _.uniq(this.items.map(i => i.categoryId));
            this.cshow = [];
            list.forEach(l => { if (clist.some(x => x == l.id)) this.cshow.push(l); });
            if (this.parentcshow.length > 0) this.subName = "Sub Category"; else this.subName = "Category";
            this.item = 0;
        });
    }

    changesubCategory(e) {
        this.sp.getItems(this.showtopic.id).subscribe((r: ItemDto[]) => {
            this.items = r;
            this.items = this.items.filter(i => i.categoryId == e.target.value);
            this.showcategory = this.categories.filter(i => i.id == e.target.value)[0];
        });
    }
    changeItem(e) {
        if (e.target.value == 0) {this.showitem = new ItemDto();return;}
        this.showitem = this.items.filter(i => i.id == e.target.value)[0];
        this.qty = 0;
    }

    addItem() {
        //console.log(item);
        //SL. No.	SH	CE’s Sch. Page No.	Item
        //No.Description of Items	Quantity	Rate	Amount
        var par=this.categories.filter(c => c.id == this.category)[0];
        var sub=this.categories.filter(c => c.id == this.parentcategory)[0];
        var toAdd = new ItemListDto();
        toAdd.no = this.list.length + 1,
        toAdd.chapter = this.showchapter.id.toString();
        toAdd.page = this.showtopic.page;
        toAdd.code = this.showitem.code;
        toAdd.description = this.showtopic.name+"<br>" ;
        if (!isNullOrUndefined(this.showtopic.description)) toAdd.description += this.showtopic.description + "<br>";
        if (!isNullOrUndefined(par)) toAdd.description +=   par.name + "<br>";
        if (!isNullOrUndefined(sub)) toAdd.description +=  sub.name + "<br>";
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
