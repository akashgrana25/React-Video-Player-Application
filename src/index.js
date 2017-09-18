import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_details';
const API_KEY  = 'AIzaSyBHG0VFc4V99OQ0zUD3MQr0BG93MWMA-LE';
import YTSearch from 'youtube-api-search';

// Create a component. This component should produce some HTML

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      videos : [],
      selectedVideo: null
     };

     this.videoSearch('Surfboards');

  }

  videoSearch(term){
    YTSearch ({key:API_KEY, term: term},(videos) =>{
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term)=>{this.videoSearch(term)},3000);
     return(
       <div>
          <SearchBar onSearchTermChange = {videoSearch}/>
          <VideoDetails video = {this.state.selectedVideo} />
          <VideoList
          onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
          videos = {this.state.videos}/>
       </div>
     );
  }
}


//Take this compoent generated HTML and put it into DOM

ReactDOM.render(<App />, document.querySelector('.container'));
