using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PWD.Schedule.Models
{
    public class Chapter : Entity<int>
    {
        public string Code { get; set; }
        public string Title { get; set; }
        public int PageFrom { get; set; }
        public int PageTo { get; set; }
        public WorkType Type { get; set; }

    }
    public class Topic : Entity<int>
    {
        public int ChapterId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int? Page { get; set; } = 0;
        public int Sequence { get; set; } = 0;
        public virtual Chapter Chapter { get; set; }
    }
    public class Item : Entity<int>
    {
        public int TopicId { get; set; }
        public int? CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public int? Page { get; set; }
        public virtual Topic Topic { get; set; }
        public virtual Category Category { get; set; }
    }
    public class Category : Entity<int>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }

    }

    public class XTopic : Entity<int>
    {
        //public int TopicId { get; set; }
        public int ChapterId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int? Page { get; set; } = 0;
        public int Sequence { get; set; } = 0;
        //public virtual Chapter Chapter { get; set; }
    }
    public class XItem : Entity<int>
    {
        //public int ItemId { get; set; }
        public int TopicId { get; set; }
        public int? CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string Unit { get; set; }
        public double Rate { get; set; }
        public int? Page { get; set; }
        public virtual Topic Topic { get; set; }
    }
    public class XCategory : Entity<int>
    {
        //public int CategoryId { get; set; }        
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ParentId { get; set; }

    }
    public class Unit : Entity<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class EstimateProject : Entity<int>
    {
        public string Name { get; set; }
        public List<EstimateComponent> Components { get; set; }

    }

    public class EstimateComponent : Entity<int>
    {
        public string ItemNo { get; set; }
        public string Description { get; set; }
        public double TotalValue { get; set; }
        public List<EstimateItem> Items { get; set; }
    }

    public class EstimateItem : Entity<int>
    {
        public string ItemNo { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public double Quantity { get; set; }
        public double Rate { get; set; }
        public double TotalValue { get; set; }
        public List<EstimateBlock> Blocks { get; set; }
        public List<EstimateDimension> Dimensions { get; set; }

    }
    public class EstimateBlock : Entity<int>
    {
        public int RefNo { get; set; }
        public string Code { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Qurantity { get; set; }
        public double QurantitySI { get; set; }
        public double Rate { get; set; }
        public double TotalValue { get; set; }
        public bool IsDeduction { get; set; }
        public bool IsValue { get; set; }
        public int ParentId { get; set; }
        public string QuantityRef { get; set; }
        public int ItemId { get; set; }
        public EstimateItem Item { get; set; }
        public List<EstimateDimension> Dimensions { get; set; }
    }
    public class EstimateDimension : Entity<int>
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
        public double TotalQuantity { get; set; }
        public UnitType UnitType { get; set; }
        public ItemType ItemType { get; set; }
        public string QuantityRef { get; set; }
        public void calculateTotal()
        {
            switch (ItemType)
            {
                case ItemType.Cubid:
                    TotalQuantity = Length * Width * Height;
                    break;
                case ItemType.TriangularBasedPyramid:
                    TotalQuantity = .5 * Length * Width * Height;
                    break;
                case ItemType.SquareBasedPyramid:
                    TotalQuantity = .5 * (Length + Width) * Height;
                    break;
                case ItemType.Sphere:
                    TotalQuantity = Math.PI * (Width * Width / 4) * Height;
                    break;
                default:
                    break;
            }

        }


    }


    public enum ItemType
    {
        Cube = 1,
        Cubid = 2,
        Cylinder = 3,
        Sphere = 4,
        Cone = 5,
        TriangularPrism = 6,
        SquareBasedPyramid = 7,
        TriangularBasedPyramid = 8,
    }

    public enum UnitType
    {
        Imperial = 1,
        SI = 2
    }
    public enum WorkType
    {
        Civil = 1,
        ElectroMechanical = 2
    }

}
