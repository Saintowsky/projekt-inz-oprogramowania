using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;

namespace Backend.Tests
{
    public class HelloControllerTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public HelloControllerTests(WebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Hello_Endpoint_Returns_Message()
        {
            var response = await _client.GetFromJsonAsync<ResponseDto>("/api/hello");

            Assert.NotNull(response);
            Assert.Equal("Backend is connected successfully", response!.message);
        }

        public class ResponseDto
        {
            public string? message { get; set; }
        }
    }
}
