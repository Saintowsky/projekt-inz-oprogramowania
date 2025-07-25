﻿// <auto-generated />
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "9.0.7");

            modelBuilder.Entity("Backend.Models.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CheckIn")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("CheckOut")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Guests")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoomId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RoomName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("TotalCost")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Reservations");
                });
#pragma warning restore 612, 618
        }
    }
}
