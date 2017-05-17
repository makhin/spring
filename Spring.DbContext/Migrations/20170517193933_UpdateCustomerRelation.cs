using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class UpdateCustomerRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Customers_ContractId",
                table: "Customers",
                column: "ContractId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Contracts_ContractId",
                table: "Customers",
                column: "ContractId",
                principalTable: "Contracts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Contracts_ContractId",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_ContractId",
                table: "Customers");
        }
    }
}
