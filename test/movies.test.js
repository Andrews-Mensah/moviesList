const sinon = require("sinon");
const chai = require("chai");
const {expect} = require("chai");
const Movies = require("../models/movie.model");
const {getAllMovies, addMovie,updateMovie, deleteMovie} = require("../controllers/movies.controller");
const { mockReq, mockRes } = require("sinon-express-mock");

chai.use(require('sinon-chai'));




describe("Add movies controller", function (){

    it("returns 400 when title is null", async function (){
        this.timeout(0)
        const req = mockReq({
            "title": null,
            "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
            "yearReleased": 2009,
            "category": "Comedy",
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);

        
    })
    
    it("return 400 when description is null", async function (){
        this.timeout(0)
        const req = mockReq({
            "title": "null",
            "description": null,
            "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
            "yearReleased": 2009,
            "category": "Comedy",
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);
    })

    it("return 400 when category is null", async function (){
        this.timeout(0)
        const req = mockReq({
            "title": "null",
            "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
            "yearReleased": 2009,
            "category": null,
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);
    })

    it("return 400 when thumbnail is null", async function (){
        this.timeout(0)
        const req = mockReq({
            "title": "null",
            "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "thumbnail": null,
            "yearReleased": 2009,
            "category": "null",
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);
    })

    it("return 400 when year that movie was released is null", async function (){
        this.timeout(0)
        const req = mockReq({
            "title": "null",
            "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
            "yearReleased": null,
            "category": "null",
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);
    })

    // it("returns 201 when movie is added successfully", async function(){
    //     this.timeout(0)
    //     const requestBody = {
    //         "title": "Killer Man",
    //         "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
    //         "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
    //         "yearReleased": 2009,
    //         "category": "Comedy",
    //         "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
    //     }
    //     const req = mockReq({
    //         body: requestBody
    //     });
    //     const res = mockRes();

    //     await addMovie(req,res)
    //     expect(res.status).to.be.calledWith(201);

    // })




    // it("returns 400 when error was encountered when adding a movie", async function (){
    //     const saveStub = sinon.stub(Movies, "save").resolves
    //     const error = new Error("Made up Error");
    //     const req = mockReq()
    //     const res = mockRes()

    //     saveStub.rejects(error)

    //     await addMovie(req,res)
    //     expect(res.status).to.be.calledWith(400);
    //     saveStub.restore()
    // })


})




describe("Update movies controller", function(){

    it("returns 400 when movie ID is not passed", async function (){
        this.timeout(0)
        const req = mockReq()
        const res = mockRes()

        await updateMovie(req, res)
        expect(res.status).to.be.calledWith(400)
    })
})


describe("Deleting movies controller", function (){

    it("returns 400 when movie ID is not passed", async function (){
        this.timeout(0)
        const req = mockReq()
        const res = mockRes()

        await deleteMovie(req, res)
        expect(res.status).to.be.calledWith(400)
    })
})

