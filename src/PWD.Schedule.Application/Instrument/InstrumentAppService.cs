using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using PWD.Schedule.Models;
using Microsoft.EntityFrameworkCore;
using PWD.Schedule.Instrument.Dto;
using Abp.ObjectMapping;

namespace PWD.Schedule.Instrument
{
    public class InstrumentAppService:ScheduleAppServiceBase, IInstrumentAppService
    {
        private readonly IRepository<Chapter> chapterRepository;
        private readonly IRepository<Topic> topicRepository;
        private readonly IRepository<Item> itemRepository;
        private readonly IRepository<Category> categoryRepository;
        private readonly IRepository<XItem> xIRepository;
        private readonly IRepository<XCategory> xCRepository;
        //private readonly IRepository<Unit> unitRepository;
        private readonly IObjectMapper objectMapper;

        public InstrumentAppService(IRepository<Chapter> chapterRepository, IRepository<Topic> topicRepository, IRepository<Item> itemRepository, IRepository<Category> categoryRepository,  IRepository<XItem> xIRepository, IRepository<XCategory> xCRepository, IObjectMapper objectMapper)
        {
            this.chapterRepository = chapterRepository;
            this.topicRepository = topicRepository;
            this.itemRepository = itemRepository;
            this.categoryRepository = categoryRepository;
            //this.unitRepository = unitRepository;
            this.xIRepository = xIRepository;
            this.xCRepository = xCRepository;
            this.objectMapper = objectMapper;
        }
        
        public List<ChapterDto> getChapters()
        {
            var cList=chapterRepository.GetAll();
            return objectMapper.Map<List<ChapterDto>>(cList);

        }

        public List<TopicDto> getTopics(int chapterId=0)
        {
            var cList = topicRepository.GetAll();
            if (chapterId > 0) cList = cList.Where(c => c.ChapterId == chapterId);
            return objectMapper.Map<List<TopicDto>>(cList);

        }

        public List<ItemDto> getItems(int topicId = 0)
        {
            var cList = itemRepository.GetAll();
            if (topicId > 0) cList = cList.Where(c => c.TopicId == topicId);
            return objectMapper.Map<List<ItemDto>>(cList);

        }

        public List<CategoryDto> getCategories()
        {
            var cList = categoryRepository.GetAll();
            //if (topicId > 0) cList = cList.Where(c => c.TopicId== topicId);
            return objectMapper.Map<List<CategoryDto>>(cList);

        }

        public void XCopyI()
        {
            var xl = xIRepository.GetAll().ToList();
            xl.ForEach(x => itemRepository.Insert(
                new Item() { 
                    CategoryId=x.CategoryId,Name=x.Name,Code=x.Code, Description=x.Description,Rate=x.Rate, TopicId=x.TopicId,Unit=x.Unit 
                }));
        }

        public void XCopyC()
        {
            var xl = xCRepository.GetAll().OrderBy(x=>x.Id).ToList();
            xl.ForEach(x => { categoryRepository.Insert(new Category() { Name = x.Name, ParentId = x.ParentId }); CurrentUnitOfWork.SaveChanges(); });
        }
        public List<ItemResultDto> searchItemCode(string code)
        {
            var list = new List<ItemResultDto>();
            var items=itemRepository.GetAllIncluding(i => i.Topic)
                .Include(i => i.Category).Include(i=>i.Topic.Chapter)
                .Where(i => i.Code.StartsWith(code));
            list = objectMapper.Map<List<ItemResultDto>>(items);
            return list;
        }

        public void cleanduplicates()
        {
            var codes = itemRepository.GetAllIncluding(i=>i.Topic).Include(i=>i.Topic.Chapter)
                .Where(i=>i.Topic.ChapterId!= 11).Select(i => i.Code).Distinct().ToList();
            var removelist = new List<int>();
            foreach(var c in codes)
            {
                var items = itemRepository.GetAll().Where(i => i.Code == c).ToList();
                if(items.Count>1)
                {
                    removelist.AddRange( items.Where(i => i.Id != items.First().Id).Select(i => i.Id));

                    if (items.Select(i => i.Name).Distinct().Count() == 1 && items.Select(i => i.Description).Distinct().Count() == 1)
                        Logger.Info(c);
                    else
                        Logger.Error(c);
                }
                
            }
            //removelist.ForEach(r => itemRepository.Delete(r));
        }

        public void addTopic()
        {
            var clist=chapterRepository.GetAll().Where(i => i.Id > 24);
            clist.ToList().ForEach(c => {
                topicRepository.Insert(new Topic() { Name=c.Title,ChapterId=c.Id });
            });
        }
    }
}
