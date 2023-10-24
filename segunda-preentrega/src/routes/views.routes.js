import { Router } from "express";
import { productsService } from "../persistence/index.js";

const router = Router();

router.get("/", async(req,res)=>{
    const {limit = 3,page = 1} = req.query;
    const query = {};
    const options = {
        limit,
        page,
        sort:{price:1},
        lean:true
    };
    const result = await productsService.getProductsPaginate(query,options);
    const baseUrl = req.protocol + "://" + req.get ("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` : null,
        nextLink: result.hasNextPage ? baseUrl.includes("page") ?
        baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
    }
    console.log(dataProducts);
    res.render("home",dataProducts);
});

router.get("/realtimeproducts", (req,res)=>{
    res.render("realTime");
});

router.get("/signup",(req,res)=>{
    res.render("signupView");
});

router.get("/login",(req,res)=>{
    res.render("loginView");
});

router.get("/profile",(req,res)=>{
    if(req.user?.email){
        const userEmail = req.user.email;
        res.render("profileView",{userEmail});
    } else {
        res.redirect("/login");
    }
});

export {router as viewsRouter}