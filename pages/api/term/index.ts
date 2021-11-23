import { supabase } from '@helperInstances/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@helperInstances/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
if (req.method === 'POST') {
    handlePOST(req,res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
    }
    // POST /api/term/
    async function handlePOST(req, res) {
        const array = req.body
        const terms = []
        array.forEach(async element => {
            const {name,definition,studySetId} =element
            const term = await prisma.term.create({
              data:{
                  name:name,
                  definition:definition,
                  StudySet:{connect:{
                          id:Number(studySetId)
                  }}
              }
            })
            terms.push(term)
        });
        res.json(JSON.stringify(terms))
      }
}