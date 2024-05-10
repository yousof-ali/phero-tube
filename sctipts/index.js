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
        <button onclick="searchData('${i.category_id}')" class="btn">${i.category}</button>
        `
        categoriContainer.appendChild(btn)
        
    }
}

const searchData = async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res=>res.json())
    .then(data=>{
        showDisplay(data.data)
    })
}
searchData(1000)


function showDisplay(vdoData){
    const container = document.getElementById("itemContainer");
    container.innerHTML = '';
    for(i of vdoData){
        const singleItem = document.createElement("div");
        console.log(i.authors[0].profile_name);
        singleItem.innerHTML = `
        <div class="">
           <div class="h-48">
              <img class="h-full w-full" src="${i.thumbnail}" alt="" />
           </div>
           <div class="mt-2 ">
               <div class="flex items-center gap-4 ">
                    <div class="w-12 h-12">
                        <img class="w-full rounded-full h-full" src="${i.authors[0].profile_picture}" alt="" />
                    </div>
                        
                    <div>
                        <p class="text-2xl font-bold">${i.title}</p>
                        
                    </div>
               </div>
               <p class="ml-16">${i.authors[0].profile_name}</p>
            </div>
        </div>
        `
        container.appendChild(singleItem);
    }

}