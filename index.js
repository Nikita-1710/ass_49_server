import express from 'express';
import cors from 'cors'
import { getDishes, postDishes, deleteDishessById, getDishesById, putDishesById, } from './controllers/dishes.js';

const app = express();

app.use(cors())
app.use(express.json());

const PORT = 5002;

app.get("/dishes", getDishes);  // API for read dishes
app.post("/dishes", postDishes) // API for create dishes
app.delete("/dishes/:id", deleteDishessById) // API for delete dishes giving ID
app.get("/dishes/:id", getDishesById)   // API for get dish details by ID
app.put("/dishes/:id", putDishesById)   // API for update dishes component

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});