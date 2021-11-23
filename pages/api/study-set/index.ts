import { supabase } from '@helperInstances/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@helperInstances/prisma'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  

  if (req.method === 'POST') {
    handlePOST(req,res)
  }
  async function handlePOST(req, res) {
    const {user} = await supabase.auth.api.getUserByCookie(req)
    const userId = user.id
    console.log(userId)
    const {name,description} = req.body
    const studyset = await prisma.studySet.create({
      data:{
          name:name,
          userId:userId,
          description:description
      }
      
    })
    res.json(studyset)
  }

}