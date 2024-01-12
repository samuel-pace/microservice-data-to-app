import responses from '../../../lib/reponses.js'
import storeLayer from 'store-layer'
import { getFromCache, setInCache } from '../../../lib/redis-client.js'

const { msClient } = storeLayer()
const dataLocation = process.env.DATA_LOCATION

export const handler = async (event) => {
    const cpf = event.pathParameters.cpf
    const cachedData = await getFromCache(cpf)
    if (cachedData) {
        return responses.ok({ 'cpf': cpf, 'data': cachedData })
    }

    const pool = await msClient.connect()
    const checkQuery = `SELECT COUNT(*) AS cpfExist FROM ${dataLocation} WHERE Cpf = ${cpf}`
    const checkResult = await pool.request().input('Cpf', cpf).query(checkQuery)
    const cpfExist = checkResult.recordset[0].cpfExist

    if (cpfExist === 0) {
        pool.close()
        return responses.badRequest({
            error: 'data_error',
            message: 'O CPF informado não existe.',
        })
    }

    const result = await pool.query(`
    DECLARE @cpf bigint = ${cpf}
    SELECT 
      DataIni,
      DataFim,
      ConcentreSuaCompraDescricao,
      ConcentreSuaCompraPercentual,
      Rank
    FROM ${dataLocation}
    WHERE 1 = 1
      AND cpf = @cpf
    ORDER BY rank
  `)

    setInCache('Recomendation-Cpf:' + cpf, result.recordsets[0])
    pool.close()
    return responses.ok(result.recordsets[0])
}
