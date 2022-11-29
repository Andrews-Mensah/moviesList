const sinon = require("sinon");
const chai = require("chai");
const {expect} = require("chai");
const Movies = require("../models/movie.model");
const {getAllMovies, addMovie,updateMovie, deleteMovie, getMovieById, getAllNonMovies, searchMovieByName} = require("../controllers/movies.controller");
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

    it.skip("returns 201 when movie is added successfully", async function(){
        const requestBody = {
            "title": "Killer Man",
            "description": "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            "thumbnail": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fscreenrant.com%2Fanaconda-movie-famous-actors-jennifer-lopez-owen-wilson%2F&psig=AOvVaw0IcXB3ZkI8Qb2BrsZUSu0t&ust=1669157486166000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCOjLsauuwPsCFQAAAAAdAAAAABAE",
            "yearReleased": 2009,
            "category": "Comedy",
            "cast": [{"name": "Innocent"}, {"name":"Jacqueline"}, {"name":"Timothy"}]
        }
        const req = mockReq({
            body: requestBody
        });
        const res = mockRes();

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(201);

    })




    it("returns 400 when error was encountered when adding a movie", async function (){
        const saveStub = sinon.stub(Movies.prototype, "save")
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        saveStub.rejects(error)

        await addMovie(req,res)
        expect(res.status).to.be.calledWith(400);
        saveStub.restore()
    })


})




describe("Update movies controller", function(){

    it("returns 400 when movie ID is not passed", async function (){
        this.timeout(0)
        const req = mockReq()
        const res = mockRes()

        await updateMovie(req, res)
        expect(res.status).to.be.calledWith(400)
    })

    it("returns 400 when error was encountered when updating a movie", async function (){
        const findByIdAndUpdateStub = sinon.stub(Movies, "findByIdAndUpdate")
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findByIdAndUpdateStub.rejects(error)

        await updateMovie(req,res)
        expect(res.status).to.be.calledWith(400);
        findByIdAndUpdateStub.restore()
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

    it("returns 400 when error was encountered when deleting a movie", async function (){
        const findByIdAndDeleteStub = sinon.stub(Movies, "findByIdAndDelete")
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findByIdAndDeleteStub.rejects(error)

        await deleteMovie(req,res)
        expect(res.status).to.be.calledWith(400);
        findByIdAndDeleteStub.restore()
    })
})

describe("Getting all movies controller", function (){

    let findStub;

    before(async function (){
    findStub = sinon.stub(Movies, "find")
    })

    it("returns 400 when error was encountered when getting a movie", async function (){
        
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findStub.rejects(error)

        await getAllMovies(req,res)
        expect(res.status).to.be.calledWith(400);
        
    })

    it("returns 200 when getting a movie", async function (){
        const req = mockReq()
        const res = mockRes()

        findStub.resolves()

        await getAllMovies(req,res)
        expect(res.status).to.be.calledWith(200);
        
    })


    after(async function(){
        findStub.restore()
    })
})

describe("Getting movie by ID controller", function (){

    let findByIdStub;

    before(async function (){
        findByIdStub = sinon.stub(Movies, "findById")
    })

    it("returns 400 when error was encountered when getting a movie", async function (){
        
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findByIdStub.rejects(error)

        await getMovieById(req,res)
        expect(res.status).to.be.calledWith(400);
        
    })

    it("returns 200 when getting a movie by ID", async function (){
        const req = mockReq({
            params: {
                movieID: 89
            }
        })
        const res = mockRes()

        findByIdStub.resolves()

        await getMovieById(req,res)
        expect(res.status).to.be.calledWith(200);
        
    })


    after(async function(){
        findByIdStub.restore()
    })
})

describe("Getting all non movies controller", function (){

    let findStub;

    before(async function (){
    findStub = sinon.stub(Movies, "find")
    })

    it("returns 400 when error was encountered when getting a movie", async function (){
        
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findStub.rejects(error)

        await getAllNonMovies(req,res)
        expect(res.status).to.be.calledWith(400);
        
    })

    it("returns 200 when getting a movie", async function (){
        const req = mockReq()
        const res = mockRes()

        findStub.resolves()

        await getAllNonMovies(req,res)
        expect(res.status).to.be.calledWith(200);
        
    })


    after(async function(){
        findStub.restore()
    })
})

describe("Getting movie by keyword controller", function (){

    let findStub;

    before(async function (){
    findStub = sinon.stub(Movies, "find")
    })

    it("returns 400 when error was encountered when getting a movie by keyword", async function (){
        
        const error = new Error("Made up Error");
        const req = mockReq()
        const res = mockRes()

        findStub.rejects(error)

        await searchMovieByName(req,res)
        expect(res.status).to.be.calledWith(400);
        
    })

    it("returns 200 when getting a movie by keyword", async function (){
        const req = mockReq()
        const res = mockRes()

        findStub.resolves()

        await searchMovieByName(req,res)
        expect(res.status).to.be.calledWith(200);
        
    })


    after(async function(){
        findStub.restore()
    })
})

