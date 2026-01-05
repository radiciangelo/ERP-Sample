using System.Security.Claims;
using ERP.Domain.Core.Services;

namespace ERP.WebApi.Core
{
    public class UserContext : IUserContext
    {
        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            User = httpContextAccessor.HttpContext.User;
        }

        public ClaimsPrincipal User { get; }

        public Guid GetCurrentEmployeeId()
        {
            if (User.Claims.Any())
            {
                return Guid.Parse(User.Claims.First(x => x.Type == "nameid").Value);
            }
            return Guid.Empty;
        }
    }
}