using AureliaCrud.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace AureliaCrud.Repository
{
    public interface ICommon
    {
        /// <summary>
        /// GetApplicant
        /// </summary>
        /// <param name="id"></param>
        /// <returns>ApplicantDTO</returns>
        public ApplicantDTO Get(int id);
    }
}
