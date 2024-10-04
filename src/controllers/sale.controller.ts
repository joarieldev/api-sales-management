import { Request, Response } from 'express'
import { Sale } from '../entities/Sale'
import { Customer } from '../entities/Customer'
import { Detail } from '../entities/Detail'
import { Product } from '../entities/Product'

export const createSale = async (req: Request, res: Response) => {
  try {

    const { customerDni, details } = req.body

    const customer = await Customer.findOne({ where: { dni: parseInt(customerDni) } })
    if (!customer) {
      res.status(404).json({ message: 'No se encontró el cliente' })
      return
    }
    if (details.length === 0) {
      res.status(400).json({ message: 'No hay productos en la caja' })
      return
    }

    const arrayDetails: Detail[] = []

    for (const detail of details) {
      const product = await Product.findOneBy({ id: detail.productId })
      if (!product) {
        res.status(404).json({ message: 'No se encontró el producto' })
        return
      }
      if (product.stock < detail.quantity) {
        res.status(400).json({ message: 'No hay suficiente stock' })
        return
      }

      const newDetail = new Detail()
      newDetail.product = product
      newDetail.quantity = detail.quantity
      arrayDetails.push(newDetail)
    }
    for (const detail of arrayDetails) {
      await detail.save()
    }
    for (const detail of arrayDetails) {
      const auxProduct = new Product
      auxProduct.stock = detail.product.stock - detail.quantity 
      await Product.update(detail.product.id, auxProduct)
    }

    const sale = new Sale()
    sale.amount = arrayDetails.reduce((total, detail) => total + detail.quantity * detail.product.price, 0)
    sale.customer = customer
    sale.details = arrayDetails

    await sale.save()
    res.status(201).json(sale)

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await Sale.find({
      relations: ['customer'],
    })
    res.status(200).json(sales)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}