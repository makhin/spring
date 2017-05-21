using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class RenameTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Threatment",
                table: "InsuranceCases");

            migrationBuilder.AddColumn<int>(
                name: "Treatment",
                table: "InsuranceCases",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Treatment",
                table: "InsuranceCases");

            migrationBuilder.AddColumn<int>(
                name: "Threatment",
                table: "InsuranceCases",
                nullable: true);
        }
    }
}
