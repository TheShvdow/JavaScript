export async function fetchJSON ( url , options = {} ) {   
    const headers = {accept: 'application/json', ...options.headers}
    const r = await fetch(url,{...options,headers})
   
    }