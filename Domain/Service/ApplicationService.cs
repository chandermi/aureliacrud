using AutoMapper;
using AureliaCrud.Data;
using AureliaCrud.DTO;
using AureliaCrud.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace AureliaCrud.Service
{
    public class ApplicationService : IApplicantRepository, ICommon
    {
        private HahnDbContext _context;
        private Mapper _mapper;
        private Mapper _listmapper;
        private MapperConfiguration configDtoToMain;
        private MapperConfiguration configMainToDto;
        public ApplicationService()
        {
            _context = new HahnDbContext();
            configDtoToMain = new MapperConfiguration(cfg => cfg.CreateMap<ApplicantDTO, Applicant>());
            configMainToDto = new MapperConfiguration(cfg => cfg.CreateMap<Applicant, ApplicantDTO>());
            var _listconfig = new MapperConfiguration(cfg => cfg.CreateMap<List<Applicant>, List<ApplicantDTO>>());

            _listmapper = new Mapper(_listconfig);
        }
        public ApplicantDTO AddApplicant(ApplicantDTO dTO)
        {
            try
            {
                _mapper = new Mapper(configDtoToMain);
                Applicant dbObject = _mapper.Map<Applicant>(dTO);
                _context.Applicant.Add(dbObject);
                _context.SaveChanges();
                dTO.Id = dbObject.Id;
                return dTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public bool DeleteApplicant(int id)
        {
            try
            {
                var obj = _context.Applicant.FirstOrDefault(a => a.Id == id);
                _context.Remove(obj);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ApplicantDTO Get(int id)
        {
            try
            {
                var dbObject = _context.Applicant.FirstOrDefault(a => a.Id == id);
                _mapper = new Mapper(configMainToDto);
                return _mapper.Map<ApplicantDTO>(dbObject);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ApplicantDTO> GetAllApplicants()
        {
            try
            {
                var dbObject = from items in _context.Applicant
                               select new ApplicantDTO()
                               {
                                   Id = items.Id,
                                   Address = items.Address,
                                   Age = items.Age,
                                   CountryOfOrigin = items.CountryOfOrigin,
                                   EmailAdress = items.EmailAdress,
                                   FamilyName = items.FamilyName,
                                   Hired = items.Hired,
                                   Name = items.Name

                               };


                return dbObject.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ApplicantDTO GetApplicant(int id)
        {
            try
            {
                var dbObject = _context.Applicant.FirstOrDefault(a => a.Id == id);
                _mapper = new Mapper(configMainToDto);
                return _mapper.Map<ApplicantDTO>(dbObject);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public ApplicantDTO UpdateApplicant(ApplicantDTO dTO)
        {
            try
            {
                var data = _context.Applicant.Where(a => a.Age == 18);
                    
                _mapper = new Mapper(configDtoToMain);
                Applicant dbObject = _mapper.Map<Applicant>(dTO);
                _context.Applicant.Update(dbObject);
                _context.SaveChanges();
                return dTO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
