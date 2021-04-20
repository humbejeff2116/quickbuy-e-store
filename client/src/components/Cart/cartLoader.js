
import React from 'react'
import CartTemplate from './cartTemplate';
import { Loader } from '../Loader/loader';





export default function CartLoader(props) {
    return(
        <CartTemplate>
            <Loader/> 
        </CartTemplate> 
    )
}