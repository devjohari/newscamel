import React, { Component } from "react";
import LoadingAnime from "./LoadingAnime";
import News from "./News";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import LoadingBar from "react-top-loading-bar";

export class Newsbox extends Component {
   apiKey = process.env.NEWS_CAMEL_OOS;
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
         progress: 10,
      };
   }

   async componentDidUpdate(prevProp) {
      if (!(prevProp.cat === this.props.cat)) {
         await this.setState({
            page: 1,
         });
         document.title = `NewsCamel - ${this.props.cat.replace(
            this.props.cat.charAt(0),
            this.props.cat.charAt(0).toUpperCase()
         )}`;
         this.fetcher(0);
      }
   }

   async componentDidMount() {
      this.fetcher(0);
      const doc = document.querySelectorAll(".nav-item");
      doc.forEach((item) => {
         item.addEventListener("click", () => {
            if (this.props.cat.toLowerCase() === item.innerText.toLowerCase()) {
               window.scrollTo(0, 0);
            }
         });
      });
   }

   fetcher = async (numb) => {
      // document.getElementById("next").style.display = "none";
      // document.getElementById("prev").style.display = "none";
      this.setState({ loading: true, progress: 20 });
      try {
         let rawdata = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${
               this.props.country
            }&category=${
               this.props.cat
            }&apiKey=a231adc6514149e0a5120a8e1cb253fd&pageSize=${
               this.state.pagesize
            }&page=${this.state.page + numb}`
         );
         this.setState({ progress: 50 });
         let data = await rawdata.json();
         this.setState({ progress: 80 });
         this.setState({
            finaldata: data.articles,
            page: this.state.page + numb,
            totalresult: Number(data.totalResults),
            loading: false,
            progress: 100,
         });
      } catch (error) {
         console.log("error");
      }
      // document.getElementById("next").style.display = "inline-block";
      // document.getElementById("prev").style.display = "inline-block";
   };

   fetchMoreData = async () => {
      try {
         let rawdata = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${
               this.props.country
            }&category=${
               this.props.cat
            }&apiKey=a231adc6514149e0a5120a8e1cb253fd&pageSize=${
               this.state.pagesize
            }&page=${this.state.page + 1}`
         );
         let data = await rawdata.json();
         setTimeout(() => {
            this.setState({
               finaldata: this.state.finaldata.concat(data.articles),
               page: this.state.page + 1,
            });
         }, 500);
      } catch (error) {
         console.log("error");
      }
   };

   render() {
      document.getElementsByClassName("nav-item").onClick = () => {
         console.log("Hi");
      };
      return (
         <>
            <LoadingBar
               height={2.5}
               color="#f11946"
               progress={this.state.progress}
               onLoaderFinished={() => this.setState({ progress: 0 })}
            />
            <div className="container my-3 text-center">
               <h2 className="my-3 py-3">
                  {`
                  ${this.props.cat.replace(
                     this.props.cat.charAt(0),
                     this.props.cat.charAt(0).toUpperCase()
                  )} 
                  `}
                  Headlines - NewsCamel
               </h2>
               <div className="row">
                  {this.state.loading && <h1>Loading</h1>}
                  {!this.state.loading
                     ? this.state.finaldata.map((element) => {
                          return (
                             <News
                                key={element.url}
                                title={String(element.title).slice(0, 45)}
                                description={String(element.description)}
                                imageUrl={element.urlToImage}
                                Url={element.url}
                                author={element.author}
                             />
                          );
                       })
                     : [...Array(9)].map((e, i) => {
                          return <LoadingAnime key={i}></LoadingAnime>;
                       })}
               </div>
            </div>
            <InfiniteScroll
               dataLength={this.state.finaldata.length}
               next={this.fetchMoreData}
               //To put endMessage and loader to the top.
               // inverse={true} //
               hasMore={
                  !(this.state.finaldata.length === this.state.totalresult)
               }
               style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "2rem",
               }}
               loader={
                  <div className="spinner-border" role="status">
                     <span className="sr-only"></span>
                  </div>
               }
               // scrollableTarget="scrollableDiv"
            />
         </>
      );
   }
}

export default Newsbox;
