

// Side NAV function 

document.querySelector('.fa-bars').addEventListener('click', function () {
  $('.ui.labeled.icon.sidebar')
    .sidebar('toggle');

})// END of Side NAV function 

$('#eg').progress();  // progress bar 


// this is the onload function

function page_load() {


  var md = new MobileDetect(window.navigator.userAgent);
  // console.log( md.os() ); 

  if (md.os() === "AndroidOS" || md.os() === "iOS") {

    // This wil remove all the display from the main page while displayng the alert Pop up
    document.getElementById("container_attempts").style.display = "none";
    document.getElementById("container_hangul").style.display = "none";
    document.getElementById("left_drag").style.display = "none";
    document.getElementById("right_wrapper").style.display = "none";
    document.getElementById("right_drag").style.display = "none";
    document.getElementById("btn_container").style.display = "none";

    Swal.fire({
      icon: 'error',
      html: '<p id="desktop_only">Sorry but this Web Application is only applicable for <span id="important_txt">Desktop</span> due to it\'s font, functionality and resizing properties.</p>',
      showConfirmButton: true,
      confirmButtonText: 'I Agree',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      window.location.href = './PAGES/Error.html';
    }) // end of SWAL

    // window.location.href = './PAGES/Error.html';
  } else {
    spellbee();
  }


}// End of onload function





// Thi sis the main Function 

async function spellbee() {



  try {

    // to remove content from DIvs

    document.getElementById("confetti").style.display = "none";
    document.getElementById("hangul").innerHTML = "";
    document.getElementById("left_drag").innerHTML = "";
    document.getElementById("right_drag").innerHTML = "";
    document.querySelector(".counter").id = "label_life_new"; // will change the Life status back to 3 and Active color Green 
    document.querySelector(".counter").innerHTML = "3"; // will change the Life status back to 3 and Active color Green 



    // Generate random Number
    var random_num = Math.floor(Math.random() * 1671); // Generate random numbers



    // API fetch process   and total is 1671
    var korlish_fetch = await fetch('JS/Kor_lish.json');
    var korlish_json = await korlish_fetch.json();

    var english = korlish_json[random_num]['English'];   // English Value
    var romanize_value = korlish_json[random_num]['Korean'].romanize(); // Romanize value


    document.getElementById('hangul').innerHTML = `${korlish_json[random_num]['Korean']}`;  // this will embed the korean character to main page
    document.getElementById('english_meaning').innerHTML = `${english}`;  // this will embed the English Value to the main div (will be insible later and only needed for Sweet Alert)
    document.getElementById('romanized').innerHTML = `${romanize_value}`;  // this will embed the Romanized Value to the main div (will be insible later and only needed for Sweet Alert)


    //  alert(random_num);


    // Shuffle method aka Fisher-Yates || https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
    shuffle = romanize_value =>
      [...romanize_value]
        .reduceRight((res, _, __, arr) => (
          res.push(...arr.splice(0 | Math.random() * arr.length, 1)),
          res), [])
        .join('');

    var split_romanize_value = shuffle(romanize_value).split(''); // will split the Romanize value (single word) into multiple value.

    var breakdown_split_romanize_value = Object.values(split_romanize_value); // variable needed / required for FOR LOOP 


    // FOR LOOP Starts HERE 
    breakdown_split_romanize_value.forEach(async function (romanize_iterated) {   // FOR LOOP

      var for_each_value = await romanize_iterated;  // Iterated / Itemized value of split_romanize_value
      // console.log(for_each_value);



      document.getElementById("left_drag").innerHTML += `
   <div id="answers">${for_each_value}</div>`;


      dragula([document.getElementById("left_drag"), document.getElementById("right_drag")], {
        direction: 'horizontal',
        slideFactorX: 15,
        slideFactorY: 15
      });

    })  // End of FOR LOOP


  } catch (error) {

    // This wil remove all the display from the main page while displayng the alert Pop up
    document.getElementById("container_attempts").style.display = "none";
    document.getElementById("container_hangul").style.display = "none";
    document.getElementById("left_drag").style.display = "none";
    document.getElementById("right_wrapper").style.display = "none";
    document.getElementById("right_drag").style.display = "none";
    document.getElementById("btn_container").style.display = "none";


    Swal.fire({
      icon: 'error',
      html: '<p id="error404">Unexpected Error Occurred<br>Please again later.</p>',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      window.location.href = './PAGES/404.html';

    }) // end of SWAL

  } // end of Catch block




}// END of Spellbee function



