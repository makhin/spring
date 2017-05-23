using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class Orders2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MedicalInsuranceCaseId",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MedicalInsuranceCaseId",
                table: "Orders",
                column: "MedicalInsuranceCaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders",
                column: "MedicalInsuranceCaseId",
                principalTable: "InsuranceCases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MedicalInsuranceCaseId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "MedicalInsuranceCaseId",
                table: "Orders");
        }
    }
}
