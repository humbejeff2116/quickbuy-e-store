
import React,{ useEffect } from 'react';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Collection } from '../Collection/index';
import { DoubleCollection } from '../DoubleCollection/index';
import DataComponent from '../HOC/dataComponent';
import { PageTemplate } from '../PageTemplate/pageTemplate';



let URI = `http://localhost:4000`;
// const URI = `https://quickibuy.herokuapp.com`;
const LatestDeals = DataComponent(Collection, `${URI}/api/v1/latest-deals?limit=${4}`)
const WomenCollections = DataComponent(Collection,`${URI}/api/v1/women-collections?limit=${4}`)
const PopularCollections = DataComponent(DoubleCollection, `${URI}/api/v1/popular-collections?limit=${12}`)
const MenCollections = DataComponent(Collection, `${URI}/api/v1/men-collections?limit=${4}`)

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