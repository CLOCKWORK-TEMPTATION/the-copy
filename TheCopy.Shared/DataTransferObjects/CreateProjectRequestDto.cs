namespace TheCopy.Shared.DataTransferObjects;

public class CreateProjectRequestDto
{
    public required string Name { get; set; }
    public Guid UserId { get; set; }
}