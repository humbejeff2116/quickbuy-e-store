








import React,{useEffect} from 'react';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Collection } from '../Collection/index';
import { DoubleCollection} from '../DoubleCollection/index';
import DataComponent from '../HOC/dataComponent';
import {PageTemplate} from '../PageTemplate/pageTemplate'


const host = 'localhost';
const port = 4000;
const LatestDeals = DataComponent(Collection, `http://${host}:${port}/api/v1/latest-deals?limit=${4}`)
const WomenCollections = DataComponent(Collection,`http://${host}:${port}/api/v1/women-collections?limit=${4}`)
const PopularCollections = DataComponent(DoubleCollection, `http://${host}:${port}/api/v1/popular-collections?limit=${12}`)
const MenCollections = DataComponent(Collection, `http://${host}:${port}/api/v1/men-collections?limit=${4}`)

  export default function HomePage( ) {
      useEffect(()=> {
        window.scrollTo(0,0)
    })
    return(
      <PageTemplate>
        <ErrorBoundary>
        < LatestDeals title={'Latest Deals'} href={`/latest-deals`} />
        </ErrorBoundary> 
        <ErrorBoundary>
        < WomenCollections title={'Women Collections'} href={'/women-collections'} />
        </ErrorBoundary> 
        <ErrorBoundary>
        < PopularCollections title={'popular collections'} href={'/popular-collections'} />
        </ErrorBoundary>
        <ErrorBoundary>
        < MenCollections  title={'Men Collections'} href={'/men-collections'} />
        </ErrorBoundary>
      </PageTemplate>
    )
  }