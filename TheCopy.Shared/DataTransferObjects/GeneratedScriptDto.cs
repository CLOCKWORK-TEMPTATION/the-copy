using System;

namespace TheCopy.Shared.DataTransferObjects
{
    public class GeneratedScriptDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }        
        public Guid ProjectId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
