using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AureliaCrud.Data
{
    public partial class AureliaDbContext : DbContext
    {
        public AureliaDbContext()
        {
        }

        public AureliaDbContext(DbContextOptions<AureliaDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Applicant> Applicant { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = $"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename={System.Environment.CurrentDirectory.Replace("Web","Data\\Context")}\\AureliaDb.mdf;Integrated Security=True";
                //optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=HahnDb.mdf;Integrated Security=True");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Applicant>(entity =>
            {

                entity.Property(e => e.Id).UseIdentityColumn();

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.CountryOfOrigin)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.EmailAdress)
                    .IsRequired()
                    .HasColumnName("EMailAdress")
                    .HasColumnType("ntext");

                entity.Property(e => e.FamilyName)
                    .IsRequired()
                    .HasColumnType("ntext");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnType("ntext");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
