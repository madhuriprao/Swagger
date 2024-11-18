import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;

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

app.get( "/user", (req, res) => {
res.json(user);
})

app.post( "/user", (req, res) => {
    const newUser= {
        id: user.length + 1,
        name : req.body.name,
        age : req.body.age,
    }
    user.push(newUser);
    res.json({message : "User added successfully", user : newUser})
    })

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

app.delete("/user/:id", (req, res) => {
    const userID = parseInt(req.params.id);
    user = user.filter((u) => u.id !== userID);
    res.json({message:"User deleted successfully"});
}) 