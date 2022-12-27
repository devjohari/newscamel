import React, { Component } from "react";
import LoadingAnime from "./LoadingAnime";
import News from "./News";
import PropTypes from "prop-types";

export class Newsbox extends Component {
   static defaultProps = {
      country: "IN",
      cat: "general",
   };
   static propTypes = {
      cat: PropTypes.string,
      country: PropTypes.string,
   };
   constructor(props) {
      super(props);
      this.state = {
         finaldata: [],
         loading: true,
         page: 1,
         totalresult: 0,
         pagesize: 15,
      };
   }
   async componentDidUpdate(prevProp) {
      if (!(prevProp.cat === this.props.cat)) {
         await this.setState({
            page: 1,
         });
         this.fetcher(0);
      }
   }
   async componentDidMount() {
      this.fetcher(0);
   }
   fetcher = async (numb) => {
      document.getElementById("next").style.display = "none";
      document.getElementById("prev").style.display = "none";
      this.setState({ loading: true });
      try {
         let rawdata = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${
               this.props.country
            }&category=${
               this.props.cat
            }&apiKey=1de62e09e7bf489b87957c49ec5462e5&pageSize=${
               this.state.pagesize
            }&page=${this.state.page + numb}`
         );
         let data = await rawdata.json();
         this.setState({
            finaldata: data.articles,
            page: this.state.page + numb,
            totalresult: Number(data.totalResults),
            loading: false,
         });
      } catch (error) {
         console.log("error");
      }
      document.getElementById("next").style.display = "inline-block";
      document.getElementById("prev").style.display = "inline-block";
   };
   render() {
      return (
         <div className="container my-3 text-center">
            <h2 className="my-3 py-3">Welcome to the NewsCamel</h2>
            <div className="row">
               {this.state.loading && <h1>Loading</h1>}
               {!this.state.loading
                  ? this.state.finaldata.map((element) => {
                       return (
                          <News
                             key={element.url}
                             title={String(element.title).slice(0, 45)}
                             description={String(element.description).slice(
                                0,
                                88
                             )}
                             imageUrl={element.urlToImage}
                             Url={element.url}
                          />
                       );
                    })
                  : [...Array(9)].map((e, i) => {
                       return <LoadingAnime key={i}></LoadingAnime>;
                    })}
            </div>
            <div className="d-flex justify-content-center gap-2">
               <button
                  type="button"
                  className="btn btn-dark"
                  id="prev"
                  onClick={() => {
                     this.fetcher(-1);
                  }}
                  disabled={this.state.page <= 1}
               >
                  prev
               </button>
               <button
                  type="button"
                  id="next"
                  className="btn btn-dark"
                  onClick={() => {
                     this.fetcher(1);
                  }}
                  disabled={
                     !(
                        Math.ceil(
                           this.state.totalresult / this.state.pagesize
                        ) > this.state.page
                     )
                  }
               >
                  Next
               </button>
            </div>
         </div>
      );
   }
}

export default Newsbox;
