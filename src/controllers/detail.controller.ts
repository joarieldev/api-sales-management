import { Request, Response } from 'express'
import { Detail } from '../entities/Detail'

export const getDetails = async (req: Request, res: Response) => {
  try {
    const details = await Detail.find({
      relations: ['product', 'sale'],
    })
    res.status(200).json(details)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export const getDetailBySaleId = async (req: Request, res: Response) => {
  try {
    const { saleId } = req.params
    const detail = await Detail.find({ 
      where: { sale: { id: saleId } }, 
      relations: ['product', 'sale']
    })
    if (!detail) {
      res.status(404).json({ message: 'No se encontró el detalle de la factura' })
      return
    }
    res.status(200).json(detail)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    }
  }
}
