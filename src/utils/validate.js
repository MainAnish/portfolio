export const isUrl=u=>{try{return /^https?:$/.test(new URL(u).protocol)}catch{return false}}
