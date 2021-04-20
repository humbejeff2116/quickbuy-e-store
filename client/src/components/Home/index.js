
import React from 'react';
import { Route } from 'react-router-dom';
import  PopularCollectionsPage  from '../PopularCollectionPage/popularCollectionPage';
import  LatestDealsPage  from '../LatestDealsPage/latestDealsPage';
import  WomenCollectionsPage from '../WomenCollectionPage/womenCollectionPage';
import MenCollectionsPage from '../MenCollectionPage/menCollectionPage';
import { PageTemplate } from '../PageTemplate/pageTemplate';


export default function Home({match}) {
    return(
        <PageTemplate>
            <Route exact path="/" component={Products} />        
            <Route exact path="/popular-collections" >
                <PopularCollectionsPage/>
            </Route>
            <Route exact path="/women-collections"  >
                <WomenCollectionsPage/>
            </Route>
            <Route exact path="/men-collections"  >
                <MenCollectionsPage/>
            </Route>   
            <Route exact  path="/latest-deals"  >
                <LatestDealsPage/>
            </Route>
        </PageTemplate>
    )
}