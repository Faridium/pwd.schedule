using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using PWD.Schedule.Controllers;
using Microsoft.AspNetCore.Authorization;
using PWD.Schedule.Instrument.Dto;
using System.Net.Http;
using System.Net.Http.Headers;

namespace PWD.Schedule.Web.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportExcel: ScheduleControllerBase
    {
        private readonly IWebHostEnvironment appEnvironment;

        public ExportExcel(IWebHostEnvironment appEnvironment)
        {
            this.appEnvironment = appEnvironment;
        }

        //[HttpGet]
        //[Route("Test")]
        //public string test(int id)
        //{
        //    return id.ToString();
        //}
        [HttpPost]
        [Route("Download")]

        [AllowAnonymous]
        public string Download(List<ItemListDto> items)
        {
            //https://www.c-sharpcorner.com/article/export-and-import-excel-file-using-closedxml-in-asp-net-mvc/
            //var stream = new MemoryStream();
            // processing the stream.            

            using (var stream = new MemoryStream())
            {
                //C:\Users\Administrator\source\repos\hbri.recruitment\src\Hbri.Recruitment.Web.Host\wwwroot\assets
                var templatePath = Path.Combine(appEnvironment.ContentRootPath, @"wwwroot\assets\Format.xlsx");

                using (var wb = new ClosedXML.Excel.XLWorkbook(templatePath))
                {
                    //Add DataTable in worksheet
                    var ws = wb.Worksheets.FirstOrDefault();
                    var i = 2;

                    items.ForEach(d =>
                    {
                        ws.Cell(i, 1).Value = d.No;
                        ws.Cell(i, 2).Value = d.Chapter;
                        ws.Cell(i, 3).Value = d.Page;
                        ws.Cell(i, 4).Value = d.Code;
                        ws.Cell(i, 5).Value = d.Description;
                        ws.Cell(i, 6).Value = d.Quantity;
                        ws.Cell(i, 7).Value = d.Rate;
                        ws.Cell(i, 8).Value = d.Amount;
                        i++;
                    });
                    ws.Cell(i, 8).Value = items.Sum(x => x.Amount);
                    wb.SaveAs(stream);
                    var name = "Estimate_"+DateTime.Now.ToString("yyyyyMMddHHmmss")+".xlsx";
                    wb.SaveAs(Path.Combine(appEnvironment.ContentRootPath, @"wwwroot\assets\"+name));
                    //Return xlsx Excel File  
                    //return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{items.Count}.xlsx");
                    return name;
                }
            }
        }

        [HttpPost]
        [Route("Test")]
        public HttpResponseMessage Test(List<ItemListDto> items)
        {
            using (var stream = new MemoryStream())
            {
                //C:\Users\Administrator\source\repos\hbri.recruitment\src\Hbri.Recruitment.Web.Host\wwwroot\assets
                var templatePath = Path.Combine(appEnvironment.ContentRootPath, @"wwwroot\assets\Format.xlsx");

                using (var wb = new ClosedXML.Excel.XLWorkbook(templatePath))
                {
                    //Add DataTable in worksheet
                    var ws = wb.Worksheets.FirstOrDefault();
                    var i = 2;

                    items.ForEach(d =>
                    {
                        ws.Cell(i, 1).Value = d.No;
                        ws.Cell(i, 2).Value = d.Chapter;
                        ws.Cell(i, 3).Value = d.Page;
                        ws.Cell(i, 4).Value = d.Code;
                        ws.Cell(i, 5).Value = d.Description;
                        ws.Cell(i, 6).Value = d.Quantity;
                        ws.Cell(i, 7).Value = d.Rate;
                        ws.Cell(i, 8).Value = d.Amount;
                        i++;
                    });
                    ws.Cell(i, 8).Value = items.Sum(x => x.Amount);
                    wb.SaveAs(stream);
                    var result = new HttpResponseMessage(System.Net.HttpStatusCode.OK)
                    {
                        Content = new ByteArrayContent(stream.ToArray())
                    };
                    result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                    {
                        FileName = $"Estimate_{DateTime.Now.ToString("yyyyMMdd")}.xlsx"
                    };
                    result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                    result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
                    return result;
                }
            }
        }
    }
}
