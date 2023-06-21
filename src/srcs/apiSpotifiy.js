// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQAOOkfWRy7G_lHpu7Su9JMbAc18a5zYH_daPI8M57XLRRyRJ9Gm28IX-V7lp0VILTV4GTxg130-oAhSVUSyQSlQa60nJJIV2MIAfKRGClDowaV4Grtk0F9DHijEhMwEtlhphJ0e9CKTWVEVbDIS5ZTmyjecB7emjK3fOCuHQEr1Uy4aOc7P0O9zIIhTqiqKB6QTfwsHXPdcmytmK10r30f0WP_qbG96z0QLzshYMCiFBBtIn-YN-0MyAmhY4mhuPq44u_2oRR23ulUEqBZAXx8k';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}
