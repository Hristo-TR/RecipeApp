import express from 'express';
import mongoose from 'mongoose';
import {RecipeModel} from '../Models/Recipes.js';
import { UserModel } from '../Models/Users.js';

const router = express.Router();

router.get("/", async (req, res) =>{
    try {
        const response = await RecipeModel.find({})
        res.json(response)
    } catch (err) {
        res.json(err);
    }
});
router.get("/:recipeID", async (req, res) =>{
    try {
        const response = await RecipeModel.findById(req.params.recipeID)
        res.json(response)
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) =>{
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response)
    } catch (err) {
        res.json(err);
    }
});

router.put("/:recipeID/:userID",  async (req, res) =>{
   
    try {
        const recipe = await RecipeModel.findById(req.params.recipeID);
        const user = await UserModel.findById(req.params.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes})
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req,res) => {
    try {
        const user= await UserModel.findById(req.params.userID)
        res.json({savedRecipes: user?.savedRecipes})        
    } catch (err) {
        res.json(err)
    }
});

router.get("/savedRecipes/:userID", async (req,res) => {
    try {
        const user= await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id:{$in: user.savedRecipes},
        })
        res.json({savedRecipes})        
    } catch (err) {
        res.json(err)
    }
});

router.delete("/savedRecipes/:userID/:recipeID", async (req,res) => {
    try {
        const user= await UserModel.findById(req.params.userID)
        const savedRecipe = await RecipeModel.findById(req.params.recipeID)
        user.savedRecipes.pull(savedRecipe._id);
        await user.save();

        res.json({ message: "Recipe unsaved successfully" });    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export {router as recipesRouter}