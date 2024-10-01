import { Request, Response } from 'express'
import { Customer } from '../entities/Customer'

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { dni, firstName, lastName } = req.body
    const customer = new Customer()
    customer.dni = dni
    customer.firstName = firstName
    customer.lastName = lastName
    await customer.save()
    res.status(201).json(customer)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getCustomers = async (requ: Request, res: Response) => {
  try {
    const customers = await Customer.find()
    res.status(200).json(customers)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getCustomerByDni = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params
    const customer = await Customer.findOne({ where: { dni: parseInt(dni) } })
    if (!customer) {
      res.status(404).json({ message: 'No se encontró el cliente' })
      return
    }
    res.status(200).json(customer)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { dni, firstName, lastName } = req.body
    const customer = await Customer.findOneBy({ id })
    if (!customer) {
      res.status(404).json({ message: 'No se encontró el cliente' })
      return
    }
    // console.log(customer.id)
    const auxCustomer = new Customer
    auxCustomer.dni = dni
    auxCustomer.firstName = firstName
    auxCustomer.lastName = lastName
    await Customer.update(customer.id, auxCustomer)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await Customer.findOneBy({ id })
    if (!customer) {
      res.status(404).json({ message: 'No se encontró el cliente' })
      return
    }
    await Customer.delete(customer.id)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}
