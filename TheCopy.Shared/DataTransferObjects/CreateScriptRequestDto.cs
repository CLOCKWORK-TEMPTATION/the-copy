using System;

namespace TheCopy.Shared.DataTransferObjects;

public class CreateScriptRequestDto
{
    public required string Title { get; set; }
    public Guid ProjectId { get; set; }
    public required string Prompt { get; set; }
}