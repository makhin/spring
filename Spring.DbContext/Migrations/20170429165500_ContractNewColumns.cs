using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class ContractNewColumns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Contracts",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Contracts",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Contracts",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Contracts",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Contracts",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Contracts");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Contracts",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Contracts",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 10);
        }
    }
}
