import Redis from 'redis'

const RedisUrl = process.env.REDIS_URL
const client = await Redis.createClient({url: RedisUrl})
  .on('error', err => console.log('Redis Client Error', err))
  .connect()
  console.log('cliente aberto? >>', client.isOpen)

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
    await client.setEx(key, 86400, JSON.stringify(data))
  } catch (err) {
    console.error(err)
    throw err
  }
}

process.on('exit', () => {
  client.quit()
})

