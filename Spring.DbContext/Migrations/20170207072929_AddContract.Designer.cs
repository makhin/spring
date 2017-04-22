using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Spring.DbContext.DbContext;

namespace Spring.DbContext.Migrations
{
    [DbContext(typeof(SpringDbContext))]
    [Migration("20170207072929_AddContract")]
    partial class AddContract
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Spring.Data.Models.Contract", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("BeginDate");

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Contracts");
                });

            modelBuilder.Entity("Spring.Data.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdditionalInfo");

                    b.Property<int?>("ContractId");

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<string>("Department");

                    b.Property<int>("DisabilityGroup");

                    b.Property<DateTime?>("EndDate");

                    b.Property<string>("MobilePhone");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("PersonnelNumber");

                    b.Property<string>("Position");

                    b.Property<DateTime>("StartDate");

                    b.Property<string>("TIN")
                        .HasMaxLength(10);

                    b.HasKey("Id");

                    b.HasIndex("ContractId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Spring.Data.Models.Customer", b =>
                {
                    b.HasOne("Spring.Data.Models.Contract", "Contract")
                        .WithMany()
                        .HasForeignKey("ContractId");
                });
        }
    }
}
