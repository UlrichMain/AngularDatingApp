﻿using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [MaxLength(100)]
    public required string UserName { get; set; }

    [MaxLength(100)]
    public required string Password { get; set; }
}
