import {createClient} from '@sanity/client'

export default createClient({
  projectId: '8u8f8r8d', // find this at manage.sanity.io or in your sanity.json
  dataset: 'production', // this is from those question during 'sanity init'
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-06-05', // use a UTC date string
})
