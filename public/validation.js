(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      console.log('Form submission attempted');
      
      const imageField=form.querySelector('[name="listing[image]"]');
      if(imageField.value.trim()===''){
        console.log('Adding event listener to form');
        imageField.setCustomValidity('');
      }

      if (!form.checkValidity()) {
        console.log('Adding event listener to form');
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


  let taxes=document.getElementById("flexSwitchCheckReverse");
  taxes.addEventListener("click",()=>{
    let taxInfo=document.querySelectorAll(".tax-info");
    console.log(taxInfo,taxes);
    for(info of taxInfo){
      if(info.style.display!=="inline"){
        info.style.display="inline";
      }
      else{
        info.style.display="none";
      }
    }
  })
