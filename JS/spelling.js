history =[];

// onload event

async function word_loader(){

   var random_num = Math.floor(Math.random() * 1671); // Generate random numbers
   

   var korlish_fetch = await fetch('../JS/Kor_lish.json');   // JSON Fetching
   var korlish_json = await korlish_fetch.json();

   var Korean = korlish_json[random_num]['Korean'];   // English Value
   var english = korlish_json[random_num]['English'];   // English Value
   var romanize_value = korlish_json[random_num]['Korean'].romanize(); // Romanize value

   // this is teh value that will render onload event.
   document.getElementById("korean").innerHTML = Korean;
   document.getElementById("english").innerHTML = english;
   document.getElementById("romanization").innerHTML = romanize_value;

   document.getElementById("btn_show_romanization").innerHTML = document.getElementById("romanization").textContent;


}  // end of word_loader function










// Hangul button click Event  || https://stackoverflow.com/questions/52401400/getting-only-first-value-of-a-button-clicked-which-has-multiple-buttons-with-mul
// JQUERY
$(document).on("click", function (event) {

  
  var input_ = document.getElementById("hangul_input");
  

  var hangul_characters = $(event.target).val();
  // console.log(hangul_characters);

  input_.innerHTML += hangul_characters; // this is to embed teh characters to Input Box.

  var textarea_value = document.querySelector("textarea").value; // this will fetch the data from the Textarea

  // This is the Disable process

  var textarea_disassemble = Hangul.disassemble(textarea_value);
  // This is the assemble process


  input_.innerHTML = Hangul.assemble(textarea_disassemble);
 


  // console.log(textarea_disassemble);
}); // End of // Hangul button click Event


// backspace function  || Working
 document.getElementById("backspace").addEventListener('click', function(){

    var hangul_input = document.getElementById("hangul_input").innerHTML;
   
    

    if (hangul_input.length === 0) {      
      console.log('Nothing to Remove');     
         
    } else {
      document.getElementById("hangul_input").textContent = hangul_input.substring(0, hangul_input.length - 1);
    }

    
   

 });  // End of backspace function




 // Hangul helper button
document.getElementById("Hangeul_Helper").addEventListener("click", function () {
   document.getElementById("hangul_helper").innerHTML = `
   <div class="ui basic modal">
   <div class="ui image">
   <img id="vowel_img" src="../IMG/Vowel.PNG">      
   <img id="vowel_img" src="../IMG/Consonant.PNG"> 
   </div> 
   </div>
   `;
 
   $('.ui.basic.modal')
     .modal('show');
 
  });  // End of Hangul helper button


   // Submit button
document.getElementById("submit_answer").addEventListener("click", function () {

  

   var hangul_input = document.getElementById("hangul_input").innerHTML;  // get input of textarea when submit button is pressed / click
   var answer = document.getElementById("korean").innerHTML; 

   // alert(answer);

   if (hangul_input === answer) {
      Swal.fire({
         icon: 'success',
         title: 'Very Good !',
         html: `<br><br><p id="last_attempt">You are correct <span id="answer_txt_2">${document.getElementById('korean').textContent}</span> is 
       <strong id="english_txt">${document.getElementById('english').textContent}</strong> in English.
       <br>
       <br>
       And the romanization is <strong id="important_txt">${(document.getElementById('romanization').textContent).toUpperCase()}</strong>.
       </p>
       `,
         confirmButtonText: 'Next <i class="chevron right icon"></i>',
       }).then(() => {         
         location.reload();
       })
   
   } else if(hangul_input === ""){
      Swal.fire({
         icon: 'error',
         title: 'Answer cannot be set as empty !'
       })
   }else {

      Swal.fire({
         icon: 'error',
         title: 'Answer is incorrect !<br>Please try it again.<br>'
       }).then(() => {
         test = [document.getElementById("incorrectAnswers").innerHTML += hangul_input + "<br>"];
       })
     
   }


 
  });  // End of submit button



  // I Give up Button 

 
 document.getElementById("Surrender").addEventListener('click', function(){   
   

   Swal.fire({
      title: 'Really, Are you sure ?',      
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: `No`,
      allowOutsideClick: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         Swal.fire({                       
            html: `<p id="correct_answer_surrender">${document.getElementById('korean').textContent}</p>            
            <p id="surrender_txt">
            Is the correct answer which means <strong id="english_txt">${document.getElementById('english').textContent}</strong> in English.
            <br>     
            <br>        
            And the romanization is <strong id="important_txt">${(document.getElementById('romanization').textContent).toUpperCase()}</strong>.
            </p>                     
          `,
            confirmButtonText: 'OK',
            allowOutsideClick: false
          }).then(() => {         
            location.reload();
          })
      } 
    })

  

});  // End of I Give up Button 


// Play question button 
document.getElementById("play_sound").addEventListener('click', function(){

   var text_speach = [];      
   text_speach = document.getElementById("korean").textContent;         
   responsiveVoice.speak(text_speach, "Korean Male",{pitch: 1},{range:2},{rate: 1.5}, {volume: 1});

}); // End of Play question button 


// Play Answer button 
document.getElementById("play_answer").addEventListener('click', function(){

   var text_speach = [];      
   text_speach = document.getElementById("hangul_input").textContent;   
   
   if (text_speach === "") {
      Swal.fire({
         icon: 'error',
         title: 'Cannot play because the answer is Empty !',
         allowOutsideClick: false
       })
   } else {
      responsiveVoice.speak(text_speach, "Korean Male",{pitch: 1},{range:2},{rate: 1.5}, {volume: 1});
   }
   

}); // End of Play question button 


// Answer History 
document.getElementById("answer_history").addEventListener('click', function(){

  var history_of_answer = document.getElementById('incorrectAnswers').textContent;

  if (history_of_answer === "") {

    Swal.fire({
      icon: 'info',
      title: 'No history of answer found via this level.',
      allowOutsideClick: false
    })
    
  } else {
    Swal.fire({    
      icon: 'info',    
      title: `Your Past Responses`,               
      html: `<p id="answer_history_txt">
      ${test}
      </p>                     
    `,
      confirmButtonText: 'OK',
      allowOutsideClick: false
    })
    
  }
}); // End of Answer History


// Function for Show Romanization
document.getElementById("btn_show_romanization").addEventListener('click', function(){

  Swal.fire({    
    icon: 'question',    
    title: `In Korean spell the word:`,               
    html: `<p id="romanization_value_txt">
    ${document.getElementById('romanization').textContent}
    </p>                     
  `,
  
    confirmButtonText: 'Got It',
    allowOutsideClick: false
  })

}); // End of Function for SHow Romanization



// Instruction 
document.getElementById("instruction_btn").addEventListener('click', function(){

  Swal.fire({    
    icon: 'info',                   
    html: `<p id="about_txt">
    1. Just spell the word using the keys provided, as well as other options available.
    <br>
    <br>
    2. For stand alone vowels <strong id="important_txt">ieung</strong> <strong>"ㅇ"</strong> rule still applies.
    <br>
    <br>
    3. Just have fun and be hungry for New Learnings.
    <br>
    <br>
    4. Goodluck.
    </p>`,
  
    confirmButtonText: 'OK',
    allowOutsideClick: false
  })

}); // End of Instruction 


