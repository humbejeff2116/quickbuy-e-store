
import React from 'react'






export default function FooterLinks(props) {
    return(
      <li><a href={props.href}>{props.name}</a></li> 
    )
  }