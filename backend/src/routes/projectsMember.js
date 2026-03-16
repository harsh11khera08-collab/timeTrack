import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate, authorize } from "../middleware/auth.js";
import { z } from "zod";

const router = express.Router();
const prisma = new PrismaClient();

/* ==============================
   Validation Schema
============================== */

const addMemberSchema = z.object({
  projectId: z.string(),
  employeeId: z.string(),
  role: z.string().optional()
});

/* ==============================
   Get Members of a Project
============================== */

router.get("/project/:projectId", authenticate, async (req, res) => {
  try {
    const members = await prisma.projectMember.findMany({
      where: {
        projectId: req.params.projectId
      },
      include: {
        employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            employeeNumber: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: members
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});


/* ==============================
   Add Member to Project
============================== */

router.post(
  "/project/:projectId",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {
      const { projectId } = req.params;
      const { employeeId, allocation, role, startDate, endDate } = req.body;

      if (!employeeId) {
        return res.status(400).json({
          success: false,
          error: "employeeId is required",
        });
      }

      const member = await prisma.projectMember.create({
        data: {
          projectId,
          employeeId,
          allocation: allocation ?? 100,
          role,
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
        },
      });

      res.status(201).json({
        success: true,
        data: member,
      });
    } catch (err) {

      // ✅ Handle duplicate employee in project
      if (err.code === "P2002") {
        return res.status(400).json({
          success: false,
          error: "Employee already exists in this project",
        });
      }

      console.error("Add member error:", err);

      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
);


/* ==============================
   Remove Member from Project
============================== */

router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {

    try {

      await prisma.projectMember.delete({
        where: {
          id: req.params.id
        }
      });

      res.json({
        success: true,
        message: "Member removed from project"
      });

    } catch (err) {

      if (err.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "This Member doesn't exist in this project",
        });
      }
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);


/* ==============================
   Update Project Member
============================== */

router.patch(
  "/:id",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { allocation, role, startDate, endDate } = req.body;

      const member = await prisma.projectMember.update({
        where: {
          id: id
        },
        data: {
          allocation,
          role,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined
        },
        include: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              employeeNumber: true
            }
          }
        }
      });

      res.json({
        success: true,
        message: "Project member updated successfully",
        data: member
      });

    } catch (err) {

      if (err.code === "P2025") {
        return res.status(404).json({
          success: false,
          error: "Project member not found"
        });
      }

      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
);



export default router;

