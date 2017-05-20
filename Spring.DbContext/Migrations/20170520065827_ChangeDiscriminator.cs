using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class ChangeDiscriminator : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "InsuranceCases");

            migrationBuilder.AddColumn<int>(
                name: "CaseType",
                table: "InsuranceCases",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaseType",
                table: "InsuranceCases");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "InsuranceCases",
                nullable: false,
                defaultValue: "");
        }
    }
}
