import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

const token = process.env.SANITY_API_TOKEN_READ;


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
