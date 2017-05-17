using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Spring.DbContext.Migrations
{
    public partial class UpdateCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TestData");

            migrationBuilder.AlterColumn<int>(
                name: "DisabilityGroup",
                table: "Customers",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Customers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Customers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Passport",
                table: "Customers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Sex",
                table: "Customers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Passport",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "Customers");

            migrationBuilder.AlterColumn<int>(
                name: "DisabilityGroup",
                table: "Customers",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "TestData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Currency = table.Column<decimal>(nullable: false),
                    EmailAddress = table.Column<string>(maxLength: 80, nullable: false),
                    Password = table.Column<string>(maxLength: 100, nullable: false),
                    Username = table.Column<string>(maxLength: 24, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TestData", x => x.Id);
                });
        }
    }
}
