import Redis from 'redis'


const client = await Redis.createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect()

export async function getFromCache(key) {
  try {
    const data = await client.get(key)
    return data ? JSON.parse(data) : null
  } catch (err) {
    console.error(err)
    throw err
  }
}

export async function setInCache(key, data) {
  try {
    await client.setEx(key, 30, JSON.stringify(data))
  } catch (err) {
    console.error(err)
    throw err
  }
}

process.on('exit', () => {
  client.quit()
})

