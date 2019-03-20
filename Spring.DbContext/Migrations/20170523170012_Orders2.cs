using Microsoft.EntityFrameworkCore.Migrations;

namespace Spring.DbContext.Migrations
{
    public partial class Orders21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_InsuranceCases_InsuranceCaseId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_InsuranceCaseId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "InsuranceCaseId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "MedicalInsuranceCaseId",
                table: "Orders",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders",
                column: "MedicalInsuranceCaseId",
                principalTable: "InsuranceCases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "MedicalInsuranceCaseId",
                table: "Orders",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "InsuranceCaseId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_InsuranceCaseId",
                table: "Orders",
                column: "InsuranceCaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_InsuranceCases_InsuranceCaseId",
                table: "Orders",
                column: "InsuranceCaseId",
                principalTable: "InsuranceCases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_InsuranceCases_MedicalInsuranceCaseId",
                table: "Orders",
                column: "MedicalInsuranceCaseId",
                principalTable: "InsuranceCases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
