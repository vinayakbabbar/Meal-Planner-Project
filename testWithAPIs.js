const height=document.querySelector("#height");
const weight=document.querySelector("#weight");
const age=document.querySelector("#age");
const gender=document.querySelector("#gender");
const activity=document.querySelector("#activity");
const generateMealsButton=document.querySelector("#generate-meals-button");
const loader=document.querySelector("#loader");
const mealContainer=document.querySelector("#meal-container")

var mealIdObject=[];
var api='85a9ced707b04aa8ad63556f0fb95d0f';

    // API:-85a9ced707b04aa8ad63556f0fb95d0f
    //      42a9bb5d19ba4f8e9019474fe617153b
    
    


generateMealsButton.addEventListener("click",function(event){

    event.preventDefault();

    mealContainer.classList.remove("meal-container-show");
    mealContainer.classList.add("meal-container-hide");

    receipeContainer.classList.remove("content1");
    receipeContainer.classList.add("hidden1");
    
    loader.style.display="block";


    if(gender.value=='male'){
        console.log('male value selected');
        let BMR = 66.47 + (13.75 * weight.value) + (5.003 * height.value) - (6.755 * age.value);
                         
        console.log(BMR)
        if(activity.value=="light"){
            var caloriesRequirment= BMR * 1.375;
            console.log(caloriesRequirment);

        }
        else if(activity.value=="moderate"){
            var  caloriesRequirment= BMR * 1.55;
            console.log(caloriesRequirment);

        }
        else if(activity.value=="active"){
            var  caloriesRequirment= BMR * 1.725;
            console.log(caloriesRequirment);

        }
      

    }
    else if(gender.value=='female'){
        console.log('female value selected');
        let BMR = 655.1 + (9.563 * weight.value) + (1.850 * height.value) - (4.676 * age.value);
                         
        console.log(BMR)
        if(activity.value=="light"){
            var  caloriesRequirment= BMR * 1.375;
            console.log(caloriesRequirment);

        }
        else if(activity.value=="moderate"){
            var  caloriesRequirment= BMR * 1.55;
            console.log(caloriesRequirment);

        }
        else if(activity.value=="active"){
            var  caloriesRequirment= BMR * 1.725;
            console.log(caloriesRequirment);

        }
       
    }
    else{
        alert("Please Select gender");
        loader.style.display="none";
    }

    console.log(caloriesRequirment)


    //check todays weekday 
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const d = new Date();
    let days = weekday[d.getDay()];
    console.log(days)


    // const mealContainer=document.querySelector("#meal-container")

    // mealContainer.classList.remove("meal-container-hide");
    // mealContainer.classList.add("meal-container-show");


    

    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=${api}&targetCalories=${caloriesRequirment}`)
        .then((response) => response.json())
        .then((result1) => {
            
            console.log(result1.week[days].meals)
            result1.week[days].meals.forEach(function(value,index) {
                
          

                var mealsId=value.id;
                mealIdObject.push(mealsId);
                
                fetch(`https://api.spoonacular.com/recipes/${mealsId}/information?apiKey=${api}&includeNutrition=false`)
                .then((response) => response.json())
                .then((result) => {
                  
                    
                    console.log(result)
                    const image=document.querySelector("#img"+(index+1));
                    image.setAttribute('src',result.image);
                    image.setAttribute('alt','Loading');
                    const dishName=document.querySelector("#meal"+(index+1));
                    
                    dishName.innerText=result.title;


                    


            
                        
                        
                        
                   
                

                    
                })
                .catch((error) => {
                    console.log('error', error);
                }); 
            });
        })
        

        .catch((error) => {
            console.log('error', error);
        }); 
              

    
})

function loadFunction(){

loader.style.display="none";


    mealContainer.classList.remove("meal-container-hide");
    mealContainer.classList.add("meal-container-show");

}






const receipeContainer=document.querySelector("#receipe-container");

var flag=true;

const receipeButton1=document.querySelector("#get-receipe1");
const receipeButton2=document.querySelector("#get-receipe2");
const receipeButton3=document.querySelector("#get-receipe3");

    



