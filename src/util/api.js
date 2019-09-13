export const callApi = () => {
  return axios.get('https://demo.gingrapp.com/api/v1/get_all_retail_items?key=ab2ebcf94eb9ff511fac3cffe3d6216b', {
    key: 'ab2ebcf94eb9ff511fac3cffe3d6216b'
  })
}