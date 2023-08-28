const loadPhone=async(SearchText=13,isShowAll)=>{
    const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones,isShowAll);
}


// Display phones
const displayPhones=(phones,isShowAll)=>{
    const phoneContainer = document.getElementById("phone-container");

    // Remove perevious history
    phoneContainer.textContent='';

const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // Display only 10 phone
    console.log(isShowAll)
    if(!isShowAll){
        phones= phones.slice(0,10);
    }
    

    phones.forEach(phone =>{
        // Create div & set innerHTML & append child
        const phoneCard = document.createElement('div');
     
        phoneCard.classList=`card bg-rose-50 shadow-xl mb-8`;
        phoneCard.innerHTML=`
        <figure class="px-10 pt-10">
              <img src=" ${phone.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions">
                <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
          </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // Hide loading spinner
    toggleLoadingSpinner(false);
}

// Handle Show Detais
const handelShowDetails=async(id)=>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   showPhoneDetails(data.data);
}

const showPhoneDetails=(phoneInfo)=>{
    console.log(phoneInfo)

    const phoneName= document.getElementById('show-detail-phone-name');
    phoneName.innerText= phoneInfo.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <img src="${phoneInfo.image}" alt="">
    <p>Storage: <span>${phoneInfo.mainFeatures.memory}</span></p>
    <p>Display Size: <span>${phoneInfo.mainFeatures.displaySize}</span></p>
    <p>Chipset: <span>${phoneInfo.mainFeatures.chipSet}</span></p>
    `
    


    // Show modal
    show_details_modal.showModal();
}



// Handel Search
const handelSearch=(isShowAll)=>{
    toggleLoadingSpinner(true)
    const searchField= document.getElementById('search-field');
    const searchText = searchField.value ;
    // searchField.value='';
    loadPhone(searchText, isShowAll);
}

// Spinner
const toggleLoadingSpinner=(isLoading)=>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}


// Show all button
const handelShowAll=()=>{
    handelSearch(true)
}

loadPhone();



