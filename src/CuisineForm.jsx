import React from 'react';
import {list} from "./list.js";

let apiKey = window.ENV.REACT_APP_CUISINE_API;


export default class CuisineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cuisine: '', intolerances: '', imgData: [], titleData: [], recipeData: [], spoonacularSourceUrlData: [], sourceRecipeUrlData: [], allListsData: [], nutritionData: [], nutritionDisplay: [], clicked: false,
   };
    this.intoleranceListMain = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.list = this.list.bind(this);
    this.displayButton = this.displayButton.bind(this);
    this.closeNutrition = this.closeNutrition.bind(this);

    this.list();
    console.log(this.state.clicked+ " :Clicked 1");
  }

  displayButton(event) {
    let imgValue = event.target.dataset.value;
    let nutData = this.state.nutritionData;
    let itemArray = [];
    let displayArray = [];
    for (let i = 0; i < nutData.length; i++) {
      if (nutData[i].props.value == imgValue) {
        let stateData = [...this.state.nutritionData];
        let stringData = JSON.stringify(stateData);
        let items = JSON.parse(stringData);
        let item ={...items[i]}
        items[i] = item;
        let nutritionInformation = items[i].props.children;
        for (let i = 0; i < nutritionInformation.length; i++) {
          let keyVal = nutritionInformation[i] + 1;
          let nutKey = nutritionInformation[i];
          console.log(nutritionInformation[i].props.children);
          itemArray.push(<div key={nutKey.toString()} value={keyVal}>{nutritionInformation[i].props.children}</div>);
        }
        itemArray.push(<button key={nutData[i].toString()} value={"button"+[i]} onClick={this.closeNutrition} className="nutritionCloseBtn">X</button>);
        displayArray.push(<div  key={nutData[i].toString()} value={nutData[i] + 1}className={"nutritionOnClickDiv"} id="nutScrollID"><div className="itmAryCont">{itemArray}</div></div>)
        console.log(itemArray);
        this.setState({
          clicked: true,
          isLoaded: true,
          nutritionDisplay: displayArray,
        });
        window.scrollTo({top: 0, behavior: 'smooth'});
      } else {
        console.log(nutData[i].props.value+"no match"+ imgValue);
      }
    }
  }
  closeNutrition(event) {
    let divVal = event.target.value;
    console.log(divVal);
    let nutData = this.state.nutritionData;
    this.setState({
      clicked: true,
      isLoaded: true,
      nutritionDisplay: nutData,
    });


  }

  list() {
    let intoleranceList = list.intolerances;
    for(let i = 0; i < intoleranceList.length; i++){
      this.intoleranceListMain.push(<option key={intoleranceList[i].toString()} value={intoleranceList[i]}>{intoleranceList[i]}</option>);
    }
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
    let tempAlllistArray = [];
    let tempNutritionArray = [];
    let cuisineData = this.state.cuisine;
    let intoleranceData = this.state.intolerances;
    var queryURL = "https://api.spoonacular.com/recipes/complexSearch?number=2&cuisine=" + cuisineData + "&addRecipeInformation=true&sort=random&intolerances=" + intoleranceData +"&apiKey=" + apiKey;

    fetch(queryURL).then(res => res.json()).then((result) => {
      console.log(result.results);
      for (let i = 0; i < result.results.length; i ++) {
        if (result.results[i].image === "https://spoonacular.com/recipeImages/667699-312x231.jpg") {
          console.log("Crappy Image!");
        } else {
          console.log("just fine!");
        }
        let recipeStepsArray = [];
        let titleData = result.results[i].title;
        let imgData = result.results[i].image;
        let recipeData = result.results[i].analyzedInstructions[0];
        let sourceRecipeUrl = result.results[i].sourceUrl;
        let spoonacularUrl = result.results[i].spoonacularSourceUrl;
        let diets = result.results[i].diets;
        let weightSmartPoints = result.results[i].weightWatcherSmartPoints;
        let healthScore = result.results[i].healthScore;
        let spoonacularScore = result.results[i].spoonacularScore;
        let recipeDataFull = recipeStepsArray;
        let stringifiedObject = JSON.stringify(titleData);
        let parsedObject = JSON.parse(stringifiedObject);
        for (let i = 0; i < recipeData.steps.length; i++) {
          let steps = recipeData.steps[i].step;
          let stepNumber =  recipeData.steps[i].step + [i];
          let stepDisplayNumber = i + 1;
          recipeStepsArray.push(<p key={stepNumber.toString()} value={stepNumber} className="stepsArray">{stepDisplayNumber}: {steps}</p>);
        }
        tempNutritionArray.push(<div key={[diets]} value={[i]} data-value={[i]} className="nutritionInfoDiv" style={{display: 'none'}}><div>Diets: {diets}</div><div>Weight Watcher Smart Points: {weightSmartPoints}</div><div>Health Score: {healthScore}</div><div>Spoonacular Score: {spoonacularScore}</div></div>);
        tempAlllistArray.push(<div key={[parsedObject]} value={[i]}><div className="titleFoodDiv">{parsedObject}</div><div className="imgDivHov"><img src={imgData} className="imgDataImg" onClick={this.displayButton} data-value={[i]}></img></div><div className="descriptionDiv"><div>{recipeDataFull}</div></div><div className="urlDiv">Link to Recipe Source: <a href={sourceRecipeUrl}>{sourceRecipeUrl}</a></div><div className="urlDiv">Link to Spoonacular: <a href={spoonacularUrl}>{spoonacularUrl}</a></div></div>);
      }

      this.setState({
        isLoaded: true,
        allListsData: tempAlllistArray,
        nutritionData: tempNutritionArray,
      });
      console.log(result);
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className="formContent">
          <div id="formContainer">
            <form onSubmit={this.handleSubmit}>
              <label>Cuisine:</label>
              <br></br>
              <input className="formInput" name="cuisine" type="text" value={this.state.cuisine} onChange={this.handleChange} />
              <br></br>
              <label>Intolerances:</label>
              <br></br>
              <select className="formInput" name="intolerances" value={this.state.intolerances} onChange={this.handleChange}>{this.intoleranceListMain}</select>
              <br></br>
              <div id="formBtnDiv">
                <input className="submitFormInputBtn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
          <div className="formDirectionsDiv">To use the search feature, first enter a cuisine type like "American" or "Japanese" for example. Next, select any type of dietary restrictions that you may want to impose on the search. Once you hit Submit, a list of random recipies will be returned according to the parameters you have selected. You may click on the image to reveal more information!</div>
        </div>
        <div className="listDataDiv">
            {this.state.allListsData.map((object, index) => {
              return <div className={"mapDiv"} key={index} value={object.id}><div className={"infoInner"}>
                {[object]}</div></div>
            })}<div>{this.state.nutritionDisplay.map((data, index) => {
              return <div key={index} value={data.id}>{[data]}</div>
            })}</div>
        </div>
      </div>
    );
  }
}