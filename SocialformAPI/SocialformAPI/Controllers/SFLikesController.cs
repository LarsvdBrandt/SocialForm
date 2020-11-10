using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostService.Models;
using SocialformAPI.Data;

namespace PostService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SFLikesController : ControllerBase
    {
        private readonly SFContext _context;

        public SFLikesController(SFContext context)
        {
            _context = context;
        }

        // GET: api/SFLikes/post
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<SFLikes>>> GetSFLikes(long id)
        {
            var sfLikes = _context.SFLikes.Where(a => a.PostId == id).ToList();

            return sfLikes;
        }

        /*// GET: api/SFLikes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SFLikes>>> GetSFLikes()
        {
            return await _context.SFLikes.ToListAsync();
        }

        // GET: api/SFLikes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SFLikes>> GetSFLikes(long id)
        {
            var sFLikes = await _context.SFLikes.FindAsync(id);

            if (sFLikes == null)
            {
                return NotFound();
            }

            return sFLikes;
        }*/

        // PUT: api/SFLikes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSFLikes(long id, SFLikes sFLikes)
        {
            if (id != sFLikes.LikeId)
            {
                return BadRequest();
            }

            _context.Entry(sFLikes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SFLikesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SFLikes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SFLikes>> PostSFLikes(SFLikes sFLikes)
        {
            _context.SFLikes.Add(sFLikes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSFLikes", new { id = sFLikes.LikeId }, sFLikes);
        }

        // DELETE: api/SFLikes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SFLikes>> DeleteSFLikes(long id)
        {
            var sFLikes = await _context.SFLikes.FindAsync(id);
            if (sFLikes == null)
            {
                return NotFound();
            }

            _context.SFLikes.Remove(sFLikes);
            await _context.SaveChangesAsync();

            return sFLikes;
        }

        private bool SFLikesExists(long id)
        {
            return _context.SFLikes.Any(e => e.LikeId == id);
        }
    }
}
