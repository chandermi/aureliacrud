using FluentValidation;
using FluentValidation.AspNetCore;
using AureliaCrud.Data;
using System.ComponentModel;

namespace AureliaCrud.DTO
{
    public class ApplicantDTO : Applicant
    {
    }
    public class ApplicantValidator : AbstractValidator<ApplicantDTO>
    {
        public ApplicantValidator()
        {
            RuleFor(x => x.Id).NotNull();
            RuleFor(x => x.Name).Length(5, 50);
            RuleFor(x => x.FamilyName).Length(5, 50);
            RuleFor(x => x.Address).Length(10, 100);
            RuleFor(x => x.CountryOfOrigin).NotNull();
            RuleFor(x => x.EmailAdress).EmailAddress();
            RuleFor(x => x.Age).InclusiveBetween(18, 60);

        }
    }
}