receipeButton1.addEventListener('click',()=>{

    fetch(`https://api.spoonacular.com/recipes/${mealIdObject[0]}/information?apiKey=${api}&includeNutrition=false`)
    .then((response) => response.json())
    .then((result) => {

        

        ingredientBody=document.querySelector("#receipe1 >.ingredients > #tbody1"); 
        ingredientBody.innerHTML="";                     
        result.extendedIngredients.forEach(function(ingredientsValue,indexNumber){          
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumber+1})  ${ingredientsValue.original}`)
        tr.appendChild(td);
        ingredientBody.appendChild(tr);
        })


        stepsBody=document.querySelector("#receipe1 >.steps > #tbody2");
        stepsBody.innerHTML="";
        result.analyzedInstructions[0].steps.forEach(function(stepsValue,indexNumberForSteps){
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumberForSteps+1})  ${stepsValue.step}`)        
        tr.appendChild(td);
        stepsBody.appendChild(tr);
        })


        equipmentBody=document.querySelector("#receipe1 >.equipment > #tbody3");
        equipmentBody.innerHTML="";
        var indexCount=1;
        result.analyzedInstructions[0].steps.forEach(function(equipmentValue,indexNumberForEquipment){            
            equipmentValue.equipment.forEach(function(deepEquipmentValue,indexNumberForDeepEquipment){             
                var tr=document.createElement("tr");
                var td=document.createElement("td");
                td.innerText=(`${indexCount})  ${deepEquipmentValue.name}`)
                tr.appendChild(td);
                equipmentBody.appendChild(tr);
                indexCount++;
            })
        })


    })
    .catch((error) => {
        console.log('error', error);
    }); 

    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
    }
    if(receipe1.classList.contains("hidden")){
        receipe1.classList.remove("hidden");
        receipe1.classList.add("content");
    }


})

receipeButton2.addEventListener('click',()=>{

    fetch(`https://api.spoonacular.com/recipes/${mealIdObject[1]}/information?apiKey=${api}&includeNutrition=false`)
    .then((response) => response.json())
    .then((result) => {

        

        ingredientBody=document.querySelector("#receipe1 >.ingredients > #tbody1"); 

        ingredientBody.innerHTML="";   

        result.extendedIngredients.forEach(function(ingredientsValue,indexNumber){          
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumber+1})  ${ingredientsValue.original}`)
        tr.appendChild(td);
        ingredientBody.appendChild(tr);
        })


        stepsBody=document.querySelector("#receipe1 >.steps > #tbody2");
        stepsBody.innerHTML="";
        result.analyzedInstructions[0].steps.forEach(function(stepsValue,indexNumberForSteps){
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumberForSteps+1})  ${stepsValue.step}`)        
        tr.appendChild(td);
        stepsBody.appendChild(tr);
        })


        equipmentBody=document.querySelector("#receipe1 >.equipment > #tbody3");
        equipmentBody.innerHTML="";
        var indexCount=1;
        result.analyzedInstructions[0].steps.forEach(function(equipmentValue,indexNumberForEquipment){            
            equipmentValue.equipment.forEach(function(deepEquipmentValue,indexNumberForDeepEquipment){             
                var tr=document.createElement("tr");
                var td=document.createElement("td");
                td.innerText=(`${indexCount})  ${deepEquipmentValue.name}`)
                tr.appendChild(td);
                equipmentBody.appendChild(tr);
                indexCount++;
            })
        })


    })
    .catch((error) => {
        console.log('error', error);
    }); 


    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
    }
    if(receipe1.classList.contains("hidden")){
        receipe1.classList.remove("hidden");
        receipe1.classList.add("content");
    }
 
 })


 receipeButton3.addEventListener('click',()=>{

    fetch(`https://api.spoonacular.com/recipes/${mealIdObject[2]}/information?apiKey=${api}&includeNutrition=false`)
    .then((response) => response.json())
    .then((result) => {

      

        ingredientBody=document.querySelector("#receipe1 >.ingredients > #tbody1");

        ingredientBody.innerHTML="";   

        result.extendedIngredients.forEach(function(ingredientsValue,indexNumber){          
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumber+1})  ${ingredientsValue.original}`)
        tr.appendChild(td);
        ingredientBody.appendChild(tr);
        })


        stepsBody=document.querySelector("#receipe1 >.steps > #tbody2");

        stepsBody.innerHTML="";

        result.analyzedInstructions[0].steps.forEach(function(stepsValue,indexNumberForSteps){
        var tr=document.createElement("tr");
        var td=document.createElement("td");      
        td.innerText=(`${indexNumberForSteps+1})  ${stepsValue.step}`)        
        tr.appendChild(td);
        stepsBody.appendChild(tr);
        })


        equipmentBody=document.querySelector("#receipe1 >.equipment > #tbody3");

        equipmentBody.innerHTML="";

        var indexCount=1;
        result.analyzedInstructions[0].steps.forEach(function(equipmentValue,indexNumberForEquipment){            
            equipmentValue.equipment.forEach(function(deepEquipmentValue,indexNumberForDeepEquipment){             
                var tr=document.createElement("tr");
                var td=document.createElement("td");
                td.innerText=(`${indexCount})  ${deepEquipmentValue.name}`)
                tr.appendChild(td);
                equipmentBody.appendChild(tr);
                indexCount++;
            })
        })


    })
    .catch((error) => {
        console.log('error', error);
    }); 


    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
    }
    if(receipe1.classList.contains("hidden")){
        receipe1.classList.remove("hidden");
        receipe1.classList.add("content");
    }
 
 })

 window.addEventListener('scroll', function() {
    var navbar = document.querySelector('nav');
  
    if (window.scrollY > 0) {
      navbar.classList.add('active');
    } else {
      navbar.classList.remove('active');
    }
  });
 











   