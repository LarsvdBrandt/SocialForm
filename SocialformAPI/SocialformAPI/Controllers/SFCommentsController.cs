using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialformAPI.Data;
using SocialformAPI.Models;

namespace SocialformAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SFCommentsController : ControllerBase
    {
        private readonly SFContext _context;

        public SFCommentsController(SFContext context)
        {
            _context = context;
        }

        // GET: api/SFComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SFComments>>> GetSFComments()
        {
            return await _context.SFComments.ToListAsync();
        }

        // GET: api/SFComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SFComments>> GetSFComments(long id)
        {
            var sFComments = await _context.SFComments.FindAsync(id);

            if (sFComments == null)
            {
                return NotFound();
            }

            return sFComments;
        }

        // PUT: api/SFComments/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSFComments(long id, SFComments sFComments)
        {
            if (id != sFComments.CommentId)
            {
                return BadRequest();
            }

            _context.Entry(sFComments).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SFCommentsExists(id))
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

        // POST: api/SFComments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SFComments>> PostSFComments(SFComments sFComments)
        {
            _context.SFComments.Add(sFComments);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSFComments", new { id = sFComments.CommentId }, sFComments);
        }

        // DELETE: api/SFComments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SFComments>> DeleteSFComments(long id)
        {
            var sFComments = await _context.SFComments.FindAsync(id);
            if (sFComments == null)
            {
                return NotFound();
            }

            _context.SFComments.Remove(sFComments);
            await _context.SaveChangesAsync();

            return sFComments;
        }

        private bool SFCommentsExists(long id)
        {
            return _context.SFComments.Any(e => e.CommentId == id);
        }
    }
}
