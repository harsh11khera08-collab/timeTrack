import express from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { authenticate, authorize } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {
      const employee = await prisma.employee.create({
        data: {
          employeeNumber: req.body.employeeNumber,
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          email: req.body.email,
          dateOfBirth: new Date(req.body.dateOfBirth),
          gender: req.body.gender,
          dateOfJoining: new Date(req.body.dateOfJoining),
        },
      });

      res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (err) {
      console.error("Create Employee Error:", err);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },
);

router.get(
  "/",
  authenticate,
  authorize(["ADMIN", "PROJECT_MANAGER"]),
  async (req, res) => {
    try {
      const employees = await prisma.employee.findMany({
        orderBy: {
          dateOfJoining: "desc", // better than createdAt (you don't have createdAt)
        },
        select: {
          id: true,
          employeeNumber: true,
          firstName: true,
          middleName: true,
          lastName: true,
          email: true,
          dateOfBirth: true,
          gender: true,
          dateOfJoining: true,
        },
      });

      res.status(200).json({
        success: true,
        count: employees.length,
        data: employees,
      });
    } catch (err) {
      console.error("GET Employees Error:", err);
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  },
);

export default router;