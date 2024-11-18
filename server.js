import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();

app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition : {
     openapi : "3.0.0",
     info : {
        title : "User API",
        version : "1.0.0",
        description : "A simple Express User API ",
     },
    },
    apis: ["./server.js"],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
} )

let user = [
    {
    id : 1,
    name : "Madhuri",
    age : 30,
},
{
    id : 2,
    name : "Nitin",
    age : 32,
}
]

/** 
 * @swagger
 * /user:
 *   get : 
 *      summary : Retrives a list of user
 *      description : Retrives a list of user in the list. 
 *      responses : 
 *          200: 
 *           description : A list of user. 
 *           content : 
 *              application/json : 
 *                  schema : 
 *                      type : array
 *                      items : 
 *                          type: object
 *                          properties: 
 *                              id: 
 *                                  type : integer
 *                              name : 
 *                                  type : string
 *                              author: 
 *                                  age: integer

 */
app.get( "/user", (req, res) => {
res.json(user);
})
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 */

app.post( "/user", (req, res) => {
    const newUser= {
        id: user.length + 1,
        name : req.body.name,
        age : req.body.age,
    }
    user.push(newUser);
    res.json({message : "User added successfully", user : newUser})
    })
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: User is updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     age:
 *                       type: integer
 *       404:
 *         description: User not found
 */

app.put("/user/:id", (req, res) => {
 const userID = parseInt(req.params.id);
 const foundUser  = user.find((u => u.id === userID));
 if(!foundUser ){
    return res.status(404).json ({message : "User not found"})
 }
 foundUser .name = req.body.name || user.name;
 foundUser .age = req.body.age || user.age;
 res.json({message : "User name updated ", user : foundUser })
})

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */


app.delete("/user/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    user = user.filter((u) => u.id !== userID);
    res.json({message:"User deleted successfully"});
}) 