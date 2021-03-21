






import React from 'react';
import ReactDOM from 'react-dom';
import Flickity from 'flickity'
import 'flickity/dist/flickity.min.css'
import image1 from '../../images/logo.png'
import image2 from '../../images/logo.png'
import image3 from '../../images/logo.png'
import image4 from '../../images/logo.png'
import image5 from '../../images/logo.png'
import image6 from '../../images/logo.png'





const images =[image1, image2, image3, image4, image5, image6]
class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            flickityReady:false
        }
    }
 
    componentDidMount() {
        this.flickity = new Flickity(this.flickityNode,this.props.options || {});
        this.setState({ 
            flickityReady:true
        });
    }
    refreshFlickity = ( ) => {
        this.flickity.reloadCells();
        this.flickity.resize();
        this.flickity.updateDraggable();
    }
    componentWillUnmount() {
        this.flickity.destroy();
    }
    componentDidUpdate(prevProps, prevState) {
        const flickityDidBecomeActive = !prevState.flickityReady && this.state.flickityReady;
        const childrenDidChange = prevProps.children.length !== this.props.children.length;
        if(flickityDidBecomeActive || childrenDidChange){
            this.refreshFlickity();
        }
    }
    renderPortal = ( ) =>  {
        if(!this.flickityNode){
            return null;
        }
        const mountNode = this.flickityNode.querySelector('.flickity-slider');
        if(mountNode){
            return ReactDOM.createPortal(this.props.children, mountNode);
        }
    }

    render() {
        return [ 
                <div className={'test'} key='flickityBase' ref={node=> (this.flickityNode = node)} />,this.renderPortal()

               ].filter(Boolean);
    }
}


 export class SlideShow extends React.Component {
     render() {
         return(
            <div>
            <div style={{display:'flex' ,justifyContent:'space-between'}} />
            <Slider 
            options = {{
                autoPlay:4000,
                pauseAutoPlayOnHover: true,
                wrapAround: true,
                fulscreen:true,
                adaptiveHeight:true,
            }}
            >
                {
                    images.map((image, i) =>(
                        <div style={{ width:'80%', height:'400px' ,margin:'0 0.5em'}} key={i}>
                            <image src={image} alt='' />
                        </div>
                    ))
                }
            </Slider>
            </div>
         )
     }
 }
 
 export const BreadCrumb = ( ) =>
    <div className="bread-crumb">
        <div className="bread-crumb-links">
        </div>
        <div className="bread-crumb-links">
        </div>
        <div className="bread-crumb-links">
        </div>
        <div className="bread-crumb-links">
        </div>
    </div>