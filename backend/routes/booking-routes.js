import express from 'express';
import {newBooking,getBookingById,deleteBooking} from "../controllers/booking-controller.js";
const bookingsRouter = express.Router();

bookingsRouter.get("/:id", getBookingById);
bookingsRouter.post("/", newBooking);
bookingsRouter.delete("/:id", deleteBooking);
export default bookingsRouter;