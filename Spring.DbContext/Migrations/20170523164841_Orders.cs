using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Spring.DbContext.Migrations
{
    public partial class Orders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Amount = table.Column<decimal>(type: "Money", nullable: false),
                    InsuranceCaseId = table.Column<int>(nullable: false),
                    OrderDate = table.Column<DateTime>(type: "date", nullable: true),
                    OrderNumber = table.Column<string>(nullable: true),
                    Pharmacy = table.Column<string>(nullable: true),
                    RecipeDate = table.Column<DateTime>(type: "date", nullable: true),
                    RecipeNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_InsuranceCases_InsuranceCaseId",
                        column: x => x.InsuranceCaseId,
                        principalTable: "InsuranceCases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_InsuranceCaseId",
                table: "Orders",
                column: "InsuranceCaseId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");
        }
    }
}
