import express from "express";
import {PrismaClient} from "@prisma/client";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// get the tasks
router.get("/",
    authenticate,
     async(req,res)=> {
    try{
       const {projectId} = req.query;
       if(!projectId) {
        res.status(400).json({
            success:false,
            error:"ProjectId is required"
        });
       }
       const tasks = await prisma.task.findMany({
        where :{projectId},
        include: {
            assignee: {
                select:{
                    id:true,email:true
                }
            }
        },
        orderBy: {sortOrder:"asc"}
       });
       res.json(tasks);
    } catch(err) {
        res.status(500).json({success:false,error:"failed to fetch the task : ",err});
    }
})

//Create New task 
router.post("/",
    authenticate,
    async(req,res)=> {
    try {
const { projectId,title,description,type,milestone,assigneeId,startDate,endDate,estimatedHours,status,sortOrder} = req.body;
if(!title) {
    return res.status(400).json({
        success : false,
        error : "Title is not defined"
    })
}
if(!projectId) {
    return res.status(400).json({
        success : false,
        error : "projectId is not defined"
    })
}
        const task = await prisma.task.create ({
            data: {
                projectId,
                title,
                description:    description    || null,
                type:           type           || "TASK",
                milestone:      milestone      || null,
                assigneeId:     assigneeId     || null,
                startDate:      startDate      ? new Date(startDate) : null,
                endDate:        endDate        ? new Date(endDate)   : null,
                estimatedHours: estimatedHours || 0,
                status:         status         || "NOT_STARTED",
                sortOrder:      sortOrder      || 0,
            },
            include: {
                assignee: {
                    select: { id: true, email: true }
                }
            }
        });
        res.status(201).json(task);
    
    
    } catch(err) {
        console.log(err);
        res.status(500).json({success:false,error:"Failed to create task"});
    }
});

export default router;