// Function for answer button
document.getElementById("answer_btn").addEventListener('click', function () {


  var romanized_answer = document.getElementById('romanized').textContent;  // Romanized answer taken from main page
  var textcontent = document.getElementById('right_drag').innerText;  // value of Right Drag box

  if (typeof textcontent === 'string' && textcontent.length === 0) { // condition to check if emtpy

    Swal.fire({
      icon: 'error',
      title: 'Answer cannot be set as empty !'
    })
  } else if (textcontent === romanized_answer) {


    document.getElementById("confetti").style.display = "block"; // this is reinstate the Canvas elemnet for Confetti purposes.
    var confettiSettings = { "target": "confetti", "max": "1000", "size": "1", "animate": true, "props": ["circle", "square", "triangle", "line"], "colors": [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126], [57, 255, 27], [77, 77, 255], [255, 254, 55], [98, 39, 93]], "clock": "35", "rotate": true, "width": "1824", "height": "1024", "start_from_edge": false, "respawn": true };
    var confetti = new ConfettiGenerator(confettiSettings); // confetti settings
    confetti.render(); // render confetti


    Swal.fire({
      icon: 'success',
      title: 'Very Good !',
      html: `<p id="last_attempt">You are correct <span id="answer_txt">${romanized_answer.toUpperCase()}</span> is 
    <strong id="english_txt">${document.getElementById('english_meaning').textContent}</strong> in English.</p>
    `,
      confirmButtonText: 'Next <i class="chevron right icon"></i>',
    }).then(() => {
      spellbee();
    })


  } else {

    var counter = document.querySelector(".counter").innerText;


    if (counter === "3") {

      Swal.fire({
        icon: 'error',
        title: 'Ooops.. <br>Answer is incorrect !<br>Please try it again.<br>'
      }).then(() => {
        document.querySelector(".counter").innerHTML = "2";
        document.querySelector(".counter").id = "label_life_less_two";
      })
    } else if (counter === "2") {

      Swal.fire({
        icon: 'error',
        title: 'Strike no. 2 <br>Incorrect still !<br>One last try for this question.<br>'
      }).then(() => {
        document.querySelector(".counter").innerHTML = "1";
        document.querySelector(".counter").id = "label_life_less_one";
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Game Over for this Question',
        html: `<p id="last_attempt">The correct answer is <span id="answer_txt">${romanized_answer.toUpperCase()}</span> which is 
            <strong id="english_txt">${document.getElementById('english_meaning').textContent}</strong> in English.</p>
            `,
        confirmButtonText: 'Next <i class="chevron right icon"></i>',
      }).then(() => {
        spellbee();
      })

    } // end of else inside Else condition (with Param of Score)

  }  // end of else block




}) // END of Function for answer button



