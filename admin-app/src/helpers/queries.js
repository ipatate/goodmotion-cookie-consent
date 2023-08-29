/**
 *
 * @param ({data: any, action: string})
 * @returns json
 */
export const fetchAPI = async ({ data, action } = { action: null }) => {
  if (!action) return

  const dataToSend = new FormData()
  dataToSend.append('action', action)
  if (data) {
    dataToSend.append('data', data)
  }
  try {
    const call = await fetch(window.ajaxurl, {
      method: 'POST',
      credentials: 'same-origin',
      body: dataToSend,
    })
    const { data } = await call.json()
    return data ? data : {}
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param url (string)
 * @returns json
 */
export const fetchREST = async (url) => {
  if (!url) return

  try {
    const call = await fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
    })
    const data = await call.json()
    return data ? data : {}
  } catch (error) {
    console.log(error)
  }
}
