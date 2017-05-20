using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class HospitalToIC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HospitalId",
                table: "InsuranceCases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_InsuranceCases_HospitalId",
                table: "InsuranceCases",
                column: "HospitalId");

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases",
                column: "HospitalId",
                principalTable: "Hospitals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases");

            migrationBuilder.DropIndex(
                name: "IX_InsuranceCases_HospitalId",
                table: "InsuranceCases");

            migrationBuilder.DropColumn(
                name: "HospitalId",
                table: "InsuranceCases");
        }
    }
}
