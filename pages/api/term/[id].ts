import { supabase } from '@helperInstances/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@helperInstances/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const studysetId = req.query.id


  if (req.method === 'POST') {
    handlePOST(req,res)
  } else if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// POST /api/term/:id(studyset's)
async function handlePOST(req, res) {
  const terms = req.body
  const output =[]
  for(const i in terms){
  const studyset = await prisma.term.update({
    where:{
      id:terms[i].id
    },
    data:{
        name:terms[i].name,
        definition:terms[i].definition,
        studySetId:terms[i].studySetId,
    }
    
  })
  output.push(studyset)
}
  res.json(output)
}
// DELETE /api/term/:id(term's)
async function handleDELETE(req, res) {
  const {id} = req.query
  const studyset = await prisma.term.delete({
    where: { id: Number(id) },
  })
  res.json(studyset)
}