// Controllers in Seperate files

// this is a temporary data store
const DISHES = [
    {
        "id": 1,
        "name": "Panner",
        "category": "Veg"
    },
    {
        "id": 2,
        "name": "Chicken",
        "category": "Non-Veg"
    }
];

const getDishes = (req, res) => {
    res.json({
        success: true,
        data: DISHES,
        message: "Dishes fetched successfully"
    });
}

const postDishes = (req, res) => {
    const { name, category, id } = req.body

    // validation for existing id
    for (const dish of DISHES) {
        if (id === dish.id) {
            return res.status(400).json({
                success: false,
                message: "ID already exists."
            })
        }
    }

    // validation for required fields
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }
    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        })
    }
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required"
        })
    }

    const dishObj = {
        id,
        name,
        category
    }

    DISHES.push(dishObj)

    res.status(201).json({
        success: true,
        data: dishObj,
        message: "Dish created successfully"
    });
}

const deleteDishessById = (req, res) => {

    const { id } = req.params

    let dishIndex = -1

    DISHES.forEach((dish, i) => {
        if (dish.id == id) {
            dishIndex = i;
        }
    })

    if (dishIndex == -1) {
        return res.status(404).json({
            success: false,
            message: `Dish with id: ${id} does not exist`
        })
    }
    else {
        DISHES.splice(dishIndex, 1)
        return res.status(200).json({
            success: true,
            message: `Dish with id: ${id} deleted successfully`
        })
    }
}

const getDishesById = (req, res) => {
    const { id } = req.params

    let dishIndex = -1

    DISHES.forEach((dish, i) => {
        if (dish.id == id) {
            dishIndex = i
        }
    })

    if (dishIndex == -1) {
        return res.status(404).json({
            success: false,
            message: `Dish with id: ${id} does not exist`
        })
    }
    else {
        return res.status(200).json({
            success: true,
            data: DISHES[dishIndex],
            message: `Dish with id: ${id} fetched successfully`
        })
    }
}

const putDishesById = (req, res) => {
    const { id } = req.params
    const { name, category } = req.body

    // validation for required fields
    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        })
    }
    if (!category) {
        return res.json({
            success: false,
            message: "Category is required"
        })
    }

    let dishIndex = -1

    DISHES.forEach((dish, i) => {
        if (dish.id == id) {
            dishIndex = i;
        }
    })

    if (dishIndex == -1) {
        return res.json({
            success: false,
            message: `Dish with id: ${id} does not exists`
        })
    }

    DISHES[dishIndex] = {
        id: parseInt(id),
        name: name,
        category: category
    }

    res.json({
        success: true,
        data: DISHES[dishIndex],
        message: `Dish with id: ${id} updated successfully`,
    })
}

export { getDishes, postDishes, deleteDishessById, getDishesById, putDishesById }