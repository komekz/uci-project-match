import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
    'https://wmzergfzugxrfkcnwwkl.supabase.co', 
    'sb_publishable_GNPtWl0D2LoJOEMV5MReAA_yK3dmFQT'
)

type Profile = Database['public']['Tables']['profiles']['Row']
export type NewProfile = Database['public']['Tables']['profiles']['Insert']

export async function add_profile(profile: NewProfile): Promise<boolean> {
    const { error } = await supabase
      .from('profiles')
      .insert(profile)
    
    if (error) {
        console.error(error)

        return false
    }

    return true
}

