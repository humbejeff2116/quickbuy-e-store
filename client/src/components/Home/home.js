
import React,{ useEffect,useState } from 'react';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Collection } from '../Collection/index';
import { DoubleCollection } from '../DoubleCollection/index';
import DataComponent from '../HOC/dataComponent';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import axios from 'axios';



let URI = `http://localhost:4000`;
// const URI = `https://quickibuy.herokuapp.com`;
const URLS = [
  `${URI}/api/v1/latest-deals?limit=${4}`,
  `${URI}/api/v1/women-collections?limit=${4}`,
  `${URI}/api/v1/popular-collections?limit=${12}`,
  `${URI}/api/v1/men-collections?limit=${4}`
]
const LatestDeals = DataComponent(Collection, `${URI}/api/v1/latest-deals?limit=${4}`)
const WomenCollections = DataComponent(Collection,`${URI}/api/v1/women-collections?limit=${4}`)
const PopularCollections = DataComponent(DoubleCollection, `${URI}/api/v1/popular-collections?limit=${12}`)
const MenCollections = DataComponent(Collection, `${URI}/api/v1/men-collections?limit=${4}`)

function loadData(urls) {
  let requests = urls.map(url=> axios.get(url));
  Promise.all(requests)
  .then(([response1,response2,response3,response4])=>[response1.data,response2.data,response3.data,response4.data])
  .then(([latestDeals,womenCollections,popularCollections,menCollections])=> {
    return updateState(latestDeals, womenCollections, popularCollections, menCollections);
  })
  .catch(err => console.error(err));

}
function updateState(data1, data2, data3, data4) {
  Promise.all([data1, data2, data3, data4])
  .then(([data1, data2, data3, data4])=>{

  })

}

  export default function HomePage( ) {
    const [loadingState, setLoadingState] =(false);
    const [latestDeals, setLatestDeals] = useState([]);
    const [womenCollections, setWomenCollections] = useState([]);
    const [popularCollections, setPopularCollections] = useState([]);
    const [menCollections, setMenCollections] = useState([]); 
      useEffect(()=> {
        window.scrollTo(0,0);
        // loadData(URLS);
    },[]);
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