// Click event for SIDE NAVIGATIONS
// About
document.getElementById("language_Icon").addEventListener('click', function () {
  Swal.fire({
    html: `
    <div class="ui small  image">
    <img id="dev_img" src="IMG/hangeul.jpg">    
    </div>
    <br>
    <br>
    <p id="about_txt">
         This web application was created to help <strong>NEW</strong> Learners in terms of spelling, reading and analyzation using "<span id="important_txt">Hangul</span>" or "<span id="important_txt">Hangeul</span>" aka <strong>Korean Language</strong> with the help of <span id="important_txt">ROMANIZATION</span> process.
    <br><br>
    Though it is likely
    understandable that the majority does not like romanization, but for <strong>NEW</strong> Learners like me or us, this is a vital part of learning especially for <strong>familiarization</strong> purposes. 
    <br>
    <br>
    Please note that the focus of this game is <strong>romanization</strong> and <strong>not</strong> the actual <span id="important_txt">pro·nun·ci·a·tion</span>.
    </p>`,
    showConfirmButton: true,
    confirmButtonText: 'I Don\'t Care !',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

}); //End of About


// Instruction
document.getElementById("instruction").addEventListener('click', function () {
  Swal.fire({
    html: `
    <div class="ui small  image">
    <img id="dev_img" src="IMG/hangeul.jpg">    
    </div>
    <br>
    <br>
    <p id="about_txt">
         The instruction to this game is very simple, Just <span id="important_txt">Drag</span> and <span id="important_txt">Drop</span> the corresponding letters from the top box all the way to the box below then hit submit once done. 
    </p>`,
    showConfirmButton: true,
    confirmButtonText: 'Got it !',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

}); //End of Instruction


// Developer Info.
document.getElementById("dev_info").addEventListener('click', function () {
  Swal.fire({
    html: `
    <div class="ui small circular rotate reveal image">
      <img id="dev_img" src="/IMG/Jeng.gif" class="visible content">
      <img id="dev_img2" src="/IMG/oppa.png" class="hidden content">
    </div>
    <br>    
    <a id="my_name" href="https://jamespaulespena.netlify.app/" target="_blank"  class="item">
    @James Paul Espeña
    </a>`,
    showConfirmButton: true,
    confirmButtonText: 'I Don\'t Care !',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })

}); //End of Developer Info.



// Send me a Message
document.getElementById("email").addEventListener('click', function () {

  Swal.fire({
    title: 'Hello !',
    html: `

    <div id="ui_input" class="ui input">
    <input id="email_input" type="email" placeholder="Enter a valid em@il address" autocomplete="off" spellcheck="false">    
    </div>
    <br>       
    <div id="msg_container"  class="field">
    <textarea id="msg" rows="2" autocomplete="off" spellcheck="false"></textarea>
    </div>
    <div id=btn_contact>
    <button id="send_btn" class="ui blue button" onclick="msg_submit()">Send</button>
    <button id="cancel_btn" class="ui red button" onclick="cancel()">Cancel</button>
    </div>
    `,
    allowOutsideClick: false,
    showConfirmButton: false,

  })  // end of SWAl




}); // End of Send me a Message







// Hangeul Helper
document.getElementById("helper_btn").addEventListener('click', function () {

  document.getElementById("hangul_helper").innerHTML = `
  <div class="ui basic modal">
  <div class="ui image">
  <img id="vowel_img" src="IMG/Vowel.PNG">      
  <img id="vowel_img" src="IMG/Consonant.PNG"> 
  </div> 
  </div>
  `;

  $('.ui.basic.modal')
    .modal('show');


}); //End of About




// cancel button for Contact me section
function cancel() {
  $('.ui.labeled.icon.sidebar')
    .sidebar('toggle');
  Swal.close();  // close SWAl instance
}  // End of cancel button for Contact me section



// Send or Submit button for Contact me section
function msg_submit() {


  try {

    var email_input = document.getElementById("email_input").value;
    var msg = document.getElementById("msg").value;

    var valid_email = email_input.includes("@");

    if (valid_email === false) {

      document.getElementById("ui_input").className = "ui input error";

    } else {

      emailjs.init("8w9BABkvrPleoLcwx");
      var templateParams = {
        from_name: email_input,
        message: "This is for the K-jumble Game:  " + msg
      };

      emailjs.send("Jeng", "template_cb3pmcq", templateParams);
      email_success();

      // end of email JS function

    } // end of else block


  } catch (error) {
    Swal.fire({
      icon: 'error',
      html: '<p id="error404">Unexpected Error Occurred<br>Please again later.</p>',
      showConfirmButton: true,
      confirmButtonText: 'OK',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  } // end of catch 



}  // End of Send or Submit button for Contact me section




// Message for successful email 

function email_success() {

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Message Sent',
    showConfirmButton: false,
    allowOutsideClick: false,
    timer: 2000    // end of sweet alert message
  }).then(function () {
    $('.ui.labeled.icon.sidebar')
      .sidebar('toggle');

  }) // end of SWAL 

} // END of Message for successful email 




