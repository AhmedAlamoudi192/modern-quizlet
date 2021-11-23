import { Term } from '@prisma/client';
import { supabase } from '@helperInstances/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@helperInstances/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies
  const {data, error} = await supabase.auth.api.getUserByCookie(token)

if (req.method === 'DELETE') {
    handleDELETE(req, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}



// DELETE /api/studyset/:id
async function handleDELETE(req, res) {
  const studysetId = req.query.id
  console.log(studysetId)
  const studyset = await prisma.studySet.delete({
    where: { id: Number(studysetId) },
  })
  res.json(studyset)
}