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

        await Characters.insert({ name: 'Steve', gender: 'male', age: 30, level: 1 })

        const character = await db('characters');

        expect(character).toHaveLength(1)
      })
    })

    describe('POST /characters', () => {
      it('should have the character', () => {
        const person = { name: 'bob', gender: 'female', age: 31, level: 2 }

        return supertest(server)
          .post('/characters')
          .send(person)
          .then(res => {
            console.log(res.body.name)
            expect(res.body).toBe(person)
          })
      })
    })

  })    
        
    //   const person = { name: 'Steve', gender: 'male', age: 30, level: 1 };

    //     await supertest(server)
    //         .post("/characters")
    //         .send(person)
               
    //   let allCharacters = await supertest(server).get('/characters')

    //   expect(allCharacters.body).toHaveLength(4);

    //   await supertest(server).post('/characters').send({ name: 'bob', gender: 'male', age: 30, level: 1 })

    //   allCharacters = await supertest(server).get('/characters')
    //   expect(allCharacters.body).toHaveLength(4)
              
    // });
    //});
  
  

    // describe("POST /hobbits", () => {
    //     it("should add multiple hobbits", async () => {
    //         const hobbits = [{ name: "gaffer" }, { name: "frodo" }];

    //         await supertest(server).post("/hobbits").send(hobbits);

    //         let allhobits = await supertest(server).get("/hobbits");
    //         expect(allhobits.body).toHaveLength(2);

    //         await supertest(server).post("/hobbits").send({ name: "rose" });

    //         allhobits = await supertest(server).get("/hobbits");
    //         expect(allhobits.body).toHaveLength(3);
    //     });
  })

