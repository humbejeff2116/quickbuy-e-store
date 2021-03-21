
import React from 'react'
import { AboutMenu } from '../AboutMenu/aboutMenu'
import {PageTemplate} from '../PageTemplate/pageTemplate'




export const About =({match})=>
    <PageTemplate>
        <section>
            {/* remove the AboutMenu route */}
        <Route component={AboutMenu}/>
        <Route exact path="/about" component={Company} />
        <Route exact path="/about/history" component={History} />
        <Route exact path="/about/services" component={Services} />
        <Route exact path="/about/location" component={Location} />
        <Route exact path="/about/loctaa" component={Company} />
        <Route exact path="/about/loddd" component={Company} />
        <Route exact path="/about/htyuu" component={Company} />
        </section>
    </PageTemplate>

