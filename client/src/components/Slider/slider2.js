








import React from "react";
import Flickity from "react-flickity-component";

// import "./styles.css";
import "./flickity.css";


const flickityOptions ={
    initialIndex:2
}

// function Carousel (){
//     return(
//         <Flickity
//         className={'carousel'}
//         elementType ={'div'}
//         options={flickityOptions}
//         disableImagesLoaded={false}
//         reloadOnUpdate={false}
//         static={false}
//         >
//             <img src ='images.jpg' />
//             <img src ='images.jpg' />
//             <img src ='images.jpg' />
//         </Flickity>
//     )
// }

// class Carousel extends React.Component{
//     componentDidiMount(){
//         this.flkty.on('settle',()=>{
//             console.log(`selected index is ${this.flkty.selectedIndex}`)
//         })
//     }
//     myCustomNext =()=>{
//         this.flkty.next()
//     }
//     render(){
//         return(
//             <div>
//             <Flickity
//             flickityRef ={c=>this.flkty=c}
//             className={'carousel'}
//             elementType ={'div'}
//             options={flickityOptions}
//             disableImagesLoaded={false}
//             reloadOnUpdate={false}
//             static={false}
//             >
//                 <img src ='images.jpg' />
//                 <img src ='images.jpg' />
//                 <img src ='images.jpg' />
//             </Flickity>
//             <Button onClick ={this.myCustomNext}>next</Button>
//             </div>
//         )

//     }
   
// }









export default function Carousel() {
  return (
    <Flickity>
      <img src="https://placeimg.com/640/480/animals" />
      <img src="https://placeimg.com/640/480/nature" />
      <img src="https://placeimg.com/640/480/architecture" />
    </Flickity>
  );
}