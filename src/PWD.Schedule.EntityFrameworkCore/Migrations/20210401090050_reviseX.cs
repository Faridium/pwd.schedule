using Microsoft.EntityFrameworkCore.Migrations;

namespace PWD.Schedule.Migrations
{
    public partial class reviseX : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XTopics_Chapters_ChapterId",
                table: "XTopics");

            migrationBuilder.DropIndex(
                name: "IX_XTopics_ChapterId",
                table: "XTopics");

            migrationBuilder.DropColumn(
                name: "TopicId",
                table: "XTopics");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "XItems");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "XCategories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TopicId",
                table: "XTopics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "XItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "XCategories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_XTopics_ChapterId",
                table: "XTopics",
                column: "ChapterId");

            migrationBuilder.AddForeignKey(
                name: "FK_XTopics_Chapters_ChapterId",
                table: "XTopics",
                column: "ChapterId",
                principalTable: "Chapters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
