import { describe, expect, it } from 'bun:test'
import { dataMapping, formatDate } from '.'

const now = new Date().toISOString()
const user = {
  _id: '1',
  int: 1,
  name: 'John',
  lastName: 'Doe Smith',
  email: 'correo@correo.com',
  createdAt: now,
  location: {
    city: 'LA',
    country: 'EEUU',
    address: {
      street: 'Street 123',
    },
  },
}

describe('dataMapping', () => {
  it('default', () => {
    const [res] = dataMapping([user], ['email'])
    expect(res.email).toBe(user.email)
  })

  it('replace', () => {
    const newData = { int: user._id }
    const [res] = dataMapping([user], ['_id:int'])
    expect(res.int).toBe(newData.int)
    expect(res).toEqual(newData)
  })

  it('union', () => {
    const newData = { name_lastName: `${user.name} ${user.lastName}` }
    const [res] = dataMapping([user], ['name&lastName'])
    expect(res.name_lastName).toBe(newData.name_lastName)
    expect(res).toEqual(newData)
  })

  it('date', () => {
    const newData = { createdAt: formatDate(now) }
    const res = dataMapping([user], ['createdAt'])
    expect(res).toEqual([newData])
  })

  it('empty keys', () => {
    const fn = () => dataMapping([user], [])
    expect(fn).toThrow()
  })

  it('empty list', () => {
    const res = dataMapping([], ['name'])
    expect(res).toEqual([])
  })

  it('value -> object', () => {
    const [res] = dataMapping([user], ['location.city'])
    expect(res.location).toBe(user.location.city)
  })

  it('combine: object + union', () => {
    const [res] = dataMapping([user], ['location.city&country'])
    expect(Object.values(res)).toContain(`${user.location.city} ${user.location.country}`)
  })

  it('combine: object + replace', () => {
    const [res] = dataMapping([user], ['location.city:country'])
    expect(Object.values(res)).toContain(user.location.city)
  })

  it('combine: object + object', () => {
    const [res] = dataMapping([user], ['location.address.street'])
    expect(Object.values(res)).toContain(user.location.address.street)
  })

  it('undefined key', () => {
    const [res] = dataMapping([user], ['location.other'])
    expect(Object.values(res).length).toBe(1)
    const [res2] = dataMapping([user], ['other'])
    expect(Object.values(res2).length).toBe(1)
  })
})
