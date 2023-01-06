const height=document.querySelector("#height");
const weight=document.querySelector("#weight");
const age=document.querySelector("#age");
const gender=document.querySelector("#gender");
const activity=document.querySelector("#activity");
const generateMealsButton=document.querySelector("#generate-meals-button");




generateMealsButton.addEventListener("click",function(event){

    event.preventDefault();
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
    }

    console.log(caloriesRequirment)


    //check todays weekday 
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    const d = new Date();
    let days = weekday[d.getDay()];
    console.log(days)


    const mealContainer=document.querySelector("#meal-container")

    mealContainer.classList.remove("meal-container-hide");
    mealContainer.classList.add("meal-container-show");


    
    

    fetch(`https://api.spoonacular.com/mealplanner/generate?apiKey=b545271198dc493cbfdbf80a9437a16b&targetCalories=${caloriesRequirment}`)
        .then((response) => response.json())
        .then((result1) => {
            
           
            result1.week[days].meals.forEach(function(value,index) {
                
          

                var mealsId=value.id;
                
                fetch(`https://api.spoonacular.com/recipes/${mealsId}/information?apiKey=b545271198dc493cbfdbf80a9437a16b&includeNutrition=false`)
                .then((response) => response.json())
                .then((result) => {
                  
                    
        
                    const image=document.querySelector("#img"+(index+1));
                    image.setAttribute('src',result.image);
                    image.setAttribute('alt','Loading');
                    const dishName=document.querySelector("#meal"+(index+1));
                    
                    dishName.innerText=result.title;


                  

                        ingredientBody=document.querySelector("#receipe"+(index+1)+ ">.ingredients > #tbody1");
                        

                        result.extendedIngredients.forEach(function(ingredientsValue,indexNumber){

                           

                        var tr=document.createElement("tr");
                        var td=document.createElement("td");

                       
                        
                        td.innerText=(`${indexNumber+1})  ${ingredientsValue.original}`)
                       
                        tr.appendChild(td);
                        
                        ingredientBody.appendChild(tr);
                        

                        })


                        stepsBody=document.querySelector("#receipe"+(index+1)+ ">.steps > #tbody2");

                        result.analyzedInstructions[0].steps.forEach(function(stepsValue,indexNumberForSteps){

                        var tr=document.createElement("tr");
                        var td=document.createElement("td");

                       
                        
                        td.innerText=(`${indexNumberForSteps+1})  ${stepsValue.step}`)
                        
                        tr.appendChild(td);
                        
                        stepsBody.appendChild(tr);
                        

                        })


                        equipmentBody=document.querySelector("#receipe"+(index+1)+ ">.equipment > #tbody3");

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
            });
        })
        

        .catch((error) => {
            console.log('error', error);
        }); 
        
           



        














     


    
})

const receipeContainer=document.querySelector("#receipe-container");

var flag=true;

const receipeButton1=document.querySelector("#get-receipe1");
const receipeButton2=document.querySelector("#get-receipe2");
const receipeButton3=document.querySelector("#get-receipe3");

    const receipe1=document.querySelector("#receipe1");
    const receipe2=document.querySelector("#receipe2");
    const receipe3=document.querySelector("#receipe3");




receipeButton1.addEventListener('click',()=>{

    

    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
        flag=false;
    }

   if(receipe2.classList.contains("content")){ 
       receipe2.classList.remove("content");
       receipe2.classList.add("hidden");
   }

   if(receipe3.classList.contains("content")){
       receipe3.classList.remove("content");
       receipe3.classList.add("hidden");
   }

   if(receipe1.classList.contains("hidden")){
       receipe1.classList.remove("hidden");
       receipe1.classList.add("content");
   }

})

receipeButton2.addEventListener('click',()=>{

    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
        flag=false;
    }

    if(receipe1.classList.contains("content")){ 
        receipe1.classList.remove("content");
        receipe1.classList.add("hidden");
    }
 
    if(receipe3.classList.contains("content")){
        receipe3.classList.remove("content");
        receipe3.classList.add("hidden");
    }
 
    if(receipe2.classList.contains("hidden")){
        receipe2.classList.remove("hidden");
        receipe2.classList.add("content");
    }
 
 })


 receipeButton3.addEventListener('click',()=>{

    if(flag){
        receipeContainer.classList.remove("hidden1");
        receipeContainer.classList.add("content1");
        flag=false;
    }

    if(receipe1.classList.contains("content")){ 
        receipe1.classList.remove("content");
        receipe1.classList.add("hidden");
    }
 
    if(receipe2.classList.contains("content")){
        receipe2.classList.remove("content");
        receipe2.classList.add("hidden");
    }
 
    if(receipe3.classList.contains("hidden")){
        receipe3.classList.remove("hidden");
        receipe3.classList.add("content");
    }
 
 })
 











   