using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Interfaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountsController(DataContext dataContext, ITokenService tokenService): BaseApiController
{

    [HttpPost("register")]
    public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO)
    {
        using var hmac = new HMACSHA512();

        if (await UserExists(registerDTO.UserName)) return BadRequest("Username is Already Taken!");

        var user = new AppUser
        {
            UserName = registerDTO.UserName,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key,
        };

        dataContext.Users.Add(user);
        await dataContext.SaveChangesAsync();

        return  Ok(user);
    }


    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
        var user = await dataContext.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.UserName);

        if (user is not null)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var hashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.Password));

            if (user.PasswordHash.SequenceEqual(hashedPassword))
            {      
                var userDTO = new UserDTO{
                    UserName = user.UserName,
                    Token = tokenService.CreateToken(user)
                };

                return  Ok(userDTO);
            }
            else return BadRequest("Password Does Not Match");
        }
        else
        {
            return BadRequest("Username Not Found");
        }
    }

    private async Task<bool>  UserExists(string username)
    {
        return await dataContext.Users.AnyAsync(x=> x.UserName.ToLower() == username.ToLower());
    }

}
