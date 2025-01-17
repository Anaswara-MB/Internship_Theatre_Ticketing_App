import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
export const addMovie = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(404).json({ message: "Token Not Found" });
    }
  
    const extractedToken = authHeader.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
      return res.status(404).json({ message: "Token Not Found" });
    }
  
    let adminId;
  
    // Verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
      if (err) {
        return res.status(400).json({ message: `${err.message}` });
      } else {
        adminId = decrypted.id;
      }
    });
  
    // Create new movie
    const { title, description, releaseDate, posterUrl, featured, actors } = req.body;
    if (!title || title.trim() === "" || !description || description.trim() === "" || !posterUrl || posterUrl.trim() === "") {
      return res.status(422).json({ message: "Invalid Inputs" });
    }
  let movie;
   try {
  movie = new Movie({
    description,
    releaseDate: new Date(`${releaseDate}`),
    featured,
    actors,
    admin: adminId,
    posterUrl,
    title,
  });
const session = await mongoose.startSession();
const adminUser = await Admin.findById(adminId);
session.startTransaction();
await movie.save({ session });
adminUser.addedMovies.push(movie);
await adminUser.save({ session });
await session.commitTransaction();
 } catch (err) {
  console.error(err);
  return res.status(500).json({ message: "Request Failed", error: err.message });
}

    if (!movie) {
      return res.status(500).json({ message: "Request Failed" });
    }
  
    return res.status(201).json({ movie });
  };
  
  //get movie
  export const getAllMovies=async (req,res,next)=>{
let movies;
try{
    movies=await Movie.find();

}catch(err){
    return console.log(err);
}

if (!movies) {
    return res.status(500).json({ message: "Request Failed" });
  }
  return res.status(200).json({ movies });
};
  
// get movie by id
export const getMovieById=async(req,res,next)=>{
const id=req.params.id;
let movie;
try{
    movie=await Movie.findById(id);
}catch(err){
    return console.log(err);
}
if (!movie) {
    return res.status(500).json({ message: "Invalid Movie Id" });
  }
  return res.status(200).json({ movie });
};



