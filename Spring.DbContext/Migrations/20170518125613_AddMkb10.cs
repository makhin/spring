using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Spring.DbContext.Migrations
{
    public partial class AddMkb10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Mkb10s",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: true),
                    ParentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mkb10s", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mkb10s_Mkb10s_ParentId",
                        column: x => x.ParentId,
                        principalTable: "Mkb10s",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "InsuranceCases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Mkb10Id = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InsuranceCases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InsuranceCases_Mkb10s_Mkb10Id",
                        column: x => x.Mkb10Id,
                        principalTable: "Mkb10s",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceCases_Mkb10Id",
                table: "InsuranceCases",
                column: "Mkb10Id");

            migrationBuilder.CreateIndex(
                name: "IX_Mkb10s_ParentId",
                table: "Mkb10s",
                column: "ParentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InsuranceCases");

            migrationBuilder.DropTable(
                name: "Mkb10s");
        }
    }
}
