using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class InsuranceIsAbstract : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Mkb10s_Mkb10Id",
                table: "InsuranceCases");

            migrationBuilder.AlterColumn<int>(
                name: "Mkb10Id",
                table: "InsuranceCases",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "InsuranceCases",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Therapy",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Threatment",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "BeginDate",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DocumentDate",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReportDate",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Mkb10s_Mkb10Id",
                table: "InsuranceCases",
                column: "Mkb10Id",
                principalTable: "Mkb10s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Mkb10s_Mkb10Id",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "Therapy",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "Threatment",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "BeginDate",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "DocumentDate",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "ReportDate",
                table: "InsuranceCases");

            migrationBuilder.AlterColumn<int>(
                name: "Mkb10Id",
                table: "InsuranceCases",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Mkb10s_Mkb10Id",
                table: "InsuranceCases",
                column: "Mkb10Id",
                principalTable: "Mkb10s",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
