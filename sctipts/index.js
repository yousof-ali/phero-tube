function anotherPage(file){
    window.location.href = file
}

const loadData = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    .then(res=>res.json())
    .then(data=>{
        forBtn(data.data)
    })
}
loadData()



function forBtn(value){
    const categoriContainer = document.getElementById("categoriContainer");
    for(i of value){
        const btn = document.createElement("button");
        btn.innerHTML=`
        <button id="${i.category_id}" onclick="searchData('${i.category_id}')" class="btn">${i.category}</button>
        `
        categoriContainer.appendChild(btn)
        
    }
}

const searchData = async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        const idInt = parseFloat(id);
        showDisplay(data.data ,idInt);
    })
}
searchData("1000")



function showDisplay(vdoData , id){
    const container = document.getElementById("itemContainer");
    const fieldDrawing = document.getElementById("drawing-container");
    container.innerHTML = '';
    
    if(id===1005){
        fieldDrawing.innerHTML = `
        <div class = "flex justify-center">
           <img class="" src="images/Icon.png" alt="" />
        </div>
        <h2 class="mt-8 text-3xl font-bold">Oops!! Sorry, There is no content hear</h2>
        `
    }

    else{
        fieldDrawing.innerHTML=''
        for(i of vdoData){
            const singleItem = document.createElement("div");
    
           const verified = (i.authors[0].verified);
    
           const valuesD = (i.others.posted_date);
    
           function isVerified(vlaue){
            if(vlaue){
                return '<i class="fas text-blue-600 fa-certificate"></i>'
            }
            else{
                return ''
            }
           }
    
    
    
    
           
           function isDate(valuesD){
            const makeInt = parseFloat(valuesD);
            if(makeInt>1){
                const hours = Math.floor(makeInt / 3600);
    
                const remainingSecondsAfterHours = makeInt % 3600;
    
                const minutes = Math.floor(remainingSecondsAfterHours / 60);
    
                return `${hours} hours ${minutes} minutes ago`
    
            }
            else{
                return " "
            }
            
           }
    
            singleItem.innerHTML = `
            <div class="bg-slate-100 rounded-xl">
               <div class="h-48 relative">
                    <img class="h-full rounded-xl w-full" src="${i.thumbnail}" alt="" />
                    <div class="absolute right-6  top-[75%]">
                        <p class="bg-gray-800 text-gray-100 px-2 rounded">${isDate(valuesD)}</p>
                    </div> 
               </div>
               <div class="mt-2 p-4 ">
                   <div class="flex  gap-4 ">
                        <div class="w-12 h-12">
                            <img class="w-full rounded-full h-full" src="${i.authors[0].profile_picture}" alt="" />
                           
                        </div>
                            
                        <div>
                            <p class="text-2xl font-bold">${i.title}</p>
                            
                        </div>
                   </div>
                   <div class="flex items-center gap-2">
                      <p class="ml-16">${i.authors[0].profile_name}</p>
                      <span>${isVerified(verified)}</span>
                   </div>
                   <p class="ml-16">${i.others.views}</p>
                   
                   
                </div>
            </div>
            `
            container.appendChild(singleItem);
        }
    }

}

