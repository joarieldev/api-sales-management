import { Request, Response } from 'express'
import { Employee } from '../entities/Employee'
import bcrypt from 'bcrypt'

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { user, password, firstName, lastName } = req.body
    const employee = new Employee()
    employee.user = user
    employee.password = await createHash(password)
    employee.firstName = firstName
    employee.lastName = lastName
    await employee.save()
    res.status(201).json(employee)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.body
    const employee = await Employee.findOne({ where: { user } })
    if (!employee) {
      res.status(404).json({ message: 'No se encontró el usuario' })
      return
    }
    const isPasswordCorrect = await comparePassword(employee, password)
    if (!isPasswordCorrect) {
      res.status(401).json({ message: 'Contraseña incorrecta' })
      return
    }
    res.status(200).json({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: employee.role,
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.find()
    res.status(200).json(employees)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { user, password, firstName, lastName } = req.body
    const employee = await Employee.findOneBy({ id })
    if (!employee) {
      res.status(404).json({ message: 'No se encontró el empleado' })
      return
    }
    const auxEmployee = new Employee()
    auxEmployee.user = user
    if (password) auxEmployee.password = await createHash(password)
    auxEmployee.firstName = firstName
    auxEmployee.lastName = lastName
    await Employee.update(employee.id, auxEmployee)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const employee = await Employee.findOneBy({ id })
    if (!employee) {
      res.status(404).json({ message: 'No se encontró el empleado' })
      return
    }
    await Employee.delete(employee.id)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

const comparePassword = async (
  employee: Employee,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(password, employee.password)
}

export const createHash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}
