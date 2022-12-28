import React, { Component } from "react";

export class LoadingAnime extends Component {
   render() {
      return (
         <div className="col-md-4 text-center">
            <div className="my-3 text-center">
               <div className="card" aria-hidden="true">
                  <div className="card-body">
                     <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                     </h5>
                     <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default LoadingAnime;
