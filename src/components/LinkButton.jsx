import {isUrl} from '../utils/validate.js'
// Renders nothing when href is empty/invalid, so no dead buttons appear.
export default function LinkButton({href,variant='secondary',icon:Icon,children,label,...rest}){
  const ext=/^https?:/i.test(href||'')
  if(!href||(ext&&!isUrl(href)))return null
  return <a className={'btn '+variant} href={href} aria-label={label} {...(ext?{target:'_blank',rel:'noopener noreferrer'}:{})} {...rest}>{Icon&&<Icon size={16} aria-hidden="true"/>}{children}</a>
}
