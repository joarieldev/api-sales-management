import { Request, Response } from 'express'
import { Product } from '../entities/Product'
import { Like } from 'typeorm'

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock } = req.body
    const product = new Product()
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
    res.status(200).json(products)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getProductFilterByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params
    const products = await Product.find({ where: { name: Like(`%${name}%`) } })
    res.status(200).json(products)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, description, price, stock } = req.body
    const product = await Product.findOneBy({ id })
    if (!product) {
      res.status(404).json({ message: 'No se encontró el producto' })
      return
    }
    const auxProduct = new Product
    auxProduct.name = name
    auxProduct.description = description
    auxProduct.price = price
    auxProduct.stock = stock
    await Product.update(product.id, auxProduct)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const product = await Product.findOneBy({ id })
    if (!product) {
      res.status(404).json({ message: 'No se encontró el producto' })
      return
    }
    await Product.delete(product.id)
    res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}