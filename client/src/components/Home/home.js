
import React,{ useEffect, useState } from 'react';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Collection } from '../Collection/index';
import { DoubleCollection } from '../DoubleCollection/index';
import { Loader } from '../Loader/loader';
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


  export default function HomePage( ) {
    const [loading, setLoading] = useState(false);
    const [latestDeals, setLatestDeals] = useState([]);
    const [womenCollections, setWomenCollections] = useState([]);
    const [popularCollections, setPopularCollections] = useState([]);
    const [menCollections, setMenCollections] = useState([]); 
      useEffect(() => {
        window.scrollTo(0,0);
        loadHomeProducts(URLS,updateProducts);
    },[]);

   const loadHomeProducts = function loadData(urls, updateProducts) {
      setLoading(true);    
      let requests = urls.map(url=> axios.get(url));
      Promise.all(requests)
      .then(([response1,response2,response3,response4])=> [response1.data,response2.data,response3.data,response4.data] )
      .then(([latestDeals, womenCollections, popularCollections, menCollections])=> {
        return updateProducts(latestDeals.data, womenCollections.data, popularCollections.data, menCollections.data);
      })
      .catch(err => console.error(err)); 
  }
  const updateProducts = function updateProducts(data1, data2, data3, data4) {
    Promise.all([data1, data2, data3, data4])
    .then(([data1, data2, data3, data4])=> {
      setLatestDeals(data1);
      setWomenCollections(data2);
      setPopularCollections(data3);
      setMenCollections(data4);  
    })
    .then(()=> setLoading(false))
    .catch(err => console.error(err));
  }

    if(loading || latestDeals.length ===0) {
      return (
        <PageTemplate>
          <Loader />
        </PageTemplate>
      )
    }
    return (
      <PageTemplate>
        <ErrorBoundary>
          <Collection title={'Latest Deals'} href={`/latest-deals`} data={latestDeals} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Collection  title={'Women Collections'} href={'/women-collections'} data={womenCollections} />
        </ErrorBoundary>
        <ErrorBoundary>
          <DoubleCollection title={'popular collections'} href={'/popular-collections'} data={popularCollections} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Collection title={'Men Collections'} href={'/men-collections'} data={menCollections} />
        </ErrorBoundary>
      </PageTemplate>
    )
  }