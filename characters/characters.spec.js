const supertest = require("supertest");

const server = require("../api/server");

const Characters = require('../characters/characters-model')

const db = require("../data/db-config");

// it("should user the testing environment", () => {
//     expect(process.env.DB_ENV).toBe("testing");
// });

describe("server.js", () => {
  beforeEach(async () => {
    await db("characters").truncate();
  });

  describe("GET /", () => {
    it("should return 200 OK", () => {
      return supertest(server)
        .get("/")
        .then(res => {
          // jest assertion
          expect(res.status).toBe(200);
        });
    });

    it("should return api: up", () => {
      return supertest(server)
        .get("/")
        .then(res => {
          // jest assertion
          expect(res.body.api).toBe("up");
          expect(res.body).toEqual({ api: "up" });
        });
    });

    it("should return JSON", () => {
      return supertest(server)
        .get("/")
        .then(res => {
          // jest assertion
          expect(res.type).toMatch(/json/i);
        });
    });
      
    it("should return 200 OK", () => {
      return supertest(server)
        .get("/api/characters")
        .then(res => {
          // jest assertion
          expect(res.status).toBe(200);
        });
    });
      
  });

  describe("POST /characters", () => {

    describe('insert()', () => {
      it('should insert provided characters into db', async () => {

        await Characters.insert([{ name: 'Steve', gender: 'male', age: 30, level: 1 },{name: 'bob', gender: 'male', age: 30, level: 1 }])

        const character = await db('characters');

        expect(character).toHaveLength(2)

        expect(character).toEqual([{id: 1, name: 'Steve', gender: 'male', age: 30, level: 1 },{id: 2, name: 'bob', gender: 'male', age: 30, level: 1 }])
      })
    })

  })    
        
  describe('DELETE /character/:id', () => {
    describe('remove()', () => {
      it('should delete a character', async () => {
        await Characters.remove()
        
        const character = await db('characters')

        expect(character).toHaveLength(0)

        expect(character).toEqual([])
        })
      })
    })
  
  

  })

