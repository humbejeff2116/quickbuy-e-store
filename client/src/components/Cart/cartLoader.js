
import React from 'react'
import CartTemplate from './cartTemplate';
import { Loader } from '../Loader/loader';





export default function CartLoader() {
    return(
        <CartTemplate>
            <Loader/> 
        </CartTemplate> 
    )
}