using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class TotalAmount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_Hospitals_ParentId",
                table: "Hospitals");

            migrationBuilder.AddColumn<decimal>(
                name: "TotalAmount",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "Hospitals",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_Hospitals_ParentId",
                table: "Hospitals",
                column: "ParentId",
                principalTable: "Hospitals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Hospitals_Hospitals_ParentId",
                table: "Hospitals");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "InsuranceCases");

            migrationBuilder.AlterColumn<int>(
                name: "ParentId",
                table: "Hospitals",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Hospitals_Hospitals_ParentId",
                table: "Hospitals",
                column: "ParentId",
                principalTable: "Hospitals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
