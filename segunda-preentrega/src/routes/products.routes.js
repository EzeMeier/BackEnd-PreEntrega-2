import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

router.get("/",(req,res)=>{
    res.json({message:"listado de productos"});
});

router.post("/", async(req,res)=>{
    try {
        const productInfo = req.body;
        const result = await productsService.createProduct(productInfo);
        res.json({status:"success",result});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

router.get("/:pid", async(req,res)=>{
    try {
        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductById(productId);
        res.json({message:"endpoint para obtener un producto", data:product});
    } catch (error) {
        res.json({status:"error",message:error.message});
    }
});

router.put("/:pid", async (req, res) => {
    const {pid}=req.params
    const obj=req.body
    const updatedproduct = await productsService.updateProduct(pid,obj);
    console.log(updatedproduct)
     res.json({ status: "success", updatedproduct });
  });

router.delete("/:pid", async (req, res) => {
    const id=req.params.pid
    const deleteproduct = await productsService.deleteProduct(id);
     res.json({ status: "success",deleteproduct });
  });

export {router as productsRouter};