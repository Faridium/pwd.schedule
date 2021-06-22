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

    [AutoMapFrom(typeof(EstimateProject))]

    public class EstimateProjectDto : EntityDto<int>
    {
        public string Name { get; set; }
        public string MeasurementUnit { get; set; }
        public int NumberofBuildings { get; set; }
        public List<EstimateComponentDto> Components { get; set; }

    }
    [AutoMapFrom(typeof(EstimateComponent))]

    public class EstimateComponentDto : EntityDto<int>
    {
        public string ItemNo { get; set; }
        public string Description { get; set; }
        public double TotalValue { get; set; }
        public List<EstimateItemDto> Items { get; set; }
    }
    [AutoMapFrom(typeof(EstimateItem))]

    public class EstimateItemDto : EntityDto<int>
    {
        public string ItemNo { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public double Quantity { get; set; }
        public double Rate { get; set; }
        public double TotalValue { get; set; }
        public WorkType WorkType { get; set; }
        public bool IsAnalysis { get; set; }
        public List<EstimateBlockDto> Blocks { get; set; }
        public List<EstimateDimensionDto> Dimensions { get; set; }

    }
    [AutoMapFrom(typeof(EstimateBlock))]
    public class EstimateBlockDto : EntityDto<int>
    {
        public int RefNo { get; set; }
        public string Code { get; set; }
        public WorkType WorkType { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Qurantity { get; set; } = 0;
        public double QurantitySI { get; set; } = 0;
        public double Rate { get; set; }
        public double TotalValue { get; set; } = 0;
        public bool IsDeduction { get; set; }
        public bool IsValue { get; set; }
        public int ParentId { get; set; }
        public string QuantityRef { get; set; }
        public int ItemId { get; set; }
        public EstimateItemDto Item { get; set; }
        public List<EstimateDimensionDto> Dimensions { get; set; }
    }
    [AutoMapFrom(typeof(EstimateDimension))]
    public class EstimateDimensionDto : EntityDto<int>
    {
        public string Description { get; set; }
        //Multipliers
        public double Buildings { get; set; } = 1;
        public double Floors { get; set; } = 1;
        public double Quantity { get; set; } = 1;
        //Dimensions
        public double Length { get; set; }
        public double LengthFraction { get; set; } = 0;
        public double Width { get; set; }
        public double WidthFraction { get; set; } = 0;
        public double Height { get; set; }
        public double HeightFraction { get; set; } = 0;
        //Total
        public double TotalQuantity { get; set; } = 0;
        public UnitType UnitType { get; set; }
        public ItemType ItemType { get; set; }
        public string QuantityRef { get; set; }
    }

}
