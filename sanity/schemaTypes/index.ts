import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'
import { ProductType } from './productType'
import { orderType } from './orderTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, ProductType, orderType],
}
