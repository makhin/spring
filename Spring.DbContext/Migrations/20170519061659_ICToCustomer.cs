using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class ICToCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CustomerId",
                table: "InsuranceCases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceCases_CustomerId",
                table: "InsuranceCases",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Customers_CustomerId",
                table: "InsuranceCases",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Customers_CustomerId",
                table: "InsuranceCases");

            migrationBuilder.DropIndex(
                name: "IX_InsuranceCases_CustomerId",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "InsuranceCases");
        }
    }
}
