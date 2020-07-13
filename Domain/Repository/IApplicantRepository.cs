using AureliaCrud.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace AureliaCrud.Repository
{
    public interface IApplicantRepository
    {
        /// <summary>
        /// GetApplicant
        /// </summary>
        /// <param name="id"></param>
        /// <returns>ApplicantDTO</returns>
        public ApplicantDTO GetApplicant(int id);

        /// <summary>
        /// GetAllApplicants
        /// </summary>
        /// <returns>List<ApplicantDTO></returns>
        public List<ApplicantDTO> GetAllApplicants();

        /// <summary>
        /// Add application
        /// </summary>
        /// <param name="dTO">ApplicantDTO dTO</param>
        /// <returns></returns>
        public ApplicantDTO AddApplicant(ApplicantDTO dTO);


        /// <summary>
        /// UpdateApplicant
        /// </summary>
        /// <param name="dTO">ApplicantDTO</param>
        /// <returns>ApplicantDTO</returns>
        public ApplicantDTO UpdateApplicant(ApplicantDTO dTO);

        /// <summary>
        /// DeleteApplicant
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>bool</returns>
        public bool DeleteApplicant(int id);
    }
}
