import React from 'react';
let apiKey = window.ENV.REACT_APP_CUISINE_API;

export default class WineForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {wineData: '', priceData: '', allDataList: []};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        const target = event.target;
        const value = event.target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(event) {
        let wine = this.state.wineData;
        let price = this.state.priceData;
        var queryURL = "https://api.spoonacular.com/food/wine/recommendation?wine="+ wine +"&maxPrice="+ price +"&number=5&apiKey=" + apiKey;
        fetch(queryURL).then(res => res.json()).then((result) => {
            let tempArray = [];
            console.log(result);
            console.log(result.recommendedWines);
            for (let i = 0; i < result.recommendedWines.length; i++) {
                console.log(result.recommendedWines[i].title);
                let title = result.recommendedWines[i].title;
                let description = result.recommendedWines[i].description;
                if (result.recommendedWines[i].imageUrl === "https://spoonacular.com/recipeImages/667699-312x231.jpg") {
                    console.log("Crappy Image!");
                } else {
                    console.log("just fine!");
                }
                let imgURL = result.recommendedWines[i].imageUrl;
                let link = result.recommendedWines[i].link;
                let price = result.recommendedWines[i].price;
                let averageRating = result.recommendedWines[i].averageRating;
                let ratingCount = result.recommendedWines[i].ratingCount;
                let score = result.recommendedWines[i].score;
                tempArray.push(<div className="infoInner"><div>{title}</div><div><img src={imgURL}></img></div><div className="descriptionDiv">{description}</div><div>Price: {price}</div><div>Average Rating: {averageRating}</div><div>Rating Count: {ratingCount}</div><div>Score: {score}</div><div className="urlDiv"><a href={link}>{link}</a></div></div>);
            }
            const allData = tempArray.map((allDatas) => <div className="mapDiv">{allDatas}</div>);
            this.setState({
                isLoaded: true,
                allDataList: allData
            });
        },
        (error) => {
            this.setState({
                isLoaded:true,
                error
            });
        });
        event.preventDefault();
      }
    
      render() {
        return (
            <div>
                <div className="formContent">
                    <form onSubmit={this.handleSubmit}>
                        <label>Wine:</label>
                        <br></br>
                        <input  className="formInput" name="wineData" type="text" value={this.state.wineData} onChange={this.handleChange} />
                        <br></br>
                        <label>Maximum Ammount $:</label>
                        <br></br>
                        <input  className="formInput" name="priceData" type="text" value={this.state.priceData} onChange={this.handleChange} />
                        <br></br>
                        <input className="submitFormInputBtn" type="submit" value="Submit" />
                    </form>
                    <div className="formDirectionsDiv">To use the Wine Search feature, simply input a type of wine you like. The option is available to set a maximum price point should you choose to do so.</div>
                </div>
                <div className="listDataDiv">
                    {this.state.allDataList}
                </div>
            </div>
        );
      }
}