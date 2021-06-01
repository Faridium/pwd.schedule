using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using PWD.Schedule.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWD.Schedule.Instrument.Dto
{
    [AutoMapFrom(typeof(Chapter))]
    public class ChapterDto : EntityDto<int>
    {
        public string Code { get; set; }
        public string Title { get; set; }
        public int PageFrom { get; set; }
        public int PageTo { get; set; }
        public WorkType Type { get; set; }

    }
    [AutoMapFrom(typeof(Topic))]
    public class TopicDto : EntityDto<int>
    {
        public int ChapterId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Page { get; set; }
        public virtual ChapterDto Chapter { get; set; }
    }
    [AutoMapFrom(typeof(Item))]
    public class ItemDto : EntityDto<int>
    {
        public int TopicId { get; set; }
        public int? CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public int Page { get; set; }
        public virtual TopicDto Topic { get; set; }
    }
    [AutoMapFrom(typeof(Category))]
    public class CategoryDto : EntityDto<int>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ParentId { get; set; }

    }
    [AutoMapFrom(typeof(Unit))]
    public class UnitDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }

    [AutoMapFrom(typeof(Item))]
    public class ItemListDto : EntityDto<int>
    {
        public int No { get; set; }
        public int Page { get; set; }
        public string Chapter { get; set; }
        public string Topic { get; set; }
        public string Category { get; set; }
        public string Code { get; set; }
        public string ItemName { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Rate { get; set; }
        public double Amount { get; set; }
    }

    [AutoMapFrom(typeof(Item))]
    public class ItemResultDto : EntityDto<int>
    {
        public int Page { get; set; }
        public string Chapter { get; set; }
        public TopicDto Topic { get; set; }
        public CategoryDto Category { get; set; }
        //public string ParentCategory { get; set; }
        //public string CategoryDescription { get; set; }
        //public string ParentCategoryDescription { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Unit { get; set; }
        public string Description { get; set; }
        public double Rate { get; set; }
    }
}
