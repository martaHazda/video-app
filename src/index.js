import _ from 'lodash'
import React, {Component} from 'react'; // find react library in my dependensis nd assign it to the React var.
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// Create new component
//This component should produce some HTML

const API_KEY ='AIzaSyD9BB4JXQ4aP9vP1qJKzc1P95wLnovqxBA';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
            // this.SetState({videos: videos})
            console.log(videos);
        });
    }
    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} 
                />
            </div>
        );
    }
}


// Take this component and put ot on the page

ReactDOM.render(<App />, document.querySelector('.container'));