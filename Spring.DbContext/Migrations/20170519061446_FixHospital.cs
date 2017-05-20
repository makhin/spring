using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class FixHospital : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases");

            migrationBuilder.AlterColumn<int>(
                name: "HospitalId",
                table: "InsuranceCases",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases",
                column: "HospitalId",
                principalTable: "Hospitals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases");

            migrationBuilder.AlterColumn<int>(
                name: "HospitalId",
                table: "InsuranceCases",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_InsuranceCases_Hospitals_HospitalId",
                table: "InsuranceCases",
                column: "HospitalId",
                principalTable: "Hospitals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
