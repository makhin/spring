using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class MedicalCosts1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "DiagnosisCosts",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "FoodCosts",
                table: "InsuranceCases",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TreatmentСosts",
                table: "InsuranceCases",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiagnosisCosts",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "FoodCosts",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "TreatmentСosts",
                table: "InsuranceCases");
        }
    }
}
