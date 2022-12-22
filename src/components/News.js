import React, { Component } from "react";

export class News extends Component {
   render() {
      let { title, description, imageUrl, Url } = this.props;
      return (
         <div className="col-md-4 text-center">
            <div className="my-3 text-center">
               <div className="card">
                  <img src={imageUrl} className="card-img-top" alt="..." />
                  <div className="card-body">
                     <h5 className="card-title">
                        {title.length < 45 ? title : title + "..."}
                     </h5>
                     <p className="card-text">
                        {description.length < 45
                           ? description
                           : description + "..."}
                     </p>
                     <a
                        href={Url}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-primary"
                     >
                        Read More
                     </a>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default News;
