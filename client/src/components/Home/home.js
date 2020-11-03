








import React,{useEffect} from 'react';

import {Slider} from '../Slider/index';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Collection } from '../Collection/index';
// import { SingleCollection } from '../SingleCollection/index';
import { DoubleCollection} from '../DoubleCollection/index';
// import {Article } from '../Article/article'
import DataComponent from '../HOC/dataComponent';
// import config from '../../config/config'
import {PageTemplate} from '../PageTemplate/pageTemplate'




// const port =  config.app.port;
// const host = config.app.host;
const host = 'localhost';
const port = 4000;

// import {getLatestDeals, getWomenCollections, getMenCollections, getPopularCollections} from '../../services/ecormerce.service'





const LatestDeals = DataComponent( Collection, `http://${host}:${port}/api/v1/latest-deals?limit=${4}`)
const WomenCollections = DataComponent( Collection,`http://${host}:${port}/api/v1/women-collections?limit=${4}`)
const PopularCollections = DataComponent( DoubleCollection, `http://${host}:${port}/api/v1/popular-collections?limit=${12}`)
const MenCollections = DataComponent( Collection, `http://${host}:${port}/api/v1/men-collections?limit=${4}`)
// yet to be named 
// const Unnamed = DataComponent( SingleCollection, "http://api/v1/unNamed")


  export default function HomePage ( ) {
    useEffect(()=>{
      window.scrollTo(0,0)
  })

      return(
          <PageTemplate>
       
        {/* <ErrorBoundary>
            < Slider />
            </ErrorBoundary> */}

        {/*  // latest deals  */}
        <ErrorBoundary>
        < LatestDeals title={'Latest Deals'} href={`/latest-deals`} />
        </ErrorBoundary>

        {/* //   wmen collection */}
        <ErrorBoundary>
        < WomenCollections title={'Women Collections'} href={'/women-collections'} />
        </ErrorBoundary> 

        {/* // popular collection */}
        <ErrorBoundary>
        < PopularCollections title={'popular collections'} href={'/popular-collections'} />
        </ErrorBoundary>

        {/* // men collection */}
        <ErrorBoundary>
        < MenCollections  title={'Men Collections'} href={'/men-collections'} />
        </ErrorBoundary>

        {/* // yet to name this collection
        // single un-named collection */}
        {/*   // yet to give it a pricise data name */}
        
        {/* <ErrorBoundary>
        < Unnamed  title={ 'un -named collection'} href={'/unnamed/'} /> 
        </ErrorBoundary> */}

        {/* <ErrorBoundary>
        {/* < Article />   */}
        {/* </ErrorBoundary> */} 
       
  
    </PageTemplate>

      )
  }
          
               
                

          

        
