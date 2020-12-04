using FluentAssertions;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using PostService;
using PostService.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace PostServiceTests
{
    public class PostControllerTest : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public PostControllerTest(
        CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();

        }

        //get

        [Fact]
        public async Task Get_Request_Should_Return_Ok_All()
        {
            var response = await _client.GetAsync("/SFPosts");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_One()
        {
            var response = await _client.GetAsync("/SFPosts/1");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_By_Wrong_ID()
        {
            var response = await _client.GetAsync("/SFPosts/20");

            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        //delete

        [Fact]
        public async Task Delete_Request_By_ID()
        {
            var response = await _client.DeleteAsync("/SFPosts/2");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Delete_Request_By_Wrong_ID()
        {
            var response = await _client.DeleteAsync("/SFPosts/7");

            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        //post

        [Fact]
        public async Task Post_Succeed()
        {

            var response = await _client.PostAsync("/SFPosts", new StringContent(JsonConvert.SerializeObject(new SFPost()
            {
                id = 4,
                Title = "How to  scallops",
                ImgSrc = "Test.jpg",
                Comment = "Test1",

            }), Encoding.UTF8, "application/json"));


            response.StatusCode.Should().Be(HttpStatusCode.Created);

        }

        //Edit

        [Fact]
        public async Task Edit_Succeed()
        {

            var response = await _client.PutAsync("/SFPosts/1", new StringContent(JsonConvert.SerializeObject(new SFPost()
            {
                id = 1,
                Title = "How to  scallops",
                ImgSrc = "Test.jpg",
                Comment = "Test1",

            }), Encoding.UTF8, "application/json"));


            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

        }

        [Fact]
        public async Task Edit_Fail_Wrong_ID()
        {

            var response = await _client.PutAsync("/SFPosts/9", new StringContent(JsonConvert.SerializeObject(new SFPost()
            {
                id = 9,
                Title = "How to  scallops",
                ImgSrc = "Test.jpg",
                Comment = "Test1",

            }), Encoding.UTF8, "application/json"));


            response.StatusCode.Should().Be(HttpStatusCode.NotFound);

        }
    }
}
