import { supabase } from "@helperInstances/supabaseClient"
import { NextApiRequest,NextApiResponse } from "next"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
const {data, error} = await supabase.auth.api.getUserByCookie(req)
if(error) return res.status(401).json({error:error.message})
return res.status(200).json(data)
}